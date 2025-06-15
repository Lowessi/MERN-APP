import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

type ProfileType = {
    name: string;
    title: string;
    location: string;
};

const RENDER_URL = import.meta.env.VITE_RENDER_URL || "http://localhost:5000";

const Sidebar = () => {
    const navigate = useNavigate();
    const auth = useContext(AuthContext);
    const user = auth?.user;
    const token = auth?.token;

    const [profile, setProfile] = useState<ProfileType | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (token) {
            const fetchProfile = async () => {
                try {
                    const res = await fetch(RENDER_URL + "/api/profile/me", {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    if (res.ok) {
                        const data = await res.json();
                        setProfile({
                            name: data.name,
                            title: data.title,
                            location: data.location,
                        });
                    } else {
                        setError("Failed to load profile");
                    }
                } catch (err) {
                    setError("Failed to load profile");
                    console.error("Failed to load profile:", err);
                } finally {
                    setLoading(false);
                }
            };
            fetchProfile();
        }
    }, [token]);

    if (!user) {
        return <div className="text-[#DED1B6]">Loading...</div>;
    }

    return (
        <div className="fixed top-20 left-5 z-40">
            <aside className="w-80 h-100 p-5 bg-[#1E222B] border border-[#948978] text-[#DED1B6] rounded-2xl shadow-lg">
                {loading ? (
                    <div>Loading profile...</div>
                ) : error ? (
                    <div className="text-red-500">{error}</div>
                ) : (
                    <div className="bg-[#343941] rounded-xl p-4 mb-6 text-center">
                        <p className="mt-1 font-semibold">{profile?.name}</p>
                        <p className="text-sm text-[#DED1B6]">{user.email}</p>
                        <p className="text-sm text-[#DED1B6]">
                            {profile?.title || "—"}
                        </p>
                        <p className="text-xs text-[#948978]">
                            {profile?.location || "—"}
                        </p>
                    </div>
                )}

                <div className="flex items-center flex-col gap-3 text-sm">
                    <Link
                        to="/my-jobs"
                        className="hover:text-[#948978] transition-colors"
                    >
                        My Jobs
                    </Link>
                </div>

                <button
                    className="mt-6 h-40 w-69 text-[#DED1B6] border border-[#948978] px-3 py-1 rounded hover:bg-[#343941] transition text-sm"
                    onClick={() => navigate("/post-job")}
                >
                    + Post a free job
                </button>
            </aside>
        </div>
    );
};

export default Sidebar;
