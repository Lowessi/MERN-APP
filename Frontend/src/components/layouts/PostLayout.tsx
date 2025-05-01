import { Outlet, useNavigate } from "react-router-dom";
import HomeNavbar from "../navbars/HomeNavbar";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";

const PostLayout = () => {
  const { user } = useContext(AuthContext) || {};
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login"); // Redirect logged-in users
    }
  }, [user, navigate]);
  return (
    <div>
      <HomeNavbar />
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default PostLayout;
