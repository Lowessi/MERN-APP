import { Outlet } from "react-router-dom";
import HomeNavbar from "../navbars/HomeNavbar";

const HomeLayout = () => {
  return (
    <div>
      <HomeNavbar />
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default HomeLayout;
