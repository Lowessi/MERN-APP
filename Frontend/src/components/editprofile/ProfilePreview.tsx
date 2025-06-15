import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { User } from "../../interfaces/User";
import { AuthContext } from "../../context/AuthContext";
import MiniChatWindow from "../homepage/MiniChatWindow";

const RENDER_URL = import.meta.env.RENDER_URL || "http://localhost:5000";

const ProfilePreview = () => {
    const [user, setUser] = useState<User | null>(null);
    const { token, user: authUser } = useContext(AuthContext) || {};
    const navigate = useNavigate();
    const { id: profileId } = useParams();
    const [isOwnProfile, setIsOwnProfile] = useState(false);

    const [chatConversation, setChatConversation] = useState<any | null>(null);
    const [chatOpen, setChatOpen] = useState(false);

    useEffect(() => {
        if (!token) {
            navigate("/login");
            return;
        }

        const fetchProfile = async () => {
            try {
                const res = await fetch(
                    profileId && profileId !== "me"
                        ? `${RENDER_URL}/api/profile/${profileId}`
                        : `${RENDER_URL}/api/profile/me`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                if (!res.ok) throw new Error("Failed to fetch profile");

                const data: User = await res.json();
                setUser(data);

                if (
                    !profileId ||
                    profileId === "me" ||
                    data.userId === authUser?.id
                ) {
                    setIsOwnProfile(true);
                } else {
                    setIsOwnProfile(false);
                }
            } catch (err) {
                console.error("Error fetching profile:", err);
            }
        };

        fetchProfile();
    }, [token, navigate, profileId, authUser]);

    const handleMessageClick = async () => {
        if (!user || !authUser) return;

        try {
            const res = await fetch(RENDER_URL + "/api/chat/conversation", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    senderId: authUser.id,
                    receiverId: user.userId,
                }),
            });

            const data = await res.json();
            setChatConversation(data);
            setChatOpen(true);
        } catch (err) {
            console.error("Failed to start conversation:", err);
        }
    };

    if (!user)
        return (
            <div className="flex justify-center mt-10 text-[#948978] text-lg">
                Loading profile...
            </div>
        );

    return (
        <div className="max-w-4xl mx-auto bg-[#1E222B] rounded-xl shadow p-6 mt-6 border border-[#343941] text-[#DED1B6] relative">
            {/* Header */}
            <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-full bg-[#948978] text-white flex items-center justify-center text-xl font-semibold">
                    {user.name?.charAt(0).toUpperCase() ||
                        user.email?.charAt(0).toUpperCase()}
                </div>

                <div className="flex-1">
                    <h1 className="text-2xl font-bold">{user.name || "Unnamed Freelancer"}</h1>
                    <p className="text-[#948978]">{user.email || "No email provided"}</p>
                    <p className="text-[#948978]">{user.location || "No address provided"}</p>
                </div>

                {isOwnProfile ? (
                    <button
                        onClick={() => navigate("/edit-profile")}
                        className="bg-[#DED1B6] text-[#1E222B] px-4 py-2 rounded hover:bg-[#948978] hover:text-white transition"
                    >
                        Edit Profile
                    </button>
                ) : (
                    <button
                        onClick={handleMessageClick}
                        className="bg-[#DED1B6] text-[#1E222B] px-4 py-2 rounded hover:bg-[#948978] hover:text-white transition"
                    >
                        Message
                    </button>
                )}
            </div>

            <hr className="my-6 border-[#343941]" />

            {/* Skills */}
            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Skills</h2>
                {user.skills?.length ? (
                    <ul className="flex flex-wrap gap-2">
                        {user.skills.map((skill, idx) => (
                            <li
                                key={idx}
                                className="bg-[#343941] px-3 py-1 rounded-full text-sm text-[#DED1B6] border border-[#948978]"
                            >
                                {skill}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-[#948978]">No skills added.</p>
                )}
            </section>

            {/* Work Experience */}
            <section>
                <h2 className="text-xl font-semibold mb-2">Work Experience</h2>
                {user.workExperience?.length ? (
                    <ul className="space-y-4">
                        {user.workExperience.map((exp, idx) => (
                            <li
                                key={idx}
                                className="bg-[#222831] p-4 rounded border border-[#343941]"
                            >
                                <p className="text-lg font-bold">
                                    {exp.jobTitle}{" "}
                                    <span className="text-sm text-[#948978]">
                                        at {exp.company}
                                    </span>
                                </p>
                                <p className="text-sm italic text-[#948978]">
                                    {exp.duration}
                                </p>
                                <p className="mt-1">{exp.description}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-[#948978]">No work experience listed.</p>
                )}
            </section>

            {/* Chat Window */}
            {chatOpen && chatConversation && authUser && (
                <div className="fixed bottom-4 right-4 z-50">
                    <MiniChatWindow
                        conversation={chatConversation}
                        currentUserId={authUser.id}
                        onClose={() => setChatOpen(false)}
                    />
                </div>
            )}
        </div>
    );
};

export default ProfilePreview;
