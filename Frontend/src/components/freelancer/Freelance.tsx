import Sidebar from "../homepage/Sidebar";
import FreelancerFeed from "./FreelanceFeed";

const Freelance = () => {
  return (
    <div className="flex flex-col bg-[#393E46] min-h-screen">
      <div className="flex px-30">
        <Sidebar />
        <FreelancerFeed />
      </div>
    </div>
  );
};

export default Freelance;
