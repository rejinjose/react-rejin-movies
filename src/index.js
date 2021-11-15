import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import { APIContextProvider } from './store/apiDataContext'
import { AuthContextProvider } from './store/authDataContext'

ReactDOM.render(
  <React.StrictMode>
    <APIContextProvider>
      <AuthContextProvider>
        <App /> 
      </AuthContextProvider>  
    </APIContextProvider>  
  </React.StrictMode>,
  document.getElementById('root')
);
