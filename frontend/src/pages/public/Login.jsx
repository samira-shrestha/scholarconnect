import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GraduationCap, Building2, ArrowRight, ArrowLeft, Mail, Lock, Eye, EyeOff, AlertCircle } from "lucide-react";
import api from "../../api/axios.js";
import { useAuth } from "../../context/AuthContext.jsx";

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800;900&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --p: #3aa1c9;
    --s: #81C5A6;
    --dark: #0d2d3f;
    --text: #1a2e38;
    --muted: #5a7a89;
    --bg: #f2f9fc;
    --border: rgba(58,161,201,0.18);
    --font: 'Montserrat', sans-serif;
  }

  .login-root {
    font-family: var(--font);
    min-height: 100vh;
    display: grid;
    grid-template-columns: 1fr 1fr;
    background: #fff;
    -webkit-font-smoothing: antialiased;
  }

  /* ── LEFT PANEL ── */
  .login-left {
    background: linear-gradient(145deg, var(--dark) 0%, #0a3d52 55%, #1a5c6b 100%);
    display: flex; flex-direction: column; justify-content: space-between;
    padding: 48px 52px; position: relative; overflow: hidden;
  }
  .login-left::before {
    content: ''; position: absolute; width: 420px; height: 420px; border-radius: 50%;
    top: -140px; right: -140px;
    background: radial-gradient(circle, rgba(58,161,201,0.22) 0%, transparent 70%);
  }
  .login-left::after {
    content: ''; position: absolute; width: 300px; height: 300px; border-radius: 50%;
    bottom: -100px; left: -60px;
    background: radial-gradient(circle, rgba(129,197,166,0.18) 0%, transparent 70%);
  }
  /* grid texture */
  .login-left-grid {
    position: absolute; inset: 0;
    background-image:
      linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
    background-size: 36px 36px;
  }

  .login-left-logo {
    display: flex; align-items: center; gap: 10px;
    font-size: 18px; font-weight: 900; color: white;
    text-decoration: none; letter-spacing: -0.5px;
    position: relative; z-index: 2;
  }
  .login-logo-mark {
    width: 34px; height: 34px; border-radius: 10px;
    background: linear-gradient(135deg, var(--p), var(--s));
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
  }
  .login-logo-mark svg { width: 18px; height: 18px; }

  .login-left-body { position: relative; z-index: 2; }
  .login-left-tag {
    display: inline-flex; align-items: center; gap: 7px;
    background: rgba(129,197,166,0.15); border: 1px solid rgba(129,197,166,0.3);
    padding: 6px 14px; border-radius: 100px;
    font-size: 11px; font-weight: 700; color: var(--s);
    letter-spacing: 1.2px; text-transform: uppercase; margin-bottom: 22px;
  }
  .login-left-tag-dot { width: 6px; height: 6px; background: var(--s); border-radius: 50%; animation: blink 2.4s ease-in-out infinite; }
  @keyframes blink { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.4;transform:scale(1.6)} }

  .login-left-title {
    font-size: clamp(28px, 3vw, 40px); font-weight: 900;
    color: white; letter-spacing: -1.2px; line-height: 1.1; margin-bottom: 18px;
  }
  .login-left-title span { color: var(--s); }
  .login-left-desc { font-size: 14px; color: rgba(255,255,255,0.55); line-height: 1.72; font-weight: 400; max-width: 320px; margin-bottom: 40px; }

  .login-features { display: flex; flex-direction: column; gap: 16px; }
  .login-feature { display: flex; align-items: center; gap: 14px; }
  .login-feature-icon {
    width: 36px; height: 36px; border-radius: 10px; flex-shrink: 0;
    background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.1);
    display: flex; align-items: center; justify-content: center; color: var(--s);
  }
  .login-feature-text { font-size: 13.5px; color: rgba(255,255,255,0.75); font-weight: 500; }

  .login-left-footer { position: relative; z-index: 2; }
  .login-left-footer-text { font-size: 12px; color: rgba(255,255,255,0.3); font-weight: 400; }

  /* ── RIGHT PANEL ── */
  .login-right {
    display: flex; align-items: center; justify-content: center;
    padding: 48px 6vw; background: #fafcfe;
    position: relative; overflow-y: auto;
  }
  .login-right-inner { width: 100%; max-width: 420px; }

  /* Back link */
  .login-back {
    display: inline-flex; align-items: center; gap: 6px;
    font-size: 13px; font-weight: 600; color: var(--muted);
    text-decoration: none; margin-bottom: 36px;
    transition: color 0.18s ease;
  }
  .login-back:hover { color: var(--p); }

  /* Step header */
  .login-step-head { margin-bottom: 32px; }
  .login-step-label {
    font-size: 11px; font-weight: 700; letter-spacing: 1.8px;
    text-transform: uppercase; color: var(--s); margin-bottom: 8px;
    display: flex; align-items: center; gap: 6px;
  }
  .login-step-title { font-size: 26px; font-weight: 900; color: var(--dark); letter-spacing: -0.8px; line-height: 1.15; margin-bottom: 8px; }
  .login-step-sub { font-size: 14px; color: var(--muted); font-weight: 400; line-height: 1.6; }

  /* ── STEP 1: ROLE CARDS ── */
  .role-cards { display: flex; flex-direction: column; gap: 14px; margin-bottom: 28px; }
  .role-card {
    display: flex; align-items: center; gap: 18px;
    padding: 22px 22px; border-radius: 16px;
    border: 2px solid var(--border);
    background: white; cursor: pointer;
    transition: all 0.22s cubic-bezier(0.34,1.2,0.64,1);
    position: relative; overflow: hidden;
  }
  .role-card::before {
    content: ''; position: absolute; inset: 0;
    background: linear-gradient(135deg, rgba(58,161,201,0.04), rgba(129,197,166,0.04));
    opacity: 0; transition: opacity 0.2s;
  }
  .role-card:hover { border-color: rgba(58,161,201,0.4); transform: translateY(-2px); box-shadow: 0 8px 28px rgba(58,161,201,0.12); }
  .role-card:hover::before { opacity: 1; }
  .role-card.selected { border-color: var(--p); background: rgba(58,161,201,0.04); box-shadow: 0 0 0 4px rgba(58,161,201,0.1); }
  .role-card.selected.univ { border-color: var(--s); background: rgba(129,197,166,0.05); box-shadow: 0 0 0 4px rgba(129,197,166,0.12); }

  .role-icon-wrap {
    width: 52px; height: 52px; border-radius: 14px; flex-shrink: 0;
    display: flex; align-items: center; justify-content: center;
    transition: all 0.2s;
  }
  .role-card.student .role-icon-wrap { background: rgba(58,161,201,0.1); color: var(--p); }
  .role-card.univ .role-icon-wrap { background: rgba(129,197,166,0.15); color: var(--s); }
  .role-card.selected.student .role-icon-wrap { background: var(--p); color: white; }
  .role-card.selected.univ .role-icon-wrap { background: var(--s); color: white; }

  .role-body { flex: 1; }
  .role-title { font-size: 16px; font-weight: 800; color: var(--dark); margin-bottom: 4px; }
  .role-desc { font-size: 12.5px; color: var(--muted); font-weight: 400; line-height: 1.5; }

  .role-check {
    width: 22px; height: 22px; border-radius: 50%; border: 2px solid var(--border);
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0; transition: all 0.2s;
    background: transparent;
  }
  .role-card.selected .role-check { background: var(--p); border-color: var(--p); }
  .role-card.selected.univ .role-check { background: var(--s); border-color: var(--s); }
  .role-check-inner { width: 8px; height: 8px; border-radius: 50%; background: white; opacity: 0; transition: opacity 0.15s; }
  .role-card.selected .role-check-inner { opacity: 1; }

  /* Continue button */
  .login-continue-btn {
    width: 100%; padding: 14px; border-radius: 12px; border: none;
    background: var(--p); color: white;
    font-size: 15px; font-weight: 700; font-family: var(--font);
    cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px;
    transition: all 0.22s cubic-bezier(0.34,1.2,0.64,1);
  }
  .login-continue-btn:hover:not(:disabled) { background: var(--dark); transform: translateY(-2px); box-shadow: 0 8px 24px rgba(58,161,201,0.3); }
  .login-continue-btn:disabled { opacity: 0.45; cursor: not-allowed; transform: none; box-shadow: none; }

  /* ── STEP 2: FORM ── */
  .login-selected-role {
    display: flex; align-items: center; gap: 10px;
    padding: 12px 16px; border-radius: 12px;
    background: white; border: 1.5px solid var(--border);
    margin-bottom: 28px;
  }
  .login-selected-role-icon {
    width: 34px; height: 34px; border-radius: 9px; flex-shrink: 0;
    display: flex; align-items: center; justify-content: center;
  }
  .login-selected-role-icon.student { background: rgba(58,161,201,0.1); color: var(--p); }
  .login-selected-role-icon.univ { background: rgba(129,197,166,0.15); color: var(--s); }
  .login-selected-role-label { font-size: 13px; font-weight: 700; color: var(--dark); }
  .login-selected-role-sub { font-size: 11.5px; color: var(--muted); font-weight: 400; }
  .login-change-btn {
    margin-left: auto; font-size: 12px; font-weight: 600; color: var(--p);
    background: none; border: none; cursor: pointer; font-family: var(--font);
    padding: 4px 8px; border-radius: 6px; transition: background 0.15s;
  }
  .login-change-btn:hover { background: rgba(58,161,201,0.08); }

  /* Form fields */
  .login-form { display: flex; flex-direction: column; gap: 14px; }
  .login-field { display: flex; flex-direction: column; gap: 6px; }
  .login-label { font-size: 12px; font-weight: 700; color: var(--text); letter-spacing: 0.3px; }
  .login-input-wrap {
    display: flex; align-items: center; gap: 10px;
    padding: 0 14px; border-radius: 12px;
    border: 1.5px solid var(--border); background: white;
    transition: all 0.2s ease;
  }
  .login-input-wrap:focus-within { border-color: var(--p); box-shadow: 0 0 0 3px rgba(58,161,201,0.12); }
  .login-input-icon { color: var(--muted); flex-shrink: 0; }
  .login-input {
    flex: 1; border: none; outline: none; padding: 13px 0;
    font-size: 14px; font-weight: 500; color: var(--dark);
    background: transparent; font-family: var(--font);
  }
  .login-input::placeholder { color: #b0c4ce; font-weight: 400; }
  .login-eye-btn { background: none; border: none; cursor: pointer; color: var(--muted); padding: 4px; display: flex; transition: color 0.15s; }
  .login-eye-btn:hover { color: var(--p); }

  /* Error */
  .login-error {
    display: flex; align-items: flex-start; gap: 10px;
    background: #fff2f2; border: 1.5px solid #ffd0d0;
    color: #c0392b; padding: 12px 14px; border-radius: 12px;
    font-size: 13px; font-weight: 500; line-height: 1.45;
  }

  /* Submit */
  .login-submit {
    width: 100%; padding: 14px; border-radius: 12px; border: none;
    font-size: 15px; font-weight: 700; font-family: var(--font);
    cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px;
    transition: all 0.22s cubic-bezier(0.34,1.2,0.64,1); color: white;
  }
  .login-submit.student-btn { background: var(--p); }
  .login-submit.student-btn:hover { background: var(--dark); transform: translateY(-2px); box-shadow: 0 8px 24px rgba(58,161,201,0.3); }
  .login-submit.univ-btn { background: var(--s); }
  .login-submit.univ-btn:hover { background: #6ab891; transform: translateY(-2px); box-shadow: 0 8px 24px rgba(129,197,166,0.35); }

  /* Divider */
  .login-divider { display: flex; align-items: center; gap: 12px; }
  .login-divider-line { flex: 1; height: 1px; background: var(--border); }
  .login-divider-text { font-size: 12px; color: var(--muted); font-weight: 500; white-space: nowrap; }

  /* Register link */
  .login-register { text-align: center; font-size: 13.5px; color: var(--muted); font-weight: 400; }
  .login-register a { color: var(--p); font-weight: 700; text-decoration: none; transition: color 0.15s; }
  .login-register a:hover { color: var(--dark); }

  /* Progress dots */
  .login-progress { display: flex; align-items: center; gap: 8px; margin-bottom: 32px; }
  .login-dot { width: 8px; height: 8px; border-radius: 100px; transition: all 0.3s ease; }
  .login-dot.active { width: 24px; background: var(--p); }
  .login-dot.done { background: var(--s); }
  .login-dot.idle { background: rgba(58,161,201,0.2); }

  /* ── RESPONSIVE ── */
  @media (max-width: 768px) {
    .login-root { grid-template-columns: 1fr; }
    .login-left { display: none; }
    .login-right { padding: 36px 6vw; min-height: 100vh; align-items: flex-start; padding-top: 48px; }
  }
`;

const FEATURES = [
  { label: "Browse 2,400+ verified programs" },
  { label: "Apply to universities in minutes" },
  { label: "Track all applications in one place" },
];

export default function Login({ role: roleProp }) {
  const nav = useNavigate();
  const { saveSession } = useAuth();

  const [step, setStep] = useState(roleProp ? 2 : 1);
  const [selectedRole, setSelectedRole] = useState(roleProp || "");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const handleContinue = () => {
    if (!selectedRole) return;
    setErr("");
    setStep(2);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      const res = await api.post("/auth/login", { email, password });
      const { token, user } = res.data;
      if (user.role !== selectedRole) {
        setErr(`This account is registered as a ${user.role}, not a ${selectedRole}.`);
        setLoading(false);
        return;
      }
      saveSession(token, user);
      nav(user.role === "student" ? "/student/dashboard" : "/university/dashboard");
    } catch (e2) {
      setErr(e2.response?.data?.message || "Login failed. Please check your credentials.");
      setLoading(false);
    }
  };

  return (
    <div className="login-root">
      <style>{css}</style>

      {/* ── LEFT PANEL ── */}
      <div className="login-left">
        <div className="login-left-grid" />

        <Link className="login-left-logo" to="/">
          <div className="login-logo-mark">
            <GraduationCap color="white" strokeWidth={2.5} />
          </div>
          ScholarConnect
        </Link>

        <div className="login-left-body">
          <div className="login-left-tag">
            <span className="login-left-tag-dot" />
            Welcome back
          </div>
          <h2 className="login-left-title">
            Your next chapter<br />starts <span>right here.</span>
          </h2>
          <p className="login-left-desc">
            Thousands of students and universities trust ScholarConnect to make
            the application journey clear, fast, and stress-free.
          </p>
          <div className="login-features">
            {FEATURES.map((f) => (
              <div className="login-feature" key={f.label}>
                <div className="login-feature-icon">
                  <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                    <path d="M2 7.5L6 11.5L13 4" stroke="#81C5A6" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <span className="login-feature-text">{f.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="login-left-footer">
          <div className="login-left-footer-text">© {new Date().getFullYear()} ScholarConnect. All rights reserved.</div>
        </div>
      </div>

      {/* ── RIGHT PANEL ── */}
      <div className="login-right">
        <div className="login-right-inner">

          <Link className="login-back" to="/">
            <ArrowLeft size={15} />
            Back to home
          </Link>

          {/* Progress */}
          <div className="login-progress">
            <div className={`login-dot ${step === 1 ? "active" : "done"}`} />
            <div className={`login-dot ${step === 2 ? "active" : "idle"}`} />
          </div>

          {/* ── STEP 1: Choose role ── */}
          {step === 1 && (
            <>
              <div className="login-step-head">
                <div className="login-step-label">Step 1 of 2</div>
                <div className="login-step-title">Who are you?</div>
                <div className="login-step-sub">Select your account type to continue.</div>
              </div>

              <div className="role-cards">
                {/* Student */}
                <div
                  className={`role-card student ${selectedRole === "student" ? "selected" : ""}`}
                  onClick={() => setSelectedRole("student")}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === "Enter" && setSelectedRole("student")}
                >
                  <div className="role-icon-wrap">
                    <GraduationCap size={24} strokeWidth={1.8} />
                  </div>
                  <div className="role-body">
                    <div className="role-title">I am a Student</div>
                    <div className="role-desc">Browse programs, apply to universities, track your applications.</div>
                  </div>
                  <div className="role-check">
                    <div className="role-check-inner" />
                  </div>
                </div>

                {/* University */}
                <div
                  className={`role-card univ ${selectedRole === "university" ? "selected univ" : ""}`}
                  onClick={() => setSelectedRole("university")}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === "Enter" && setSelectedRole("university")}
                >
                  <div className="role-icon-wrap">
                    <Building2 size={24} strokeWidth={1.8} />
                  </div>
                  <div className="role-body">
                    <div className="role-title">I am a University</div>
                    <div className="role-desc">Manage programs, review applications, discover top candidates.</div>
                  </div>
                  <div className="role-check">
                    <div className="role-check-inner" />
                  </div>
                </div>
              </div>

              <button
                className="login-continue-btn"
                onClick={handleContinue}
                disabled={!selectedRole}
              >
                Continue <ArrowRight size={16} />
              </button>

              <div style={{ marginTop: 24, textAlign: "center" }}>
                <div className="login-register">
                  Don't have an account?{" "}
                  <Link to={selectedRole === "university" ? "/university/register" : "/student/register"}>
                    Register for free
                  </Link>
                </div>
              </div>
            </>
          )}

          {/* ── STEP 2: Login form ── */}
          {step === 2 && (
            <>
              <div className="login-step-head">
                <div className="login-step-label">Step 2 of 2</div>
                <div className="login-step-title">Welcome back</div>
                <div className="login-step-sub">Sign in to your {selectedRole} account.</div>
              </div>

              {/* Selected role chip */}
              <div className="login-selected-role">
                <div className={`login-selected-role-icon ${selectedRole === "university" ? "univ" : "student"}`}>
                  {selectedRole === "student"
                    ? <GraduationCap size={17} strokeWidth={2} />
                    : <Building2 size={17} strokeWidth={2} />
                  }
                </div>
                <div>
                  <div className="login-selected-role-label">
                    {selectedRole === "student" ? "Student Account" : "University Account"}
                  </div>
                  <div className="login-selected-role-sub">Signing in as a {selectedRole}</div>
                </div>
                <button className="login-change-btn" onClick={() => { setStep(1); setErr(""); }}>
                  Change
                </button>
              </div>

              {err && (
                <div className="login-error" style={{ marginBottom: 14 }}>
                  <AlertCircle size={16} style={{ flexShrink: 0, marginTop: 1 }} />
                  {err}
                </div>
              )}

              <form className="login-form" onSubmit={onSubmit} autoComplete="off">

                {/* Hidden autofill trap (prevents Chrome suggestions) */}
                <input
                  type="text"
                  name="hidden-username"
                  autoComplete="username"
                  style={{ display: "none" }}
                />
                <input
                  type="password"
                  name="hidden-password"
                  autoComplete="current-password"
                  style={{ display: "none" }}
                />

                {/* Email */}
                <div className="login-field">
                  <label className="login-label">Email address</label>
                  <div className="login-input-wrap">
                    <Mail size={16} className="login-input-icon" />
                    <input
                      className="login-input"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      autoComplete="off"
                      name="login-email"
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="login-field">
                  <label className="login-label">Password</label>
                  <div className="login-input-wrap">
                    <Lock size={16} className="login-input-icon" />
                    <input
                      className="login-input"
                      type={showPw ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      autoComplete="new-password"
                      name="login-password"
                    />
                    <button
                      type="button"
                      className="login-eye-btn"
                      onClick={() => setShowPw(v => !v)}
                      tabIndex={-1}
                    >
                      {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                {/* Forgot password */}
                <div style={{ textAlign: "right", marginTop: -6 }}>
                  <Link
                    to="/forgot-password"
                    style={{
                      fontSize: 12,
                      fontWeight: 600,
                      color: "var(--p)",
                      textDecoration: "none",
                    }}
                  >
                    Forgot password?
                  </Link>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className={`login-submit ${selectedRole === "university" ? "univ-btn" : "student-btn"
                    }`}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        style={{ animation: "spin 0.8s linear infinite" }}
                      >
                        <circle
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="rgba(255,255,255,0.3)"
                          strokeWidth="3"
                        />
                        <path
                          d="M12 2a10 10 0 0 1 10 10"
                          stroke="white"
                          strokeWidth="3"
                          strokeLinecap="round"
                        />
                        <style>
                          {`@keyframes spin { to { transform: rotate(360deg); } }`}
                        </style>
                      </svg>
                      Signing in…
                    </>
                  ) : (
                    <>
                      Sign In <ArrowRight size={15} />
                    </>
                  )}
                </button>

              </form>

              <div style={{ marginTop: 24 }} />
              <div className="login-divider">
                <div className="login-divider-line" />
                <span className="login-divider-text">Don't have an account?</span>
                <div className="login-divider-line" />
              </div>
              <div style={{ marginTop: 16 }} />
              <div className="login-register">
                <Link to={selectedRole === "university" ? "/university/register" : "/student/register"}>
                  Create a free {selectedRole} account →
                </Link>
              </div>
            </>
          )}

        </div>
      </div>
    </div>
  );
}