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

      if (!res.ok) {
        throw new Error("Failed to fetch jobs");
      }

      const data: Job[] = await res.json();
      setJobs(data);
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
      <main className="w-full max-w-4xl mx-auto p-4 rounded-[15px] shadow-sm border bg-white border-gray-300">
        <h2 className="text-xl font-semibold mb-4">Top job picks for you</h2>

        <input
          type="text"
          placeholder="Search for jobs..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-full mb-4 p-2 border rounded"
        />

        <div className="space-y-4">
          {jobs.length === 0 ? (
            <p>No jobs available.</p>
          ) : (
            jobs.map((job) => (
              <div
                key={job._id}
                onClick={() => navigate(`/job-preview/${job._id}`)}
                className="bg-white w-2xl p-4 rounded shadow-sm border-gray-300 border cursor-pointer hover:bg-gray-50 transition"
              >
                <h3 className="text-green-500 font-medium hover:underline">
                  {job.Title}
                </h3>
                <p className="text-sm">{job.UserId?.Email}</p>
                <p className="text-xs text-gray-500">{job.Description}</p>
                <p className="text-xs text-gray-400 mt-1">
                  Requirements: {job.Requirements}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Budget: ${job.Budget}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Deadline: {new Date(job.Deadline).toLocaleDateString()}
                </p>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default JobFeed;
