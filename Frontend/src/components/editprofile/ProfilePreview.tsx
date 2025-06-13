import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { User } from "../../interfaces/User";
import { AuthContext } from "../../context/AuthContext";
import MiniChatWindow from "../homepage/MiniChatWindow"; // ✅ import the mini chat window

const RENDER_URL = import.meta.env.RENDER_URL || "http://localhost:5000";

const ProfilePreview = () => {
    const [user, setUser] = useState<User | null>(null);
    const { token, user: authUser } = useContext(AuthContext) || {};
    const navigate = useNavigate();
    const { id: profileId } = useParams();
    const [isOwnProfile, setIsOwnProfile] = useState(false);

    const [chatConversation, setChatConversation] = useState<any | null>(null); // ✅ store conversation state
    const [chatOpen, setChatOpen] = useState(false); // ✅ control mini window open

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
                    receiverId: user.userId, // assuming userId is stored in profile
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
            <div className="flex justify-center mt-10 text-gray-500 text-lg">
                Loading profile...
            </div>
        );

    return (
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow p-6 mt-6 border border-gray-200 relative">
            {/* Header Section */}
            <div className="flex items-center gap-4">
                {/* Avatar */}
                <div className="w-14 h-14 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl font-semibold">
                    {user.name?.charAt(0).toUpperCase() ||
                        user.email?.charAt(0).toUpperCase()}
                </div>

                {/* User Info */}
                <div className="flex-1">
                    <h1 className="text-2xl font-bold text-gray-800">
                        {user.name || "Unnamed Freelancer"}
                    </h1>
                    <p className="text-gray-500">
                        {user.email || "No email provided"}
                    </p>
                    <p className="text-gray-500">
                        {user.location || "No address provided"}
                    </p>
                </div>

                {/* Edit Button (if own profile) */}
                {isOwnProfile ? (
                    <button
                        onClick={() => navigate("/edit-profile")}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        Edit Profile
                    </button>
                ) : (
                    <button
                        onClick={handleMessageClick}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        Message
                    </button>
                )}
            </div>

            <hr className="my-6 border-gray-300" />

            {/* Skills Section */}
            <section className="mb-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    Skills
                </h2>
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

            {/* Work Experience Section */}
            <section>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    Work Experience
                </h2>
                {user.workExperience?.length ? (
                    <ul className="space-y-4">
                        {user.workExperience.map((exp, idx) => (
                            <li
                                key={idx}
                                className="bg-gray-50 p-4 rounded border"
                            >
                                <p className="text-lg font-bold text-gray-700">
                                    {exp.jobTitle}{" "}
                                    <span className="text-sm text-gray-500">
                                        at {exp.company}
                                    </span>
                                </p>
                                <p className="text-sm text-gray-500 italic">
                                    {exp.duration}
                                </p>
                                <p className="text-gray-700 mt-1">
                                    {exp.description}
                                </p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-500">No work experience listed.</p>
                )}
            </section>

            {/* ✅ Mini Chat Window (only if chat is started) */}
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
