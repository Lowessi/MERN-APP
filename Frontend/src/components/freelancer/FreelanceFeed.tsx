import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../../interfaces/User"; // Adjust your User model to match backend
import { AuthContext } from "../../context/AuthContext";

const RENDER_URL = import.meta.env.RENDER_URL || "http://localhost:5000";

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
            const url = `${RENDER_URL}/api/userauth/search?query=${encodeURIComponent(
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
            <main className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 min-w-[350px]">
                <h2 className="text-2xl font-semibold mb-6 text-center sm:text-left">
                    Explore top freelancers
                </h2>

                <input
                    type="text"
                    placeholder="Search by name or email..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="w-full mb-6 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {freelancers.length === 0 ? (
                        <p className="text-center text-gray-500 col-span-full">
                            No freelancers found.
                        </p>
                    ) : (
                        freelancers.map((user) => (
                            <div
                                key={user._id}
                                onClick={() =>
                                    navigate(`/profile-preview/${user._id}`)
                                }
                                className="bg-white p-5 rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition cursor-pointer border border-gray-200 flex flex-col items-center text-center min-h-[300px]"
                            >
                                {/* Avatar or placeholder */}
                                <div className="h-24 w-24 sm:h-28 sm:w-28 bg-gray-100 rounded-full mb-4 flex items-center justify-center text-sm text-gray-400">
                                    Avatar
                                </div>

                                <h3 className="text-lg font-semibold text-green-600 hover:underline mb-1">
                                    {user.name || "Unnamed Freelancer"}
                                </h3>

                                <p className="text-sm text-gray-700 break-words mb-1">
                                    {user.Email}
                                </p>

                                <p className="text-sm text-gray-500">
                                    {user.address || "No address provided"}
                                </p>

                                <p className="text-sm text-gray-500 mt-1">
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
