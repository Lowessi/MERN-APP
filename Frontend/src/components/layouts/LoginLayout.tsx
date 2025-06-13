import { Outlet } from "react-router-dom";
import Nav from "../navbars/Nav";
import Footer from "../footer/Footer";

const LoginLayout = () => {
  return (
    <div className="bg-[#f3f4f6]">
      <Nav />
      <div>
        <Outlet />
      </div>
      <Footer></Footer>
    </div>
  );
};

export default LoginLayout;
