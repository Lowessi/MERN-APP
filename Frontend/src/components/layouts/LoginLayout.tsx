import { Outlet } from "react-router-dom";
import Nav from "../navbars/Nav";
import Footer from "../footer/Footer";

const LoginLayout = () => {
  return (
    <div className="bg-[##393E46]">
      <Nav />
      <div>
        <Outlet />
      </div>
      <Footer></Footer>
    </div>
  );
};

export default LoginLayout;
