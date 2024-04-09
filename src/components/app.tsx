import React from 'react';
import './app.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Login from './auth/login'; 
import ForgotPassword from './auth/forgot';
import Signup from './auth/sign-up';
import { MultiFactorAuthentication } from './auth/mfa';
import { Dashboard } from '@mui/icons-material';

function App() {
  return (
    <div className="App">
       <Routes>
      <Route path='/' element={<Login/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/sign-up' element={<Signup/>}></Route>
      <Route path='/forgot-password' element={<ForgotPassword/>}></Route>
      <Route path='/mfa' element={<MultiFactorAuthentication/>}></Route>
      <Route path='/dashboard' element={<Dashboard/>}></Route>
    </Routes>
    </div>
  );
}

export default App;
