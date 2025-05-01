import { Outlet, useNavigate } from "react-router-dom";
import Nav from "../navbars/Nav";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";

const LoginLayout = () => {
  const { user } = useContext(AuthContext) || {};
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/home"); // Redirect logged-in users
    }
  }, [user, navigate]);
  return (
    <div className="bg-[#f3f4f6]">
      <Nav />
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default LoginLayout;
