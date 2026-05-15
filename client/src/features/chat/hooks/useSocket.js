import { useEffect, useState } from "react";
import stompClient from "@/websocket/socket";

function useSocket(currentUser) {
  const [messages, setMessages] = useState([]);
  const [typingUser, setTypingUser] = useState("");

  useEffect(() => {
    let messageSub;
    let typingSub;

    stompClient.onConnect = () => {
      console.log("Connected");
      // MESSAGE SUBSCRIPTION
      messageSub = stompClient.subscribe("/topic/messages", (message) => {
        const newMessage = JSON.parse(message.body);
        setMessages((prev) => {
          const pendingIndex = prev.findIndex(
            (msg) => msg.clientId === newMessage.clientId && msg.pending,
          );
          // REPLACE OPTIMISTIC
          if (pendingIndex !== -1) {
            const updated = [...prev];
            updated[pendingIndex] = {
              ...newMessage,
              pending: false,
            };
            return updated;
          }
          // PREVENT DUPLICATES
          const alreadyExists = prev.some(
            (msg) => msg.clientId === newMessage.clientId && !msg.pending,
          );
          if (alreadyExists) return prev;
          return [
            ...prev,
            {
              ...newMessage,
              pending: false,
            },
          ];
        });
      });
      // TYPING SUBSCRIPTION
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
        sender: currentUser,
        content: message,
        type: "CHAT",
      }),
    });
  };

  const sendTyping = (typing) => {
    if (!stompClient.connected) return;
    stompClient.publish({
      destination: "/app/chat.typing",
      body: JSON.stringify({
        sender: currentUser,
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
