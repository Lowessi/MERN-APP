import { Outlet } from "react-router-dom";
import Footer from "../footer/Footer";

const MessagingLayout = () => {
  return (
    <div>
      <div>
        <Outlet />
      </div>
      <Footer></Footer>
    </div>
  );
};

export default MessagingLayout;
