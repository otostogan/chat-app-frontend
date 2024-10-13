import { io } from "socket.io-client";

const username = localStorage.getItem("username") || "";

const socket = io(import.meta.env.VITE_WS_URL, {
	query: {
		username: username,
	},
});

export default socket;
