import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  GraduationCap, Building2, ArrowRight, ArrowLeft,
  Mail, Lock, Eye, EyeOff, AlertCircle, User, CheckCircle2
} from "lucide-react";
import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext";
import "../../style.css";

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
  { label: "Choose Account Type", sub: "Student or college" },
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
  const [gpa, setGpa] = useState("");
  const [qualificationLevel, setQualificationLevel] = useState("");
  const [budget, setBudget] = useState("");
  const [preferredLocations, setPreferredLocations] = useState("");
  const [preferredCourse, setPreferredCourse] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  const strength = getStrength(password);

  const handleContinue = () => {
    if (!selectedRole) return;
    setError("");
    setStep(2);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    // ✅ NAME VALIDATION (only letters + spaces)
    if (!/^[A-Za-z\s]+$/.test(name)) {
      setError("Name must contain only letters (no numbers or symbols).");
      return;
    }

    // ✅ PASSWORD VALIDATION (strong password)
    if (
      password.length < 8 ||
      !/[A-Z]/.test(password) ||
      !/[0-9]/.test(password) ||
      !/[^A-Za-z0-9]/.test(password)
    ) {
      setError(
        "Password must be at least 8 characters and include uppercase, number, and special character."
      );
      return;
    }

    // ✅ TERMS CHECK (already there)
    if (!agreed) {
      setError("Please agree to the Terms of Service to continue.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const payload = { name, email, password, role: selectedRole };

      if (selectedRole === "student") {
        payload.gpa = gpa ? parseFloat(gpa) : undefined;
        payload.qualificationLevel = qualificationLevel;
        payload.budget = budget ? parseInt(budget, 10) : undefined;
        payload.preferredLocations = preferredLocations;
        payload.preferredCourse = preferredCourse;
      }

      const response = await api.post("/auth/register", payload);
      setDone(true);

      setTimeout(() => {
        nav("/login");
      }, 3000);

    } catch (e2) {
      setError(e2.response?.data?.message || e2.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  /* Active step for left panel indicator */
  const activeStep = step; // 1 or 2

  return (
    <div className="reg-root">

      {/* LEFT PANEL */}
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
            and college already on the platform.
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

      {/* RIGHT PANEL */}
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

          {/* SUCCESS STATE */}
          {done && (
            <div className="reg-success">
              <div className="reg-success-icon">
                <CheckCircle2 size={36} strokeWidth={1.8} />
              </div>
              <div className="reg-success-title">Account created!</div>
              <div className="reg-success-sub">
                {selectedRole === "college"
                  ? "Registration successful. Redirecting to login..."
                  : "Please check your email to verify your account. Redirecting to login..."}
              </div>
            </div>
          )}

          {/* STEP 1: CHOOSE ROLE */}
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
                    <div className="reg-role-desc">Browse programs, apply to college, and track your journey.</div>
                  </div>
                  <div className="reg-role-check"><div className="reg-role-check-dot" /></div>
                </div>

                <div
                  className={`reg-role-card univ ${selectedRole === "college" ? "selected univ" : ""}`}
                  onClick={() => setSelectedRole("college")}
                  role="button" tabIndex={0}
                  onKeyDown={(e) => e.key === "Enter" && setSelectedRole("college")}
                >
                  <div className="reg-role-icon"><Building2 size={24} strokeWidth={1.8} /></div>
                  <div className="reg-role-body">
                    <div className="reg-role-title">I am a College</div>
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
                <Link to={selectedRole === "college" ? "/college/login" : "/student/login"}>
                  Sign in
                </Link>
              </div>
            </>
          )}

          {/* STEP 2: REGISTRATION FORM */}
          {!done && step === 2 && (
            <>
              <div className="reg-step-head">
                <div className="reg-step-label">Step 2 of 2</div>
                <div className="reg-step-title">Create your account</div>
                <div className="reg-step-sub">Fill in your details to get started — it only takes a minute.</div>
              </div>

              {/* Selected role chip */}
              <div className="reg-selected-chip">
                <div className={`reg-chip-icon ${selectedRole === "college" ? "univ" : "student"}`}>
                  {selectedRole === "student"
                    ? <GraduationCap size={17} strokeWidth={2} />
                    : <Building2 size={17} strokeWidth={2} />}
                </div>
                <div>
                  <div className="reg-chip-label">
                    {selectedRole === "student" ? "Student Account" : "college Account"}
                  </div>
                  <div className="reg-chip-sub">Registering as a {selectedRole}</div>
                </div>
                {!propRole && (
                  <button className="reg-chip-change" onClick={() => { setStep(1); setError(""); }}>
                    Change
                  </button>
                )}
              </div>

              {error && (
                <div className="reg-error" style={{ marginBottom: 16 }}>
                  <AlertCircle size={16} style={{ flexShrink: 0, marginTop: 1 }} />
                  {error}
                </div>
              )}

              <form className="reg-form" onSubmit={onSubmit}>
                {/* Name */}
                <div className="reg-field">
                  <label className="reg-label">
                    {selectedRole === "college" ? "college / Institution Name" : "Full Name"}
                  </label>
                  <div className="reg-input-wrap">
                    <User size={16} className="reg-input-icon" />
                    <input
                      className="reg-input"
                      type="text"
                      placeholder={selectedRole === "college" ? "e.g. KMC College" : "e.g. Jeevan Shrestha"}
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

                {/* Additional Student Fields */}
                {selectedRole === "student" && (
                  <>
                    <div className="reg-field">
                      <label className="reg-label">Current/Final GPA</label>
                      <div className="reg-input-wrap">
                        <GraduationCap size={16} className="reg-input-icon" />
                        <input
                          className="reg-input"
                          type="number"
                          step="0.01"
                          min="0"
                          max="4.0"
                          placeholder="e.g. 3.8"
                          value={gpa}
                          onChange={(e) => {
                            const value = e.target.value;

                            if (value === "" || (Number(value) >= 0 && Number(value) <= 4)) {
                              setGpa(value);
                            }
                          }}
                          required
                        />
                      </div>
                    </div>
                    <div className="reg-field">
                      <label className="reg-label">Highest Qualification Level</label>
                      <div className="reg-input-wrap">
                        <Building2 size={16} className="reg-input-icon" />
                        <select
                          className="reg-input"
                          value={qualificationLevel}
                          onChange={(e) => setQualificationLevel(e.target.value)}
                          required
                        >
                          <option value="" disabled>Select your level</option>
                          <option value="High School">High School</option>
                          <option value="Associate Degree">Associate's Degree</option>
                          <option value="Bachelor's Degree">Bachelor's Degree</option>
                          <option value="Master's Degree">Master's Degree</option>
                        </select>
                      </div>
                    </div>
                    <div className="reg-field">
                      <label className="reg-label">Preferred Study Locations</label>
                      <div className="reg-input-wrap">
                        <select
                          className="reg-input"
                          value={preferredLocations}
                          onChange={(e) => setPreferredLocations(e.target.value)}
                        >
                          <option value="" disabled>Select preferred Locations</option>
                          <option value="Kathmandu">Kathmandu</option>
                          <option value="Lalitpur">Lalitpur</option>
                          <option value="Bhaktapur">Bhaktapur</option>
                          <option value="Pokhara">Pokhara</option>
                          <option value="Chitwan">Chitwan</option>
                          <option value="Biratnagar">Biratnagar</option>
                          <option value="Dharan">Dharan</option>
                          <option value="Butwal">Butwal</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                    </div>
                    <div className="reg-field">
                      <label className="reg-label">Preferred Course / Major</label>
                      <div className="reg-input-wrap">
                        <select
                          className="reg-input"
                          value={preferredCourse}
                          onChange={(e) => setPreferredCourse(e.target.value)}
                        >
                          <option value="" disabled>Select preferred course</option>
                          <option value="Computer Science & IT">Computer Science & IT</option>
                          <option value="Engineering">Engineering</option>
                          <option value="Business & Management">Business & Management</option>
                          <option value="Medicine & Healthcare">Medicine & Healthcare</option>
                          <option value="Science">Science</option>
                          <option value="Arts & Humanities">Arts & Humanities</option>
                          <option value="Law">Law</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                    </div>
                    <div className="reg-field">
                      <label className="reg-label">Maximum Budget (Rs)</label>
                      <div className="reg-input-wrap">
                        <input
                          className="reg-input"
                          type="number"
                          placeholder="e.g. 500000"
                          value={budget}
                          onChange={(e) => setBudget(e.target.value)}
                        />
                      </div>
                    </div>
                  </>
                )}

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
                  className={`reg-btn ${selectedRole === "college" ? "success" : "primary"}`}
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
                <Link to={selectedRole === "college" ? "/college/login" : "/student/login"}>
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