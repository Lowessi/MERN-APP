import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import JobFeed from "./JobFeed";
import Sidebar from "./Sidebar";
import { getProfile } from "../../api/Profile";

const Home = () => {
  const { token, user } = useContext(AuthContext) || {};
  const navigate = useNavigate();

  const fetchProfile = async (userId: string, token: string) => {
    try {
      const profile = await getProfile(userId, token);
      console.log("Fetched profile:", profile);
    } catch (error: any) {
      console.error("Error fetching profile in Home.tsx:", error.message);
      navigate("/edit-profile");
    }
  };

  // useEffect(() => {
  //   if (!user) return;

  //   socket.emit("user-connected", user?.id);

  //   socket.on("receive-message", (message) => {
  //     console.log("Message received:", message);
  //   });

  //   return () => {
  //     socket.off("receive-message");
  //   };
  // }, [user]);

  useEffect(() => {
    if (!user || !token) {
      navigate("/login");
      return;
    }

    fetchProfile(user.id, token);
  }, [user, token, navigate]);

  if (!user || !token) {
    return <div>Redirecting to login...</div>;
  }

  return (
    <div className="flex flex-col bg-[#f3f4f6] min-h-screen">
      <div className="flex px-30">
        <Sidebar />
        <JobFeed />
        {/* <Messaging /> */}
      </div>
    </div>
  );
};

export default Home;
