import React, { useState, useEffect } from "react";

type ApplicantType = {
    _id: string;
    userId: { Email: string };
    proposal: string;
};

type ApplicantPopupProps = {
    applicants: ApplicantType[];
    setApplicants: React.Dispatch<React.SetStateAction<ApplicantType[]>>;
    setSelectedJobId: (value: string | null) => void;
};

const ApplicantPopup: React.FC<ApplicantPopupProps> = ({
    applicants,
    setApplicants,
    setSelectedJobId,
}) => {
    const [updatedApplicants, setUpdatedApplicants] = useState<ApplicantType[]>([]);

    useEffect(() => {
        setUpdatedApplicants(applicants);
    }, [applicants]);

    const handleApplicantAction = async (_id: string) => {
        try {
            const API_BASE_URL = import.meta.env.RENDER_URL || "http://localhost:5000";

            const res = await fetch(`${API_BASE_URL}/api/applications/${_id}/reject`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            if (!res.ok) throw new Error("Failed to reject applicant");

            setUpdatedApplicants((prev) => prev.filter((a) => a._id !== _id));
            setApplicants((prev) => prev.filter((a) => a._id !== _id));
        } catch (err) {
            console.error(err);
            alert("Error rejecting applicant");
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-[#1E222B] p-6 rounded-lg shadow-lg w-96 border border-[#948978] text-[#DED1B6]">
                <h2 className="text-xl font-bold mb-4">Applicants</h2>
                {updatedApplicants.length === 0 ? (
                    <p className="text-sm">No applicants yet.</p>
                ) : (
                    updatedApplicants.map((applicant) => (
                        <div
                            key={applicant._id}
                            className="border border-[#948978] p-4 mb-2 rounded"
                        >
                            <p className="text-sm">
                                <strong>Email:</strong> {applicant.userId.Email}
                            </p>
                            <p className="text-sm">
                                <strong>Proposal:</strong> {applicant.proposal}
                            </p>
                            <div className="flex space-x-2 mt-2">
                                <button
                                    onClick={() => handleApplicantAction(applicant._id)}
                                    className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded transition"
                                >
                                    Reject
                                </button>
                            </div>
                        </div>
                    ))
                )}
                <button
                    onClick={() => setSelectedJobId(null)}
                    className="mt-4 px-4 py-2 w-full bg-[#DED1B6] text-[#1E222B] hover:bg-[#948978] hover:text-white rounded transition"
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default ApplicantPopup;
