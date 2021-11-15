import { useState, useEffect } from 'react'
import classes from './formError.module.scss'

const FormError = (props) => {
  const [errorMsg, setErrorMsg] = useState(null)

  useEffect(() => {

    props.error === 'EMAIL_EXISTS' ? setErrorMsg('Email already exists. Kindly use another Email ID') 
    :props.error === 'TOO_MANY_ATTEMPTS_TRY_LATER' ? setErrorMsg('We have blocked all requests from this device due to unusual activity. Try again later.')
    :props.error === 'INVALID_EMAIL' ? setErrorMsg('Kindly use a Valid Email')
    :props.error === 'EMAIL_NOT_FOUND' ? setErrorMsg('Kindly check the Email')
    :props.error === 'INVALID_PASSWORD' ? setErrorMsg('Kindly check the password')
    :props.error === 'USER_DISABLED' ? setErrorMsg('This user has been disabled by the ADMIN. Kindly contact the OWNER of the WEBSITE')
    :props.error === 'INVALID_ID_TOKEN' ? setErrorMsg('The user credential is no longer valid. The user must sign in again')
    : setErrorMsg('Kindly check after some time')

  },[props.error])

  

  return (
    <>
      <div className={classes.errorMsg}>
        <p>
        {props.error + ' - ' + errorMsg}
        </p>
      </div>
    </>
  )
}

export default FormError