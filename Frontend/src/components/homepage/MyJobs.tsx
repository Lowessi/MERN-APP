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
        if (!window.confirm("Are you sure you want to delete this job?"))
            return;
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
                    job._id === jobId
                        ? { ...job, status: updatedJob.status }
                        : job
                )
            );
        } catch (err) {
            alert("Error updating job status");
        }
    };

    // Fetch applicants for a specific job
    const fetchApplicants = async (jobId: string) => {
        try {
            const res = await fetch(
                `${RENDER_URL}/api/applications/job/${jobId}`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            if (!res.ok) throw new Error("Failed to fetch applicants");
            const data = await res.json();
            setApplicants(data);
            setSelectedJobId(jobId);
        } catch (err) {
            alert("Error fetching applicants");
        }
    };

    // Accept or reject an applicant
    const handleApplicantAction = async (
        applicantId: string,
        action: "reject"
    ) => {
        try {
            if (action !== "reject") return; // Guard clause for invalid action

            const res = await fetch(
                `${RENDER_URL}/api/applications/${applicantId}/reject`,
                {
                    method: "DELETE",
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            if (!res.ok) throw new Error("Failed to reject applicant");

            setApplicants((prev) =>
                prev.filter((app) => app._id !== applicantId)
            );
        } catch (err) {
            alert("Error rejecting applicant");
        }
    };
    if (loading) return <div className="p-6">Loading your jobs...</div>;
    if (error) return <div className="p-6 text-red-600">{error}</div>;

    return (
        <div className="max-w-6xl mx-auto p-4">
            <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">My Posted Jobs</h2>
                    <button
                        onClick={() => navigate("/post-job")}
                        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                    >
                        Post New Job
                    </button>
                </div>

                {jobs.length === 0 ? (
                    <p className="text-gray-600">
                        You haven't posted any jobs yet.
                    </p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {jobs.map((job) => (
                            <div
                                key={job._id}
                                className="p-6 bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition-transform transform hover:-translate-y-1 flex flex-col justify-between"
                            >
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                        {job.Title}
                                    </h3>
                                    <p className="text-gray-600 mb-3 line-clamp-3">
                                        {job.Description}
                                    </p>
                                    <p className="text-sm text-gray-700 mb-1">
                                        Budget: ${job.Budget}
                                    </p>
                                    <p className="text-sm text-gray-700 mb-4">
                                        Deadline:{" "}
                                        {new Date(
                                            job.Deadline
                                        ).toLocaleDateString()}
                                    </p>
                                    <p className="text-sm text-gray-700 mb-2">
                                        Status:{" "}
                                        <select
                                            value={job.status}
                                            onChange={(e) =>
                                                handleStatusChange(
                                                    job._id,
                                                    e.target.value
                                                )
                                            }
                                            className="border rounded px-2 py-1 ml-2"
                                        >
                                            <option value="Open">Open</option>
                                            <option value="On Work">
                                                On Work
                                            </option>
                                            <option value="Completed">
                                                Completed
                                            </option>
                                        </select>
                                    </p>
                                </div>
                                <div className="flex justify-between">
                                    <div className="mt-auto space-x-2">
                                        <button
                                            onClick={() =>
                                                navigate(
                                                    `/edit-jobs/${job._id}`
                                                )
                                            }
                                            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleDelete(job._id)
                                            }
                                            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                    <button
                                        onClick={() => fetchApplicants(job._id)}
                                        className="rounded text-white bg-green-600 shadow px-3 py-1"
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
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-xl font-bold mb-4">Applicants</h2>
                        {applicants.length === 0 ? (
                            <p>No applicants yet.</p>
                        ) : (
                            applicants.map((applicant) => (
                                <div
                                    key={applicant._id}
                                    className="border p-4 mb-2"
                                >
                                    <p>
                                        <strong>Email:</strong>{" "}
                                        {applicant.userId.Email}
                                    </p>
                                    <p>
                                        <strong>Proposal:</strong>{" "}
                                        {applicant.proposal}
                                    </p>

                                    <button
                                        onClick={() =>
                                            handleApplicantAction(
                                                applicant._id,
                                                "reject"
                                            )
                                        }
                                        className="px-3 py-1 bg-red-500 text-white rounded"
                                    >
                                        Reject
                                    </button>
                                </div>
                            ))
                        )}
                        <button
                            onClick={() => setSelectedJobId(null)}
                            className="mt-4 px-4 py-2 bg-gray-500 text-white rounded w-full"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyJobs;
