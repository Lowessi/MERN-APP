import { io } from "socket.io-client";
const RENDER_URL = import.meta.env.RENDER_URL || "http://localhost:5000";
const socket = io(RENDER_URL);
export default socket;
