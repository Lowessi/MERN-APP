import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Login from "./components/pages/auth/Login";
import Register from "./components/pages/auth/Register";
import LoginLayout from "./components/pages/LoginLayout";
import RegisterLayout from "./components/pages/RegisterLayout";
import LandingLayout from "./components/pages/LandingLayout";
import Landing from "./components/Landing";
import ContactLayout from "./components/pages/ContactLayout";
import Contact from "./components/Contact";
import AboutLayout from "./components/pages/AboutLayout";
import About from "./components/About";

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
  {
    path: "/contact",
    element: <ContactLayout />,
    children: [{ path: "", element: <Contact /> }],
  },
  {
    path: "/about",
    element: <AboutLayout />,
    children: [{ path: "", element: <About /> }],
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
