function ChatLayout({
  sidebar,

  header,

  children,
}) {
  return (
    <div
      className="
          h-screen
          flex
          bg-zinc-950
          text-white
        "
    >
      {/* SIDEBAR */}

      <aside
        className="
            w-80
            border-r
            border-zinc-800
            p-4
          "
      >
        {sidebar}
      </aside>

      {/* CHAT AREA */}

      <main
        className="
            flex-1
            flex
            flex-col
          "
      >
        {/* HEADER */}

        <div
          className="
              border-b
              border-zinc-800
              p-4
            "
        >
          {header}
        </div>

        {/* CONTENT */}

        <div
          className="
              flex-1
              overflow-y-auto
              p-4
            "
        >
          {children}
        </div>
      </main>
    </div>
  );
}

export default ChatLayout;
