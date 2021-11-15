import { useState, useEffect, useContext } from 'react'
import AuthContext from '../../store/authDataContext'
import classes from './changePassword.module.scss'
import useHttp from '../../hooks/use-http'
import { ResetPasswordFetch } from '../../lib/api'
import FormError from './formError'
import FormSuccess from './formSuccess'

const ChangePassword = () => {
  const [passwordVal, setPasswordVal] = useState('')
  const [passwordIsValid, setPasswordIsValid] = useState(null)
  const [passwordConfirmVal, setPasswordConfirmVal] = useState('')
  const [passwordConfirmIsValid, setPasswordConfirmIsValid] = useState(null)
  const [formIsValid, setFormIsValid] = useState(false)

  const {data, error, status, sendRequest} = useHttp(ResetPasswordFetch, false)
  const authCTX = useContext(AuthContext)
  
  useEffect(() => {
    const formValidationTimer = setTimeout(() => {
      if(passwordIsValid) {
        setFormIsValid(passwordVal === passwordConfirmVal)  
      }
    }, 500);
    return () => {
      clearTimeout(formValidationTimer)
    }
  }, [passwordVal, passwordConfirmVal, passwordIsValid])


  const passwordOnChangeHandler = (e) => {
    setPasswordVal(e.target.value)
  }
  const passwordOnBlurHandler = (e) => {
    setPasswordIsValid(e.target.value.trim().length > 5)
  }

  const passwordConfirmOnChangeHandler = (e) => {
    setPasswordConfirmVal(e.target.value)
  }

  const passwordConfirmOnBlurHandler = (e) => {
    if(passwordVal === passwordConfirmVal){
      setPasswordConfirmIsValid(true)
    } else {
      setPasswordConfirmIsValid(false)
    }
    
  }

  const PasswordResetFormSubmitFn = (e) => {
    e.preventDefault()

    const passwordResetData = {
      idToken: authCTX.tokenCTX,
      password: passwordConfirmVal
    }

    sendRequest(passwordResetData)
  }

  let submitBtnLoading = null
  if(status === 'pending') {
    submitBtnLoading = 'btn-loading' 
  }

  let successStatus = false
  if(status === 'completed' && error === null) {
    successStatus = true
  }

  let errorStatus = false
  if(status === 'completed' && error) {
    errorStatus = true
  }

  return(
    <>
    <div className="form-wrapper">
      <form onSubmit={PasswordResetFormSubmitFn}>
        <div className={classes['form-wrapper__passwordInput']}>
          <input onChange={passwordOnChangeHandler} onBlur={passwordOnBlurHandler} type="password" id="password" name="password" placeholder="New Password(Min 6 char)" value={passwordVal}/>
          {((passwordIsValid === false) && (passwordIsValid === false && passwordVal.trim().length < 6))  && <p className={classes.error}>Minimum 6 Characters</p>}
        </div> 
        <div className={classes['form-wrapper__passwordInput__confirm']}>
          <input onChange={passwordConfirmOnChangeHandler} onBlur={passwordConfirmOnBlurHandler} type="password" id="passwordConfirm" name="passwordConfirm" placeholder="Confirm New Password(Min 6 char)" value={passwordConfirmVal}/>
          {((passwordConfirmIsValid === false) && (passwordConfirmIsValid === false && passwordVal !== passwordConfirmVal))  && <p className={classes.error}>Must be the same</p>}
        </div> 
        <div className={`submit-btn ${submitBtnLoading}`}>
            <input className={formIsValid ? 'null' : classes.submitDisable} type="submit" value="Change Password" />
          </div>
      </form>
    </div>   

    {errorStatus && <FormError error = {error}/>}
    {successStatus && <FormSuccess successData = {data} passwordResetStatus = {true}/>} 
    </>
  )
}

export default ChangePassword