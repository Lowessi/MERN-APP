import React, { useEffect, useState } from "react";
import MiniChatWindow from "./MiniChatWindow";

interface User {
    _id: string;
    name: string;
    email: string;
    Email: string;
}

interface Conversation {
    _id: string;
    participants: string[];
}

const RENDER_URL = import.meta.env.RENDER_URL || "http://localhost:5000";

const Messaging = ({ userId }: { userId: string }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState<User[]>([]);
    const [conversationList, setConversationList] = useState<Conversation[]>([]);
    const [openChats, setOpenChats] = useState<Conversation[]>([]);

    useEffect(() => {
        fetch(`${RENDER_URL}/api/chat/conversations/${userId}`)
            .then((res) => res.json())
            .then(setConversationList);
    }, [userId]);

    const handleUserClick = async (user: User) => {
        const res = await fetch(RENDER_URL + "/api/chat/conversation", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ senderId: userId, receiverId: user._id }),
        });
        const convo = await res.json();
        if (!openChats.find((c) => c._id === convo._id)) {
            setOpenChats((prev) => [...prev, convo]);
        }
        setSearchResults([]);
        setSearchTerm("");
    };

    const closeChat = (id: string) => {
        setOpenChats((prev) => prev.filter((c) => c._id !== id));
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchTerm(value);
        if (value.trim() === "") return;
        fetch(`${RENDER_URL}/api/userauth/search?query=${value}&userId=${userId}`)
            .then((res) => res.json())
            .then(setSearchResults);
    };

    return (
        <div className="fixed bottom-15 right-2 z-50"> {/* lifted a bit */}
            <div className="flex flex-row-reverse items-end gap-2 relative">
                {/* Messenger Button */}
                <div className="z-50">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="bg-[#DED1B6] text-[#1E222B] font-semibold px-4 py-2 rounded-full shadow-lg hover:bg-[#948978] transition"
                    >
                        {isOpen ? "Close Messenger" : "Open Messenger"}
                    </button>

                    {isOpen && (
                        <div className="absolute bottom-12 right-0 w-72 bg-[#1E222B] p-3 rounded-lg shadow-2xl text-sm border border-[#343941] text-white z-40">
                            <input
                                type="text"
                                placeholder="Search users"
                                value={searchTerm}
                                onChange={handleSearch}
                                className="w-full border border-[#DED1B6] bg-[#343941] text-white px-2 py-1 rounded mb-2 placeholder:text-[#DED1B6]"
                            />
                            <ul className="max-h-40 overflow-y-auto mb-2">
                                {searchResults.map((user) => (
                                    <li
                                        key={user._id}
                                        onClick={() => handleUserClick(user)}
                                        className="cursor-pointer hover:bg-[#948978] px-2 py-1 rounded"
                                    >
                                        {user.name}
                                    </li>
                                ))}
                            </ul>

                            <hr className="my-2 border-[#DED1B6]" />

                            <p className="font-semibold mb-1 text-[#DED1B6]">Conversations:</p>
                            <ul className="space-y-1 max-h-40 overflow-y-auto">
                                {conversationList.map((convo) => {
                                    const otherUserId = convo.participants.find(
                                        (id) => id !== userId
                                    );
                                    return (
                                        <li
                                            key={convo._id}
                                            onClick={() =>
                                                !openChats.find((c) => c._id === convo._id) &&
                                                setOpenChats((prev) => [...prev, convo])
                                            }
                                            className="cursor-pointer hover:bg-[#343941] px-2 py-1 rounded text-white"
                                        >
                                            Chat with: {otherUserId}
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    )}
                </div>

                {/* Mini Chat Windows aligned to the left */}
                {openChats.map((convo, idx) => (
                    <div
                        key={convo._id}
                        style={{ marginRight: `${(idx + 1) * 315}px` }}
                        className="absolute bottom-10 right-0 z-40"
                    >
                        <MiniChatWindow
                            conversation={convo}
                            currentUserId={userId}
                            onClose={() => closeChat(convo._id)}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Messaging;
