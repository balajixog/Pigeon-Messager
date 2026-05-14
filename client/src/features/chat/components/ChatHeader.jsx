function ChatHeader() {
  return (
    <div
      className="
          flex
          items-center
          justify-between
        "
    >
      <div>
        <h2 className="font-bold text-lg">General Chat</h2>

        <p
          className="
              text-sm
              text-zinc-400
            "
        >
          Online
        </p>
      </div>
    </div>
  );
}

export default ChatHeader;
