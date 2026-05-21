import { useState } from "react";
import { motion } from "motion/react";
import { useNavigate, Link } from "react-router-dom";
import api from "@/api/axios";

function LoginPage({ onLogin }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await api.post("/auth/login", { email, password });
      const token = response.data.token;
      localStorage.setItem("token", token);
      onLogin(token);
      navigate("/chat");
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        err.response?.data ||
        "Invalid email or password.";
      setError(typeof msg === "string" ? msg : "Login failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-6 relative overflow-hidden">
      {/* Grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.03) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Blobs */}
      <div
        className="absolute -top-28 -right-16 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(124,58,237,.12) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute -bottom-24 -left-14 w-72 h-72 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(56,189,248,.08) 0%, transparent 70%)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-sm bg-white/[.04] border border-white/[.08] rounded-2xl p-9 backdrop-blur-xl"
      >
        {/* Logo */}
        <div className="flex items-center gap-2 mb-7">
          <div className="w-8 h-8 rounded-lg bg-white/[.06] border border-white/10 flex items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path
                d="M2 9C2 5.13 5.13 2 9 2s7 3.13 7 7-3.13 7-7 7-7-3.13-7-7Z"
                fill="#fff"
                fillOpacity=".08"
                stroke="#fff"
                strokeOpacity=".3"
                strokeWidth="1"
              />
              <path
                d="M9 5v4l3 2"
                stroke="#e2e0d8"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <span className="text-sm font-semibold text-[#e2e0d8] tracking-widest">
            pigeon
          </span>
        </div>

        {/* Heading */}
        <div className="mb-7">
          <h1 className="text-xl font-bold text-[#f0ede6] tracking-tight leading-tight">
            Welcome back
          </h1>
          <p className="text-xs text-white/40 mt-1.5">
            Sign in to continue messaging
          </p>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-4" noValidate>
          <Field label="Email">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              autoComplete="email"
              className="w-full bg-white/[.05] border border-white/[.08] rounded-lg px-3.5 py-2.5 text-sm text-[#f0ede6] placeholder-white/20 outline-none focus:border-violet-500/60 focus:ring-2 focus:ring-violet-500/10 focus:bg-white/[.07] transition"
            />
          </Field>

          <Field label="Password">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              autoComplete="current-password"
              className="w-full bg-white/[.05] border border-white/[.08] rounded-lg px-3.5 py-2.5 text-sm text-[#f0ede6] placeholder-white/20 outline-none focus:border-violet-500/60 focus:ring-2 focus:ring-violet-500/10 focus:bg-white/[.07] transition"
            />
          </Field>

          {error && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xs text-red-400 bg-red-400/[.08] border border-red-400/20 rounded-lg px-3 py-2.5"
            >
              {error}
            </motion.p>
          )}

          <motion.button
            type="submit"
            disabled={loading}
            whileTap={{ scale: 0.98 }}
            className="mt-1 w-full py-2.5 rounded-lg bg-[#f0ede6] text-zinc-950 text-sm font-semibold tracking-tight flex items-center justify-center min-h-[42px] disabled:opacity-40 disabled:cursor-not-allowed transition"
          >
            {loading ? (
              <span className="w-4 h-4 border-2 border-zinc-900/20 border-t-zinc-900 rounded-full animate-spin" />
            ) : (
              "Sign in"
            )}
          </motion.button>
        </form>

        <p className="text-center text-xs text-white/30 mt-6">
          No account?{" "}
          <Link
            to="/signup"
            className="text-white/60 font-medium border-b border-white/20 pb-px hover:text-white/80 transition"
          >
            Create one
          </Link>
        </p>
      </motion.div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[11px] font-medium text-white/40 uppercase tracking-widest">
        {label}
      </label>
      {children}
    </div>
  );
}

export default LoginPage;
