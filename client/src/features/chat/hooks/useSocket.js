import { useEffect, useState } from "react";

import stompClient from "@/websocket/socket";

function useSocket() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    stompClient.onConnect = () => {
      console.log("Connected");

      stompClient.subscribe("/topic/messages", (message) => {
        const newMessage = JSON.parse(message.body);

        setMessages((prev) => [...prev, newMessage]);
      });
    };

    stompClient.activate();

    return () => {
      stompClient.deactivate();
    };
  }, []);

  const sendMessage = (message) => {
    if (!message.trim()) return;

    stompClient.publish({
      destination: "/app/chat.send",

      body: JSON.stringify({
        sender: "Balaji",
        content: message,
        type: "CHAT",
      }),
    });
  };

  return {
    messages,
    sendMessage,
  };
}

export default useSocket;
