import { Outlet, useNavigate } from "react-router-dom";
import Nav from "../navbars/Nav";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import Footer from "../footer/Footer";

const RegisterLayout = () => {
  const { user } = useContext(AuthContext) || {};
  const navigate = useNavigate();

  useEffect(() => {
    // If user is logged in, redirect to home page
    if (user) {
      navigate("/home");
    }
  }, [user, navigate]);

  return (
    <div className="h-screen flex flex-col justify-between  bg-[#f3f4f6]">
      <Nav />
      <div>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default RegisterLayout;
