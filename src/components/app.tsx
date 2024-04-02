import React from 'react';
import './app.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Login from './auth/login';
import Dashboard from './auth/dashboard';
import ForgotPassword from './auth/forgot';

function App() {
  return (
    <div className="App">
       <Routes>
      <Route path='/' element={<Login/>}></Route>
      <Route path='/signup' element={<Dashboard/>}></Route>
      <Route path='/forgot-password' element={<ForgotPassword/>}></Route>
    </Routes>
    </div>
  );
}

export default App;
