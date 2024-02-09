import './App.css';
import Navigation from './components/navigation/Navigation';
import Logo from './components/Logo/logo';
import ImageLinkForm from './components/ImageLinkForm/imagelinkform';
import Rank from './components/Rank/Rank';
import FaceRecognitionComponent from './components/FaceRecognitionComponent/facerecognitioncomponent';
import ParticlesBg from 'particles-bg';

function App() {
  return (
    <div className="App">
      <ParticlesBg type='random' bg={true} />
     <Navigation />
     <Logo />
     <Rank />
     <ImageLinkForm />
     <FaceRecognitionComponent />
    </div>
  );
}

export default App;
