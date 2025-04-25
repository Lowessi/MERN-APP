import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
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
import EditProfile from "./components/editprofile/EditProfile";

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
  {
    path: "/edit-profile",
    element: <ProfileLayout />,
    children: [{ path: "", element: <EditProfile /> }],
  },
]);

function App() {
  return (
    <>
      <ToastContainer />
      <RouterProvider router={router} />
      <Footer />
    </>
  );
}

export default App;
