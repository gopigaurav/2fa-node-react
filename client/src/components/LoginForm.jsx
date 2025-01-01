import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios'
import { loginUser, register } from "../services/authApi";

const LoginForm = ({ onLoginSuccess }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // For registration only
  const navigate = useNavigate();

  // Show success or error toast
  const showToast = (message, type) => {
    if (type === "error") {
      toast.error(message);
    } else {
      toast.success(message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isRegister && confirmPassword != password) {
      showToast("Password does not match");
      setPassword("")
      setConfirmPassword("")
    }

    try {
      const response = isRegister ? await register(username, password) : await loginUser(username, password)
      if (![200, 201].includes(response.status)) {
        const errorData = await response.json();
        showToast(errorData.message || "An error occurred", "error");
        return;
      }

      // Assuming the response is successful
      onLoginSuccess(response.data?.payload)
      showToast(isRegister ? "Account created successfully" : "Login successful", "success");
      
      // navigate("/"); // Redirect to home after successful login/registration
    } catch (error) {
      showToast("Something went wrong. Please try again.", "error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 via-gray-800 to-black">
      <form
        className="bg-gray-800 text-white rounded-xl shadow-2xl w-full max-w-sm p-8 transform hover:scale-105 transition-transform duration-300"
        onSubmit={handleSubmit}
      >
        <h2 className="text-center text-3xl font-extrabold mb-6 text-gray-100">
          {isRegister ? "Create Account" : "Welcome Back"}
        </h2>
        <div className="mb-5">
          <label className="block text-gray-300 font-medium">Username</label>
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            placeholder="Enter Your Username"
          />
        </div>
        <div className="mb-5">
          <label className="block text-gray-300 font-medium">Password</label>
          <input
            type="password"
            className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter the Password"
          />
        </div>
        {isRegister && (
          <div className="mb-5">
            <label className="block text-gray-300 font-medium">Confirm Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder="Enter Password Again"
            />
          </div>
        )}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 px-4 rounded-lg font-bold hover:from-purple-500 hover:to-blue-500 transition-colors duration-300"
        >
          {isRegister ? "Sign Up" : "Sign In"}
        </button>
        <p className="text-sm text-center mt-4 text-gray-400">
          {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
          <span
            onClick={() => setIsRegister(!isRegister)}
            className="text-blue-400 font-bold cursor-pointer hover:underline"
          >
            {isRegister ? "Login" : "Register"}
          </span>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
