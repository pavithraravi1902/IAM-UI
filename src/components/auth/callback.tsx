import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Callback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthCallback = async () => {
      const params = new URLSearchParams(window.location.search);
      const code = params.get("code");

      if (code) {
        try {
          // Exchange code for tokens (implement this on your server)
          const response = await axios.post("/users/callback", { code });
          localStorage.setItem("isLoggedIn", "true");
          // You may also want to store other tokens and user information
          navigate("/");
        } catch (error) {
          console.error("Authentication error", error);
          // Handle error (e.g., show error message to user)
        }
      }
    };

    handleAuthCallback();
  }, [navigate]);

  return <div>Loading...</div>;
};

export default Callback;
