import React, { useEffect, useState } from "react";
import io from "socket.io-client";

interface User {
  _id: string;
  name: string;
  email: string;
  Email: string;
}

interface Message {
  _id: string;
  conversationId: string;
  senderId: string;
  receiverId: string;
  text: string;
  createdAt: string;
  fromSelf?: boolean;
}

interface Conversation {
  _id: string;
  participants: string[];
  lastMessage?: {
    text: string;
    senderId: string;
    createdAt: string;
  };
}

const socket = io("http://localhost:5000"); // adjust if needed

const Messaging = ({ userId }: { userId: string }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const [conversation, setConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageInput, setMessageInput] = useState("");
  const [conversationList, setConversationList] = useState<Conversation[]>([]);

  // Load messages when a conversation is selected
  useEffect(() => {
    if (!conversation || !conversation._id) return;

    fetch(`http://localhost:5000/api/chat/messages/${conversation._id}`)
      .then((res) => res.json())
      .then((msgs: Message[]) => {
        const markedMsgs = msgs.map((m) => ({
          ...m,
          fromSelf: m.senderId === userId,
        }));
        setMessages(markedMsgs);
      })
      .catch(console.error);
  }, [conversation, userId]);

  // Setup socket listeners
  useEffect(() => {
    if (!userId) return;
    socket.emit("joinRoom", userId);

    socket.on("receiveMessage", ({ message }: { message: Message }) => {
      if (message.conversationId === conversation?._id) {
        setMessages((prev) => [
          ...prev,
          { ...message, fromSelf: message.senderId === userId },
        ]);
      }
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [userId, conversation]);

  // Load conversation list
  useEffect(() => {
    if (!userId) return;
    fetch(`http://localhost:5000/api/chat/conversations/${userId}`)
      .then((res) => res.json())
      .then((convos: Conversation[]) => {
        setConversationList(convos);
      })
      .catch(console.error);
  }, [userId]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    if (term.trim().length === 0) {
      setSearchResults([]);
      setShowDropdown(false);
      return;
    }

    fetch(
      `http://localhost:5000/api/userauth/search?query=${encodeURIComponent(
        term
      )}&userId=${userId}`
    )
      .then((res) => res.json())
      .then((users: User[]) => {
        setSearchResults(users);
        setShowDropdown(true);
      });
  };

  const handleUserClick = async (user: User) => {
    setShowDropdown(false);
    setSearchTerm(user.name);

    try {
      const res = await fetch("http://localhost:5000/api/chat/conversation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          senderId: userId,
          receiverId: user._id,
        }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error("Backend error:", errorText);
        return;
      }

      const convo: Conversation = await res.json();
      setConversation(convo);
      setMessages([]);
    } catch (err) {
      console.error("Failed to create/get conversation", err);
    }
  };

  const handleSendMessage = () => {
    if (!messageInput.trim() || !conversation) return;

    const messageData = {
      conversationId: conversation._id,
      senderId: userId,
      receiverId: conversation.participants.find((p) => p !== userId) || "",
      text: messageInput.trim(),
    };

    socket.emit("sendMessage", messageData);

    const tempMessage: Message = {
      _id: `temp-${Date.now()}`,
      ...messageData,
      createdAt: new Date().toISOString(),
      fromSelf: true,
    };

    setMessages((prev) => [...prev, tempMessage]);
    setMessageInput("");
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Messaging</h2>

      {/* Conversation List */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Your Chats</h3>
        <ul className="space-y-2">
          {conversationList.map((convo) => {
            const otherUserId = convo.participants.find((id) => id !== userId);

            return (
              <li
                key={convo._id}
                onClick={() => setConversation(convo)}
                className="cursor-pointer px-4 py-2 border border-gray-200 rounded hover:bg-gray-100"
              >
                <p className="font-medium text-sm">
                  Chat with user ID: {otherUserId}
                </p>
                {convo.lastMessage && (
                  <p className="text-xs text-gray-600 truncate">
                    {convo.lastMessage.text}
                  </p>
                )}
              </li>
            );
          })}
        </ul>
      </div>

      {/* User Search */}
      <div className="relative mb-4">
        <input
          type="text"
          placeholder="Search user by name or email"
          value={searchTerm}
          onChange={handleSearchChange}
          onFocus={() => searchResults.length > 0 && setShowDropdown(true)}
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {showDropdown && searchResults.length > 0 && (
          <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md max-h-60 overflow-y-auto mt-1 shadow-lg">
            {searchResults.map((user) => (
              <li
                key={user._id}
                onClick={() => handleUserClick(user)}
                className="cursor-pointer px-4 py-2 hover:bg-blue-100"
              >
                <p className="font-semibold">{user.name}</p>
                <p className="text-sm text-gray-600">{user.Email}</p>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Chat Window */}
      {conversation && (
        <div className="flex flex-col h-[400px] border border-gray-300 rounded-md p-4">
          <h3 className="text-xl font-medium mb-2">Conversation</h3>
          <div className="flex-grow overflow-y-auto mb-4 space-y-2">
            {messages.map((msg) => (
              <div
                key={msg._id}
                className={`flex flex-col max-w-[70%] ${
                  msg.fromSelf ? "self-end items-end" : "self-start items-start"
                }`}
              >
                <div
                  className={`px-4 py-2 rounded-2xl break-words ${
                    msg.fromSelf
                      ? "bg-green-200 text-gray-900"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {msg.text}
                </div>
                <span className="text-xs text-gray-500 mt-1">
                  {new Date(msg.createdAt).toLocaleTimeString()}
                </span>
              </div>
            ))}
          </div>

          {/* Message input */}
          <div className="flex gap-2">
            <input
              type="text"
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSendMessage();
              }}
              placeholder="Type your message"
              className="flex-grow border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              onClick={handleSendMessage}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Messaging;
