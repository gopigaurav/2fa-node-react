import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { logoutUser } from "../services/authApi";
import { useSession } from "../context/SessionContext";
import { useNavigate } from "react-router-dom";
// import 'react-toastify/dist/ReactToastify.css';

// toast.configure();

const HomePage = () => {
  const [email, setEmail] = useState("");
  const [file, setFile] = useState(null);
  const {user, logout} = useSession()
  const navigate = useNavigate()

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !file) {
      toast.error("Please provide both an email and a file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("email", email);

    try {
      const response = await axios.post("/upload", formData);

      if (response.status === 200) {
        toast.success("File sent successfully!");
      } else {
        toast.error("Failed to send the file.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while sending the file.");
    }
  };

  const handleLogout = async () => {
    try {
        console.log('include')
      const { data } = await logoutUser();
      logout(data);
      navigate("/");
  
      toast.success("Logged out successfully.");
    } catch (e) {
      console.error(e);
      toast.error("Failed to log out. Please try again."); 
    }
  };
  

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative">
      <button
        onClick={handleLogout}
        className="absolute top-4 right-4 px-4 py-2 bg-grey-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Logout
      </button>

      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Secure File Upload
        </h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium">Email:</label>
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Enter recipient email"
              required
              className="mt-1 w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg shadow-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">File:</label>
            <input
              type="file"
              onChange={handleFileChange}
              required
              className="mt-1 w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500 file:bg-blue-500 file:border-none file:text-white file:px-4 file:py-2 file:rounded-lg file:cursor-pointer file:shadow-md hover:file:bg-blue-600"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg shadow-md hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            Send File
          </button>
        </form>
      </div>
    </div>
  );
};

export default HomePage;
