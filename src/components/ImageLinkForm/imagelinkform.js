import React from 'react';
import './imagelinkform.css'

const ImageLinkForm = ({onInputChange, onSubmit, onCopyPasteInput} ) => {

  const buttonClick = async (event) =>{
    try {
       // console.log('just a test');
        const text = await navigator.clipboard.readText();
      
       // console.log('imagelinkform',text);
        document.getElementById('inputImageURL').value = text;
        
        onCopyPasteInput(text);
      } catch (error) {
      //  console.log('just a test');
      }
  }

    return (
        <div>
            <p className='f2 b white' style={{textShadow:'1px 1px 2px black'}}>
                {'This Magic Brain will detect faces in your pictures. Give it a try!'}
            </p>
            <div className='center'>
                <div className='center pa4 br3 shadow-5 form'>
                <input id='inputImageURL' className='f4 pa2 w-70 center' type='text' placeholder='Enter a URL for your picture'
                 onChange={onInputChange} />
                <button onClick={buttonClick}>📋</button>
                <button className='w-30 grow f5 link ph3 pv2 dib white bg-light-green b dark-green' onClick={onSubmit}>Detect</button>
                </div>
            </div>
        </div>
    );
}

export default ImageLinkForm;