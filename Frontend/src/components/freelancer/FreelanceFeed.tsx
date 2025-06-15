import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../../interfaces/User";
import { AuthContext } from "../../context/AuthContext";

const RENDER_URL = import.meta.env.RENDER_URL || "http://localhost:5000";

const FreelancerFeed = () => {
    const [freelancers, setFreelancers] = useState<User[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const { token } = useContext(AuthContext) || {};
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate("/login");
            return;
        }
        fetchFreelancers();
    }, [token]);

    const fetchFreelancers = async (query = "") => {
        try {
            const url = `${RENDER_URL}/api/userauth/search?query=${encodeURIComponent(
                query || "a"
            )}`;

            const res = await fetch(url, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!res.ok) throw new Error("Failed to fetch freelancers");

            const data: User[] = await res.json();
            setFreelancers(data);
        } catch (error) {
            console.error("Error fetching freelancers:", error);
        }
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchQuery(value);
        fetchFreelancers(value);
    };

    return (
        <div className="py-5 pl-64 min-h-screen bg-[#393E46] text-[#DED1B6]">
            <main className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 min-w-[350px]">
                <h2 className="text-2xl font-semibold mb-6 text-center sm:text-left text-[#DED1B6]">
                    Explore top freelancers
                </h2>

                <input
                    type="text"
                    placeholder="Search by name or email..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="w-full mb-6 p-3 border border-[#948978] rounded-lg bg-[#222831] text-[#DED1B6] placeholder-[#948978] focus:outline-none focus:ring-2 focus:ring-[#948978] transition"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 justify-items-center">
                    {freelancers.length === 0 ? (
                        <p className="text-center text-[#948978] col-span-full">
                            No freelancers found.
                        </p>
                    ) : (
                        freelancers.slice(0, 25).map((user) => (
                            <div
                                key={user._id}
                                onClick={() =>
                                    navigate(`/profile-preview/${user._id}`)
                                }
                                className="bg-[#222831] p-5 rounded-2xl shadow-md hover:shadow-lg hover:-translate-y-1 transition cursor-pointer border border-[#948978] flex flex-col items-center text-center min-h-[300px] w-full max-w-xs"
                            >
                                <div className="h-24 w-24 sm:h-28 sm:w-28 bg-[#393E46] border border-[#948978] rounded-full mb-4 flex items-center justify-center text-sm text-[#948978]">
                                    Avatar
                                </div>

                                <h3 className="text-lg font-semibold text-[#DED1B6] hover:underline mb-1">
                                    {user.name || "Unnamed Freelancer"}
                                </h3>

                                <p className="text-sm text-[#DED1B6] break-words mb-1">
                                    {user.Email}
                                </p>

                                <p className="text-sm text-[#948978]">
                                    {user.address || "No address provided"}
                                </p>

                                <p className="text-sm text-[#948978] mt-1">
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
