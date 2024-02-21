import './App.css';
import Navigation from './components/navigation/Navigation';
import Logo from './components/Logo/logo';
import ImageLinkForm from './components/ImageLinkForm/imagelinkform';
import Rank from './components/Rank/Rank';
import FaceRecognitionComponent from './components/FaceRecognitionComponent/facerecognitioncomponent';
import ParticlesBg from 'particles-bg';
import { useEffect, useState } from 'react';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';

function App() {
  const [input, setInput] =useState('');
  const [lastImage,setLastImage] =useState('')
  const [imageUrl,setImageUrl] = useState('');
  const [box,setBox] = useState([{}]);
  const [route,setRoute] = useState('signIn');
  const [isSignedIn,setIsSignedIn]=useState(false);
  const [user ,setUser] = useState({ 
                                    id:"",
                                    name: "",
                                    email: "",
                                    entries: 0,
                                    joined: ""})

const resetState = () => {
  setInput('');
  setLastImage('');
  setImageUrl('');
  setBox([{}]);
  setRoute('signIn');
  setIsSignedIn(false);
  setUser({id:"",
  name: "",
  email: "",
  entries: 0,
  joined: ""
  });
}

const smartBrainApi="https://infinite-plateau-30747-fc90e8256432.herokuapp.com";  

//  let IMAGE_URL = 'https://samples.clarifai.com/metro-north.jpg';

const loadUser = (data) => {

setUser({id: data.id,
  name:data.name,
  email: data.email,
  entries: data.entries,
  joined: data.joined

});
console.log('user loaded', user)
}

useEffect(() => {
  // fetch('http://localhost:3000')
  // .then(response => response.json())
  // .then(console.log);
},[]);



 
 const onInputChange = (event) =>  {
  console.log('onInputChange', event.target.value);
  setInput(event.target.value);
 } 

 const onCopyPasteInput = (url) => {
  console.log('onCopyPaste',url);
  setInput(url);
 }

const calculatefacelocation =(data) => {
  try {
    if (data.hasOwnProperty('outputs'))  //i could use this to test for multiple images if i desired
    {
      if (data.outputs[0].hasOwnProperty('data'))
      {
        if (data.outputs[0].data.hasOwnProperty('regions'))
        {
          let arrayBox =[];
          const region = data.outputs[0].data.regions;
          const image = document.getElementById('inputimage');
          const width = Number(image.width);
          const height = Number(image.height);
          for(let i=0; i<region.length;i++)
          {
            const newbox=  region[i].region_info.bounding_box;                      
            const box ={leftCol: newbox.left_col * width,
              topRow: newbox.top_row * height,
              rightCol: width-(newbox.right_col *width),   
              bottomRow: height- (newbox.bottom_row * height)  }
              arrayBox.push(box);
             // console.log('array box',arrayBox);
          }
         
          return arrayBox;
        }
      }
      
    }
    

    return ;

  } catch (error) {
    console.log(data);
     console.log('calculatefacerror',error);
      return [{}];
  }
  
}

const displayFaceBox = (box) => {
  if (typeof box === 'undefined')
  {

  } else {
    setBox(box);
  }
  
}

const  getAIAttributesForImage = async () => {
  try {
    fetch(`${smartBrainApi}/clarifai`, {
      method: 'post',
      headers: { 'Content-Type': 'application/json'},
          body: JSON.stringify({
            input: input
    })
  })
    .then(response => {
      if (response.ok) {
        fetch(`${smartBrainApi}/image`, {
          method: 'put',
          headers: { 'Content-Type': 'application/json'},
          body: JSON.stringify({
            id: user.id
        })}).then(async response =>  {
          if (response.ok)
          {
            
            const data = await response.json();
               setUser({...user,
                entries: data               
                })             
            }
          })
        return response.json();
      }
      else {
        return response.text();
      }
    })
    .then(data => displayFaceBox(calculatefacelocation(data)))
    .catch(err => console.log(err));
  }
  catch (error) {
    console.log('error', error)
  }
}

const onImageLoaded = (event) =>
{
  getAIAttributesForImage();
}

 const onSubmit = () => {
  setBox({});
  if (lastImage===input)
  {
    getAIAttributesForImage();
  }
  else {
    setImageUrl(input);
    setLastImage(input);
  }
  
 }

const onRouteChange = (route) => {
  if (route==='signOut')
  {
    resetState();
    console.log('resetstate');
  }else if(route==='home') {
    setIsSignedIn(true);
  }
  setRoute(route);
}

  return (
    <div className="App">
      <ParticlesBg type='cobweb' bg={true} color={["#36454F"]}  />
      <Navigation isSignedIn={isSignedIn} onRouteChange={onRouteChange} />
      {route ==='home' ?
      <div>
      <Logo />
      <Rank userName={user.name} userEntries={user.entries} />
      <ImageLinkForm onInputChange={onInputChange} onSubmit={onSubmit} onCopyPasteInput={onCopyPasteInput} />
      <FaceRecognitionComponent imageLoaded={onImageLoaded} box={box} imageSource={imageUrl} />
      </div> 
      : (route === 'signIn') ?

      <SignIn smartBrainApi={smartBrainApi} loadUser={loadUser} onRouteChange={onRouteChange} />
      :
      <Register smartBrainApi={smartBrainApi} onRouteChange={onRouteChange} />
      }
    
    </div>
  );
}

export default App;
