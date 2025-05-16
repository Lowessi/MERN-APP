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
import ProfileLayout from "./components/layouts/ProfileLayout";
import FreelanceLayout from "./components/layouts/FreelanceLayout";
import Freelance from "./components/freelancer/Freelance";

import ProfilePreview from "./components/editprofile/ProfilePreview";
import EditProfile from "./components/editprofile/EditProfile";

const App = () => {
  const { user } = useContext(AuthContext) || {}; // Get user from context (fallback to empty object)

  const router = createBrowserRouter([
    {
      path: "/",
      element: <LandingLayout />, // Redirect logged-in users to /home
      children: [{ path: "/", element: <Landing /> }],
    },
    {
      path: "/login",
      element: <LoginLayout />, // Redirect logged-in users to /home
      children: [{ path: "", element: <Login /> }],
    },
    {
      path: "/register",
      element: <RegisterLayout />, // Redirect logged-in users to /home
      children: [{ path: "", element: <Register /> }],
    },
    {
      path: "/contact",
      element: <ContactLayout />, // Redirect logged-in users to /home
      children: [{ path: "", element: <Contact /> }],
    },
    {
      path: "/about",
      element: <AboutLayout />, // Redirect logged-in users to /home
      children: [{ path: "", element: <About /> }],
    },
    {
      path: "/home",
      element: <HomeLayout />,
      children: [{ path: "", element: <Home /> }],
    },
    {
      path: "/edit-profile",
      element: <ProfileLayout />,
      children: [{ path: "", element: <EditProfile /> }],
    },
    {
      path: "/post-job",
      element: <PostLayout />,
      children: [{ path: "", element: <PostJob /> }],
    },
    {
      path: "/profile-preview",
      element: <ProfileLayout />,
      children: [{ path: "", element: <ProfilePreview /> }],
    },
    {
      path: "/profile-preview/:id",
      element: <ProfileLayout />,
      children: [{ path: "", element: <ProfilePreview /> }],
    },
    {
      path: "/freelancer",
      element: <FreelanceLayout />,
      children: [{ path: "", element: <Freelance /> }],
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
