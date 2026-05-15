// ChatLayout.jsx
import { motion } from "motion/react";

function ChatLayout({ sidebar, header, children }) {
  return (
    <div className="h-screen flex bg-zinc-950 text-white overflow-hidden">
      <motion.aside
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="w-72 border-r border-zinc-800/60 flex flex-col"
      >
        {sidebar}
      </motion.aside>

      <main className="flex-1 flex flex-col min-w-0">
        <motion.div
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="border-b border-zinc-800/60 px-5 py-3 shrink-0"
        >
          {header}
        </motion.div>

        <div className="flex-1 overflow-y-auto px-5 py-4">{children}</div>
      </main>
    </div>
  );
}

export default ChatLayout;
