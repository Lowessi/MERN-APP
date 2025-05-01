import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../navbars/Navbar";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";

const LandingLayout = () => {
  const { user } = useContext(AuthContext) || {};
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/home"); // Redirect logged-in users
    }
  }, [user, navigate]);
  return (
    <div className=" ">
      <Navbar />

      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default LandingLayout;
