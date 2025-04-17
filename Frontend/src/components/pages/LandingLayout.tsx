import { Outlet } from "react-router-dom";
import Navbar from "../Navbar";

const LandingLayout = () => {
  return (
    <div className=" bg-green-50">
      <Navbar />

      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default LandingLayout;
