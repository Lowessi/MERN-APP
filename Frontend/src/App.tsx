import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Login from "./components/pages/auth/Login";
import Register from "./components/pages/auth/Register";
import RegisterLayout from "./components/layouts/RegisterLayout";
import LandingLayout from "./components/layouts/LandingLayout";
import Landing from "./components/Landing";
import Contact from "./components/Contact";
import About from "./components/About";
import HomeLayout from "./components/layouts/HomeLayout";
import Home from "./components/homepage/Home";
import PostLayout from "./components/layouts/PostLayout";
import PostJob from "./components/PostJob";
import ProfileLayout from "./components/layouts/PreviewLayout";
import FreelanceLayout from "./components/layouts/FreelanceLayout";
import Freelance from "./components/freelancer/Freelance";

import ProfilePreview from "./components/editprofile/ProfilePreview";
import EditProfile from "./components/editprofile/EditProfile";
import PreviewLayout from "./components/layouts/PreviewLayout";
import JobPreview from "./components/homepage/JobPreview";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingLayout />,
    children: [{ path: "/", element: <Landing /> }],
  },
  {
    path: "/login",
    element: <RegisterLayout />,
    children: [{ path: "", element: <Login /> }],
  },
  {
    path: "/register",
    element: <RegisterLayout />,
    children: [{ path: "", element: <Register /> }],
  },
  {
    path: "/contact",
    element: <LandingLayout />,
    children: [{ path: "", element: <Contact /> }],
  },
  {
    path: "/about",
    element: <LandingLayout />,
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
    element: <PreviewLayout />,
    children: [{ path: "", element: <ProfilePreview /> }],
  },
  {
    path: "/job-preview/:id",
    element: <PreviewLayout />,
    children: [{ path: "", element: <JobPreview /> }],
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

const App = () => {
  return (
    <div className="min-h-screen">
      <ToastContainer />
      <RouterProvider router={router} />
      {/* Global Chat Popup Component */}
      {/* <- Ensure withUserId is optional in Messaging component */}
    </div>
  );
};

export default App;
