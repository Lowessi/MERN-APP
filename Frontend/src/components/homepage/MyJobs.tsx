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
    status: "Open" | "On Work" | "Completed";
};

type ApplicantType = {
    _id: string;
    userId: { Email: string };
    proposal: string;
};

const RENDER_URL = import.meta.env.RENDER_URL || "http://localhost:5000";

const MyJobs = () => {
    const { token } = useContext(AuthContext) || {};
    const [jobs, setJobs] = useState<JobType[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [applicants, setApplicants] = useState<ApplicantType[]>([]);
    const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (token) fetchMyJobs();
    }, [token]);

    const fetchMyJobs = async () => {
        try {
            const res = await fetch(RENDER_URL + "/api/jobs/my", {
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
            const res = await fetch(`${RENDER_URL}/api/jobs/${id}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            });
            if (!res.ok) throw new Error("Failed to delete job");
            setJobs((prev) => prev.filter((job) => job._id !== id));
        } catch (err) {
            alert("Error deleting job");
        }
    };

    const handleStatusChange = async (jobId: string, newStatus: string) => {
        try {
            const res = await fetch(`${RENDER_URL}/api/jobs/${jobId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ status: newStatus }),
            });

            if (!res.ok) throw new Error("Failed to update job status");

            const updatedJob = await res.json();

            setJobs((prev) =>
                prev.map((job) =>
                    job._id === jobId ? { ...job, status: updatedJob.status } : job
                )
            );
        } catch (err) {
            alert("Error updating job status");
        }
    };

    const fetchApplicants = async (jobId: string) => {
        try {
            const res = await fetch(`${RENDER_URL}/api/applications/job/${jobId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (!res.ok) throw new Error("Failed to fetch applicants");
            const data = await res.json();
            setApplicants(data);
            setSelectedJobId(jobId);
        } catch (err) {
            alert("Error fetching applicants");
        }
    };

    const handleApplicantAction = async (applicantId: string, action: "reject") => {
        try {
            if (action !== "reject") return;

            const res = await fetch(`${RENDER_URL}/api/applications/${applicantId}/reject`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            });

            if (!res.ok) throw new Error("Failed to reject applicant");

            setApplicants((prev) => prev.filter((app) => app._id !== applicantId));
        } catch (err) {
            alert("Error rejecting applicant");
        }
    };

    if (loading) return <div className="p-6">Loading your jobs...</div>;
    if (error) return <div className="p-6 text-red-600">{error}</div>;

    return (
        <div className="py-10 min-h-screen bg-[#1E222B] text-[#DED1B6] px-4">
            <div className="max-w-6xl mx-auto p-4">
                <div className="bg-[#343941] p-6 rounded-xl shadow-lg">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold">My Posted Jobs</h2>
                        <button
                            onClick={() => navigate("/post-job")}
                            className="px-4 py-2 bg-[#DED1B6] text-[#1E222B] font-semibold rounded hover:bg-[#948978] transition"
                        >
                            Post New Job
                        </button>
                    </div>

                    {jobs.length === 0 ? (
                        <p className="text-gray-400">You haven't posted any jobs yet.</p>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                            {jobs.map((job) => (
                                <div
                                    key={job._id}
                                    className="p-6 bg-[#1E222B] border border-[#DED1B6] rounded-xl shadow-md hover:shadow-lg transition-transform transform hover:-translate-y-1 flex flex-col justify-between"
                                >
                                    <div>
                                        <h3 className="text-xl font-semibold mb-2">
                                            {job.Title}
                                        </h3>
                                        <p className="text-sm mb-3 line-clamp-3">
                                            {job.Description}
                                        </p>
                                        <p className="text-sm mb-1">
                                            Budget: ${job.Budget}
                                        </p>
                                        <p className="text-sm mb-4">
                                            Deadline:{" "}
                                            {new Date(job.Deadline).toLocaleDateString()}
                                        </p>
                                        <p className="text-sm mb-2">
                                            Status:
                                            <select
                                                value={job.status}
                                                onChange={(e) =>
                                                    handleStatusChange(job._id, e.target.value)
                                                }
                                                className="ml-2 bg-[#343941] text-[#DED1B6] border border-[#DED1B6] px-2 py-1 rounded"
                                            >
                                                <option value="Open">Open</option>
                                                <option value="On Work">On Work</option>
                                                <option value="Completed">Completed</option>
                                            </select>
                                        </p>
                                    </div>
                                    <div className="flex justify-between">
                                        <div className="mt-auto space-x-2">
                                            <button
                                                onClick={() => navigate(`/edit-jobs/${job._id}`)}
                                                className="px-3 py-1 bg-[#DED1B6] text-[#1E222B] rounded hover:bg-[#948978] transition"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(job._id)}
                                                className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                        <button
                                            onClick={() => fetchApplicants(job._id)}
                                            className="rounded bg-[#DED1B6] text-[#1E222B] shadow px-3 py-1 hover:bg-[#948978]"
                                        >
                                            Applicants
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {selectedJobId && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <div className="bg-[#343941] text-[#DED1B6] p-6 rounded-lg shadow-lg w-96">
                            <h2 className="text-xl font-bold mb-4">Applicants</h2>
                            {applicants.length === 0 ? (
                                <p>No applicants yet.</p>
                            ) : (
                                applicants.map((applicant) => (
                                    <div
                                        key={applicant._id}
                                        className="border border-[#DED1B6] p-4 mb-2 rounded"
                                    >
                                        <p>
                                            <strong>Email:</strong> {applicant.userId.Email}
                                        </p>
                                        <p>
                                            <strong>Proposal:</strong> {applicant.proposal}
                                        </p>

                                        <button
                                            onClick={() =>
                                                handleApplicantAction(applicant._id, "reject")
                                            }
                                            className="mt-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                                        >
                                            Reject
                                        </button>
                                    </div>
                                ))
                            )}
                            <button
                                onClick={() => setSelectedJobId(null)}
                                className="mt-4 px-4 py-2 bg-[#DED1B6] text-[#1E222B] rounded w-full hover:bg-[#948978]"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyJobs;
