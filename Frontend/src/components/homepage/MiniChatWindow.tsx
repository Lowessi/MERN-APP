import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

interface MiniChatProps {
  conversation: any;
  currentUserId: string;
  onClose: () => void;
}

const MiniChatWindow: React.FC<MiniChatProps> = ({
  conversation,
  currentUserId,
  onClose,
}) => {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const chatBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/chat/messages/${conversation._id}`)
      .then((res) => res.json())
      .then((data) => {
        const msgs = data.map((msg: any) => ({
          ...msg,
          fromSelf: msg.senderId === currentUserId,
        }));
        setMessages(msgs);
      });

    socket.emit("joinRoom", currentUserId);

    socket.on("receiveMessage", ({ message }) => {
      if (message.conversationId === conversation._id) {
        setMessages((prev) => [
          ...prev,
          { ...message, fromSelf: message.senderId === currentUserId },
        ]);
      }
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [conversation._id, currentUserId]);

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
      { ...message, fromSelf: true, createdAt: new Date().toISOString() },
    ]);
    setInput("");
  };

  return (
    <div className="w-80 h-100 bg-white rounded-lg shadow-md border right-5 flex flex-col relative">
      <div className="bg-green-600 text-white px-3 py-2 rounded-t-lg flex justify-between items-center text-sm">
        <span>Chat</span>
        <button onClick={onClose} className="text-white hover:text-red-200">
          ✕
        </button>
      </div>

      <div
        ref={chatBoxRef}
        className="flex-1 overflow-y-auto p-2 space-y-1 text-sm"
      >
        {messages.map((msg) => (
          <div
            key={msg._id || Math.random()}
            className={`flex flex-col ${
              msg.fromSelf ? "items-end" : "items-start"
            }`}
          >
            <div
              className={`px-3 py-1 rounded-lg max-w-[80%] ${
                msg.fromSelf ? "bg-green-100" : "bg-gray-200"
              }`}
            >
              {msg.text}
            </div>
            <span className="text-[10px] text-gray-500">
              {new Date(msg.createdAt).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
        ))}
      </div>

      <div className="p-2 flex gap-2 items-center border-t text-sm">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Type a message"
          className="flex-1 border px-2 py-1 rounded"
        />
        <button
          onClick={handleSend}
          className="bg-green-500 text-white px-2 py-1 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default MiniChatWindow;
