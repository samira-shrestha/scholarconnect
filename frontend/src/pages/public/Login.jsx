import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GraduationCap, Building2, ArrowRight, ArrowLeft, Mail, Lock, Eye, EyeOff, AlertCircle, Shield } from "lucide-react";
import api from "../../api/axios.js";
import { useAuth } from "../../context/AuthContext.jsx";



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
      if (user.role === "admin") nav("/admin/dashboard");
      else if (user.role === "university") nav("/university/dashboard");
      else nav("/student/dashboard");
    } catch (e2) {
      setErr(e2.response?.data?.message || "Login failed. Please check your credentials.");
      setLoading(false);
    }
  };
  return (
    <div className="login-root">

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
                <div className={`login-selected-role-icon ${selectedRole === "university" ? "univ" : selectedRole === "admin" ? "admin" : "student"}`}>
                  {selectedRole === "student"
                    ? <GraduationCap size={17} strokeWidth={2} />
                    : selectedRole === "admin"
                      ? <Shield size={17} strokeWidth={2} />
                      : <Building2 size={17} strokeWidth={2} />
                  }
                </div>
                <div>
                  <div className="login-selected-role-label">
                    {selectedRole === "student" ? "Student Account" : selectedRole === "admin" ? "Admin Account" : "University Account"}
                  </div>
                  <div className="login-selected-role-sub">Signing in as a {selectedRole}</div>
                </div>
                {selectedRole !== "admin" && (
                  <button className="login-change-btn" onClick={() => { setStep(1); setErr(""); }}>
                    Change
                  </button>
                )}
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