

function MessageBubble({ msg }) {

  return (

    <div
      className="
        bg-zinc-800
        text-white
        p-3
        rounded-lg
      "
    >

      <p className="font-semibold">
        {msg.sender}
      </p>

      <p>
        {msg.content}
      </p>

      <p
        className="
          text-xs
          text-zinc-400
          mt-1
        "
      >

        {msg.pending
          ? "Sending..."
          : "Sent"}

      </p>

    </div>
  );
}

export default MessageBubble;
