import './App.scss';
import React, { useContext,Suspense } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import AuthContext from './store/authDataContext';
import Header from './components/Header/header';
import Footer from './components/Footer/footer'
import Preloader from './images/preloader/walk.gif'
// import Home from './Pages/home'
// import Profile from './Pages/profile';
// import Dashboard from './Pages/dashboard';
// import LoginSignUp from './Pages/loginSignup';
// import Movies from './Pages/movies';
// import MovieSingle from './Pages/movieSingle';
// import NotFound from './Pages/NotFound';

const Home = React.lazy(()=> import('./Pages/home'))
const Profile = React.lazy(()=> import('./Pages/profile'))
const Dashboard = React.lazy(()=> import('./Pages/dashboard'))
const LoginSignUp = React.lazy(()=> import('./Pages/loginSignup'))
const Movies = React.lazy(()=> import('./Pages/movies'))
const MovieSingle = React.lazy(()=> import('./Pages/movieSingle'))
const NotFound = React.lazy(()=> import('./Pages/NotFound'))


function App() {

  const authCTX = useContext(AuthContext)

  return (
    <>
      <BrowserRouter>
        <Header />
        <Suspense fallback={
          <div className="centered suspensePreloader">
            <img src={Preloader} alt="preloader" />
          </div>
        }>
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>

            {authCTX.loginCTX && 
              <Route path="/profile" >
                <Profile />
              </Route>
            }  

            {authCTX.loginCTX &&
              <Route path="/dashboard" >
                <Dashboard />
              </Route>
            }

            {!authCTX.loginCTX && 
              <Route path="/login" >
                <LoginSignUp />
              </Route>
            }

              <Route path="/movies" exact>
                <Movies />
              </Route>  

              <Route path="/movies/:movieID">
                <MovieSingle />
              </Route>  

              <Route path="*" >
                <NotFound />
              </Route>

          </Switch>
        </Suspense>
        <Footer />
        </BrowserRouter> 
    </>
  );
}

export default App;
