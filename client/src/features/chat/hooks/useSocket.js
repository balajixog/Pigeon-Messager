import { useEffect, useState } from "react";
import stompClient from "@/websocket/socket";
import api from "../../../api/axios";

function useSocket(currentUser) {
  const [messages, setMessages] = useState([]);
  const [typingUser, setTypingUser] = useState("");

  useEffect(() => {
    let messageSub;
    let typingSub;

    const fetchMessages = async () => {
      try {
        const response = await api.get("/messages");
        setMessages(
          response.data.map((msg) => ({
            ...msg,
            pending: false,
          })),
        );
      } catch (error) {
        console.error("Failed to load messages", error);
      }
    };

    fetchMessages();

    stompClient.onConnect = () => {
      console.log("Connected");

      messageSub = stompClient.subscribe("/topic/messages", (message) => {
        const newMessage = JSON.parse(message.body);
        setMessages((prev) => {
          const pendingIndex = prev.findIndex(
            (msg) => msg.clientId === newMessage.clientId && msg.pending,
          );
          if (pendingIndex !== -1) {
            const updated = [...prev];
            updated[pendingIndex] = { ...newMessage, pending: false };
            return updated;
          }
          const alreadyExists = prev.some(
            (msg) => msg.clientId === newMessage.clientId && !msg.pending,
          );
          if (alreadyExists) return prev;
          return [...prev, { ...newMessage, pending: false }];
        });
      });

      typingSub = stompClient.subscribe("/topic/typing", (message) => {
        const data = JSON.parse(message.body);
        if (data.typing && data.sender !== currentUser) {
          setTypingUser(data.sender);
        } else {
          setTypingUser("");
        }
      });
    };

    stompClient.activate();

    return () => {
      if (messageSub) messageSub.unsubscribe();
      if (typingSub) typingSub.unsubscribe();
      stompClient.deactivate();
    };
  }, [currentUser]);

  const sendMessage = (message) => {
    if (!message.trim()) return;
    if (!stompClient.connected) return;

    const clientId = crypto.randomUUID();

    // optimistic message — sender shown locally, backend confirms real sender
    const optimisticMessage = {
      clientId,
      sender: currentUser,
      content: message,
      type: "CHAT",
      pending: true,
    };

    setMessages((prev) => [...prev, optimisticMessage]);

    stompClient.publish({
      destination: "/app/chat.send",
      body: JSON.stringify({
        clientId,
        content: message,
        type: "CHAT",
        // sender removed — backend sets it from JWT
      }),
    });
  };

  const sendTyping = (typing) => {
    if (!stompClient.connected) return;
    stompClient.publish({
      destination: "/app/chat.typing",
      body: JSON.stringify({
        typing,
        // sender removed — backend sets it from JWT
      }),
    });
  };

  return { messages, sendMessage, typingUser, sendTyping };
}

export default useSocket;
