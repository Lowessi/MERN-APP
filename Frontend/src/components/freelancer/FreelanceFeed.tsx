import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../../interfaces/User"; // Adjust your User model to match backend
import { AuthContext } from "../../context/AuthContext";

const FreelancerFeed = () => {
  const [freelancers, setFreelancers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { token } = useContext(AuthContext) || {};
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login"); // If no token, redirect to login page
      return;
    }
    fetchFreelancers(); // Load initial list
  }, [token]);

  const fetchFreelancers = async (query = "") => {
    try {
      const url = `http://localhost:5000/api/userauth/search?query=${encodeURIComponent(
        query || "a"
      )}`;

      const res = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`, // Ensure to pass token for authenticated fetch
        },
      });

      if (!res.ok) throw new Error("Failed to fetch freelancers");

      const data: User[] = await res.json();
      console.log(data);
      setFreelancers(data);
    } catch (error) {
      console.error("Error fetching freelancers:", error);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    fetchFreelancers(value); // Fetch on search input
  };

  return (
    <div className="py-5">
      <main className="w-full max-w-4xl mx-auto p-4 rounded-[15px] shadow-sm border bg-white border-gray-300">
        <h2 className="text-xl font-semibold mb-4">Explore top freelancers</h2>

        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-full mb-4 p-2 border rounded"
        />

        <div className="space-y-4">
          {freelancers.length === 0 ? (
            <p>No freelancers found.</p>
          ) : (
            freelancers.map((user) => (
              <div
                key={user._id}
                onClick={() => navigate(`/profile-preview/${user._id}`)} // Navigate to profile preview on click
                className="bg-white w-2xl p-4 rounded shadow-sm border-gray-300 border cursor-pointer hover:shadow-md transition"
              >
                <h3 className="text-green-500 font-medium">
                  {user.name || "Unnamed Freelancer"}
                </h3>
                <p className="text-sm text-gray-700">{user.Email}</p>
                <p className="text-xs text-gray-500">
                  {user.address || "No address provided"}
                </p>
                <p className="text-xs text-gray-500">
                  {user.title || "No title provided"}
                </p>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default FreelancerFeed;
