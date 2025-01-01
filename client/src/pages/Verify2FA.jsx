import React from "react";
import { useNavigate } from "react-router-dom";
import TwoFAVerification from "../components/TwoFAVerification";

const Verify2FA = () => {
  const navigate = useNavigate();

  const handleVerification = async (data) => {
    if (data) {
      navigate("/");
    }
  };

  const handle2FAReset = async (data) => {
    if (data) {
      navigate("/setup-2fa");
    }
  };

  return (
    <div>
      <TwoFAVerification
        onVerifySuccess={handleVerification}
        onResetSuccess={handle2FAReset}
      />
    </div>
  );
};

export default Verify2FA;
