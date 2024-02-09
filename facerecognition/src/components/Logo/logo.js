import React from 'react';
import Tilt from 'react-parallax-tilt'
import brain from './logo100.png'

const Logo = () => {
    return (
        <div className='ma4 mt0'>
            <Tilt style={{height: '150px', width:'150px'}}
            className="parallax-effect-glare-scale br2 shadow-2"
            perspective={500}
            glareEnable={true}
            glareMaxOpacity={0.45}
            scale={1.02}>
                <div className='Tilt-inner pa3 o-70' style={{ height: '150px', width:'150px', backgroundColor: 'white' }}>
                  <img style={{paddingTop: '15px', width:'100%'}} src={brain} alt='brain'/>
                </div>
            </Tilt>

        </div>
    );
}
 
export default Logo;