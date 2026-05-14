import { motion } from "motion/react";

function Dot({ delay }) {
  return (
    <motion.div
      animate={{
        y: [0, -5, 0],
      }}
      transition={{
        duration: 0.6,
        repeat: Infinity,
        delay,
      }}
      className="
        w-2
        h-2
        rounded-full
        bg-zinc-400
      "
    />
  );
}

function TypingIndicator({ username }) {
  return (
    <div
      className="
        flex
        items-center
        gap-2
        text-sm
        text-zinc-400
      "
    >
      <span>{username} is typing</span>

      <div className="flex gap-1">
        <Dot delay={0} />

        <Dot delay={0.2} />

        <Dot delay={0.4} />
      </div>
    </div>
  );
}

export default TypingIndicator;
