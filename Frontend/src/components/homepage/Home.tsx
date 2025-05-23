import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext"; // Adjust the path as needed
import JobFeed from "./JobFeed";
import Sidebar from "./Sidebar";
import { getProfile } from "../../api/Profile";

const Home = () => {
  const { token, user } = useContext(AuthContext) || {}; // ✅ grab user from AuthContext
  const navigate = useNavigate();

  const fetchProfile = async (userId: string, token: string) => {
    try {
      const profile = await getProfile(userId, token);
      console.log("Fetched profile:", profile);
    } catch (error: any) {
      console.error("Error fetching profile in Home.tsx:", error.message);
      navigate("/edit-profile"); // Redirect to edit profile page
      // Show UI error, redirect, etc.
    }
  };

  useEffect(() => {
    // If there is no user, redirect to login page
    if (!user || !token) {
      navigate("/login"); // Or you can redirect to /signin or whatever page you want
      return;
    }

    // fetchProfile(user.id, token);

    // console.log(profile);
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
      </div>
    </div>
  );
};

export default Home;
