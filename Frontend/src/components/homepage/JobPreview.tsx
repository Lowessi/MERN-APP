import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Job } from "../../interfaces/Job";
import JobFeed from "./JobFeed";
import Messaging from "./Messaging";

const JobPreview = () => {
  const { id } = useParams<{ id: string }>();
  const [job, setJob] = useState<Job | null>(null);
  const { token } = useContext(AuthContext) || {};
  const navigate = useNavigate();
  const [showMessageCard, setShowMessageCard] = useState(false);

  function showMessage() {
    setShowMessageCard((prev) => !prev);
  }

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchJob = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/jobs/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch job");

        const data: Job = await res.json();
        setJob(data);
      } catch (err) {
        console.error("Error fetching job:", err);
      }
    };

    fetchJob();
  }, [id, token, navigate]);

  if (!job) {
    return (
      <div className="flex justify-center mt-10 text-gray-500 text-lg">
        Loading job...
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row gap-6 max-w-7xl mx-auto mt-6 p-4">
      {/* Main Job Preview */}
      <div className="flex-1 bg-white p-6 rounded-xl border border-gray-300 shadow">
        {/* Header */}
        <h1 className="text-2xl font-bold text-gray-800 mb-2">{job.Title}</h1>
        <p className="text-sm text-gray-500 mb-1">
          Posted by: {job.UserId?.Email || "Unknown"}
        </p>
        <p className="text-sm text-gray-400 mb-4">
          Deadline: {new Date(job.Deadline).toLocaleDateString()}
        </p>

        {/* Description */}
        <section className="mb-4">
          <h2 className="text-lg font-semibold text-gray-800 mb-1">
            Description
          </h2>
          <p className="text-sm text-gray-700">{job.Description}</p>
        </section>

        {/* Requirements */}
        <section className="mb-4">
          <h2 className="text-lg font-semibold text-gray-800 mb-1">
            Requirements
          </h2>
          <p className="text-sm text-gray-700">{job.Requirements}</p>
        </section>

        {/* Budget */}
        <section className="mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-1">Budget</h2>
          <p className="text-sm text-gray-700">${job.Budget}</p>
        </section>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
            onClick={() => alert("Apply feature coming soon")}
          >
            Apply
          </button>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            onClick={showMessage}
          >
            Message
          </button>
        </div>
      </div>

      {/* Right-side Job Feed */}
      <div className="w-full lg:w-[400px]">
        {showMessageCard && (
          <div>
            <Messaging recipientId={job.UserId?._id} />
          </div>
        )}

        {/* <JobFeed /> */}
      </div>
    </div>
  );
};

export default JobPreview;
