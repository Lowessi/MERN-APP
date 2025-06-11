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
  const [updatedApplicants, setUpdatedApplicants] = useState<ApplicantType[]>(
    []
  );

  useEffect(() => {
    setUpdatedApplicants(applicants);
  }, [applicants]);

  const handleApplicantAction = async (_id: string) => {
    try {
      const method = "DELETE"; // Exclusively using DELETE for rejection
      const API_BASE_URL =
        import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

      console.log(
        `Sending DELETE request to: ${API_BASE_URL}/api/applications/${_id}/reject`
      );

      const res = await fetch(
        `${API_BASE_URL}/api/applications/${_id}/reject`,
        {
          method,
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      if (!res.ok) throw new Error(`Failed to reject applicant`);

      // Ensure UI updates after rejection
      setUpdatedApplicants((prev) =>
        prev.filter((applicant) => applicant._id !== _id)
      );
      setApplicants((prev) =>
        prev.filter((applicant) => applicant._id !== _id)
      );
    } catch (err) {
      console.error(err);
      alert("Error rejecting applicant");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Applicants</h2>
        {updatedApplicants.length === 0 ? (
          <p>No applicants yet.</p>
        ) : (
          updatedApplicants.map((applicant) => (
            <div key={applicant._id} className="border p-4 mb-2">
              <p>
                <strong>Email:</strong> {applicant.userId.Email}
              </p>
              <p>
                <strong>Proposal:</strong> {applicant.proposal}
              </p>
              <div className="flex space-x-2 mt-2">
                <button
                  onClick={() => handleApplicantAction(applicant._id)}
                  className="px-3 py-1 bg-red-500 text-white rounded"
                >
                  Reject
                </button>
              </div>
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
  );
};

export default ApplicantPopup;
