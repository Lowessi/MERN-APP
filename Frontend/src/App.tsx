import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Login from "./components/pages/auth/Login";
import Register from "./components/pages/auth/Register";
import LoginLayout from "./components/pages/LoginLayout";
import RegisterLayout from "./components/pages/RegisterLayout";
import LandingLayout from "./components/pages/LandingLayout";
import Landing from "./components/Landing";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingLayout />,
    children: [{ path: "/", element: <Landing /> }],
  },
  {
    path: "/login",
    element: <LoginLayout />,
    children: [{ path: "", element: <Login /> }],
  },
  {
    path: "/register",
    element: <RegisterLayout />,
    children: [{ path: "", element: <Register /> }],
  },
]);

function App() {
  return (
    <>
      <ToastContainer />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
