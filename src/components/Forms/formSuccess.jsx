import { useState,useEffect, useContext } from 'react'
import AuthContext from '../../store/authDataContext'
import { Redirect } from 'react-router-dom'
import classes from './formSuccess.module.scss'

const FormSuccess = (props) => {
  const [redirect, setRedirect] = useState(false)
  const authCTX = useContext(AuthContext)

  // For Redirection
  useEffect(() => {
    const redirection = setTimeout(() => {
      setRedirect(true)
    }, 3000);
    return () => {
      clearTimeout(redirection)
    }
  }, [])

  // For Saving the login Status in context
  useEffect(()=>{
    if(props.loginStatus === true || props.passwordResetStatus === true){
      // This settimeout should be in sync with Redirection settimeout for correct working 
      setTimeout(() => {
        authCTX.loginFnCTX(true)
      }, 3000);
      if(typeof(Storage) != 'undefined') {
        const d = new Date();
        let time = d.getTime(); 
        let value = [{token: props.successData.idToken, expiresIn: props.successData.expiresIn * 1000, loginTime: new Date().getTime(), totalLifetime: (+time) + (props.successData.expiresIn * 1000) }]
        localStorage.setItem('userLoginDetails', JSON.stringify(value))
      }
      const {idToken} = props.successData
      authCTX.tokenSaveFnCTX(idToken)
    }
  },[authCTX, props.loginStatus,props.successData,props.passwordResetStatus])

  if(props.signupStatus === true) {

    const {kind, idToken, email, refreshToken,expiresIn, localId} = props.successData

    return (
      <>
        <p>kind: {kind}</p>
        <p>idToken: {idToken}</p>
        <p>email: {email}</p>
        <p>refreshToken: {refreshToken}</p>
        <p>expiresIn: {expiresIn}</p>
        <p>localId: {localId}</p>
        <div className={classes.successMsg}>
          <p>
            Signup successful. Kindly Login in to Continue. 
          </p>
        </div>
      </>
    )
  }

  if(props.loginStatus === true) {

    const {kind, localId, email, displayName, idToken, registered, refreshToken, expiresIn} = props.successData


    

    return(
      <>
        <p>kind: {kind}</p>
        <p>localId: {localId}</p>
        <p>Email: {email}</p>
        <p>displayName: {displayName}</p>
        <p>idToken: {idToken}</p>
        <p>registered: {registered}</p>
        <p>refreshToken: {refreshToken}</p>
        <p>expiresIn: {expiresIn}</p>
        <div className={classes.successMsg}>
          <p>Login Successful</p>
        </div>
        {redirect && <Redirect to="/profile" />}
      </>
    )
  }

  if(props.passwordResetStatus === true) {
    const {kind, localId, email, idToken, providerUserInfo, refreshToken, expiresIn, passwordHash, emailVerified} = props.successData

    const {providerId, federatedId, email:providerUserInfoEmail, rawId} = providerUserInfo[0]
    return(
      <>
        <p>kind: {kind}</p>
        <p>localId: {localId}</p>
        <p>Email: {email}</p>
        <p>idToken: {idToken}</p>
        <p>providerId: {providerId}</p>
        <p>federatedId: {federatedId}</p>
        <p>providerUserInfoEmail: {providerUserInfoEmail}</p>
        <p>rawId: {rawId}</p>
        <p>refreshToken: {refreshToken}</p>
        <p>expiresIn: {expiresIn}</p>
        <p>passwordHash: {passwordHash}</p>
        <p>emailVerified: {emailVerified}</p>
        <div className={classes.successMsg}>
          <p>Password Successfully changed</p>
        </div>
      </>
    )
  }

  return (
    <>
      <h2>Something went wrong. Kindly check after sometime</h2>
    </>
  )
}

export default FormSuccess