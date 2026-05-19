import { useState } from "react";
import { motion } from "motion/react";
import { useNavigate, Link } from "react-router-dom";
import api from "@/api/axios";

function LoginPage() {
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
      localStorage.setItem("token", response.data.token);
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
    <div style={styles.root}>
      {/* Background grid */}
      <div style={styles.grid} aria-hidden="true" />

      {/* Accent blobs */}
      <div style={styles.blob1} aria-hidden="true" />
      <div style={styles.blob2} aria-hidden="true" />

      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        style={styles.card}
      >
        {/* Logo mark */}
        <div style={styles.logoRow}>
          <div style={styles.logoMark}>
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
          <span style={styles.logoText}>pigeon</span>
        </div>

        <div style={styles.headingBlock}>
          <h1 style={styles.heading}>Welcome back</h1>
          <p style={styles.sub}>Sign in to continue messaging</p>
        </div>

        <form onSubmit={handleLogin} style={styles.form} noValidate>
          <Field label="Email">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              autoComplete="email"
              style={styles.input}
              onFocus={(e) => Object.assign(e.target.style, styles.inputFocus)}
              onBlur={(e) => Object.assign(e.target.style, styles.inputBlur)}
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
              style={styles.input}
              onFocus={(e) => Object.assign(e.target.style, styles.inputFocus)}
              onBlur={(e) => Object.assign(e.target.style, styles.inputBlur)}
            />
          </Field>

          {error && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              style={styles.error}
            >
              {error}
            </motion.p>
          )}

          <motion.button
            type="submit"
            disabled={loading}
            style={
              loading ? { ...styles.btn, ...styles.btnDisabled } : styles.btn
            }
            whileTap={{ scale: 0.98 }}
          >
            {loading ? <span style={styles.spinner} /> : "Sign in"}
          </motion.button>
        </form>

        <p style={styles.footerText}>
          No account?{" "}
          <Link to="/signup" style={styles.link}>
            Create one
          </Link>
        </p>
      </motion.div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div style={styles.field}>
      <label style={styles.label}>{label}</label>
      {children}
    </div>
  );
}

const styles = {
  root: {
    minHeight: "100vh",
    background: "#0c0c0e",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "24px",
    position: "relative",
    overflow: "hidden",
    fontFamily: "'DM Sans', sans-serif",
  },
  grid: {
    position: "absolute",
    inset: 0,
    backgroundImage:
      "linear-gradient(rgba(255,255,255,.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.03) 1px, transparent 1px)",
    backgroundSize: "48px 48px",
    pointerEvents: "none",
  },
  blob1: {
    position: "absolute",
    top: "-120px",
    right: "-80px",
    width: "420px",
    height: "420px",
    borderRadius: "50%",
    background:
      "radial-gradient(circle, rgba(124,58,237,.12) 0%, transparent 70%)",
    pointerEvents: "none",
  },
  blob2: {
    position: "absolute",
    bottom: "-100px",
    left: "-60px",
    width: "320px",
    height: "320px",
    borderRadius: "50%",
    background:
      "radial-gradient(circle, rgba(56,189,248,.08) 0%, transparent 70%)",
    pointerEvents: "none",
  },
  card: {
    width: "100%",
    maxWidth: "400px",
    background: "rgba(255,255,255,.04)",
    border: "1px solid rgba(255,255,255,.08)",
    borderRadius: "16px",
    padding: "36px",
    backdropFilter: "blur(12px)",
    position: "relative",
    zIndex: 1,
  },
  logoRow: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginBottom: "28px",
  },
  logoMark: {
    width: "32px",
    height: "32px",
    borderRadius: "8px",
    background: "rgba(255,255,255,.06)",
    border: "1px solid rgba(255,255,255,.1)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  logoText: {
    fontSize: "15px",
    fontWeight: 600,
    color: "#e2e0d8",
    letterSpacing: "0.04em",
  },
  headingBlock: {
    marginBottom: "28px",
  },
  heading: {
    fontSize: "22px",
    fontWeight: 700,
    color: "#f0ede6",
    margin: 0,
    letterSpacing: "-0.02em",
    lineHeight: 1.2,
  },
  sub: {
    fontSize: "13px",
    color: "rgba(255,255,255,.38)",
    marginTop: "6px",
    fontWeight: 400,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  field: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  label: {
    fontSize: "12px",
    fontWeight: 500,
    color: "rgba(255,255,255,.45)",
    letterSpacing: "0.05em",
    textTransform: "uppercase",
  },
  input: {
    background: "rgba(255,255,255,.05)",
    border: "1px solid rgba(255,255,255,.08)",
    borderRadius: "8px",
    padding: "10px 13px",
    fontSize: "14px",
    color: "#f0ede6",
    outline: "none",
    width: "100%",
    boxSizing: "border-box",
    transition: "border-color 0.15s, box-shadow 0.15s",
    fontFamily: "inherit",
  },
  inputFocus: {
    borderColor: "rgba(124,58,237,.6)",
    boxShadow: "0 0 0 3px rgba(124,58,237,.12)",
    background: "rgba(255,255,255,.07)",
  },
  inputBlur: {
    borderColor: "rgba(255,255,255,.08)",
    boxShadow: "none",
    background: "rgba(255,255,255,.05)",
  },
  error: {
    fontSize: "13px",
    color: "#f87171",
    background: "rgba(248,113,113,.08)",
    border: "1px solid rgba(248,113,113,.2)",
    borderRadius: "7px",
    padding: "9px 12px",
    margin: 0,
  },
  btn: {
    marginTop: "4px",
    width: "100%",
    padding: "11px",
    borderRadius: "8px",
    background: "#f0ede6",
    color: "#0c0c0e",
    fontSize: "14px",
    fontWeight: 600,
    border: "none",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    letterSpacing: "0.01em",
    transition: "background 0.15s",
    fontFamily: "inherit",
    minHeight: "42px",
  },
  btnDisabled: {
    background: "rgba(240,237,230,.4)",
    cursor: "not-allowed",
  },
  spinner: {
    width: "16px",
    height: "16px",
    border: "2px solid rgba(12,12,14,.2)",
    borderTopColor: "#0c0c0e",
    borderRadius: "50%",
    animation: "spin 0.7s linear infinite",
    display: "inline-block",
  },
  footerText: {
    textAlign: "center",
    fontSize: "13px",
    color: "rgba(255,255,255,.3)",
    marginTop: "22px",
    marginBottom: 0,
  },
  link: {
    color: "rgba(255,255,255,.65)",
    textDecoration: "none",
    fontWeight: 500,
    borderBottom: "1px solid rgba(255,255,255,.2)",
    paddingBottom: "1px",
  },
};

export default LoginPage;
