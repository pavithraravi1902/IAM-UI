import { Route, Routes } from "react-router-dom";
import Header from "./header";
import { Dashboard } from "@mui/icons-material";
import Login from "../../auth/login";
import Signup from "../../auth/sign-up";
import ForgotPassword from "../../auth/forgot";
import { MultiFactorAuthentication } from "../../auth/mfa";
import ResetPassword from "../../auth/reset-password";

const MainPage = () => {
  return (
    <div>
    <Header></Header>
    <Routes>
      <Route path="/" element={<Dashboard />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/sign-up" element={<Signup />}></Route>
      <Route path="/forgot-password" element={<ForgotPassword />}></Route>
      <Route path="/mfa" element={<MultiFactorAuthentication />}></Route>
      <Route path="/dashboard" element={<Dashboard />}></Route>
      <Route path="/reset-password" element={<ResetPassword />}></Route>
      <Route path="/header" element={<Header />}></Route>
    </Routes>
  </div>
  );
};

export default MainPage;

