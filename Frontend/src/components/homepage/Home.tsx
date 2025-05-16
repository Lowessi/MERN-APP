import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext"; // Adjust the path as needed
import JobFeed from "./JobFeed";
import Sidebar from "./Sidebar";
import Messaging from "./Messaging";

const Home = () => {
  const { user } = useContext(AuthContext) || {}; // Get user from context (fallback to empty object)
  const navigate = useNavigate();

  useEffect(() => {
    // If there is no user, redirect to login page
    if (!user) {
      navigate("/login"); // Or you can redirect to /signin or whatever page you want
    }
  }, [user, navigate]); // Run effect when user changes

  if (!user) {
    // Optionally, you can return a loading spinner or message while checking for user
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col bg-[#f3f4f6] min-h-screen">
      <div className="flex px-30">
        <Sidebar />
        <JobFeed />
        <Messaging />
      </div>
    </div>
  );
};

export default Home;
