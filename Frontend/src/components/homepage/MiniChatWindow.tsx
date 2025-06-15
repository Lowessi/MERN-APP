import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";

const socket = io(import.meta.env.VITE_RENDER_URL || "http://localhost:5000");

interface MiniChatProps {
    conversation: any;
    currentUserId: string;
    onClose: () => void;
}

const RENDER_URL = import.meta.env.VITE_RENDER_URL || "http://localhost:5000";

const MiniChatWindow: React.FC<MiniChatProps> = ({
    conversation,
    currentUserId,
    onClose,
}) => {
    const [messages, setMessages] = useState<any[]>([]);
    const [input, setInput] = useState("");
    const chatBoxRef = useRef<HTMLDivElement>(null);
    const [otherUserName, setOtherUserName] = useState("");

    useEffect(() => {
        fetch(`${RENDER_URL}/api/chat/messages/${conversation._id}`)
            .then((res) => res.json())
            .then((data) => {
                const msgs = data.map((msg: any) => ({
                    ...msg,
                    fromSelf: msg.senderId === currentUserId,
                }));
                setMessages(msgs);
            });

        const otherUserId = conversation.participants.find(
            (id: string) => id !== currentUserId
        );
        fetch(`${RENDER_URL}/api/userauth/${otherUserId}`)
            .then((res) => res.json())
            .then((user) => setOtherUserName(user.name || otherUserId));

        socket.emit("joinRoom", currentUserId);

        socket.on("receiveMessage", ({ message }) => {
            if (message.conversationId === conversation._id) {
                setMessages((prev) => [
                    ...prev,
                    {
                        ...message,
                        fromSelf: message.senderId === currentUserId,
                    },
                ]);
            }
        });

        return () => {
            socket.off("receiveMessage");
        };
    }, [conversation._id, currentUserId]);

    useEffect(() => {
        if (chatBoxRef.current) {
            chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSend = () => {
        if (!input.trim()) return;

        const message = {
            conversationId: conversation._id,
            senderId: currentUserId,
            receiverId: conversation.participants.find(
                (id: string) => id !== currentUserId
            ),
            text: input,
        };

        socket.emit("sendMessage", message);

        setMessages((prev) => [
            ...prev,
            {
                ...message,
                fromSelf: true,
                createdAt: new Date().toISOString(),
                _id: `temp-${Date.now()}`,
            },
        ]);
        setInput("");
    };

    return (
        <div className="w-80 h-96 bg-[#1E222B] text-white rounded-2xl shadow-2xl border border-[#343941] right-6 mb-4 flex flex-col relative">
            {/* Header */}
            <div className="bg-[#343941] text-[#DED1B6] px-4 py-2 rounded-t-2xl flex justify-between items-center text-sm font-semibold">
                <span>Chat with: {otherUserName}</span>
                <button
                    onClick={onClose}
                    className="text-[#DED1B6] hover:text-[#948978]"
                >
                    ✕
                </button>
            </div>

            {/* Messages */}
            <div
                ref={chatBoxRef}
                className="flex-1 overflow-y-auto p-3 space-y-2 text-sm"
            >
                {messages.map((msg) => (
                    <div
                        key={msg._id}
                        className={`flex flex-col ${
                            msg.fromSelf ? "items-end" : "items-start"
                        }`}
                    >
                        <div
                            className={`px-3 py-2 rounded-xl max-w-[80%] ${
                                msg.fromSelf
                                    ? "bg-[#DED1B6] text-[#1E222B]"
                                    : "bg-[#343941] text-white"
                            }`}
                        >
                            {msg.text}
                        </div>
                        <span className="text-[10px] text-gray-400">
                            {new Date(msg.createdAt).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                            })}
                        </span>
                    </div>
                ))}
            </div>

            {/* Input */}
            <div className="p-2 flex gap-2 items-center border-t border-[#343941] text-sm bg-[#1E222B]">
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                    placeholder="Type a message"
                    className="flex-1 border border-[#DED1B6] bg-[#343941] text-white px-3 py-1 rounded-xl placeholder:text-[#DED1B6]"
                />
                <button
                    onClick={handleSend}
                    className="bg-[#DED1B6] hover:bg-[#948978] text-[#1E222B] font-semibold px-4 py-1 rounded-xl"
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default MiniChatWindow;
