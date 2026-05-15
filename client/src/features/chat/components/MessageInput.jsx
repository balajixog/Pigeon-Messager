import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

function MessageInput({ onSend, onTyping }) {
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [focused, setFocused] = useState(false);

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

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <motion.div
      animate={{
        boxShadow: focused
          ? "0 0 0 1.5px rgba(255,255,255,0.15)"
          : "0 0 0 1px rgba(255,255,255,0.06)",
      }}
      transition={{ duration: 0.15 }}
      className="flex items-center gap-2 bg-zinc-900 rounded-xl px-3 py-2"
    >
      <input
        className="flex-1 bg-transparent text-sm text-white placeholder:text-zinc-500 outline-none"
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
          setIsTyping(true);
        }}
        onKeyDown={handleKeyDown}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder="Type a message..."
      />

      <AnimatePresence>
        {input.trim() && (
          <motion.button
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            onClick={handleSend}
            className="w-8 h-8 rounded-lg bg-white text-black flex items-center justify-center shrink-0 hover:bg-zinc-200 transition-colors"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 2L11 13" />
              <path d="M22 2L15 22 11 13 2 9l20-7z" />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default MessageInput;
