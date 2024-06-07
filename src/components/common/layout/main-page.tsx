import { useEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Login from "../../auth/login";
import { MultiFactorAuthentication } from "../../auth/mfa";
import ResetPassword from "../../auth/reset-password";
import Signup from "../../auth/sign-up";
import Dashboard from "../../dashboard/dashboard";
import PaymentComponent from "../../payment/payment";
import RefundForm from "../../payment/refund";
import { Profile } from "../../profile-management/profile";
import LoggedInHeader from "./loged-in-header";
import LoggedOutHeader from "./logged-out-header";

const MainPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const hideHeaderPaths = ["/forgot-password", "/reset-password"];

  const shouldHideHeader = hideHeaderPaths.some((path) =>
    location.pathname.startsWith(path)
  );

  const checkLoginStatus = () => {
    const isLoggedInUser = localStorage.getItem("isLoggedIn");
    const isNewUser = localStorage.getItem("newUser");
    const googleSignIn = localStorage.getItem("googleSignIn")

    if (isLoggedInUser || isNewUser || googleSignIn) {
      setIsLoggedIn(true);
      console.log("Data from localStorage:", isLoggedInUser, isNewUser);
    } else {
      setIsLoggedIn(false);
      console.log("Data not found in localStorage");
    }
  };

  useEffect(() => {
    checkLoginStatus();
    const handleStorageChange = () => {
      checkLoginStatus();
    };
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  useEffect(() => {
    let timeOut: any;
    if (isLoggedIn) {
      timeOut = setTimeout(() => {
        toast.error("Session has expired, Please login!");
        localStorage.clear();
        navigate("/login");
      }, 15 * 60 * 1000);
    } else {
      clearTimeout(timeOut);
    }
    return () => clearTimeout(timeOut);
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    checkLoginStatus();
  }, [navigate]);

  return (
    <div>
      {!shouldHideHeader &&
        (isLoggedIn ? <LoggedInHeader /> : <LoggedOutHeader />)}
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/mfa" element={<MultiFactorAuthentication />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/payment" element={<PaymentComponent />} />
        <Route path="/payment/refund" element={<RefundForm />} />
      </Routes>
    </div>
  );
};

export default MainPage;
