import { Outlet } from "react-router-dom";
import HomeNavbar from "../navbars/HomeNavbar";
import Footer from "../footer/Footer";

const FreelanceLayout = () => {
  return (
    <div>
      {" "}
      <div className="h-screen flex flex-col justify-between  bg-[#393E46]">
        <HomeNavbar />
        <div>
          <Outlet />
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default FreelanceLayout;
