import { Outlet, useNavigate } from "react-router-dom";
import Nav from "../navbars/Nav";

const LoginLayout = () => {
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
