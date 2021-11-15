import { createContext, useState, useEffect, useCallback } from "react"

// logoutTimerClear is used to clear the setTimeout timers for Logging out
let logoutTimerClear;

const AuthContext = createContext({
  token: '',
  loginCTX : false,
  loginFnCTX: () => {},
  tokenSaveFnCTX: () => {}
})

const d = new Date();
let time = d.getTime();

const currentLoginStatusFn = () => {
  let currentLoginStatusVal = JSON.parse(localStorage.getItem("userLoginDetails"))
  return currentLoginStatusVal
}

export function AuthContextProvider(props) {

  const [login, setLogin] = useState(false)
  const [token, setToken] = useState('')

  const loginHandler = useCallback(() => {
    setLogin(true)
    setToken(currentLoginStatusFn()[0].token)
  },[])

  const logoutHandler = useCallback(() => {
    setLogin(false)
    setToken('')
    localStorage.removeItem('userLoginDetails')
    clearTimeout(logoutTimerClear)
  },[])

  useEffect(()=> {
    if(currentLoginStatusFn()) {
      // If Else will work on Reload 
      if(time < currentLoginStatusFn()[0].totalLifetime) {
        loginHandler()
      } else {
        logoutHandler()
      }

      //SetTimeOut will work after Reload and will log out Automatically
      let currentLoginStatus = currentLoginStatusFn()
      logoutTimerClear =setTimeout(() => {
        logoutHandler()
      }, currentLoginStatus[0].totalLifetime - time);
    } 
  },[loginHandler, logoutHandler])

  const loginFnHandler = (value = false) => {
    setLogin(value)
  }
  const tokenSaveFnHandler = (value) => {
    setToken(value)

    //SetTimeOut will work Before Reload and will log out Automatically
    // Here reinitialized time since we need the new time instance. We need the time just after login, not reload
    let currentLoginStatus = currentLoginStatusFn()
    let time = new Date().getTime();
    logoutTimerClear = setTimeout(() => {
      logoutHandler()
    }, currentLoginStatus[0].totalLifetime - time);
  }

  const context = {
    tokenCTX: token,
    loginCTX: login,
    loginFnCTX: loginFnHandler,
    tokenSaveFnCTX: tokenSaveFnHandler 

  }

  return (
    <AuthContext.Provider value={context}>
      {props.children}
     </AuthContext.Provider> 
  )

}

export default AuthContext