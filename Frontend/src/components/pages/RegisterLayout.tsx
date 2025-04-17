import { Outlet } from "react-router-dom";
import Nav from "../Nav";

const RegisterLayout = () => {
  return (
    <div className="bg-[#f3f4f6]">
      <Nav />
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default RegisterLayout;
