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
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    senderId: authUser.id,
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
            <div className="flex justify-center mt-10 text-[#DED1B6] text-lg">
                Loading job...
            </div>
        );
    }

    if (fetchError) {
        return (
            <div className="flex justify-center mt-10 text-red-500 text-lg">
                {fetchError}
            </div>
        );
    }

    if (!job) {
        return (
            <div className="flex justify-center mt-10 text-[#DED1B6] text-lg">
                Job not found.
            </div>
        );
    }

    return (
        <div className="bg-[#393E46] min-h-screen text-[#DED1B6] py-6 px-4">
            <div className="max-w-6xl mx-auto flex flex-col lg:flex-row-reverse gap-6">
                {/* Right Panel - Summary */}
                <div className="w-full lg:w-[380px] bg-[#393E46] p-6 rounded-xl border border-[#948978] shadow-md">
                    <h2 className="text-xl font-bold mb-4">Job Summary</h2>
                    <p className="text-sm mb-2">
                        <span className="font-semibold">Budget:</span> {job.Currency} {job.Budget}
                    </p>
                    <p className="text-sm mb-2">
                        <span className="font-semibold">Deadline:</span>{" "}
                        {new Date(job.Deadline).toLocaleDateString()}
                    </p>
                    <p className="text-sm">
                        <span className="font-semibold">Posted by:</span> {job.UserId?.Email || "Unknown"}
                    </p>
                </div>

                {/* Main Job Preview Panel */}
                <div className="flex-1 bg-[#1E222B] border border-[#948978] p-6 rounded-xl shadow-md">
                    <button
                        onClick={() => navigate(-1)}
                        className="text-sm border border-[#948978] px-3 py-1 rounded hover:bg-[#343941] transition mb-4"
                    >
                        ← Back
                    </button>

                    <h1 className="text-2xl font-bold mb-4">{job.Title}</h1>

                    {/* Description */}
                    <section className="mb-4">
                        <h2 className="text-lg font-semibold mb-1">Description</h2>
                        <p className="text-sm text-[#DED1B6]">{job.Description}</p>
                    </section>

                    {/* Requirements */}
                    <section className="mb-4">
                        <h2 className="text-lg font-semibold mb-1">Requirements</h2>
                        <p className="text-sm text-[#DED1B6]">{job.Requirements}</p>
                    </section>

                    {/* Buttons */}
                    <div className="mt-6 flex gap-4">
                        <button
                            disabled={!authUser || !job.UserId}
                            className={`px-4 py-2 rounded transition ${
                                !authUser || !job.UserId
                                    ? "bg-gray-500 cursor-not-allowed"
                                    : "bg-[#DED1B6] text-[#1E222B] hover:bg-[#948978] hover:text-white"
                            }`}
                            onClick={handleMessageClick}
                        >
                            Message
                        </button>

                        <button
                            disabled={authUser?.id === job.UserId?._id}
                            className={`px-4 py-2 rounded transition ${
                                authUser?.id === job.UserId?._id
                                    ? "bg-gray-500 cursor-not-allowed"
                                    : "bg-[#DED1B6] text-[#1E222B] hover:bg-[#948978] hover:text-white"
                            }`}
                            onClick={() => setShowApplyForm(true)}
                        >
                            Apply
                        </button>
                    </div>
                </div>
            </div>

            {/* Mini Chat Window */}
            {chatOpen && chatConversation && authUser && (
                <div className="fixed bottom-25 right-1 z-50">
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
    );
};

export default JobPreview;
