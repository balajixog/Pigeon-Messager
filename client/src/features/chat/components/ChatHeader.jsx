// ChatHeader.jsx
function ChatHeader() {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="relative">
          <div className="w-9 h-9 rounded-full bg-zinc-700 flex items-center justify-center text-sm font-semibold text-zinc-200">
            GC
          </div>
          {/* Online dot */}
          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-zinc-950" />
        </div>
        <div>
          <h2 className="font-semibold text-sm text-white leading-tight">
            General Chat
          </h2>
          <p className="text-xs text-emerald-400 leading-tight">Online</p>
        </div>
      </div>

      <div className="flex items-center gap-1">
        <button className="w-8 h-8 rounded-lg hover:bg-zinc-800 transition-colors flex items-center justify-center text-zinc-400 hover:text-zinc-200">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
        </button>
        <button className="w-8 h-8 rounded-lg hover:bg-zinc-800 transition-colors flex items-center justify-center text-zinc-400 hover:text-zinc-200">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="12" cy="12" r="1" />
            <circle cx="19" cy="12" r="1" />
            <circle cx="5" cy="12" r="1" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default ChatHeader;
