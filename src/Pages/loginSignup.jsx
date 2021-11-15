import {useState} from 'react'
import LoginForm from "../components/Forms/loginForm"
import SignupForm from '../components/Forms/signupForm'

const Login = () => {

  const [isLoginForm, setIsLoginForm] = useState(true)

  const signUpFormTriggerHn = () => {
    setIsLoginForm(false)
  }

  const loginFormTriggerHn = () => {
    setIsLoginForm(true)
  }

  return (
    <>
      <div className="page-section">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h2 className="text-center margin-top-full title-text text-uppercase">Kindly <span>Login<span className="slash">/</span>Sign Up</span> to Continue</h2>
            </div>
          </div>
          <div className="row">
            <div className="offset-md-3 col-md-6">
              <div className="loginSignupWrapper"></div>
              {isLoginForm && <LoginForm signupFormTrigger={signUpFormTriggerHn} />}
              {!isLoginForm && <SignupForm loginFormTrigger={loginFormTriggerHn} />}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login