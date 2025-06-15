import { Outlet } from "react-router-dom";
import HomeNavbar from "../navbars/HomeNavbar";
import Footer from "../footer/Footer";

const PreviewLayout = () => {
  return (
    <div className="h-screen flex flex-col justify-between  bg-[#393E46]">
      <div>
        <HomeNavbar></HomeNavbar>
        <Outlet />
      </div>
      <Footer></Footer>
    </div>
  );
};

export default PreviewLayout;
