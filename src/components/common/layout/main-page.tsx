import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import ForgotPassword from "../../auth/forgot";
import Login from "../../auth/login";
import { MultiFactorAuthentication } from "../../auth/mfa";
import ResetPassword from "../../auth/reset-password";
import Signup from "../../auth/sign-up";
import Dashboard from "../../dashboard/dashboard";
import { Profile } from "../../profile-management/profile";
import LoggedInHeader from "./loged-in-header";
import LoggedOutHeader from "./logged-out-header";

const MainPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const email = localStorage.getItem('email');
  const password = localStorage.getItem('password');

  useEffect(() => {
    if (email !== null && password !==null) {
      setIsLoggedIn(true);
      console.log('Data from localStorage:', email, password);
    } else {
      console.log('Data not found in localStorage');
    }
  }, [email, password]);
  return (
    <div>
      {isLoggedIn ? <LoggedInHeader /> : <LoggedOutHeader />}
      <Routes>
        <Route path="/" element={<Dashboard />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/sign-up" element={<Signup />}></Route>
        <Route path="/forgot-password" element={<ForgotPassword />}></Route>
        <Route path="/mfa" element={<MultiFactorAuthentication />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/reset-password" element={<ResetPassword />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
      </Routes>
    </div>
  );
};

export default MainPage;
