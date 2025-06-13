import { io } from "socket.io-client";
const RENDER_URL=import.meta.env.BASE_URL||"http://localhost:5000"
const socket = io(RENDER_URL); 
export default socket;
