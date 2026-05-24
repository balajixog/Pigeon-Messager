import { useEffect, useState, useRef } from "react";
import { createStompClient } from "@/websocket/socket";
import api from "../../../api/axios";

function useSocket(currentUser) {
  const [messages, setMessages] = useState([]);
  const [typingUser, setTypingUser] = useState("");
  const [users, setUsers] = useState([]); // ← online status
  const clientRef = useRef(null);

  useEffect(() => {
    if (!currentUser) return;

    let messageSub;
    let typingSub;
    let onlineSub;

    const stompClient = createStompClient();
    clientRef.current = stompClient;

    // fetch messages + users in parallel
    const init = async () => {
      try {
        const [messagesRes, usersRes] = await Promise.all([
          api.get("/messages"),
          api.get("/user"),
        ]);
        setMessages(
          messagesRes.data.map((msg) => ({ ...msg, pending: false })),
        );
        setUsers(usersRes.data);
      } catch (error) {
        console.error("Init failed", error);
      }
    };

    init();

    stompClient.onConnect = () => {
      console.log("Connected");

      // messages
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

      // typing
      typingSub = stompClient.subscribe("/topic/typing", (message) => {
        const data = JSON.parse(message.body);
        if (data.typing && data.sender !== currentUser) {
          setTypingUser(data.sender);
        } else {
          setTypingUser("");
        }
      });

      // online status — instant updates
      onlineSub = stompClient.subscribe("/topic/online", (message) => {
        const { username, online } = JSON.parse(message.body);
        setUsers((prev) =>
          prev.map((u) => (u.username === username ? { ...u, online } : u)),
        );
      });
    };

    stompClient.activate();

    return () => {
      if (messageSub) messageSub.unsubscribe();
      if (typingSub) typingSub.unsubscribe();
      if (onlineSub) onlineSub.unsubscribe();
      stompClient.deactivate();
    };
  }, [currentUser]);

  const sendMessage = (message) => {
    const stompClient = clientRef.current;
    if (!message.trim()) return;
    if (!stompClient?.connected) return;

    const clientId = crypto.randomUUID();

    setMessages((prev) => [
      ...prev,
      {
        clientId,
        sender: currentUser,
        content: message,
        type: "CHAT",
        pending: true,
      },
    ]);

    stompClient.publish({
      destination: "/app/chat.send",
      body: JSON.stringify({ clientId, content: message, type: "CHAT" }),
    });
  };

  const sendTyping = (typing) => {
    const stompClient = clientRef.current;
    if (!stompClient?.connected) return;
    stompClient.publish({
      destination: "/app/chat.typing",
      body: JSON.stringify({ typing }),
    });
  };

  return { messages, sendMessage, typingUser, sendTyping, users };
}

export default useSocket;
