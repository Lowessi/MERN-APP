import { useContext } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { AuthContext } from "./context/AuthContext";

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
import Messaging from "./components/homepage/Messaging";
import MyJobs from "./components/homepage/MyJobs";
import EditJob from "./components/homepage/EditJobs";

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
  children: [
    { path: "", element: <Home /> },
    { path: "about", element: <About /> },     // Now accessible as /home/about
    { path: "contact", element: <Contact /> }, // Now accessible as /home/contact
  ],
},

  {
    path: "/my-jobs",
    element: <HomeLayout />,
    children: [{ path: "", element: <MyJobs /> }],
  },
  {
    path: "/edit-jobs/:id", // ✅ correct dynamic route
    element: <HomeLayout />,
    children: [{ path: "", element: <EditJob /> }],
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
  const authContext = useContext(AuthContext);
  const userId = authContext?.user?.id || null;

  // Example of a chat partner, replace with your dynamic logic later

  console.log("Logged-in userId:", userId);

  return (
    <div className="h-screen fle justify-between bg-[#f3f4f6]">
      <ToastContainer />
      <RouterProvider router={router} />

      {/* Show Messaging only if logged in */}
      {userId && <Messaging userId={userId} />}
    </div>
  );
};

export default App;
