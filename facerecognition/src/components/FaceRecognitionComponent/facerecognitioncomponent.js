import React from 'react';
import './facerecognitioncomponent.css'
import FaceBox from './FaceBox';

const FaceRecognitionComponent = ({imageSource, box, imageLoaded}) => {
    console.log('fr',box);
    if (!box || typeof box ==='undefined' || typeof box.length === 'undefined' || box === null || box.length === 0)
    {
        return (
            <div className='center ma'>
            <div className='absolute mt2 grow shadow-5'>
              <img id='inputimage' alt='' src={imageSource} width='800px' heigh='auto' onLoad={imageLoaded}/>
            </div>
          </div>
        )
    }
    
        return (
            <div className='center ma'>
              <div className='absolute mt2 grow shadow-5'>
                <img id='inputimage' alt='' src={imageSource} width='800px' heigh='auto' onLoad={imageLoaded}/>
                <FaceBox box={box} />
              </div>
            </div>
            );  
}
 
export default FaceRecognitionComponent;