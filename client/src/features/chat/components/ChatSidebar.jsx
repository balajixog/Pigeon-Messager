import { useState } from "react";
import { motion } from "motion/react";


const rooms = [
  { id: 1, name: "General Chat", unread: 0 },
  { id: 2, name: "Design Talk", unread: 3 },
  { id: 3, name: "Dev Corner", unread: 1 },
  { id: 4, name: "Product", unread: 0 },
];

const PigeonLogo = () => (
  <svg
    viewBox="148 178 394 210"
    xmlns="http://www.w3.org/2000/svg"
    width="100%"
    height="100%"
    style={{ display: "block" }}
  >
    <defs>
      <linearGradient id="pl-left-bubble" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#7C3AED" />
        <stop offset="100%" stopColor="#4C1D95" />
      </linearGradient>
      <linearGradient id="pl-right-bubble" x1="1" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#6366F1" />
        <stop offset="100%" stopColor="#312E81" />
      </linearGradient>
      <linearGradient id="pl-cube-top" x1="0.3" y1="0" x2="0.7" y2="1">
        <stop offset="0%" stopColor="#C4B5FD" />
        <stop offset="100%" stopColor="#8B5CF6" />
      </linearGradient>
      <linearGradient id="pl-cube-left" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#7C3AED" />
        <stop offset="100%" stopColor="#1E0A40" />
      </linearGradient>
      <linearGradient id="pl-cube-right" x1="1" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#4C1D95" />
        <stop offset="100%" stopColor="#0D0320" />
      </linearGradient>
      <linearGradient id="pl-shine" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="white" stopOpacity="0.08" />
        <stop offset="100%" stopColor="white" stopOpacity="0" />
      </linearGradient>
      <radialGradient id="pl-glow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.35" />
        <stop offset="100%" stopColor="#7C3AED" stopOpacity="0" />
      </radialGradient>
      <radialGradient id="pl-apex" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#DDD6FE" stopOpacity="0.7" />
        <stop offset="100%" stopColor="#7C3AED" stopOpacity="0" />
      </radialGradient>
    </defs>
    <ellipse cx="340" cy="270" rx="180" ry="130" fill="url(#pl-glow)" />
    <rect
      x="148"
      y="178"
      width="182"
      height="148"
      rx="36"
      fill="url(#pl-left-bubble)"
    />
    <rect
      x="148"
      y="178"
      width="182"
      height="148"
      rx="36"
      fill="url(#pl-shine)"
    />
    <path d="M 190,326 L 175,368 L 228,326" fill="url(#pl-left-bubble)" />
    <rect
      x="350"
      y="178"
      width="182"
      height="148"
      rx="36"
      fill="url(#pl-right-bubble)"
    />
    <rect
      x="350"
      y="178"
      width="182"
      height="148"
      rx="36"
      fill="url(#pl-shine)"
    />
    <path d="M 490,326 L 505,368 L 452,326" fill="url(#pl-right-bubble)" />
    <polygon
      points="340,220 410,258 340,296 270,258"
      fill="url(#pl-cube-top)"
    />
    <polygon
      points="270,258 340,296 340,366 270,328"
      fill="url(#pl-cube-left)"
    />
    <polygon
      points="410,258 340,296 340,366 410,328"
      fill="url(#pl-cube-right)"
    />
    <polyline
      points="270,258 340,220 410,258"
      fill="none"
      stroke="#EDE9FE"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <line
      x1="270"
      y1="258"
      x2="270"
      y2="328"
      stroke="#A78BFA"
      strokeWidth="0.9"
      strokeOpacity="0.8"
    />
    <line
      x1="410"
      y1="258"
      x2="410"
      y2="328"
      stroke="#6D28D9"
      strokeWidth="0.9"
      strokeOpacity="0.7"
    />
    <line
      x1="340"
      y1="296"
      x2="340"
      y2="366"
      stroke="#7C3AED"
      strokeWidth="0.8"
      strokeOpacity="0.6"
    />
    <polyline
      points="270,328 340,366 410,328"
      fill="none"
      stroke="#4C1D95"
      strokeWidth="0.9"
      strokeOpacity="0.7"
    />
    <ellipse cx="340" cy="220" rx="16" ry="16" fill="url(#pl-apex)" />
    <circle cx="340" cy="220" r="4" fill="#F0EEFF" />
    <circle cx="270" cy="258" r="2.8" fill="#C4B5FD" />
    <circle cx="410" cy="258" r="2.8" fill="#C4B5FD" />
    <circle cx="340" cy="366" r="3" fill="#3B0764" />
    <line
      x1="280"
      y1="238"
      x2="340"
      y2="278"
      stroke="white"
      strokeWidth="0.4"
      strokeOpacity="0.15"
    />
    <line
      x1="272"
      y1="258"
      x2="340"
      y2="275"
      stroke="white"
      strokeWidth="0.4"
      strokeOpacity="0.1"
    />
    <circle
      cx="340"
      cy="220"
      r="28"
      fill="none"
      stroke="#7C3AED"
      strokeWidth="0.5"
      strokeOpacity="0.22"
      strokeDasharray="2 6"
    />
    <rect
      x="148"
      y="178"
      width="182"
      height="148"
      rx="36"
      fill="none"
      stroke="#A78BFA"
      strokeWidth="1"
      strokeOpacity="0.2"
    />
    <rect
      x="350"
      y="178"
      width="182"
      height="148"
      rx="36"
      fill="none"
      stroke="#818CF8"
      strokeWidth="1"
      strokeOpacity="0.2"
    />
    <line
      x1="330"
      y1="178"
      x2="350"
      y2="178"
      stroke="#7C3AED"
      strokeWidth="2"
      strokeOpacity="0.6"
      strokeLinecap="round"
    />
    <circle cx="205" cy="252" r="8" fill="white" fillOpacity="0.06" />
    <circle cx="233" cy="252" r="8" fill="white" fillOpacity="0.06" />
    <circle cx="261" cy="252" r="8" fill="white" fillOpacity="0.06" />
    <circle cx="419" cy="252" r="8" fill="white" fillOpacity="0.06" />
    <circle cx="447" cy="252" r="8" fill="white" fillOpacity="0.06" />
    <circle cx="475" cy="252" r="8" fill="white" fillOpacity="0.06" />
  </svg>
);

const EditIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

const SearchIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const SettingsIcon = () => (
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
);

function ChatSidebar({ user, users = [] }) {
  const [activeRoom, setActiveRoom] = useState(1);
  const otherUsers = users.filter((u) => u.username !== user?.username);

  return (
    <div className="flex flex-col h-full">
      {/* Brand */}
      <div className="flex items-center gap-3 px-4 py-4 border-b border-zinc-800/50">
        <div className="w-9 h-9 rounded-xl overflow-hidden flex-shrink-0 bg-[#04040D]">
          <PigeonLogo />
        </div>
        <span className="flex-1 text-base font-semibold text-zinc-100 tracking-tight">
          Pigeon
        </span>
        <button
          className="w-7 h-7 rounded-md flex items-center justify-center text-zinc-400
          border border-zinc-700/60 hover:bg-zinc-800 hover:text-zinc-200 transition-colors flex-shrink-0"
          aria-label="New message"
        >
          <EditIcon />
        </button>
      </div>

      {/* Search */}
      <div className="px-3 pt-3 pb-1.5">
        <div
          className="flex items-center gap-2 bg-zinc-800/50 border border-zinc-700/40
          rounded-lg px-2.5 py-2 cursor-text"
        >
          <span className="text-zinc-500">
            <SearchIcon />
          </span>
          <span className="text-xs text-zinc-500 tracking-tight">
            Search...
          </span>
        </div>
      </div>

      {/* Channels label */}
      <p className="text-[10px] font-semibold text-zinc-600 uppercase tracking-widest px-4 pt-3 pb-1.5">
        Channels
      </p>

      {/* Room list */}
      <div className="flex-1 px-1.5 flex flex-col gap-px overflow-y-auto">
        {rooms.map((room, i) => (
          <motion.button
            key={room.id}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.04, duration: 0.2 }}
            onClick={() => setActiveRoom(room.id)}
            className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg
              text-left border transition-colors duration-150
              ${
                activeRoom === room.id
                  ? "bg-zinc-800/70 border-zinc-700/40 text-zinc-100"
                  : "border-transparent text-zinc-400 hover:bg-zinc-800/40 hover:text-zinc-200"
              }`}
          >
            <div className="flex items-center gap-2 min-w-0">
              <span
                className={`text-sm flex-shrink-0 ${activeRoom === room.id ? "text-zinc-400" : "text-zinc-600"}`}
              >
                #
              </span>
              <span
                className={`text-sm truncate tracking-tight ${activeRoom === room.id ? "font-medium" : "font-normal"}`}
              >
                {room.name}
              </span>
            </div>
            {room.unread > 0 && (
              <span
                className="text-[10px] font-semibold min-w-[18px] h-[18px] rounded-md
                bg-zinc-700 border border-zinc-600/50 text-zinc-300
                flex items-center justify-center px-1 flex-shrink-0 tabular-nums"
              >
                {room.unread}
              </span>
            )}
          </motion.button>
        ))}
      </div>

      {/* Divider */}
      <div className="h-px bg-zinc-800/50 mx-3 my-2" />

      {/* DMs label */}
      <p className="text-[10px] font-semibold text-zinc-600 uppercase tracking-widest px-4 pb-1.5">
        Direct Messages
      </p>

      {/* DM list */}
      <div className="px-1.5 flex flex-col gap-px mb-1">
        {otherUsers.length === 0 && (
          <p className="text-[11px] text-zinc-600 px-3 py-1">
            No other users yet
          </p>
        )}
        {otherUsers.map((u, i) => (
          <motion.button
            key={u.username}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.16 + i * 0.04, duration: 0.2 }}
            className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg
              text-left text-zinc-400 hover:bg-zinc-800/40 hover:text-zinc-200
              transition-colors duration-150"
          >
            <div className="relative flex-shrink-0">
              <div
                className="w-6 h-6 rounded-full bg-zinc-800 border border-zinc-700/60
                flex items-center justify-center text-[10px] font-medium text-zinc-400"
              >
                {u.username[0].toUpperCase()}
              </div>
              <span
                className={`absolute -bottom-px -right-px w-2 h-2 rounded-full
                border-[1.5px] border-zinc-900
                ${u.online ? "bg-emerald-500" : "bg-zinc-600"}`}
              />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-sm tracking-tight truncate">
                {u.username}
              </span>
              <span
                className={`text-[10px] ${u.online ? "text-emerald-500" : "text-zinc-600"}`}
              >
                {u.online ? "online" : "offline"}
              </span>
            </div>
          </motion.button>
        ))}
      </div>

      {/* User footer */}
      <div className="border-t border-zinc-800/50 px-3.5 py-3 flex items-center gap-2.5">
        <div
          className="w-8 h-8 rounded-lg bg-zinc-800 border border-zinc-700/60
          flex items-center justify-center text-xs font-semibold text-zinc-400 flex-shrink-0"
        >
          {user?.username?.[0]?.toUpperCase() || "?"}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-zinc-200 tracking-tight truncate">
            {user?.username || "..."}
          </p>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
            <span className="text-[10px] text-zinc-500">online</span>
          </div>
        </div>
        <button
          className="w-7 h-7 rounded-md flex items-center justify-center
          text-zinc-500 hover:bg-zinc-800 hover:text-zinc-300 transition-colors flex-shrink-0"
          aria-label="Settings"
        >
          <SettingsIcon />
        </button>
      </div>
    </div>
  );
}

export default ChatSidebar;
