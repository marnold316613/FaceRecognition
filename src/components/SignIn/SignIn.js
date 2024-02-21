import React, { useState } from 'react';
import './SignIn.css'
import Input from '../Input/Input';
import {FormProvider, useForm} from 'react-hook-form';
import { email_validation, password_validation } from '../../utils/inputValidations';

const SignIn = ({onRouteChange, loadUser, smartBrainApi}) => {
const [success, setsuccess] = useState(true);

const  onSubmitSignIn =  (emailSignIn,passwordSignIn) => {
  fetch(`${smartBrainApi}/signin`, {
    method: 'post',
    headers: { 'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: emailSignIn,
      password: passwordSignIn
    })
  }).then(async response =>  {
    if (response.ok)
    {
      const data = await response.json();
      setsuccess(true);    
      loadUser(data);
          onRouteChange('home');
      }
    else
    {
     setsuccess(false);
    };
   }).catch(err => {
    console.log(err);
    setsuccess(false);
   })
  }

  const methods = useForm();
  const onSubmit = methods.handleSubmit( data => {
    onSubmitSignIn(data.email,data.password)
  });

        return (
          <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
            <main className="pa4 black-80">
            <FormProvider {...methods}>
            <form onSubmit={e => {e.preventDefault()}} className="measure container" noValidate>
              <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                <legend style={{width:"360px"}} className="f1 fw6 ph0 mh0">Sign In</legend>
                <div >
                  <Input {...email_validation}
                  />
                </div>
                <div>
                  <Input {...password_validation}                  
                  />
                </div>
              </fieldset>
              <div className="">
                 <button onClick={onSubmit}
                 className="b ph3 pv2 input-reset ba b--black bg-transparent br2 grow pointer f6 dib shadow-5">Sign In</button>
              </div>
              <div className="lh-copy mt3">
                <p onClick={() => onRouteChange('register')}
                className="pointer f6 link dim black db">Register</p>
              </div>
              {!success && (
                <p className='c dark-red'>There was an error signing in!</p>
               )}
            </form>
            </FormProvider>
          </main>
          </article>
        )
}
 
export default SignIn;