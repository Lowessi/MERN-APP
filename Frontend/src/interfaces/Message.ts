// types/Message.ts
export interface Message {
  _id: string;
  sender: {
    _id: string;
    Email: string;
  };
  receiver: {
    _id: string;
    Email: string;
  };

  text: string;
  timestamp?: string;
}

// src/types/chat.ts

export interface User {
  _id: string;
  Email: string;
}

export interface Message {
  _id: string;
  text: string;
  senderId: string;
  conversationId: string;
}

export interface Conversation {
  _id: string;
  participants: User[];
  lastMessage?: Message;
}
export default Message;
