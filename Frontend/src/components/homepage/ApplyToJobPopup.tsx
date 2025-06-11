import { useState } from "react";

type Props = {
  jobId: string;
  onClose: () => void;
};

export default function ApplyToJobPopup({ jobId, onClose }: Props) {
  const [formData, setFormData] = useState({
    proposal: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to apply.");
      return;
    }

    const API_BASE_URL =
      import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

    const res = await fetch(`${API_BASE_URL}/api/applications/apply`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        jobId,
        applicantId: localStorage.getItem("userId"), // Ensures applicantId is sent
        proposal: formData.proposal,
      }),
    });

    const data = await res.json();
    if (res.ok) {
      alert("Application submitted!");
      onClose();
    } else {
      alert(data.error || "Failed to apply");
    }
  };

  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.5)] flex items-center justify-center z-50">
      <div className="bg-white bg-opacity-95 p-6 rounded-lg shadow-lg w-[90%] max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-500 hover:text-black text-xl font-bold"
        >
          &times;
        </button>
        <h2 className="text-2xl font-semibold mb-4">Apply to Job</h2>
        <div className="space-y-3">
          <textarea
            name="proposal"
            value={formData.proposal}
            onChange={handleChange}
            placeholder="Your proposal..."
            className="w-full border p-2 rounded"
            rows={4}
          />
        </div>
        <div className="flex justify-end space-x-2 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
