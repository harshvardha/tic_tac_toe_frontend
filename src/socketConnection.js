import { io } from "socket.io-client";

let isSocketConnected = false;
const socket = io("http://localhost:5000", {
    autoConnect: true
});

socket.on("connect", () => {
    isSocketConnected = true;
});

export { socket, isSocketConnected };