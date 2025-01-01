import React from "react";
import LoginForm from "../components/LoginForm";
import { useNavigate } from "react-router-dom";
import { useSession } from "../context/SessionContext";
import { useEffect } from "react";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, isLoggedIn } = useSession();

  const handleLoginSuccess = (userData) => {
    login(userData);

    if (!userData?.isMfaActive) {
        navigate('/setup-2fa')
    } else {
        navigate('/verify-2fa')
    }
  };
  return (
    <div>
      <LoginForm onLoginSuccess={handleLoginSuccess} />
    </div>
  );
};

export default LoginPage;
