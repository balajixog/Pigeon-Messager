import { useEffect, useRef } from "react";
import ChatLayout from "../components/ChatLayout";
import ChatSidebar from "../components/ChatSidebar";
import ChatHeader from "../components/ChatHeader";
import MessageBubble from "../components/MessageBubble";
import MessageInput from "../components/MessageInput";
import useSocket from "../hooks/useSocket";
import TypingIndicator from "../components/TypingIndicator";
import useAuth from "@/features/auth/hooks/useAuth";

function ChatPage() {
  const { user, loading, logout } = useAuth();
  const currentUser = user?.username || "";
  const { messages, sendMessage, typingUser, sendTyping, users } =
    useSocket(currentUser);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (loading) {
    return (
      <div className="h-screen bg-zinc-950 flex items-center justify-center text-zinc-400">
        Loading...
      </div>
    );
  }

  return (
    <ChatLayout
      sidebar={<ChatSidebar user={user} users={users} />}
      header={<ChatHeader user={user} logout={logout} users={users} />}
    >
      <div className="flex flex-col h-full">
        <div className="flex flex-col gap-2 p-4 overflow-y-auto flex-1">
          {messages.map((msg) => (
            <MessageBubble
              key={msg.clientId || msg.timestamp}
              msg={msg}
              currentUser={currentUser}
            />
          ))}
          <div ref={bottomRef} />
        </div>
        {typingUser && <TypingIndicator username={typingUser} />}
        <MessageInput onSend={sendMessage} onTyping={sendTyping} />
      </div>
    </ChatLayout>
  );
}

export default ChatPage;
