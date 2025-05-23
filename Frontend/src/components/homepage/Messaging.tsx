import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import socket from "../../socket";
import Message from "../../interfaces/Message";

interface Prop {
  recipientId: string;
}

function Messaging({ recipientId }: Prop) {
  const { user } = useContext(AuthContext) || {}; // ✅ grab user from AuthContext
  const [messages, setMessages] = useState<Message[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    socket.emit("user-connected", user?.id);

    socket.on("receive-message", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.off("receive-message");
    };
  }, []);

  const sendMessage = () => {
    if (!inputRef.current || !user) return;

    const text = inputRef.current.value;
    const message = { from: user.id, to: recipientId, text };
    socket.emit("send-message", message);
    setMessages((prev) => [...prev, message]);
    inputRef.current.value = "";
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Chat</h2>
      <div
        style={{
          border: "1px solid #ccc",
          height: "300px",
          overflowY: "scroll",
          padding: "10px",
          marginBottom: "10px",
        }}
      >
        {messages.map((msg: Message, idx) => (
          <div key={idx}>
            <b>{msg.from === user?.id ? "You" : msg.from}:</b> {msg.text}
          </div>
        ))}
      </div>
      <input ref={inputRef} placeholder="Type your message..." />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default Messaging;
