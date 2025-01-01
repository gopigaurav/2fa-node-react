import { createBrowserRouter } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Error from "./pages/Error";
import HomePage from "./pages/HomePage";
import Setup2FA from "./pages/Setup2FA";
import Verify2FA from "./pages/Verify2FA";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute"; // Import the PublicRoute component

const router = createBrowserRouter([
  // {
  //   path: "/login",
  //   element: <PublicRoute />, // Apply PublicRoute for login
  //   children: [
  //     {
  //       path: "/login",
  //       element: <LoginPage />,
  //       errorElement: <Error />,
  //     },
  //   ],
  // },
  {
    path: "/login",
    element: <LoginPage />,
    errorElement: <Error />,
  },
  {
    path: "/",
    element: <ProtectedRoute />, // Apply ProtectedRoute for protected routes
    children: [
      {
        path: "/",
        element: <HomePage />,
        errorElement: <Error />,
      },
      {
        path: "/setup-2fa",
        element: <Setup2FA />,
        errorElement: <Error />,
      },
      {
        path: "/verify-2fa",
        element: <Verify2FA />,
        errorElement: <Error />,
      },
    ],
  },
]);

export default router;
