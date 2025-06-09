import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Job } from "../../interfaces/Job";
import MiniChatWindow from "../homepage/MiniChatWindow"; // ✅ import mini chat window

const JobPreview = () => {
  const { id } = useParams<{ id: string }>();
  const [job, setJob] = useState<Job | null>(null);
  const { token, user: authUser } = useContext(AuthContext) || {};
  const navigate = useNavigate();

  const [chatConversation, setChatConversation] = useState<any | null>(null);
  const [chatOpen, setChatOpen] = useState(false);

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

  const handleMessageClick = async () => {
    if (!authUser || !job?.UserId?._id) return;

    try {
      const res = await fetch("http://localhost:5000/api/chat/conversation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          senderId: authUser.id,
          receiverId: job.UserId._id,
        }),
      });

      const data = await res.json();
      setChatConversation(data);
      setChatOpen(true);
    } catch (err) {
      console.error("Failed to start conversation:", err);
    }
  };

  if (!job) {
    return (
      <div className="flex justify-center mt-10 text-gray-500 text-lg">
        Loading job...
      </div>
    );
  }

  return (
    <>
      {/* Back button */}
      <div className="max-w-7xl mx-auto px-4 mt-4 flex justify-start">
        <button
          onClick={() => navigate(-1)}
          className="text-sm text-gray-600 border border-gray-300 px-3 py-1 rounded hover:bg-gray-100 transition"
        >
          ← Back
        </button>
      </div>

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
            <p className="text-sm text-gray-700">
              {job.Currency} {job.Budget}
            </p>
          </section>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              onClick={handleMessageClick}
            >
              Message
            </button>
          </div>
        </div>

        {/* Right-side column (optional job feed or other features) */}
        <div className="w-full lg:w-[400px]">
          {/* You can re-enable JobFeed if needed */}
          {/* <JobFeed /> */}
        </div>

        {/* ✅ Mini Chat Window */}
        {chatOpen && chatConversation && authUser && (
          <div className="fixed bottom-4 right-4 z-50">
            <MiniChatWindow
              conversation={chatConversation}
              currentUserId={authUser.id}
              onClose={() => setChatOpen(false)}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default JobPreview;
