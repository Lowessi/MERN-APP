import JobFeed from "./JobFeed";
import Sidebar from "./Sidebar";

const Home = () => {
  return (
    <div className="flex flex-col bg-[#f3f4f6] min-h-screen">
      <div className="flex px-30">
        <Sidebar />
        <JobFeed />
      </div>
    </div>
  );
};

export default Home;
