import { Outlet } from "react-router-dom";
import HomeNavbar from "../navbars/HomeNavbar";

const PreviewLayout = () => {
  return (
    <div>
      <div>
        <HomeNavbar></HomeNavbar>
        <Outlet />
      </div>
    </div>
  );
};

export default PreviewLayout;
