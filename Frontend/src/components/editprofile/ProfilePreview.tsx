import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { User } from "../../interfaces/User";
import { AuthContext } from "../../context/AuthContext";
import { getUser } from "../../api/User";

const ProfilePreview = () => {
  const [user, setUser] = useState<User | null>(null);
  const { token, user: authUser } = useContext(AuthContext) || {}; // ✅ grab user from AuthContext
  const navigate = useNavigate();

  const params = useParams();

  const getAccount = async () => {
    console.log(params.id, token);

    if (!params.id || !token) return;

    const loggedIn = await getUser(params.id, token);
    console.log(loggedIn, params.id);
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    getAccount();

    const fetchUserProfile = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/profile/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch user profile");

        const data: User = await res.json();
        setUser(data);
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };

    fetchUserProfile();
  }, [token, navigate]);

  if (!user)
    return (
      <div className="flex justify-center mt-10 text-gray-500 text-lg">
        Loading profile...
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow p-6 mt-6 border border-gray-200">
      {/* Header Section */}
      <div className="flex items-center gap-4">
        <img
          src="/default-avatar.png"
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover"
        />
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-800">
            {user.name || "Unnamed Freelancer"}
          </h1>
          <p className="text-gray-500">
            {authUser?.email || "No email provided"}
          </p>{" "}
          {/* ✅ fixed here */}
          <p className="text-gray-500">
            {user.location || "No address provided"}
          </p>
        </div>
        <button
          onClick={() => navigate("/edit-profile")}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Edit Profile
        </button>
      </div>

      <hr className="my-6 border-gray-300" />

      {/* Skills */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Skills</h2>
        {user.skills?.length ? (
          <ul className="flex flex-wrap gap-2">
            {user.skills.map((skill, idx) => (
              <li
                key={idx}
                className="bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-700 border"
              >
                {skill}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No skills added.</p>
        )}
      </section>

      {/* Work Experience */}
      <section>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          Work Experience
        </h2>
        {user.workExperience?.length ? (
          <ul className="space-y-4">
            {user.workExperience.map((exp, idx) => (
              <li key={idx} className="bg-gray-50 p-4 rounded border">
                <p className="text-lg font-bold text-gray-700">
                  {exp.jobTitle}{" "}
                  <span className="text-sm text-gray-500">
                    at {exp.company}
                  </span>
                </p>
                <p className="text-sm text-gray-500 italic">{exp.duration}</p>
                <p className="text-gray-700 mt-1">{exp.description}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No work experience listed.</p>
        )}
      </section>
    </div>
  );
};

export default ProfilePreview;
