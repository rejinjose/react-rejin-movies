import { useContext } from 'react'
import AuthContext from '../../store/authDataContext'
import classes from './header.module.scss'
import { NavLink } from 'react-router-dom'

const Header = () => {

  const authCTX = useContext(AuthContext)

  const logOutFnHandler = () => {
    authCTX.loginFnCTX()
    authCTX.tokenSaveFnCTX('')
    localStorage.removeItem('userLoginDetails')
  }
  
  return (
    <>
      <div className={`section ${classes.header}`}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-4">
              <h1>React APP</h1>
            </div>
            <div className="col-md-8 align-items-center">
              <nav className={classes['header__navigation']}>
                <ul>
                  <li>
                    <NavLink to="/" className="text-uppercase" activeClassName={classes.active} exact={true}>Home</NavLink>
                  </li>
                  {
                    authCTX.loginCTX &&
                    <li>  
                    <NavLink to="/profile" className="text-uppercase" activeClassName={classes.active}>Profile</NavLink>
                  </li>
                  }

                  {
                    authCTX.loginCTX &&
                    <li>  
                    <NavLink to="/dashboard" className="text-uppercase" activeClassName={classes.active}>Dashboard</NavLink>
                  </li>
                  }
                  
                </ul>
                {
                  !authCTX.loginCTX &&
                  <NavLink to="/login" className={`text-uppercase btn ${classes['login-btn']}`} activeClassName={classes.active}>Login/Sign Up</NavLink>
                }
                {
                  authCTX.loginCTX &&
                  <NavLink to="/" className={`text-uppercase btn ${classes['logout-btn']}`} activeClassName={classes.active} onClick={logOutFnHandler}>Logout</NavLink>
                }
                
              </nav>
            </div>
          </div>
        </div>
      </div>
    </>
  ) 

}

export default Header