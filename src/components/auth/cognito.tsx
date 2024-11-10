import React from "react";
import { getCognitoLoginUrl } from "../common/cognito-utils";

const Login = () => {
  const handleLogin = () => {
    window.location.href = getCognitoLoginUrl();
  };

  return (
    <div>
      <h2>Login</h2>
      <button onClick={handleLogin}>Login with Cognito</button>
    </div>
  );
};

export default Login;
