import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Job } from "../../interfaces/Job";
import MiniChatWindow from "../homepage/MiniChatWindow";
import ApplyToJobPopup from "../homepage/ApplyToJobPopup";

const RENDER_URL = import.meta.env.RENDER_URL || "http://localhost:5000";

const JobPreview = () => {
    const { id } = useParams<{ id: string }>();
    const [job, setJob] = useState<Job | null>(null);
    const { token, user: authUser } = useContext(AuthContext) || {};
    const navigate = useNavigate();

    const [chatConversation, setChatConversation] = useState<any | null>(null);
    const [chatOpen, setChatOpen] = useState(false);
    const [showApplyForm, setShowApplyForm] = useState(false);
    const [loading, setLoading] = useState(true);
    const [fetchError, setFetchError] = useState<string | null>(null);

    useEffect(() => {
        if (!token) {
            navigate("/login");
            return;
        }

        const fetchJob = async () => {
            setLoading(true);
            setFetchError(null);
            try {
                const res = await fetch(`${RENDER_URL}/api/jobs/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!res.ok) throw new Error("Failed to fetch job");

                const data: Job = await res.json();
                setJob(data);
            } catch (err) {
                console.error("Error fetching job:", err);
                setFetchError("Failed to load job. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchJob();
    }, [id, token, navigate]);

    const handleMessageClick = async () => {
        if (!authUser || !job?.UserId?._id || !token) return;

        try {
            const res = await fetch(RENDER_URL + "/api/chat/conversation", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`, // added auth header here
                },
                body: JSON.stringify({
                    senderId: authUser.id, // ensure _id used here
                    receiverId: job.UserId._id,
                }),
            });

            if (!res.ok) throw new Error("Failed to start conversation");

            const data = await res.json();
            setChatConversation(data);
            setChatOpen(true);
        } catch (err) {
            console.error("Failed to start conversation:", err);
            alert("Could not start conversation. Please try again later.");
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center mt-10 text-gray-500 text-lg">
                Loading job...
            </div>
        );
    }

    if (fetchError) {
        return (
            <div className="flex justify-center mt-10 text-red-600 text-lg">
                {fetchError}
            </div>
        );
    }

    if (!job) {
        return (
            <div className="flex justify-center mt-10 text-gray-500 text-lg">
                Job not found.
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
                <div className="flex-1 bg-white p-6 rounded-xl border border-gray-300 shadow relative">
                    {/* Header */}
                    <h1 className="text-2xl font-bold text-gray-800 mb-2">
                        {job.Title}
                    </h1>
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
                        <p className="text-sm text-gray-700">
                            {job.Description}
                        </p>
                    </section>

                    {/* Requirements */}
                    <section className="mb-4">
                        <h2 className="text-lg font-semibold text-gray-800 mb-1">
                            Requirements
                        </h2>
                        <p className="text-sm text-gray-700">
                            {job.Requirements}
                        </p>
                    </section>

                    {/* Budget */}
                    <section className="mb-6">
                        <h2 className="text-lg font-semibold text-gray-800 mb-1">
                            Budget
                        </h2>
                        <p className="text-sm text-gray-700">
                            {job.Currency} {job.Budget}
                        </p>
                    </section>

                    {/* Action Buttons */}
                    <div className="flex justify-between gap-4">
                        <div className="flex gap-4">
                            <button
                                disabled={!authUser || !job.UserId}
                                className={`px-4 py-2 rounded transition ${
                                    !authUser || !job.UserId
                                        ? "bg-gray-400 cursor-not-allowed"
                                        : "bg-blue-600 text-white hover:bg-blue-700"
                                }`}
                                onClick={handleMessageClick}
                            >
                                Message
                            </button>

                            <button
                                disabled={
                                    !authUser || authUser.id === job.UserId?._id
                                }
                                className={`px-4 py-2 rounded transition ${
                                    !authUser || authUser.id === job.UserId?._id
                                        ? "bg-gray-400 cursor-not-allowed"
                                        : "bg-green-600 text-white hover:bg-green-700"
                                }`}
                                onClick={() => setShowApplyForm(true)}
                            >
                                Apply
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right-side column */}
                <div className="w-full lg:w-[400px]">
                    {/* Optional side content */}
                </div>

                {/* Mini Chat Window */}
                {chatOpen && chatConversation && authUser && (
                    <div className="fixed bottom-4 right-4 z-50">
                        <MiniChatWindow
                            conversation={chatConversation}
                            currentUserId={authUser.id}
                            onClose={() => setChatOpen(false)}
                        />
                    </div>
                )}

                {/* Apply Form Popup */}
                {showApplyForm && (
                    <ApplyToJobPopup
                        jobId={job._id}
                        onClose={() => setShowApplyForm(false)}
                    />
                )}
            </div>
        </>
    );
};

export default JobPreview;
