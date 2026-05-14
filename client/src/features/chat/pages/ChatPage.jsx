import ChatLayout from "../components/ChatLayout";
import ChatSidebar from "../components/ChatSidebar";
import ChatHeader from "../components/ChatHeader";
import MessageBubble from "../components/MessageBubble";
import MessageInput from "../components/MessageInput";
import useSocket from "../hooks/useSocket";
import TypingIndicator from "../components/TypingIndicator";

function ChatPage() {
  const { messages, sendMessage, typingUser, sendTyping } = useSocket();

  return (
    <ChatLayout sidebar={<ChatSidebar />} header={<ChatHeader />}>
      <div
        className="
          flex
          flex-col
          h-full
        "
      >
        <div
          className="
            flex-1
            space-y-2
          "
        >
          {messages.map((msg, index) => (
            <MessageBubble key={index} msg={msg} />
          ))}
        </div>
        {typingUser && <TypingIndicator username={typingUser} />}

        <MessageInput onSend={sendMessage} onTyping={sendTyping} />
      </div>
    </ChatLayout>
  );
}

export default ChatPage;
