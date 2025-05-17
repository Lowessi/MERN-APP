import { useEffect, useState, useContext, use } from "react";
import { AuthContext } from "../../context/AuthContext";
import { getProfile } from "../../api/Profile";
import { getUser } from "../../api/User";

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
  const [hasProfile, setHasProfile] = useState<boolean>(false);
  const { token, user, loading } = useContext(AuthContext) || {};

  useEffect(() => {
    if (!loading && token && user) {
      fetchProfile();
    }
  }, [loading, token, user]);

  // const { token } = useContext(AuthContext) || {};
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

  const fetchProfile = async () => {
    if (!token || !user) {
      console.error("Ambot nimo");
      return;
    }

    console.log(user.id, token);

    try {
      const profile = await getProfile(user.id, token);
      setHasProfile(true);
      console.log("Fetched profile:", profile);
    } catch (error: any) {
      setHasProfile(false);
      console.error("Error fetching profile in Home.tsx:", error.message);
    }
  };

  useEffect(() => {
    console.log(hasProfile);
  }, [hasProfile]);

  // Fetch existing profile
  useEffect(() => {
    fetchProfile();
    console.log(token);
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

    console.log(token);

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

      console.log(data);

      if (res.ok) {
        setHasProfile(true);
      } else {
        alert("Failed to save profile: " + data.error);
      }
    } catch (err) {
      console.error("Failed to submit profile:", err);
    }
  };

  return (
    <div className={`${loading ? "hidden" : "block"}`}>
      <div className={`${hasProfile ? "block" : "hidden"} text-center p-10`}>
        Has Profile
      </div>
      <div className={`${!hasProfile ? "block" : "hidden"} text-center p-10`}>
        <form
          onSubmit={handleSubmit}
          className="max-w-2xl mx-auto p-6 space-y-6"
        >
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
      </div>
    </div>
  );
};

export default EditProfile;
