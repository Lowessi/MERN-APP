import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Job } from "../../interfaces/Job";

const RENDER_URL = import.meta.env.VITE_RENDER_URL || "http://localhost:5000";

const JobFeed = () => {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const { token } = useContext(AuthContext) || {};
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate("/login");
            return;
        }
        fetchJobs();
    }, [token]);

    const fetchJobs = async (query = "") => {
        try {
            const url = query
                ? `${RENDER_URL}/api/jobs/search?query=${encodeURIComponent(
                      query
                  )}`
                : `${RENDER_URL}/api/jobs`;

            const res = await fetch(url, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            if (!res.ok) throw new Error("Failed to fetch jobs");

            const data: Job[] = await res.json();
            setJobs(data.filter((job) => job.status === "Open"));
        } catch (error) {
            console.error("Error fetching jobs:", error);
        }
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchQuery(value);
        fetchJobs(value);
    };

    return (
        <div className="py-5 pl-64 min-h-screen bg-[#393E46] text-[#DED1B6]">
            <main className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 min-w-[350px]">
                <h2 className="text-2xl font-semibold mb-6 text-center sm:text-left text-[#DED1B6]">
                    Top job picks for you
                </h2>

                <input
                    type="text"
                    placeholder="Search for jobs..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="w-full mb-6 p-3 border border-[#948978] rounded-lg bg-[#222831] text-[#DED1B6] placeholder-[#948978] focus:outline-none focus:ring-2 focus:ring-[#948978] transition"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 justify-items-center">
                    {jobs.length === 0 ? (
                        <p className="text-center text-[#948978] col-span-full">
                            No jobs available.
                        </p>
                    ) : (
                        jobs.map((job) => (
                            <div
                                key={job._id}
                                onClick={() =>
                                    navigate(`/job-preview/${job._id}`)
                                }
                                className="bg-[#222831] p-5 rounded-2xl shadow-md hover:shadow-lg hover:-translate-y-1 transition cursor-pointer border border-[#948978] flex flex-col w-full max-w-xs"
                            >
                                <div className="h-28 bg-[#393E46] text-[#948978] rounded-lg mb-3 flex items-center justify-center text-sm border border-[#948978]">
                                    Image
                                </div>

                                <div className="flex justify-between items-center mb-2">
                                    <h3 className="text-lg font-semibold text-[#DED1B6] hover:underline">
                                        {job.Title}
                                    </h3>
                                    <span
                                        className={`text-xs font-semibold px-2 py-1 rounded ${
                                            job.status === "Open"
                                                ? "bg-green-100 text-green-700"
                                                : job.status === "On Work"
                                                ? "bg-yellow-100 text-yellow-700"
                                                : "bg-gray-200 text-gray-700"
                                        }`}
                                    >
                                        {job.status}
                                    </span>
                                </div>

                                <p className="text-sm text-[#DED1B6] break-words mb-1">
                                    {job.UserId?.Email}
                                </p>

                                <p className="text-sm text-[#948978] mb-2 line-clamp-3">
                                    {job.Description}
                                </p>

                                <div className="mt-auto text-sm text-[#DED1B6] space-y-1">
                                    <p>
                                        <strong>Requirements:</strong>{" "}
                                        {job.Requirements}
                                    </p>
                                    <p>
                                        <strong>Budget:</strong>{" "}
                                        {job.Currency || "USD"} {job.Budget}
                                    </p>
                                    <p>
                                        <strong>Deadline:</strong>{" "}
                                        {new Date(
                                            job.Deadline
                                        ).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </main>
        </div>
    );
};

export default JobFeed;
