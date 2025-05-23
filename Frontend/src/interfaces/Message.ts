interface Message {
  from: string;
  to: string;
  text: string;
  timestamp?: string;
}

export default Message;