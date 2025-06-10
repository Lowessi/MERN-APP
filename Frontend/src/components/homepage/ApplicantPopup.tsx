import React from "react";

type ApplicantType = {
  _id: string;
  userId: { Email: string };
  proposal: string;
};

type ApplicantPopupProps = {
  applicants: ApplicantType[];
  setSelectedJobId: (value: string | null) => void;
  handleApplicantAction: (
    applicantId: string,
    action: "accept" | "reject"
  ) => void;
};

const ApplicantPopup: React.FC<ApplicantPopupProps> = ({
  applicants,
  setSelectedJobId,
  handleApplicantAction,
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Applicants</h2>
        {applicants.length === 0 ? (
          <p>No applicants yet.</p>
        ) : (
          applicants.map((applicant) => (
            <div key={applicant._id} className="border p-4 mb-2">
              <p>
                <strong>Email:</strong> {applicant.userId.Email}
              </p>
              <p>
                <strong>Proposal:</strong> {applicant.proposal}
              </p>
              <div className="flex space-x-2 mt-2">
                <button
                  onClick={() => handleApplicantAction(applicant._id, "accept")}
                  className="px-3 py-1 bg-blue-500 text-white rounded"
                >
                  Accept
                </button>
                <button
                  onClick={() => handleApplicantAction(applicant._id, "reject")}
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
