import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Setup2FA from "./pages/Setup2FA";
import Verify2FA from "./pages/Verify2FA";
import HomePage from "./pages/HomePage";
import { RouterProvider } from "react-router-dom";
import router from "./routes";
import "./index.css";
import { ToastContainer } from "react-toastify";
import { SessionProvider } from "./context/SessionContext";

const App = () => {
  return (
    <div>
      <div>
        <SessionProvider>
          <ToastContainer />
          <RouterProvider router={router} />
        </SessionProvider>
      </div>
    </div>
  );
};

export default App;
