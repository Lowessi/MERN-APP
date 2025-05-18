import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthContext";

type ExperienceItem = {
  company: string;
  jobTitle: string;
  startDate: string;
  endDate: string;
  description: string;
};

type ProfileData = {
  name: string;
  location: string;
  title: string;
  skills: string; // comma-separated
  workExperience: ExperienceItem[];
};

const EditProfile = () => {
  const navigate = useNavigate();
  const { token } = useContext(AuthContext) || {};
  const [hasExistingProfile, setHasExistingProfile] = useState(false);

  const [formData, setFormData] = useState<ProfileData>({
    name: "",
    location: "",
    title: "",
    skills: "",
    workExperience: [
      {
        company: "",
        jobTitle: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ],
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/profile/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.ok) {
          const data = await res.json();
          setHasExistingProfile(true); // ✅ Mark that a profile exists

          setFormData({
            name: data.name || "",
            location: data.location || "",
            title: data.title || "",
            skills: (data.skills || []).join(", "),
            workExperience: data.workExperience?.length
              ? data.workExperience
              : [
                  {
                    company: "",
                    jobTitle: "",
                    startDate: "",
                    endDate: "",
                    description: "",
                  },
                ],
          });
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchProfile();
  }, [token]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index?: number
  ) => {
    const { name, value } = e.target;
    if (typeof index === "number") {
      const updatedExp = [...formData.workExperience];
      updatedExp[index][name as keyof ExperienceItem] = value;
      setFormData({ ...formData, workExperience: updatedExp });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const addExperience = () => {
    setFormData((prev) => ({
      ...prev,
      workExperience: [
        ...prev.workExperience,
        {
          company: "",
          jobTitle: "",
          startDate: "",
          endDate: "",
          description: "",
        },
      ],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      ...formData,
      skills: formData.skills.split(",").map((s) => s.trim()),
    };

    try {
      const res = await fetch("http://localhost:5000/api/profile/me", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Profile saved successfully!");

        // ✅ Navigate to home only if it's the first time creating a profile
        if (!hasExistingProfile) {
          navigate("/home");
        }

        // ✅ Update the state so future saves won't redirect
        setHasExistingProfile(true);
      } else {
        toast.error(data.error || "Failed to save profile.");
      }
    } catch (err) {
      console.error("Failed to submit profile:", err);
      toast.error("Something went wrong while saving your profile.");
    }
  };

  if (loading)
    return <div className="text-center p-10">Loading profile...</div>;

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-6 space-y-6">
      <h2 className="text-xl font-bold">Edit Profile</h2>

      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Full Name"
        className="w-full border p-2 rounded"
        required
      />
      <input
        type="text"
        name="location"
        value={formData.location}
        onChange={handleChange}
        placeholder="Location"
        className="w-full border p-2 rounded"
        required
      />
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Professional Title"
        className="w-full border p-2 rounded"
        required
      />
      <input
        type="text"
        name="skills"
        value={formData.skills}
        onChange={handleChange}
        placeholder="Skills (comma separated)"
        className="w-full border p-2 rounded"
      />

      <h3 className="text-lg font-semibold">Experience</h3>
      {formData.workExperience.map((exp, i) => (
        <div key={i} className="space-y-2 border p-4 rounded">
          <input
            type="text"
            name="company"
            value={exp.company}
            onChange={(e) => handleChange(e, i)}
            placeholder="Company"
            className="w-full border p-2 rounded"
          />
          <input
            type="text"
            name="jobTitle"
            value={exp.jobTitle}
            onChange={(e) => handleChange(e, i)}
            placeholder="Job Title"
            className="w-full border p-2 rounded"
          />
          <input
            type="text"
            name="startDate"
            value={exp.startDate}
            onChange={(e) => handleChange(e, i)}
            placeholder="Start Date"
            className="w-full border p-2 rounded"
          />
          <input
            type="text"
            name="endDate"
            value={exp.endDate}
            onChange={(e) => handleChange(e, i)}
            placeholder="End Date"
            className="w-full border p-2 rounded"
          />
          <textarea
            name="description"
            value={exp.description}
            onChange={(e) => handleChange(e, i)}
            placeholder="Description"
            className="w-full border p-2 rounded"
          />
        </div>
      ))}

      <button
        type="button"
        onClick={addExperience}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Add Experience
      </button>

      <button
        type="submit"
        className="bg-green-600 text-white px-6 py-2 rounded"
      >
        Save Profile
      </button>
    </form>
  );
};

export default EditProfile;
