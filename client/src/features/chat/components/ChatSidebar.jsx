// ChatSidebar.jsx
import { useState } from "react";
import { motion } from "motion/react";

const rooms = [
  { id: 1, name: "General Chat", unread: 3, active: true },
  { id: 2, name: "Design Talk", unread: 0, active: false },
  { id: 3, name: "Dev Corner", unread: 1, active: false },
];

function ChatSidebar() {
  const [active, setActive] = useState(1);

  return (
    <div className="flex flex-col h-full p-4">
      {/* Brand */}
      <div className="flex items-center gap-2 mb-6 px-1">
        <div className="w-7 h-7 rounded-lg bg-white flex items-center justify-center">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="black"
            strokeWidth="2.5"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        </div>
        <span className="text-lg font-bold tracking-tight">Pigeon</span>
      </div>

      {/* Section label */}
      <p className="text-[11px] font-semibold text-zinc-500 uppercase tracking-widest px-1 mb-2">
        Channels
      </p>

      {/* Room list */}
      <div className="space-y-0.5 flex-1">
        {rooms.map((room, i) => (
          <motion.button
            key={room.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            onClick={() => setActive(room.id)}
            className={`
              w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm
              transition-colors duration-150 text-left
              ${
                active === room.id
                  ? "bg-zinc-800 text-white"
                  : "text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200"
              }
            `}
          >
            <div className="flex items-center gap-2.5">
              <span className="text-zinc-500 text-base">#</span>
              <span className="font-medium">{room.name}</span>
            </div>
            {room.unread > 0 && (
              <span className="bg-white text-black text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {room.unread}
              </span>
            )}
          </motion.button>
        ))}
      </div>

      {/* User footer */}
      <div className="border-t border-zinc-800/60 pt-3 mt-3 flex items-center gap-3 px-1">
        <div className="w-8 h-8 rounded-full bg-zinc-700 flex items-center justify-center text-xs font-semibold shrink-0">
          B
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-zinc-200 truncate">Balaji</p>
          <p className="text-xs text-zinc-500">Online</p>
        </div>
        <button className="w-7 h-7 rounded-md hover:bg-zinc-800 flex items-center justify-center text-zinc-500 hover:text-zinc-300 transition-colors shrink-0">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default ChatSidebar;
