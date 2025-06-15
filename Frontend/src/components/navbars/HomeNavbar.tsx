import { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { io, Socket } from "socket.io-client";

interface Notification {
    _id: string;
    message: string;
    isRead: boolean;
    createdAt: string;
}

interface Message {
    _id: string;
    senderId: string;
    text: string;
    conversationId: string;
    createdAt: string;
    receiverId: string;
}

interface Conversation {
    _id: string;
    members: string[];
    lastMessage: string;
}

interface User {
    id: string;
    email: string;
}

const HomeNavbar = () => {
    const [initial, setInitial] = useState<string>("?");
    const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [conversations, setConversations] = useState<Conversation[]>([]);

    const dropdownRef = useRef<HTMLDivElement | null>(null);
    const socket = useRef<Socket | null>(null);

    const auth = useContext(AuthContext);
    const signOut = auth?.signOut;

    const storedUser = localStorage.getItem("user");
    const user: User | null = storedUser ? JSON.parse(storedUser) : null;
    const userId = user?.id || "";
    const email = user?.email || "";

    useEffect(() => {
        if (email) {
            setInitial(email.charAt(0).toUpperCase());
        }
    }, [email]);

    const fetchConversations = async () => {
        if (!userId) return;
        try {
            const res = await fetch(`/api/conversations/${userId}`);
            const data = await res.json();
            setConversations(data.reverse().slice(0, 5));
        } catch (err) {
            console.error("Failed to fetch conversations:", err);
        }
    };

    useEffect(() => {
        if (!userId) return;

        socket.current = io(
            import.meta.env.VITE_RENDER_URL || "http://localhost:5000"
        );
        socket.current.emit("joinRoom", userId);

        socket.current.on(
            "receiveNotification",
            (newNotification: Notification) => {
                setNotifications((prev) => [newNotification, ...prev]);
            }
        );

        socket.current.on("getMessage", (message: Message) => {
            if (message.receiverId === userId) {
                fetchConversations();
            }
        });

        return () => {
            socket.current?.disconnect();
        };
    }, [userId]);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(e.target as Node)
            ) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSignOut = () => {
        signOut?.();
    };

    return (
        <div className="sticky top-0 z-50">
            <nav className="bg-[#1E222B] shadow-sm px-8 py-4 flex items-center justify-between">
                {/* Left: Logo */}
                <div className="flex pl-20 items-center gap-4">
                    <div className="text-[#DED1B6] text-3xl font-bold">
                        <Link to="/">Talent</Link>
                    </div>
                </div>

                {/* Center: Navigation Links */}
                <div className="hidden sm:flex items-center gap-10 text-base text-[#DED1B6]">
                    <Link
                        to="/home"
                        className="hover:text-[#948978] transition"
                    >
                        Home
                    </Link>
                    <Link
                        to="/freelancer"
                        className="hover:text-[#948978] transition"
                    >
                        Freelancer
                    </Link>
                    <Link
                        to="/home/about"
                        className="hover:text-[#948978] transition"
                    >
                        About Us
                    </Link>
                    <Link
                        to="/home/contact"
                        className="hover:text-[#948978] transition"
                    >
                        Contact
                    </Link>
                </div>

                {/* Right: User Avatar Dropdown */}
                <div className="relative pr-20" ref={dropdownRef}>
                    <div
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                        className="w-10 h-10 bg-[#343941] text-[#DED1B6] rounded-full flex items-center justify-center font-bold cursor-pointer text-base"
                    >
                        {initial}
                    </div>

                    {dropdownOpen && (
                        <div className="absolute right-0 mt-2 w-72 bg-[#213448] border-1 shadow-lg rounded-md py-2 z-50">
                            <Link
                                to="/profile-preview"
                                className="block px-4 py-2 hover:bg-[#003448] text-sm text-[#948978]"
                            >
                                View Profile
                            </Link>
                            <Link
                                to="/edit-profile"
                                className="block px-4 py-2 hover:bg-[#003448] text-sm text-[#948978]"
                            >
                                Edit Profile
                            </Link>
                            <hr className="my-1" />

                            {/* Notifications */}
                            <div className="px-4 py-1 text-xs font-semibold text-[#948978]">
                                Notifications
                            </div>
                            {notifications.length > 0 ? (
                                notifications.slice(0, 3).map((notif) => (
                                    <div
                                        key={notif._id}
                                        className={`px-4 py-1 text-sm truncate hover:bg-[#DED1B6] ${
                                            notif.isRead
                                                ? "text-[#948978]"
                                                : "text-black font-medium"
                                        }`}
                                    >
                                        {notif.message}
                                    </div>
                                ))
                            ) : (
                                <div className="px-4 py-1 text-sm text-[#948978]">
                                    No notifications
                                </div>
                            )}

                            {/* Messages */}
                            <div className="px-4 pt-3 text-xs font-semibold text-[#948978]">
                                Messages
                            </div>
                            {conversations.length > 0 ? (
                                conversations.map((convo) => (
                                    <Link
                                        key={convo._id}
                                        to={`/messenger/${convo._id}`}
                                        className="block px-4 py-1 text-sm hover:bg-[#DED1B6] truncate text-[#343941]"
                                    >
                                        Chat with{" "}
                                        {convo.members.find(
                                            (id) => id !== userId
                                        )}
                                    </Link>
                                ))
                            ) : (
                                <div className="px-4 py-1 text-sm text-[#948978]">
                                    No recent messages
                                </div>
                            )}

                            <hr className="my-2" />
                            <button
                                onClick={handleSignOut}
                                className="block w-full text-left px-4 py-2 hover:bg-[#003448] text-sm text-red-600"
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </nav>
        </div>
    );
};

export default HomeNavbar;
