import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../navbars/Navbar";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import Footer from "../footer/Footer";

const LandingLayout = () => {
  const { user } = useContext(AuthContext) || {};
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/home"); // Redirect logged-in users
    }
  }, [user, navigate]);
  return (
    <div className="h-screen flex flex-col justify-between  bg-[#393E46]">
      <Navbar />

      <div>
        <Outlet />
      </div>
      <Footer></Footer>
    </div>
  );
};

export default LandingLayout;
