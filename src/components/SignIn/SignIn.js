import React, { useState } from 'react';
import './SignIn.css'

const SignIn = ({onRouteChange, loadUser, smartBrainApi}) => {
const [emailSignIn,setEmail] = useState('');
const [passwordSignIn, setPassword] = useState('');

const onEmailChange = (event) => {
  setEmail(event.target.value);
}

const onPasswordChange = (event) => {
  setPassword(event.target.value);
}

const  onSubmitSignIn =  () => {
  fetch(`${smartBrainApi}/signin`, {
    method: 'post',
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify({
      email: emailSignIn,
      password: passwordSignIn
    })
  }).then(async response =>  {
    if (response.ok)
    {
      const data = await response.json();
          loadUser(data);
          onRouteChange('home');
      }
    else
    {
      //display an error message for the user
     // onRouteChange('signIn');
    };
   })

  
}
        return (
          <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
            <main className="pa4 black-80">
            <div className="measure">
              <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                <legend className="f1 fw6 ph0 mh0">Sign In</legend>
                <div className="mt3">
                  <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                  <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address"
                  onChange={onEmailChange}/>
                </div>
                <div className="mv3">
                  <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                  <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password"
                  onChange={onPasswordChange}/>
                </div>
          
              </fieldset>
              <div className="">
                <input onClick={onSubmitSignIn}
                 className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Sign in"/>
              </div>
              <div className="lh-copy mt3">
                <p onClick={() => onRouteChange('register')}
                className="pointer f6 link dim black db">Register</p>
              </div>
            </div>
          </main>
          </article>
        )
}
 
export default SignIn;