import { Outlet } from "react-router-dom";
import Navbar from "../Navbar";

const LandingLayout = () => {
  return (
    <div>
      <Navbar />

      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default LandingLayout;
