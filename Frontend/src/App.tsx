import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext"; // Import AuthContext to access user data
import Login from "./components/pages/auth/Login";
import Register from "./components/pages/auth/Register";
import LoginLayout from "./components/layouts/LoginLayout";
import RegisterLayout from "./components/layouts/RegisterLayout";
import LandingLayout from "./components/layouts/LandingLayout";
import Landing from "./components/Landing";
import ContactLayout from "./components/layouts/ContactLayout";
import Contact from "./components/Contact";
import AboutLayout from "./components/layouts/AboutLayout";
import About from "./components/About";
import HomeLayout from "./components/layouts/HomeLayout";
import Home from "./components/homepage/Home";
import PostLayout from "./components/layouts/PostLayout";
import PostJob from "./components/PostJob";
import Footer from "./components/footer/Footer";

const App = () => {
  const { user } = useContext(AuthContext) || {}; // Get user from context (fallback to empty object)

  const router = createBrowserRouter([
    {
      path: "/",
      element: user ? <Navigate to="/home" /> : <LandingLayout />, // Redirect logged-in users to /home
      children: [
        { path: "/", element: user ? <Navigate to="/home" /> : <Landing /> },
      ],
    },
    {
      path: "/login",
      element: user ? <Navigate to="/home" /> : <LoginLayout />, // Redirect logged-in users to /home
      children: [
        { path: "", element: user ? <Navigate to="/home" /> : <Login /> },
      ],
    },
    {
      path: "/register",
      element: user ? <Navigate to="/home" /> : <RegisterLayout />, // Redirect logged-in users to /home
      children: [
        { path: "", element: user ? <Navigate to="/home" /> : <Register /> },
      ],
    },
    {
      path: "/contact",
      element: user ? <Navigate to="/home" /> : <ContactLayout />, // Redirect logged-in users to /home
      children: [
        { path: "", element: user ? <Navigate to="/home" /> : <Contact /> },
      ],
    },
    {
      path: "/about",
      element: user ? <Navigate to="/home" /> : <AboutLayout />, // Redirect logged-in users to /home
      children: [
        { path: "", element: user ? <Navigate to="/home" /> : <About /> },
      ],
    },
    {
      path: "/home",
      element: <HomeLayout />,
      children: [{ path: "", element: <Home /> }],
    },
    {
      path: "/post-job",
      element: <PostLayout />,
      children: [{ path: "", element: <PostJob /> }],
    },
  ]);

  return (
    <>
      <ToastContainer />
      <RouterProvider router={router} />
      <Footer />
    </>
  );
};

export default App;
