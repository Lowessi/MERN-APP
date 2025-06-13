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
    // const [unreadCount, setUnreadCount] = useState<number>(0);

    const [conversations, setConversations] = useState<Conversation[]>([]);
    // const [hasNewMessage, setHasNewMessage] = useState<boolean>(false);

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

    // Fetch Notifications
    //  useEffect(() => {
    //   const fetchNotifications = async () => {
    //     if (!userId) return;
    //     try {
    //       const res = await fetch(`/api/notifications/${userId}`);
    //       const data = await res.json();
    //       setNotifications(data);
    //       setUnreadCount(data.filter((n: Notification) => !n.isRead).length);
    //     } catch (err) {
    //       console.error("Failed to load notifications:", err);
    //     }
    //   };
    //   fetchNotifications();
    // }, [userId]);

    // Fetch Recent Conversations
    const fetchConversations = async () => {
        if (!userId) return;
        try {
            const res = await fetch(`/api/conversations/${userId}`);
            const data = await res.json();
            setConversations(data.reverse().slice(0, 5)); // Show last 5
        } catch (err) {
            console.error("Failed to fetch conversations:", err);
        }
    };

    useEffect(() => {
        if (!userId) return;

        socket.current = io(
            import.meta.env.RENDER_URL || "http://localhost:5000"
        );
        socket.current.emit("joinRoom", userId);

        // Listen for new notifications
        socket.current.on(
            "receiveNotification",
            (newNotification: Notification) => {
                setNotifications((prev) => [newNotification, ...prev]);
                // setUnreadCount((prev) => prev + 1);
            }
        );

        // Listen for new messages
        socket.current.on("getMessage", (message: Message) => {
            if (message.receiverId === userId) {
                // setHasNewMessage(true);
                fetchConversations(); // Refresh latest convos
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

    // const handleNotificationClick = async () => {
    //   setDropdownOpen(!dropdownOpen);
    //   if (unreadCount > 0) {
    //     try {
    //       await fetch(`/api/notifications/mark-read/${userId}`, {
    //         method: "PUT",
    //       });
    //       setUnreadCount(0);
    //       setNotifications((prev) =>
    //         prev.map((notif) => ({ ...notif, isRead: true }))
    //       );
    //     } catch (err) {
    //       console.error("Failed to mark notifications as read:", err);
    //     }
    //   }
    //   if (hasNewMessage) {
    //     setHasNewMessage(false);
    //   }
    // };

    const handleSignOut = () => {
        signOut?.();
    };

    return (
        <div className="sticky top-0 z-50">
            <nav className="bg-green-500 shadow-sm px-4 py-2 flex items-center justify-between">
                {/* Left: Logo */}
                <div className="flex pl-20 items-center gap-4">
                    <div className="text-white text-2xl font-bold">Talent</div>
                </div>

                {/* Center: Links */}
                <div className="hidden sm:flex items-center gap-8 text-sm text-white">
                    <Link to="/home" className="hover:text-white">
                        Home
                    </Link>
                    <Link to="/freelancer" className="hover:text-white">
                        Freelancer
                    </Link>

                    {/* <div
            className="relative cursor-pointer"
            onClick={handleNotificationClick}
          >
            <span className="hover:text-white">Inbox</span>
            {(unreadCount > 0 || hasNewMessage) && (
              <span className="absolute -top-1 -right-3 bg-red-500 text-white text-xs rounded-full px-1.5">
                ●
              </span>
            )}
          </div> */}
                </div>

                {/* Right: Avatar */}
                <div className="relative pr-20" ref={dropdownRef}>
                    <div
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                        className="w-8 h-8 bg-green-700 text-white rounded-full flex items-center justify-center font-bold cursor-pointer"
                    >
                        {initial}
                    </div>

                    {dropdownOpen && (
                        <div className="absolute right-0 mt-2 w-72 bg-white shadow-lg rounded-md py-2 z-50">
                            <Link
                                to="/profile-preview"
                                className="block px-4 py-2 hover:bg-gray-100 text-sm text-gray-700"
                            >
                                View Profile
                            </Link>
                            <Link
                                to="/edit-profile"
                                className="block px-4 py-2 hover:bg-gray-100 text-sm text-gray-700"
                            >
                                Edit Profile
                            </Link>
                            <hr className="my-1" />

                            {/* Notifications */}
                            <div className="px-4 py-1 text-xs font-semibold text-gray-500">
                                Notifications
                            </div>
                            {notifications.length > 0 ? (
                                notifications.slice(0, 3).map((notif) => (
                                    <div
                                        key={notif._id}
                                        className={`px-4 py-1 text-sm truncate hover:bg-gray-100 ${
                                            notif.isRead
                                                ? "text-gray-500"
                                                : "text-black font-medium"
                                        }`}
                                    >
                                        {notif.message}
                                    </div>
                                ))
                            ) : (
                                <div className="px-4 py-1 text-sm text-gray-400">
                                    No notifications
                                </div>
                            )}

                            {/* Messages */}
                            <div className="px-4 pt-3 text-xs font-semibold text-gray-500">
                                Messages
                            </div>
                            {conversations.length > 0 ? (
                                conversations.map((convo) => (
                                    <Link
                                        key={convo._id}
                                        to={`/messenger/${convo._id}`}
                                        className="block px-4 py-1 text-sm hover:bg-gray-100 truncate text-gray-700"
                                    >
                                        Chat with{" "}
                                        {convo.members.find(
                                            (id) => id !== userId
                                        )}
                                    </Link>
                                ))
                            ) : (
                                <div className="px-4 py-1 text-sm text-gray-400">
                                    No recent messages
                                </div>
                            )}

                            <hr className="my-2" />
                            <button
                                onClick={handleSignOut}
                                className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm text-red-600"
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
