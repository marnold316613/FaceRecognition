import React from 'react';
import './facerecognitioncomponent.css'

const FaceBox = ( box) => {
  // console.log('FaceBox');
  // console.log(box);

  // console.log(box.box.length)

  if (typeof box ==='undefined'  || box === null || box.box.length === 0)
  {
   // console.log('some reason we think the box is empty');
    if (typeof box ==='undefined'){
    //  console.log('box is undefined')
    }
    if (box === null){
     // console.log('box is null')
    }
    return
  }
  const arraydivs = box.box.map((value,i ) => <div key={i} className='bounding-box-blue' style={{top: value.topRow, right: value.rightCol, bottom: value.bottomRow, left: value.leftCol}}></div>)
    
        return arraydivs
           
             
}
 
export default FaceBox;