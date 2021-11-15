import {useState, useEffect} from 'react'
import classes from './loginForm.module.scss'
import useHttp from '../../hooks/use-http'
import { LoginFetch } from '../../lib/api'
import FormError from './formError'
import FormSuccess from './formSuccess'

const LoginForm = (props) => {
  const [formIsValid, setFormIsValid] = useState(false)
  const [usernameVal, setUsernameVal] = useState('')
  const [usernameIsValid, setUsernameIsValid] = useState(null)
  const [passwordVal, setPasswordVal] = useState('')
  const [passwordIsValid, setPasswordIsValid] = useState(null)

  const {data, error, status, sendRequest} = useHttp(LoginFetch, false)

  useEffect(() => {
    const formValidationTimer = setTimeout(() => {
      setFormIsValid(usernameVal.trim().includes('@') && passwordVal.trim().length > 5)  
    }, 500);
    return () => {
      clearTimeout(formValidationTimer)
    }
  }, [usernameVal, passwordVal])


  const usernameOnChangeHandler = (e) => {
    setUsernameVal(e.target.value)
  }

  const passwordOnChangeHandler = (e) => {
    setPasswordVal(e.target.value)
  }

  const usernameOnBlurHandler = (e) => {
    setUsernameIsValid(e.target.value.trim().includes('@'))
  }

  const passwordOnBlurHandler = (e) => {
    setPasswordIsValid(e.target.value.trim().length > 5)
  }

  const LoginFormSubmitFn = (e) => {
    e.preventDefault()

    const loginData = {
      username: usernameVal,
      password: passwordVal
    }

    sendRequest(loginData)
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

  

  return (
    <>
      <div className="form-wrapper">
        <form onSubmit={LoginFormSubmitFn}>

          <div className={classes['form-wrapper__usernameInput']}>
            <input onChange={usernameOnChangeHandler} onBlur={usernameOnBlurHandler}  type="text" id="username" name="username" placeholder="Username(EmailID)" value={usernameVal}/>
            {((usernameIsValid === false) && (usernameIsValid === false && !usernameVal.trim().includes('@')))  && <p className={classes.error}>Kindly provide a valid emailID</p>}
          </div>  
          <div className={classes['form-wrapper__passwordInput']}>
            <input onChange={passwordOnChangeHandler} onBlur={passwordOnBlurHandler} type="password" id="password" name="password" placeholder="Password(Min 6 char)" value={passwordVal}/>
            {((passwordIsValid === false) && (passwordIsValid === false && passwordVal.trim().length < 6))  && <p className={classes.error}>Minimum 6 Characters</p>}
          </div>  
          <div className={`submit-btn ${submitBtnLoading}`}>
            <input className={formIsValid ? 'null' : classes.submitDisable} type="submit" value="Login" />
          </div>
          <p className={classes.signuptext}>Haven't logged in yet? <span onClick={props.signupFormTrigger}>Sign up Here</span></p>
        </form>
      </div>

      {errorStatus && <FormError error = {error}/>}
      {successStatus && <FormSuccess successData = {data} loginStatus = {true}/>}
    </>
  )
}

export default LoginForm