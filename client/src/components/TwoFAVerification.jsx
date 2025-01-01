import React, { useState } from "react";
import { verify2FA, reset2FA } from "../services/authApi";
import { toast } from 'react-toastify';

import { useNavigate } from "react-router-dom";

const TwoFAVerification = ({ onVerifySuccess, onResetSuccess }) => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleVerification = async (e) => {
    e.preventDefault();
    try {
      // Call your API to verify the OTP
      const response = await verify2FA(otp); // Assuming you have this function
      if (response.status == 200) {
        onVerifySuccess(response.data);
        toast.success('Successfully validated the OTP')
        navigate("/");
      } else {
        toast.error(response.message);
        setError("Invalid OTP");
        setOtp("");
      }
    } catch (err) {
      setError(err.message || "Verification failed");
      if (err.response?.status === 401) {
        toast.error("Token Invalid or Unauthorized");
        // navigate("/login"); // Redirect to login or appropriate page
      } else {
        toast.error(err.message || "Reset failed");
      }
    }
  };

  const handleReset = async () => {
    try {
      // Call your API to reset 2FA
      const response = await reset2FA(); // Assuming you have this function
      console.log(response)
      if (response?.status == 200) {   
        onResetSuccess(response.data);
      } else {
        toast.error("Reset failed");
      }
    } catch (err) {
      if (err.response?.status === 401) {
        toast.error("Unauthorized. Please log in again.");
        navigate("/login"); // Redirect to login or appropriate page
      } else {
        toast.error(err.message || "Reset failed");
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-700 px-4 sm:px-6 lg:px-8">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Validate OTP
        </h2>
        <p className="text-center text-gray-600 mb-4">
          Please enter the 6-digit OTP to verify 2FA authentication
        </p>
        <form onSubmit={handleVerification} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-semibold">OTP</label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              maxLength="6"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-green-400 to-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-gradient-to-l transition duration-300"
          >
            Verify OTP
          </button>
        </form>
        <div className="text-center mt-4">
          <button
            onClick={handleReset}
            className="text-blue-500 hover:text-blue-700 font-semibold"
          >
            Reset 2FA
          </button>
        </div>
      </div>
    </div>
  );
};

export default TwoFAVerification;
