import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../navbars/Navbar";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";

const AboutLayout = () => {
  const { user } = useContext(AuthContext) || {};
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/home"); // Redirect logged-in users
    }
  }, [user, navigate]);
  return (
    <div>
      <Navbar />
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default AboutLayout;
