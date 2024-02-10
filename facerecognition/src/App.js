import './App.css';
import Navigation from './components/navigation/Navigation';
import Logo from './components/Logo/logo';
import ImageLinkForm from './components/ImageLinkForm/imagelinkform';
import Rank from './components/Rank/Rank';
import FaceRecognitionComponent from './components/FaceRecognitionComponent/facerecognitioncomponent';
import ParticlesBg from 'particles-bg';
import { useState } from 'react';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';

function App() {
  const [input, setInput] =useState('');
  const [lastImage,setLastImage] =useState('')
  const [imageUrl,setImageUrl] = useState('');
  const [box,setBox] = useState([{}]);
  const [route,setRoute] = useState('signIn');
  const [isSignedIn,setIsSignedIn]=useState(false);
  const PAT = '65c8452fcbcb43e69dfa5cc7b92133b0';
  // Specify the correct user_id/app_id pairings
  // Since you're making inferences outside your app's scope
  const USER_ID = 'marnold316613';       
  const APP_ID = 'my-first-application-2c1uk';
  // Change these to whatever model and image URL you want to use
  const MODEL_ID = 'face-detection';
  const MODEL_VERSION_ID = '6dc7e46bc9124c5c8824be4822abe105';    
//  let IMAGE_URL = 'https://samples.clarifai.com/metro-north.jpg';



const clarifaiSetup = (url) => {
  const raw = JSON.stringify({
    "user_app_id": {
        "user_id": USER_ID,
        "app_id": APP_ID
    },
    "inputs": [
        {
            "data": {
                "image": {
                    "url": url
                }
            }
        }
    ]
  });
  return  {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Authorization': 'Key ' + PAT
    },
    body: raw
  };
}

 
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
              console.log('array box',arrayBox);
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
    fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/versions/" + MODEL_VERSION_ID + "/outputs", clarifaiSetup(input))
    .then(response => {
      if (response.ok) {
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
  if (route==='home')
  {
    setIsSignedIn(true);
  }
  else
  {
    setIsSignedIn(false)
  }
  setRoute(route);
}

  return (
    <div className="App">
      <ParticlesBg type='circle' bg={true} />
      {route ==='home' ?
      <div>
      <Navigation isSignedIn={isSignedIn} onRouteChange={onRouteChange} />
      <Logo />
      <Rank />
      <ImageLinkForm onInputChange={onInputChange} onSubmit={onSubmit} onCopyPasteInput={onCopyPasteInput} />
      <FaceRecognitionComponent imageLoaded={onImageLoaded} box={box} imageSource={imageUrl} />
      </div>
      : (route === 'signIn' ?
      <SignIn onRouteChange={onRouteChange} />
      :
      <Register onRouteChange={onRouteChange} />
      )
  }
    
    </div>
  );
}

export default App;
