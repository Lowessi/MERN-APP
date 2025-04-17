import { Outlet } from "react-router-dom";

const LoginLayout = () => {
  return (
    <div className="">
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default LoginLayout;
