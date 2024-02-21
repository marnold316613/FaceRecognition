import React, {useState} from 'react';
import './Register.css'
import Input from '../Input/Input';
import {FormProvider, useForm} from 'react-hook-form';
import { email_validation, name_validation, password_validation } from '../../utils/inputValidations';

const Register = ({onRouteChange,smartBrainApi}) => {
const [success, setsuccess] = useState(true);
const methods = useForm();
  const onSubmit = methods.handleSubmit( data => {
    onSubmitRegister(data.email,data.password,data.name)
  });
const onSubmitRegister = (emailRegister,passwordRegister,nameRegister) => {
  fetch(`${smartBrainApi}/register`, {
    method: 'post',
    headers: { 'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: emailRegister,
      password: passwordRegister,
      name: nameRegister
    })
  }).then(response => {
    if (response.ok)
    {
      setsuccess(true);
      onRouteChange('signIn');
    }
    else
    {
      setsuccess(false);
    }
   }).catch(err => {
    setsuccess(false);
    console.log(err)});
  }

        return (
          <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
            <main className="pa4 black-80">
            <FormProvider {...methods}>
            <form onSubmit={e => {e.preventDefault()}} className="measure container" noValidate>
              <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                <legend style={{width:"360px"}} className="f1 fw6 ph0 mh0">Register</legend>
                <div >
                  <Input {...name_validation}
                  />
                </div>
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
                 className="pointer b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib">Register</button>
              </div>
              {!success && (
                <p className='c dark-red'>There was an error registering!</p>
               )}
            </form>
            </FormProvider>
          </main>
          </article>
        )
}
 
export default Register;