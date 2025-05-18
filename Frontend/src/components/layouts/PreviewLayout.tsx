import { Outlet } from "react-router-dom";

const PreviewLayout = () => {
  return (
    <div>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default PreviewLayout;
