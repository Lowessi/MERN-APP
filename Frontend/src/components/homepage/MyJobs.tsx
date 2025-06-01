import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

type JobType = {
  _id: string;
  Title: string;
  Description: string;
  Budget: number;
  Deadline: string;
  createdAt: string;
};

const MyJobs = () => {
  const { token } = useContext(AuthContext) || {};
  const [jobs, setJobs] = useState<JobType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const fetchMyJobs = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/jobs/my", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to fetch jobs");
      const data = await res.json();
      setJobs(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;
    try {
      const res = await fetch(`http://localhost:5000/api/jobs/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to delete job");
      setJobs((prev) => prev.filter((job) => job._id !== id));
    } catch (err) {
      alert("Error deleting job");
    }
  };

  useEffect(() => {
    if (token) fetchMyJobs();
  }, [token]);

  if (loading) return <div>Loading your jobs...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">My Posted Jobs</h2>
      {jobs.length === 0 ? (
        <p>You haven't posted any jobs yet.</p>
      ) : (
        <ul className="space-y-4">
          {jobs.map((job) => (
            <li key={job._id} className="p-4 border rounded-lg shadow">
              <h3 className="text-lg font-semibold">{job.Title}</h3>
              <p className="text-gray-600">{job.Description}</p>
              <p className="text-sm">Budget: ${job.Budget}</p>
              <p className="text-sm">
                Deadline: {new Date(job.Deadline).toLocaleDateString()}
              </p>
              <div className="mt-2 space-x-2">
                <button
                  onClick={() => navigate(`/edit-jobs/${job._id}`)}
                  className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(job._id)}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyJobs;
