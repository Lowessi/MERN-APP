import { Outlet } from "react-router-dom";

const MessagingLayout = () => {
  return (
    <div>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default MessagingLayout;
