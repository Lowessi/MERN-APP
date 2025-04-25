import { Outlet } from "react-router-dom";
import Navbar from "../navbars/Navbar";

const ContactLayout = () => {
  return (
    <div>
      <Navbar />
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default ContactLayout;
