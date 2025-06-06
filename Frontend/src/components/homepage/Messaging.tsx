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

const Messaging = ({ userId }: { userId: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [conversationList, setConversationList] = useState<Conversation[]>([]);
  const [openChats, setOpenChats] = useState<Conversation[]>([]);

  useEffect(() => {
    fetch(`http://localhost:5000/api/chat/conversations/${userId}`)
      .then((res) => res.json())
      .then(setConversationList);
  }, [userId]);

  const handleUserClick = async (user: User) => {
    const res = await fetch("http://localhost:5000/api/chat/conversation", {
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
    fetch(
      `http://localhost:5000/api/userauth/search?query=${value}&userId=${userId}`
    )
      .then((res) => res.json())
      .then(setSearchResults);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="flex flex-row-reverse items-end gap-2 relative">
        {/* Messenger Button */}
        <div className="z-50">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="bg-blue-600 text-white px-4 py-2 rounded-full shadow-md text-sm"
          >
            {isOpen ? "Close Messenger" : "Open Messenger"}
          </button>

          {isOpen && (
            <div className="absolute bottom-12 right-0 w-72 bg-white p-3 rounded-lg shadow-lg text-sm border z-40">
              <input
                type="text"
                placeholder="Search users"
                value={searchTerm}
                onChange={handleSearch}
                className="w-full border px-2 py-1 rounded mb-2"
              />
              <ul className="max-h-40 overflow-y-auto mb-2">
                {searchResults.map((user) => (
                  <li
                    key={user._id}
                    onClick={() => handleUserClick(user)}
                    className="cursor-pointer hover:bg-blue-100 px-2 py-1 rounded"
                  >
                    {user.name}
                  </li>
                ))}
              </ul>

              <hr className="my-2" />

              <p className="font-semibold mb-1">Conversations:</p>
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
                      className="cursor-pointer hover:bg-gray-100 px-2 py-1 rounded"
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
            style={{ marginRight: `${(idx + 1) * 280}px` }}
            className="absolute bottom-0 right-0 z-40"
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
