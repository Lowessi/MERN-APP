import { Outlet } from "react-router-dom";
import Navbar from "../navbars/Navbar";

const AboutLayout = () => {
  return (
    <div>
      <Navbar />
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default AboutLayout;
