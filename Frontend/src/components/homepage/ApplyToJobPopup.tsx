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
        applicantId: localStorage.getItem("userId"),
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
      <div className="bg-[#1E222B] text-[#DED1B6] p-6 rounded-lg shadow-lg w-[90%] max-w-md relative border border-[#343941]">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-[#DED1B6] hover:text-[#948978] text-xl font-bold"
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
            className="w-full border border-[#DED1B6] bg-[#343941] text-white px-3 py-2 rounded placeholder:text-[#DED1B6]"
            rows={4}
          />
        </div>
        <div className="flex justify-end space-x-2 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#343941] text-[#DED1B6] rounded hover:bg-[#948978] hover:text-white transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-[#DED1B6] text-[#1E222B] rounded hover:bg-[#948978] hover:text-white transition font-semibold"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
