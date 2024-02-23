import { useFormContext } from 'react-hook-form';
import {MdError} from 'react-icons/md';
import { findInputError, isFormInvalid } from '../../utils';

const Input = ({ label, type, id, placeholder,validation,name, allowSpaces }) => {
  const  {register,
  formState: {errors}
  } = useFormContext();
  
  const inputError = findInputError(errors, name)
  const isInvalid = isFormInvalid(inputError)

  const handelKeyDown = e => {
    if (allowSpaces) { return;}
    if (e.key===" ") {
      e.preventDefault();
    }
  };

  return (
    <div className="flex flex-column w-100 pa1">
      <div className="flex justify-between">
        <label htmlFor={id} className="fw6 f6 ttc">
          {label}
        </label>
        {isInvalid && (
          <InputError
          message={inputError.error.message}
          key={inputError.error.message}
          />
        )}
      </div>
      <input
        id={id}
        type={type}
        className="w-100 pa2 fw-m ba br3"
        placeholder={placeholder}
        {...register(name, validation)}
        onKeyDown={handelKeyDown}
      />
    </div>
  )
}

const InputError = ({message}) => {
  return <div className='c dark-red f6 fw6 pa1'><MdError/>{message}</div>
}

export default Input;