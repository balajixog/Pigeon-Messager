import { useEffect, useState } from "react";

function MessageInput({
  onSend,

  onTyping,
}) {
  const [input, setInput] = useState("");

  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    let timeout;

    if (isTyping) {
      onTyping(true);

      timeout = setTimeout(() => {
        onTyping(false);

        setIsTyping(false);
      }, 1000);
    }

    return () => clearTimeout(timeout);
  }, [input]);

  const handleSend = () => {
    if (!input.trim()) return;

    onSend(input);

    onTyping(false);

    setInput("");

    setIsTyping(false);
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
        onChange={(e) => {
          setInput(e.target.value);

          setIsTyping(true);
        }}
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
