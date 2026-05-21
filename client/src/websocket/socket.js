import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

export function createStompClient() {
  const token = localStorage.getItem("token");
  return new Client({
    webSocketFactory: () => new SockJS("http://localhost:8080/ws"),
    connectHeaders: {
      Authorization: `Bearer ${token}`,
    },
    reconnectDelay: 5000,
    debug: (str) => console.log(str),
  });
}
