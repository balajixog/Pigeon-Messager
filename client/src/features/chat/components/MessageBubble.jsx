function MessageBubble({ msg }) {
  return (
    <div className="bg-zinc-800 text-white p-3 rounded-lg">
      <p className="font-semibold">{msg.sender}</p>

      <p>{msg.content}</p>
    </div>
  );
}

export default MessageBubble;
