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
    skills: string;
    workExperience: ExperienceItem[];
};

const RENDER_URL = import.meta.env.VITE_RENDER_URL || "http://localhost:5000";

const EditProfile = () => {
    const navigate = useNavigate();
    const { token } = useContext(AuthContext) || {};
    const [hasExistingProfile, setHasExistingProfile] = useState(false);
    const [loading, setLoading] = useState(true);

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

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await fetch(RENDER_URL + "/api/profile/me", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (res.ok) {
                    const data = await res.json();
                    setHasExistingProfile(true);
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
            const res = await fetch(RENDER_URL + "/api/profile/me", {
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
                if (!hasExistingProfile) navigate("/home");
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
        return (
            <div className="text-center p-10 text-[#DED1B6]">
                Loading profile...
            </div>
        );

    return (
        <div className="py-10 min-h-screen bg-[#393E46] text-[#DED1B6] px-4">
            <form
                onSubmit={handleSubmit}
                className="max-w-3xl mx-auto bg-[#222831] p-8 rounded-xl space-y-1.5 text-[#DED1B6] mt-4 md:mt-1"
            >
                <h2 className="text-xl font-bold mb-4">Edit Profile</h2>

                <div className="space-y-4">
                    {["name", "location", "title", "skills"].map((field) => (
                        <input
                            key={field}
                            type="text"
                            name={field}
                            value={
                                formData[field as keyof ProfileData] as string
                            }
                            onChange={handleChange}
                            placeholder={
                                field === "skills"
                                    ? "Skills (comma separated)"
                                    : field[0].toUpperCase() + field.slice(1)
                            }
                            className="w-full p-2.5 bg-[#393E46] text-[#DFD0B8] rounded placeholder-[#948978]"
                            required={field !== "skills"}
                        />
                    ))}
                </div>

                <div className="space-y-4">
                    <h3 className="text-xl font-semibold">Experience</h3>
                    {formData.workExperience.map((exp, i) => (
                        <div
                            key={i}
                            className="space-y-2 border border-[#948978] p-4 rounded"
                        >
                            {[
                                "company",
                                "jobTitle",
                                "startDate",
                                "endDate",
                            ].map((field) => (
                                <input
                                    key={field}
                                    type="text"
                                    name={field}
                                    value={exp[field as keyof ExperienceItem]}
                                    onChange={(e) => handleChange(e, i)}
                                    placeholder={field
                                        .replace(/([A-Z])/g, " $1")
                                        .replace(/^./, (str) =>
                                            str.toUpperCase()
                                        )}
                                    className="w-full p-3 bg-[#393E46] text-[#DFD0B8] rounded placeholder-[#948978]"
                                />
                            ))}
                            <textarea
                                name="description"
                                value={exp.description}
                                onChange={(e) => handleChange(e, i)}
                                placeholder="Description"
                                className="w-full p-3 bg-[#393E46] text-[#DFD0B8] rounded placeholder-[#948978]"
                                rows={3}
                            />
                        </div>
                    ))}
                </div>

                <div className="flex flex-col md:flex-row gap-4 pt-4">
                    <button
                        type="button"
                        onClick={addExperience}
                        className="w-full md:w-auto bg-[#DED1B6] text-[#1E222B] font-medium px-6 py-3 rounded hover:bg-[#948978] transition"
                    >
                        Add Experience
                    </button>

                    <button
                        type="submit"
                        className="w-full md:w-auto bg-[#DED1B6] text-[#1E222B] font-bold px-6 py-3 rounded hover:bg-[#948978] transition"
                    >
                        Save Profile
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditProfile;
