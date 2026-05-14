import { useEffect, useState } from "react";

import stompClient from "@/websocket/socket";

function useSocket() {
  const [messages, setMessages] = useState([]);
  const [typingUser, setTypingUser] = useState("");

  useEffect(() => {
    stompClient.onConnect = () => {
      console.log("Connected");
      stompClient.subscribe("/topic/messages", (message) => {
        const newMessage = JSON.parse(message.body);

        setMessages((prev) => {
          const pendingIndex = prev.findIndex(
            (msg) => msg.clientId === newMessage.clientId && msg.pending,
          );

          if (pendingIndex !== -1) {
            // Replace optimistic message with confirmed one
            const updated = [...prev];
            updated[pendingIndex] = { ...newMessage, pending: false };
            return updated;
          }

          // Reject duplicate confirmed messages (same clientId already exists)
          const alreadyExists = prev.some(
            (msg) => msg.clientId === newMessage.clientId && !msg.pending,
          );
          if (alreadyExists) return prev; // ← drop it

          return [...prev, { ...newMessage, pending: false }];
        });
      });
      stompClient.subscribe("/topic/typing", (message) => {
        const data = JSON.parse(message.body);
        if (data.typing && data.sender !== "Balaji") {
          setTypingUser(data.sender);
        } else {
          setTypingUser("");
        }
      });
    };

    stompClient.activate();

    return () => {
      stompClient.deactivate();
    };
  }, []);

  const sendMessage = (message) => {
    if (!message.trim()) return;

    if (!stompClient.connected) return;

    // UNIQUE TEMP ID

    const clientId = crypto.randomUUID();

    // OPTIMISTIC LOCAL MESSAGE

    const optimisticMessage = {
      clientId,

      sender: "Balaji",

      content: message,

      type: "CHAT",

      pending: true,
    };

    // INSTANT UI

    setMessages((prev) => [...prev, optimisticMessage]);

    // SEND TO SERVER

    stompClient.publish({
      destination: "/app/chat.send",

      body: JSON.stringify({
        clientId,

        sender: "Balaji",

        content: message,

        type: "CHAT",
      }),
    });
  };
  const sendTyping = (typing) => {
    if (!stompClient.connected)
      return;
    stompClient.publish({
      destination: "/app/chat.typing", 
      body: JSON.stringify({
        sender: "Balaji",
        typing,
      }),
    });
  };

  return {
    messages,
    sendMessage,
    typingUser,
    sendTyping,
  };
}

export default useSocket;
