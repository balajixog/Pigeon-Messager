function ChatSidebar() {
  return (
    <div>
      <h1
        className="
            text-2xl
            font-bold
            mb-5
          "
      >
        Pigeon
      </h1>

      <div
        className="
            space-y-2
          "
      >
        <div
          className="
              p-3
              rounded-lg
              bg-zinc-800
              cursor-pointer
            "
        >
          General Chat
        </div>
      </div>
    </div>
  );
}

export default ChatSidebar;
