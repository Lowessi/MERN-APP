import { Outlet } from "react-router-dom";

const ProfileLayout = () => {
  return (
    <div>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default ProfileLayout;
