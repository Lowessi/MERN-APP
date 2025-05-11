import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

type ProfileType = {
  name: string;
  title: string;
  location: string;
};

const Sidebar = () => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const user = auth?.user;
  const token = auth?.token;
  const signOut = auth?.signOut;

  const [profile, setProfile] = useState<ProfileType | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const data = await res.json();
          setProfile({
            name: data.name,
            title: data.title,
            location: data.location,
          });
        }
      } catch (err) {
        console.error("Failed to load profile:", err);
      }
    };

    if (token) fetchProfile();
  }, [token]);

  if (!user) {
    return <div>Loading...</div>;
  }

  const handleSignOut = () => {
    if (signOut) signOut();
  };

  return (
    <div className="px-5 py-5 sticky top-0">
      <aside className="w-60 h-100 p-4 bg-white shadow-sm border border-gray-300 rounded-[15px]">
        <div className="bg-green-100 rounded-lg p-4 mb-4 text-center">
          <div className="text-4xl font-bold text-green-600">W</div>
          <p className="mt-2 font-semibold">{profile?.name}</p>
          <p className="text-sm text-gray-500">{user.email}</p>
          <p className="text-sm text-gray-500">{profile?.title || "—"}</p>
          <p className="text-xs text-gray-400">{profile?.location || "—"}</p>
        </div>

        <div className="flex flex-col space-y-2 text-sm">
          <Link
            to="/edit-profile"
            className="text-black hover:text-gray-500 hover:underline"
          >
            Profile
          </Link>
          <Link
            to="/my-jobs"
            className="text-black hover:text-gray-500 hover:underline"
          >
            My Jobs
          </Link>
          <Link to="/login">
            <button
              onClick={handleSignOut}
              className=" text-black hover:text-gray-500 hover:underline"
            >
              Sign Out
            </button>
          </Link>
        </div>

        <button
          className="mt-6 text-green-700 hover:underline text-sm"
          onClick={() => navigate("/post-job")}
        >
          + Post a free job
        </button>
      </aside>
    </div>
  );
};

export default Sidebar;
