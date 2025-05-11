import { Outlet } from "react-router-dom";
import HomeNavbar from "../navbars/HomeNavbar";

const FreelanceLayout = () => {
  return (
    <div>
      {" "}
      <div>
        <HomeNavbar />
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default FreelanceLayout;
