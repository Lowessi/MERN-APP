import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Job } from "../../interfaces/Job";

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
        ? `http://localhost:5000/api/jobs/search?query=${encodeURIComponent(
            query
          )}`
        : `http://localhost:5000/api/jobs`;

      const res = await fetch(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!res.ok) throw new Error("Failed to fetch jobs");

      const data: Job[] = await res.json();

      // Only show "Open" jobs
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
    <div className="py-5">
      <main className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 min-w-[350px]">
        <h2 className="text-2xl font-semibold mb-6 text-center sm:text-left">
          Top job picks for you
        </h2>

        <input
          type="text"
          placeholder="Search for jobs..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-full mb-6 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.length === 0 ? (
            <p className="text-center text-gray-500 col-span-full">
              No jobs available.
            </p>
          ) : (
            jobs.map((job) => (
              <div
                key={job._id}
                onClick={() => navigate(`/job-preview/${job._id}`)}
                className="bg-white p-5 rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition cursor-pointer border border-gray-200 flex flex-col"
              >
                {/* Placeholder image */}
                <div className="h-28 bg-gray-100 rounded-lg mb-3 flex items-center justify-center text-gray-400 text-sm">
                  Image
                </div>

                {/* Title + Status badge */}
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-semibold text-green-600 hover:underline">
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

                <p className="text-sm text-gray-700 break-words mb-1">
                  {job.UserId?.Email}
                </p>

                <p className="text-sm text-gray-500 mb-2 line-clamp-3">
                  {job.Description}
                </p>

                <div className="mt-auto text-sm text-gray-600 space-y-1">
                  <p>
                    <strong>Requirements:</strong> {job.Requirements}
                  </p>
                  <p>
                    <strong>Budget:</strong> {job.Currency || "USD"}{" "}
                    {job.Budget}
                  </p>
                  <p>
                    <strong>Deadline:</strong>{" "}
                    {new Date(job.Deadline).toLocaleDateString()}
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
