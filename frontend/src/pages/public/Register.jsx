import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  GraduationCap, Building2, ArrowRight, ArrowLeft,
  Mail, Lock, Eye, EyeOff, AlertCircle, User, CheckCircle2
} from "lucide-react";
import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext";

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

  .reg-root {
    font-family: var(--font);
    min-height: 100vh;
    display: grid;
    grid-template-columns: 1fr 1fr;
    background: #fff;
    -webkit-font-smoothing: antialiased;
  }

  /* ── LEFT PANEL ── */
  .reg-left {
    background: linear-gradient(145deg, #0a3d52 0%, var(--dark) 50%, #0d3548 100%);
    display: flex; flex-direction: column; justify-content: space-between;
    padding: 48px 52px; position: relative; overflow: hidden;
  }
  .reg-left::before {
    content: ''; position: absolute; width: 440px; height: 440px; border-radius: 50%;
    top: -150px; left: -120px;
    background: radial-gradient(circle, rgba(129,197,166,0.2) 0%, transparent 70%);
  }
  .reg-left::after {
    content: ''; position: absolute; width: 320px; height: 320px; border-radius: 50%;
    bottom: -100px; right: -80px;
    background: radial-gradient(circle, rgba(58,161,201,0.18) 0%, transparent 70%);
  }
  .reg-left-grid {
    position: absolute; inset: 0;
    background-image:
      linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
    background-size: 36px 36px;
  }

  .reg-logo {
    display: flex; align-items: center; gap: 10px;
    font-size: 18px; font-weight: 900; color: white;
    text-decoration: none; letter-spacing: -0.5px;
    position: relative; z-index: 2;
  }
  .reg-logo-mark {
    width: 34px; height: 34px; border-radius: 10px;
    background: linear-gradient(135deg, var(--p), var(--s));
    display: flex; align-items: center; justify-content: center; flex-shrink: 0;
  }

  .reg-left-body { position: relative; z-index: 2; }
  .reg-left-tag {
    display: inline-flex; align-items: center; gap: 7px;
    background: rgba(58,161,201,0.15); border: 1px solid rgba(58,161,201,0.3);
    padding: 6px 14px; border-radius: 100px;
    font-size: 11px; font-weight: 700; color: var(--p);
    letter-spacing: 1.2px; text-transform: uppercase; margin-bottom: 22px;
  }
  .reg-left-tag-dot { width: 6px; height: 6px; background: var(--p); border-radius: 50%; animation: blink 2.4s ease-in-out infinite; }
  @keyframes blink { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.4;transform:scale(1.6)} }

  .reg-left-title {
    font-size: clamp(26px, 2.8vw, 38px); font-weight: 900;
    color: white; letter-spacing: -1.2px; line-height: 1.1; margin-bottom: 18px;
  }
  .reg-left-title span { color: var(--s); }
  .reg-left-desc { font-size: 14px; color: rgba(255,255,255,0.52); line-height: 1.72; font-weight: 400; max-width: 320px; margin-bottom: 40px; }

  /* Steps preview on left */
  .reg-steps-preview { display: flex; flex-direction: column; gap: 0; }
  .reg-step-preview {
    display: flex; align-items: flex-start; gap: 16px; padding: 14px 0;
    border-bottom: 1px solid rgba(255,255,255,0.06);
  }
  .reg-step-preview:last-child { border-bottom: none; }
  .reg-step-preview-num {
    width: 28px; height: 28px; border-radius: 50%; flex-shrink: 0;
    background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.12);
    display: flex; align-items: center; justify-content: center;
    font-size: 11px; font-weight: 800; color: rgba(255,255,255,0.6);
    margin-top: 1px;
  }
  .reg-step-preview-num.active { background: var(--p); border-color: var(--p); color: white; }
  .reg-step-preview-num.done { background: var(--s); border-color: var(--s); color: white; }
  .reg-step-preview-label { font-size: 13.5px; font-weight: 600; color: rgba(255,255,255,0.8); margin-bottom: 3px; }
  .reg-step-preview-sub { font-size: 12px; color: rgba(255,255,255,0.38); font-weight: 400; }

  .reg-left-footer { position: relative; z-index: 2; }
  .reg-left-footer-text { font-size: 12px; color: rgba(255,255,255,0.28); font-weight: 400; }

  /* ── RIGHT PANEL ── */
  .reg-right {
    display: flex; align-items: center; justify-content: center;
    padding: 48px 6vw; background: #fafcfe; overflow-y: auto;
  }
  .reg-right-inner { width: 100%; max-width: 420px; }

  .reg-back {
    display: inline-flex; align-items: center; gap: 6px;
    font-size: 13px; font-weight: 600; color: var(--muted);
    text-decoration: none; margin-bottom: 36px; transition: color 0.18s;
  }
  .reg-back:hover { color: var(--p); }

  /* Progress bar */
  .reg-progress-bar { display: flex; align-items: center; gap: 6px; margin-bottom: 32px; }
  .reg-bar {
    height: 4px; border-radius: 100px; transition: all 0.35s ease; flex: 1;
  }
  .reg-bar.done { background: var(--s); }
  .reg-bar.active { background: var(--p); }
  .reg-bar.idle { background: rgba(58,161,201,0.15); }

  /* Step head */
  .reg-step-head { margin-bottom: 28px; }
  .reg-step-label { font-size: 11px; font-weight: 700; letter-spacing: 1.8px; text-transform: uppercase; color: var(--s); margin-bottom: 8px; }
  .reg-step-title { font-size: 24px; font-weight: 900; color: var(--dark); letter-spacing: -0.8px; line-height: 1.15; margin-bottom: 8px; }
  .reg-step-sub { font-size: 14px; color: var(--muted); font-weight: 400; line-height: 1.6; }

  /* ── ROLE CARDS ── */
  .reg-role-cards { display: flex; flex-direction: column; gap: 14px; margin-bottom: 28px; }
  .reg-role-card {
    display: flex; align-items: center; gap: 18px; padding: 22px;
    border-radius: 16px; border: 2px solid var(--border);
    background: white; cursor: pointer;
    transition: all 0.22s cubic-bezier(0.34,1.2,0.64,1);
    position: relative; overflow: hidden; outline: none;
  }
  .reg-role-card:focus-visible { box-shadow: 0 0 0 3px rgba(58,161,201,0.25); }
  .reg-role-card:hover { border-color: rgba(58,161,201,0.4); transform: translateY(-2px); box-shadow: 0 8px 28px rgba(58,161,201,0.12); }
  .reg-role-card.selected.student { border-color: var(--p); background: rgba(58,161,201,0.04); box-shadow: 0 0 0 4px rgba(58,161,201,0.1); }
  .reg-role-card.selected.univ { border-color: var(--s); background: rgba(129,197,166,0.05); box-shadow: 0 0 0 4px rgba(129,197,166,0.12); }

  .reg-role-icon {
    width: 52px; height: 52px; border-radius: 14px; flex-shrink: 0;
    display: flex; align-items: center; justify-content: center; transition: all 0.22s;
  }
  .reg-role-card.student .reg-role-icon { background: rgba(58,161,201,0.1); color: var(--p); }
  .reg-role-card.univ .reg-role-icon { background: rgba(129,197,166,0.15); color: var(--s); }
  .reg-role-card.selected.student .reg-role-icon { background: var(--p); color: white; }
  .reg-role-card.selected.univ .reg-role-icon { background: var(--s); color: white; }

  .reg-role-body { flex: 1; }
  .reg-role-title { font-size: 16px; font-weight: 800; color: var(--dark); margin-bottom: 4px; }
  .reg-role-desc { font-size: 12.5px; color: var(--muted); font-weight: 400; line-height: 1.5; }

  .reg-role-check {
    width: 22px; height: 22px; border-radius: 50%; border: 2px solid var(--border);
    display: flex; align-items: center; justify-content: center; flex-shrink: 0;
    transition: all 0.2s; background: transparent;
  }
  .reg-role-card.selected .reg-role-check { background: var(--p); border-color: var(--p); }
  .reg-role-card.selected.univ .reg-role-check { background: var(--s); border-color: var(--s); }
  .reg-role-check-dot { width: 8px; height: 8px; border-radius: 50%; background: white; opacity: 0; transition: opacity 0.15s; }
  .reg-role-card.selected .reg-role-check-dot { opacity: 1; }

  /* ── FORM ── */
  .reg-selected-chip {
    display: flex; align-items: center; gap: 10px; padding: 12px 16px;
    border-radius: 12px; background: white; border: 1.5px solid var(--border); margin-bottom: 24px;
  }
  .reg-chip-icon {
    width: 34px; height: 34px; border-radius: 9px; flex-shrink: 0;
    display: flex; align-items: center; justify-content: center;
  }
  .reg-chip-icon.student { background: rgba(58,161,201,0.1); color: var(--p); }
  .reg-chip-icon.univ { background: rgba(129,197,166,0.15); color: var(--s); }
  .reg-chip-label { font-size: 13px; font-weight: 700; color: var(--dark); }
  .reg-chip-sub { font-size: 11.5px; color: var(--muted); font-weight: 400; }
  .reg-chip-change {
    margin-left: auto; font-size: 12px; font-weight: 600; color: var(--p);
    background: none; border: none; cursor: pointer; font-family: var(--font);
    padding: 4px 8px; border-radius: 6px; transition: background 0.15s;
  }
  .reg-chip-change:hover { background: rgba(58,161,201,0.08); }

  .reg-form { display: flex; flex-direction: column; gap: 14px; }
  .reg-field { display: flex; flex-direction: column; gap: 6px; }
  .reg-label { font-size: 12px; font-weight: 700; color: var(--text); letter-spacing: 0.3px; }
  .reg-input-wrap {
    display: flex; align-items: center; gap: 10px; padding: 0 14px;
    border-radius: 12px; border: 1.5px solid var(--border); background: white;
    transition: all 0.2s ease;
  }
  .reg-input-wrap:focus-within { border-color: var(--p); box-shadow: 0 0 0 3px rgba(58,161,201,0.12); }
  .reg-input-icon { color: var(--muted); flex-shrink: 0; }
  .reg-input {
    flex: 1; border: none; outline: none; padding: 13px 0;
    font-size: 14px; font-weight: 500; color: var(--dark);
    background: transparent; font-family: var(--font);
  }
  .reg-input::placeholder { color: #b0c4ce; font-weight: 400; }
  .reg-eye { background: none; border: none; cursor: pointer; color: var(--muted); padding: 4px; display: flex; transition: color 0.15s; }
  .reg-eye:hover { color: var(--p); }

  /* Password strength */
  .reg-strength { margin-top: 6px; }
  .reg-strength-bars { display: flex; gap: 4px; margin-bottom: 5px; }
  .reg-strength-bar { flex: 1; height: 3px; border-radius: 100px; background: rgba(58,161,201,0.12); transition: background 0.3s; }
  .reg-strength-bar.weak { background: #e74c3c; }
  .reg-strength-bar.fair { background: #f39c12; }
  .reg-strength-bar.good { background: var(--p); }
  .reg-strength-bar.strong { background: var(--s); }
  .reg-strength-label { font-size: 11px; font-weight: 600; color: var(--muted); }
  .reg-strength-label.weak { color: #e74c3c; }
  .reg-strength-label.fair { color: #f39c12; }
  .reg-strength-label.good { color: var(--p); }
  .reg-strength-label.strong { color: var(--s); }

  /* Terms */
  .reg-terms {
    display: flex; align-items: flex-start; gap: 10px;
    font-size: 12.5px; color: var(--muted); line-height: 1.55; font-weight: 400;
  }
  .reg-terms-check {
    width: 18px; height: 18px; border-radius: 5px; border: 1.5px solid var(--border);
    flex-shrink: 0; margin-top: 1px; cursor: pointer; display: flex; align-items: center;
    justify-content: center; transition: all 0.2s; background: white;
  }
  .reg-terms-check.checked { background: var(--p); border-color: var(--p); }
  .reg-terms a { color: var(--p); font-weight: 600; text-decoration: none; }
  .reg-terms a:hover { text-decoration: underline; }

  /* Error */
  .reg-error {
    display: flex; align-items: flex-start; gap: 10px;
    background: #fff2f2; border: 1.5px solid #ffd0d0;
    color: #c0392b; padding: 12px 14px; border-radius: 12px;
    font-size: 13px; font-weight: 500; line-height: 1.45;
  }

  /* Buttons */
  .reg-btn {
    width: 100%; padding: 14px; border-radius: 12px; border: none;
    font-size: 15px; font-weight: 700; font-family: var(--font); color: white;
    cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px;
    transition: all 0.22s cubic-bezier(0.34,1.2,0.64,1);
  }
  .reg-btn:disabled { opacity: 0.45; cursor: not-allowed; transform: none !important; box-shadow: none !important; }
  .reg-btn.primary { background: var(--p); }
  .reg-btn.primary:hover:not(:disabled) { background: var(--dark); transform: translateY(-2px); box-shadow: 0 8px 24px rgba(58,161,201,0.3); }
  .reg-btn.success { background: var(--s); }
  .reg-btn.success:hover:not(:disabled) { background: #6ab891; transform: translateY(-2px); box-shadow: 0 8px 24px rgba(129,197,166,0.35); }

  /* Divider */
  .reg-divider { display: flex; align-items: center; gap: 12px; }
  .reg-divider-line { flex: 1; height: 1px; background: var(--border); }
  .reg-divider-text { font-size: 12px; color: var(--muted); font-weight: 500; white-space: nowrap; }

  /* Login link */
  .reg-login-link { text-align: center; font-size: 13.5px; color: var(--muted); font-weight: 400; }
  .reg-login-link a { color: var(--p); font-weight: 700; text-decoration: none; transition: color 0.15s; }
  .reg-login-link a:hover { color: var(--dark); }

  /* Success state */
  .reg-success {
    display: flex; flex-direction: column; align-items: center; text-align: center; gap: 16px; padding: 20px 0;
  }
  .reg-success-icon {
    width: 72px; height: 72px; border-radius: 50%;
    background: rgba(129,197,166,0.15); border: 2px solid rgba(129,197,166,0.3);
    display: flex; align-items: center; justify-content: center; color: var(--s);
  }
  .reg-success-title { font-size: 22px; font-weight: 900; color: var(--dark); letter-spacing: -0.5px; }
  .reg-success-sub { font-size: 14px; color: var(--muted); line-height: 1.65; font-weight: 400; max-width: 300px; }

  /* Spinner */
  @keyframes spin { to { transform: rotate(360deg); } }
  .spin { animation: spin 0.8s linear infinite; }

  /* ── RESPONSIVE ── */
  @media (max-width: 768px) {
    .reg-root { grid-template-columns: 1fr; }
    .reg-left { display: none; }
    .reg-right { padding: 36px 6vw; min-height: 100vh; align-items: flex-start; padding-top: 48px; }
  }
`;

/* Password strength helper */
function getStrength(pw) {
  if (!pw) return { level: 0, label: "", key: "" };
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  if (score <= 1) return { level: 1, label: "Weak", key: "weak" };
  if (score === 2) return { level: 2, label: "Fair", key: "fair" };
  if (score === 3) return { level: 3, label: "Good", key: "good" };
  return { level: 4, label: "Strong", key: "strong" };
}

const LEFT_STEPS = [
  { label: "Choose Account Type", sub: "Student or University" },
  { label: "Create Your Account", sub: "Name, email & password" },
];

export default function Register({ role: propRole }) {
  const nav = useNavigate();
  const { saveSession } = useAuth();

  const [step, setStep] = useState(propRole ? 2 : 1);
  const [selectedRole, setSelectedRole] = useState(propRole || "");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [done, setDone] = useState(false);

  const strength = getStrength(password);

  const handleContinue = () => {
    if (!selectedRole) return;
    setErr("");
    setStep(2);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!agreed) { setErr("Please agree to the Terms of Service to continue."); return; }
    setErr("");
    setLoading(true);
    try {
      const res = await api.post("/auth/register", { name, email, password, role: selectedRole });
      const { token, user } = res.data;
      saveSession(token, user);
      setDone(true);
      setTimeout(() => {
        nav(user.role === "student" ? "/student/dashboard" : "/university/dashboard");
      }, 1400);
    } catch (e2) {
      setErr(e2.response?.data?.message || e2.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  /* Active step for left panel indicator */
  const activeStep = step; // 1 or 2

  return (
    <div className="reg-root">
      <style>{css}</style>

      {/* ── LEFT PANEL ── */}
      <div className="reg-left">
        <div className="reg-left-grid" />

        <Link className="reg-logo" to="/">
          <div className="reg-logo-mark">
            <GraduationCap color="white" strokeWidth={2.5} size={18} />
          </div>
          ScholarConnect
        </Link>

        <div className="reg-left-body">
          <div className="reg-left-tag">
            <span className="reg-left-tag-dot" />
            Join ScholarConnect
          </div>
          <h2 className="reg-left-title">
            Start your journey<br />in <span>two steps.</span>
          </h2>
          <p className="reg-left-desc">
            Creating an account takes less than two minutes. Join thousands of students
            and universities already on the platform.
          </p>

          <div className="reg-steps-preview">
            {LEFT_STEPS.map((s, i) => {
              const n = i + 1;
              const isDone = activeStep > n;
              const isActive = activeStep === n;
              return (
                <div className="reg-step-preview" key={s.label}>
                  <div className={`reg-step-preview-num ${isDone ? "done" : isActive ? "active" : ""}`}>
                    {isDone ? <CheckCircle2 size={13} /> : n}
                  </div>
                  <div>
                    <div className="reg-step-preview-label" style={{ color: isActive ? "rgba(255,255,255,0.95)" : isDone ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.38)" }}>
                      {s.label}
                    </div>
                    <div className="reg-step-preview-sub">{s.sub}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="reg-left-footer">
          <div className="reg-left-footer-text">© {new Date().getFullYear()} ScholarConnect. All rights reserved.</div>
        </div>
      </div>

      {/* ── RIGHT PANEL ── */}
      <div className="reg-right">
        <div className="reg-right-inner">

          <Link className="reg-back" to="/">
            <ArrowLeft size={15} /> Back to home
          </Link>

          {/* Progress bar */}
          <div className="reg-progress-bar">
            <div className={`reg-bar ${step >= 1 ? (step > 1 ? "done" : "active") : "idle"}`} />
            <div className={`reg-bar ${step >= 2 ? "active" : "idle"}`} />
          </div>

          {/* ── SUCCESS STATE ── */}
          {done && (
            <div className="reg-success">
              <div className="reg-success-icon">
                <CheckCircle2 size={36} strokeWidth={1.8} />
              </div>
              <div className="reg-success-title">Account created!</div>
              <div className="reg-success-sub">
                Welcome to ScholarConnect. Redirecting you to your dashboard…
              </div>
            </div>
          )}

          {/* ── STEP 1: CHOOSE ROLE ── */}
          {!done && step === 1 && (
            <>
              <div className="reg-step-head">
                <div className="reg-step-label">Step 1 of 2</div>
                <div className="reg-step-title">Who are you?</div>
                <div className="reg-step-sub">Choose the type of account you'd like to create.</div>
              </div>

              <div className="reg-role-cards">
                <div
                  className={`reg-role-card student ${selectedRole === "student" ? "selected student" : ""}`}
                  onClick={() => setSelectedRole("student")}
                  role="button" tabIndex={0}
                  onKeyDown={(e) => e.key === "Enter" && setSelectedRole("student")}
                >
                  <div className="reg-role-icon"><GraduationCap size={24} strokeWidth={1.8} /></div>
                  <div className="reg-role-body">
                    <div className="reg-role-title">I am a Student</div>
                    <div className="reg-role-desc">Browse programs, apply to universities, and track your journey.</div>
                  </div>
                  <div className="reg-role-check"><div className="reg-role-check-dot" /></div>
                </div>

                <div
                  className={`reg-role-card univ ${selectedRole === "university" ? "selected univ" : ""}`}
                  onClick={() => setSelectedRole("university")}
                  role="button" tabIndex={0}
                  onKeyDown={(e) => e.key === "Enter" && setSelectedRole("university")}
                >
                  <div className="reg-role-icon"><Building2 size={24} strokeWidth={1.8} /></div>
                  <div className="reg-role-body">
                    <div className="reg-role-title">I am a University</div>
                    <div className="reg-role-desc">List programs, manage applications, and recruit top talent.</div>
                  </div>
                  <div className="reg-role-check"><div className="reg-role-check-dot" /></div>
                </div>
              </div>

              <button
                className="reg-btn primary"
                onClick={handleContinue}
                disabled={!selectedRole}
              >
                Continue <ArrowRight size={16} />
              </button>

              <div style={{ marginTop: 24 }} />
              <div className="reg-login-link">
                Already have an account?{" "}
                <Link to={selectedRole === "university" ? "/university/login" : "/student/login"}>
                  Sign in
                </Link>
              </div>
            </>
          )}

          {/* ── STEP 2: REGISTRATION FORM ── */}
          {!done && step === 2 && (
            <>
              <div className="reg-step-head">
                <div className="reg-step-label">Step 2 of 2</div>
                <div className="reg-step-title">Create your account</div>
                <div className="reg-step-sub">Fill in your details to get started — it only takes a minute.</div>
              </div>

              {/* Selected role chip */}
              <div className="reg-selected-chip">
                <div className={`reg-chip-icon ${selectedRole === "university" ? "univ" : "student"}`}>
                  {selectedRole === "student"
                    ? <GraduationCap size={17} strokeWidth={2} />
                    : <Building2 size={17} strokeWidth={2} />}
                </div>
                <div>
                  <div className="reg-chip-label">
                    {selectedRole === "student" ? "Student Account" : "University Account"}
                  </div>
                  <div className="reg-chip-sub">Registering as a {selectedRole}</div>
                </div>
                {!propRole && (
                  <button className="reg-chip-change" onClick={() => { setStep(1); setErr(""); }}>
                    Change
                  </button>
                )}
              </div>

              {err && (
                <div className="reg-error" style={{ marginBottom: 16 }}>
                  <AlertCircle size={16} style={{ flexShrink: 0, marginTop: 1 }} />
                  {err}
                </div>
              )}

              <form className="reg-form" onSubmit={onSubmit}>
                {/* Name */}
                <div className="reg-field">
                  <label className="reg-label">
                    {selectedRole === "university" ? "University / Institution Name" : "Full Name"}
                  </label>
                  <div className="reg-input-wrap">
                    <User size={16} className="reg-input-icon" />
                    <input
                      className="reg-input"
                      type="text"
                      placeholder={selectedRole === "university" ? "e.g. KMC College" : "e.g. Jeevan Shrestha"}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      autoComplete="off"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="reg-field">
                  <label className="reg-label">Email Address</label>
                  <div className="reg-input-wrap">
                    <Mail size={16} className="reg-input-icon" />
                    <input
                      className="reg-input"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      autoComplete="username"
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="reg-field">
                  <label className="reg-label">Password</label>
                  <div className="reg-input-wrap">
                    <Lock size={16} className="reg-input-icon" />
                    <input
                      className="reg-input"
                      type={showPw ? "text" : "password"}
                      placeholder="Create a strong password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      autoComplete="new-password"
                    />
                    <button type="button" className="reg-eye" onClick={() => setShowPw(v => !v)} tabIndex={-1}>
                      {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  {/* Strength meter */}
                  {password.length > 0 && (
                    <div className="reg-strength">
                      <div className="reg-strength-bars">
                        {[1, 2, 3, 4].map((n) => (
                          <div
                            key={n}
                            className={`reg-strength-bar ${strength.level >= n ? strength.key : ""}`}
                          />
                        ))}
                      </div>
                      <div className={`reg-strength-label ${strength.key}`}>
                        {strength.label} password
                      </div>
                    </div>
                  )}
                </div>

                {/* Terms */}
                <div
                  className="reg-terms"
                  onClick={() => setAgreed(v => !v)}
                  style={{ cursor: "pointer", userSelect: "none" }}
                >
                  <div className={`reg-terms-check ${agreed ? "checked" : ""}`}>
                    {agreed && <CheckCircle2 size={12} color="white" strokeWidth={3} />}
                  </div>
                  <span>
                    I agree to ScholarConnect's{" "}
                    <a href="/terms" onClick={(e) => e.stopPropagation()}>Terms of Service</a>{" "}
                    and{" "}
                    <a href="/privacy" onClick={(e) => e.stopPropagation()}>Privacy Policy</a>.
                  </span>
                </div>

                <button
                  type="submit"
                  className={`reg-btn ${selectedRole === "university" ? "success" : "primary"}`}
                  disabled={loading || !agreed}
                >
                  {loading ? (
                    <>
                      <svg className="spin" width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.3)" strokeWidth="3" />
                        <path d="M12 2a10 10 0 0 1 10 10" stroke="white" strokeWidth="3" strokeLinecap="round" />
                      </svg>
                      Creating account…
                    </>
                  ) : (
                    <>Create Account <ArrowRight size={15} /></>
                  )}
                </button>
              </form>

              <div style={{ marginTop: 24 }} />
              <div className="reg-divider">
                <div className="reg-divider-line" />
                <span className="reg-divider-text">Already have an account?</span>
                <div className="reg-divider-line" />
              </div>
              <div style={{ marginTop: 16 }} />
              <div className="reg-login-link">
                <Link to={selectedRole === "university" ? "/university/login" : "/student/login"}>
                  Sign in to your {selectedRole} account →
                </Link>
              </div>
            </>
          )}

        </div>
      </div>
    </div>
  );
}