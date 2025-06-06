import { Outlet } from "react-router-dom";
import HomeNavbar from "../navbars/HomeNavbar";
import Footer from "../footer/Footer";

const PreviewLayout = () => {
  return (
    <div>
      <div>
        <HomeNavbar></HomeNavbar>
        <Outlet />
      </div>
      <Footer></Footer>
    </div>
  );
};

export default PreviewLayout;
