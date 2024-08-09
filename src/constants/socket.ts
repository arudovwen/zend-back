import React from "react";
import io from "socket.io-client";

let token;
if (typeof window !== "undefined") {
  // Perform localStorage action
  token = localStorage.getItem("token");
}
const socketUrl = process.env.NEXT_PUBLIC_SOCKET_URL;
export const socket = io(`${socketUrl}`, {
  transports: ["websocket"],
  auth: {
    accessToken: token,
  },
});

export const changeSocket = io(`${socketUrl}/balance`, {
  auth: {
    accessToken: token,
  },
});

// @ts-ignore
export const SocketContext = React.createContext();
