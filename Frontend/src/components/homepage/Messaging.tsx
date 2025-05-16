import { useState } from "react";

const Messaging = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<string[]>([]);
  const [newMessage, setNewMessage] = useState("");

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSend = () => {
    if (newMessage.trim()) {
      setMessages((prev) => [...prev, newMessage]);
      setNewMessage("");
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={toggleDropdown}
        className="bg-[#EAE4D5] text-white px-4 py-2 rounded-full shadow-lg hover:bg-[#B6B09F]"
      >
        💬 Chats
      </button>
      {isOpen && (
        <div className="mt-2 w-100 h-200 bg-[#F2F2F2] rounded-lg shadow-sm flex border border-gray-300 flex-col">
          <div className="p-3 bg-[#B6B09F] text-black-800 font-semibold rounded-t-lg flex justify-between items-center">
            <span>Chat</span>
            <button
              onClick={toggleDropdown}
              className="text-sm text-red-500 hover:underline"
            >
              Close
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {messages.length === 0 ? (
              <p className="text-gray-500 text-sm">No messages yet.</p>
            ) : (
              messages.map((msg, idx) => (
                <div
                  key={idx}
                  className="bg-green-50 border border-green-200 p-2 rounded text-sm"
                >
                  {msg}
                </div>
              ))
            )}
          </div>

          <div className="p-3 border-t border-gray-300 flex items-center space-x-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Type a message..."
              className="flex-1 p-2 border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-green-200"
            />
            <button
              onClick={handleSend}
              className="bg-green-500 border-gray-300 text-white px-3 py-2 rounded hover:bg-green-600"
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
