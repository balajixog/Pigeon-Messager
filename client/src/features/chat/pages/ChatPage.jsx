import MessageBubble from "../components/MessageBubble";
import MessageInput from "../components/MessageInput";
import useSocket from "../hooks/useSocket";

function ChatPage() {
  const { messages, sendMessage } = useSocket();

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
