// MessageBubble.jsx
import { motion, AnimatePresence } from "motion/react";

function MessageBubble({ msg, currentUser }) {
  const isMine = msg.sender === currentUser;

  const formatTime = (timestamp) => {
    if (!timestamp) return "";
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 10, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
        className={`flex flex-col max-w-[70%] ${isMine ? "self-end items-end" : "self-start items-start"}`}
      >
        {!isMine && (
          <span className="text-xs font-semibold text-zinc-400 mb-1 ml-1">
            {msg.sender}
          </span>
        )}

        <div
          className={`
          relative px-4 py-2.5 rounded-2xl text-sm leading-relaxed shadow-md
          ${isMine ? "bg-zinc-900 text-white rounded-br-sm" : "bg-zinc-700 text-zinc-100 rounded-bl-sm"}
        `}
        >
          <p>{msg.content}</p>
        </div>

        {/* Timestamp + status row */}
        <div
          className={`flex items-center gap-1.5 mt-1 ${isMine ? "mr-1" : "ml-1"}`}
        >
          <span className="text-[10px] text-zinc-500">
            {formatTime(msg.timestamp)}
          </span>

          {isMine && (
            <motion.span
              key={msg.pending ? "pending" : "sent"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-[10px] text-zinc-500"
            >
              {msg.pending ? (
                <span className="flex items-center gap-1">
                  <motion.span
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    ●
                  </motion.span>
                  Sending
                </span>
              ) : (
                "· Sent"
              )}
            </motion.span>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default MessageBubble;
