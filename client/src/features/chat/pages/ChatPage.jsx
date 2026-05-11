import { useEffect, useState } from "react";
import stompClient from "@/websocket/socket";
import MessageBubble from "../components/MessageBubble";
import MessageInput from "../components/MessageInput";

function ChatPage() {
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

    setInput("");
  };

  return (
    <div className="p-5">
      <div className="space-y-2 mb-5">
        {messages.map((msg, index) => (
          <MessageBubble key={index} msg={msg} />
        ))}
      </div>

      <MessageInput onSend={sendMessage} />
    </div>
  );
}

export default ChatPage;
