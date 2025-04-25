import { Outlet } from "react-router-dom";
import Navbar from "../navbars/Navbar";

const LandingLayout = () => {
  return (
    <div className=" ">
      <Navbar />

      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default LandingLayout;
