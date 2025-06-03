<<<<<<< HEAD
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
=======
interface Message {
  from: string;
  to: string;
>>>>>>> 68c342b1b5ecb45ccec3cf8954896021fb375a7f
  text: string;
  timestamp?: string;
}

<<<<<<< HEAD
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
=======
export default Message;
>>>>>>> 68c342b1b5ecb45ccec3cf8954896021fb375a7f
