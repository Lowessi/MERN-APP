// types/Message.ts
export interface Message {
  _id?: string;
  sender: {
    _id: string;
    Email: string;
  };
  receiver: {
    _id: string;
    Email: string;
  };
  text: string;
  createdAt: string;
}
