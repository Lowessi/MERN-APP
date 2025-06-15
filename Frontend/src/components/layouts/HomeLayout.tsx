import { Outlet, useNavigate } from "react-router-dom";
import HomeNavbar from "../navbars/HomeNavbar";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import Footer from "../footer/Footer";

const HomeLayout = () => {
  const { user } = useContext(AuthContext) || {};
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login"); // Redirect logged-in users
    }
  }, [user, navigate]);
  return (
    <div className="h-screen flex flex-col justify-between  bg-[#393E46]">
      <HomeNavbar />{" "}
      <div>
        <Outlet />
      </div>
      <Footer></Footer>
    </div>
  );
};

export default HomeLayout;
