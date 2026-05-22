import useAuth from "@/features/auth/hooks/useAuth";

function ChatHeader() {
  const { user, logout } = useAuth();

  return (
    <div className="flex items-center justify-between">
      {/* Left — chat info */}
      <div className="flex items-center gap-3">
        <div className="relative">
          <div className="w-9 h-9 rounded-full bg-zinc-700 flex items-center justify-center text-sm font-semibold text-zinc-200">
            GC
          </div>
          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-zinc-950" />
        </div>
        <div>
          <h2 className="font-semibold text-sm text-white leading-tight">
            General Chat
          </h2>
          <p className="text-xs text-emerald-400 leading-tight">Online</p>
        </div>
      </div>

      {/* Right — user + logout */}
      <div className="flex items-center gap-2">
        {/* Username */}
        {user && (
          <div className="flex items-center gap-2 px-2.5 py-1 rounded-lg bg-zinc-800/60 border border-zinc-700/40">
            <div className="w-5 h-5 rounded-full bg-violet-500/20 border border-violet-500/30 flex items-center justify-center">
              <span className="text-[10px] font-semibold text-violet-300">
                {user.username?.[0]?.toUpperCase()}
              </span>
            </div>
            <span className="text-xs font-medium text-zinc-300">
              {user.username}
            </span>
          </div>
        )}

        {/* Search */}
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

        {/* Logout */}
        <button
          onClick={logout}
          className="w-8 h-8 rounded-lg hover:bg-red-500/10 transition-colors flex items-center justify-center text-zinc-400 hover:text-red-400"
          title="Logout"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default ChatHeader;
