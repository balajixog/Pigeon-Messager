import { useState } from "react";

function MessageInput({ onSend }) {

  const [input, setInput] = useState("");

  const handleSend = () => {

    if (!input.trim()) return;

    onSend(input);

    setInput("");
  };

  return (
    <div className="flex gap-2">

      <input
        className="
          border
          p-2
          flex-1
          rounded-lg
        "
        value={input}
        onChange={(e) =>
          setInput(e.target.value)
        }

        placeholder="Type message..."
      />

      <button
        onClick={handleSend}
        className="
          bg-black
          text-white
          px-4
          rounded-lg
        "
      >
        Send
      </button>

    </div>
  );
}

export default MessageInput;