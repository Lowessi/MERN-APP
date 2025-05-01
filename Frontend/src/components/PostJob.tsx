// components/PostJob.tsx
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

interface JobFormData {
  Title: string;
  Description: string;
  Requirements: string;
  Budget: number;
  Deadline: string;
}

const PostJob = () => {
  const [formData, setFormData] = useState<JobFormData>({
    Title: "",
    Description: "",
    Requirements: "",
    Budget: 0,
    Deadline: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [successMessage, setSuccessMessage] = useState("");
  const { token } = useContext(AuthContext) || {};
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.Title) newErrors.Title = "Title is required";
    if (!formData.Description)
      newErrors.Description = "Description is required";
    if (!formData.Budget) newErrors.Budget = "Budget is required";
    if (!formData.Deadline) newErrors.Deadline = "Deadline is required";
    if (formData.Description.length > 2000)
      newErrors.Description = "Description exceeds 2000 characters";
    if (formData.Requirements.length > 1000)
      newErrors.Requirements = "Requirements exceed 1000 characters";
    return newErrors;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
    setSuccessMessage("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/jobs/jobpost", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to post job");
      }

      setSuccessMessage("Job posted successfully!");
      setFormData({
        Title: "",
        Description: "",
        Requirements: "",
        Budget: 0,
        Deadline: "",
      });
    } catch (err: any) {
      setErrors({ general: err.message });
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md mt-6">
      <h2 className="text-xl font-bold mb-4">Post a Job</h2>
      {errors.general && <p className="text-red-500 mb-2">{errors.general}</p>}
      {successMessage && (
        <p className="text-green-600 mb-2">{successMessage}</p>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="Title"
          placeholder="Job Title"
          value={formData.Title}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        {errors.Title && <p className="text-red-500 text-sm">{errors.Title}</p>}

        <textarea
          name="Description"
          placeholder="Job Description"
          value={formData.Description}
          onChange={handleChange}
          className="w-full border p-2 rounded h-24"
        />
        {errors.Description && (
          <p className="text-red-500 text-sm">{errors.Description}</p>
        )}

        <textarea
          name="Requirements"
          placeholder="Requirements (Optional)"
          value={formData.Requirements}
          onChange={handleChange}
          className="w-full border p-2 rounded h-20"
        />
        {errors.Requirements && (
          <p className="text-red-500 text-sm">{errors.Requirements}</p>
        )}

        <input
          type="number"
          name="Budget"
          placeholder="Budget"
          value={formData.Budget}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        {errors.Budget && (
          <p className="text-red-500 text-sm">{errors.Budget}</p>
        )}

        <input
          type="date"
          name="Deadline"
          value={formData.Deadline}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        {errors.Deadline && (
          <p className="text-red-500 text-sm">{errors.Deadline}</p>
        )}

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Post Job
        </button>
      </form>
    </div>
  );
};

export default PostJob;
