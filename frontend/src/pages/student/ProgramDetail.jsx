import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../../api/axios.js";
import {
  ArrowLeft, Globe, DollarSign, GraduationCap, Calendar,
  BookOpen, Building2, Clock, CheckCircle2, AlertCircle,
  MapPin, Send, Loader2, FileText,
} from "lucide-react";

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800;900&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --p: #3aa1c9;
    --s: #81C5A6;
    --dark: #0d2d3f;
    --text: #1a2e38;
    --muted: #6b8fa0;
    --bg: #f4f8fb;
    --card: #ffffff;
    --border: #e2ecf2;
    --font: 'Montserrat', sans-serif;
    --shadow: 0 2px 16px rgba(13,45,63,0.07);
    --shadow-lg: 0 16px 48px rgba(13,45,63,0.13);
  }

  .pd {
    font-family: var(--font);
    background: var(--bg);
    min-height: 100vh;
    padding: 32px 36px;
    color: var(--text);
    -webkit-font-smoothing: antialiased;
  }

  /* ── BACK LINK ── */
  .pd-back {
    display: inline-flex; align-items: center; gap: 7px;
    font-size: 13px; font-weight: 600; color: var(--muted);
    text-decoration: none; margin-bottom: 24px;
    transition: color 0.18s;
  }
  .pd-back:hover { color: var(--p); }

  /* ── LAYOUT ── */
  .pd-layout {
    display: grid;
    grid-template-columns: 1fr 340px;
    gap: 24px;
    align-items: start;
  }

  /* ── MAIN CARD ── */
  .pd-main {
    background: var(--card);
    border-radius: 20px;
    border: 1.5px solid var(--border);
    box-shadow: var(--shadow);
    overflow: hidden;
  }

  /* Banner */
  .pd-banner {
    height: 220px;
    background: linear-gradient(135deg, #e8f4fa 0%, #d5ede5 100%);
    position: relative; overflow: hidden;
  }
  .pd-banner-img { width: 100%; height: 100%; object-fit: cover; display: block; }
  .pd-banner-overlay {
    position: absolute; inset: 0;
    background: linear-gradient(to bottom, rgba(13,45,63,0.05) 0%, rgba(13,45,63,0.5) 100%);
  }
  .pd-banner-grid {
    position: absolute; inset: 0;
    background-image:
      linear-gradient(rgba(58,161,201,0.08) 1px, transparent 1px),
      linear-gradient(90deg, rgba(58,161,201,0.08) 1px, transparent 1px);
    background-size: 26px 26px;
  }
  .pd-banner-pills {
    position: absolute; top: 16px; left: 16px; right: 16px;
    display: flex; justify-content: space-between; align-items: flex-start;
  }
  .pd-pill {
    display: inline-flex; align-items: center; gap: 6px;
    backdrop-filter: blur(8px); border-radius: 100px;
    padding: 6px 14px; font-size: 12px; font-weight: 700;
    border: 1px solid rgba(255,255,255,0.3);
  }
  .pd-pill.qs { background: rgba(255,243,220,0.92); color: #b36200; }
  .pd-pill.country { background: rgba(255,255,255,0.92); color: var(--dark); }

  /* Logo */
  .pd-logo {
    position: absolute; left: 24px; bottom: -26px;
    width: 64px; height: 64px; border-radius: 18px;
    background: white; border: 2.5px solid var(--border);
    display: flex; align-items: center; justify-content: center;
    box-shadow: 0 8px 24px rgba(13,45,63,0.14);
    overflow: hidden; z-index: 2;
  }
  .pd-logo img { width: 100%; height: 100%; object-fit: cover; }
  .pd-logo-fallback { font-size: 22px; font-weight: 900; color: var(--p); font-family: var(--font); }

  /* Main body */
  .pd-body { padding: 44px 28px 28px; }

  .pd-univ { font-size: 24px; font-weight: 900; color: var(--dark); letter-spacing: -0.6px; margin-bottom: 6px; }
  .pd-prog-tag {
    display: inline-flex; align-items: center; gap: 6px;
    font-size: 14px; font-weight: 600; color: var(--p); margin-bottom: 20px;
  }

  .pd-divider { height: 1px; background: var(--border); margin: 20px 0; }

  /* Stats grid */
  .pd-stats {
    display: grid; grid-template-columns: repeat(2, 1fr);
    gap: 14px; margin-bottom: 24px;
  }
  .pd-stat-box {
    background: var(--bg); border-radius: 14px; padding: 16px;
    border: 1.5px solid var(--border);
    transition: border-color 0.18s;
  }
  .pd-stat-box:hover { border-color: rgba(58,161,201,0.3); }
  .pd-stat-key {
    display: flex; align-items: center; gap: 6px;
    font-size: 10.5px; font-weight: 700; letter-spacing: 1px;
    text-transform: uppercase; color: var(--muted); margin-bottom: 7px;
  }
  .pd-stat-val { font-size: 17px; font-weight: 800; color: var(--dark); letter-spacing: -0.3px; }
  .pd-stat-val.deadline-soon { color: #f97316; }
  .pd-stat-val.deadline-past { color: #dc2626; }

  /* Description */
  .pd-section-title {
    font-size: 11px; font-weight: 700; letter-spacing: 1.5px;
    text-transform: uppercase; color: var(--muted); margin-bottom: 12px;
  }
  .pd-description {
    font-size: 14.5px; color: var(--muted); line-height: 1.75;
    font-weight: 400;
  }

  /* ── SIDEBAR ── */
  .pd-sidebar { display: flex; flex-direction: column; gap: 16px; }

  /* Apply card */
  .pd-apply-card {
    background: var(--card); border-radius: 20px;
    border: 1.5px solid var(--border); box-shadow: var(--shadow);
    overflow: hidden;
  }
  .pd-apply-card-top {
    background: linear-gradient(135deg, var(--dark) 0%, #0a3d52 60%, #1a5c6b 100%);
    padding: 24px 22px; position: relative; overflow: hidden;
  }
  .pd-apply-card-top::before {
    content: ''; position: absolute; width: 180px; height: 180px; border-radius: 50%;
    top: -70px; right: -50px;
    background: radial-gradient(circle, rgba(58,161,201,0.25) 0%, transparent 70%);
  }
  .pd-apply-card-top::after {
    content: ''; position: absolute; width: 120px; height: 120px; border-radius: 50%;
    bottom: -50px; left: -20px;
    background: radial-gradient(circle, rgba(129,197,166,0.2) 0%, transparent 70%);
  }
  .pd-apply-card-grid {
    position: absolute; inset: 0;
    background-image:
      linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
    background-size: 24px 24px;
  }
  .pd-apply-label {
    position: relative; z-index: 2;
    font-size: 10.5px; font-weight: 700; letter-spacing: 1.5px;
    text-transform: uppercase; color: var(--s); margin-bottom: 8px;
  }
  .pd-apply-amount {
    position: relative; z-index: 2;
    font-size: 34px; font-weight: 900; color: white;
    letter-spacing: -1.5px; line-height: 1;
  }
  .pd-apply-amount small { font-size: 16px; font-weight: 600; color: rgba(255,255,255,0.6); margin-left: 6px; }
  .pd-apply-sub {
    position: relative; z-index: 2;
    font-size: 12px; color: rgba(255,255,255,0.55); font-weight: 500; margin-top: 8px;
  }
  .pd-apply-body { padding: 20px 22px; }

  /* Mini stat rows in apply card */
  .pd-apply-rows { display: flex; flex-direction: column; gap: 10px; margin-bottom: 20px; }
  .pd-apply-row {
    display: flex; align-items: center; justify-content: space-between;
    font-size: 13px; padding-bottom: 10px;
    border-bottom: 1px solid var(--border);
  }
  .pd-apply-row:last-child { border-bottom: none; padding-bottom: 0; }
  .pd-apply-row-key { display: flex; align-items: center; gap: 7px; font-weight: 600; color: var(--muted); }
  .pd-apply-row-val { font-weight: 700; color: var(--dark); text-align: right; }

  /* Apply button */
  .pd-apply-btn {
    width: 100%; padding: 14px; border-radius: 12px; border: none;
    background: var(--p); color: white;
    font-size: 15px; font-weight: 700; font-family: var(--font);
    cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 9px;
    transition: all 0.22s cubic-bezier(0.34,1.2,0.64,1);
  }
  .pd-apply-btn:hover:not(:disabled) {
    background: var(--dark);
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(58,161,201,0.32);
  }
  .pd-apply-btn:disabled { opacity: 0.55; cursor: not-allowed; transform: none; }
  .pd-apply-btn.success { background: #155c40; }
  .pd-apply-btn.error   { background: #9b1c1c; }

  /* Message box */
  .pd-msg {
    display: flex; align-items: flex-start; gap: 10px;
    padding: 12px 14px; border-radius: 11px;
    font-size: 13px; font-weight: 600; margin-top: 12px; line-height: 1.45;
  }
  .pd-msg.success { background: #edfaf4; border: 1.5px solid #a7e8c7; color: #155c40; }
  .pd-msg.error   { background: #fff2f2; border: 1.5px solid #ffd0d0; color: #9b1c1c; }

  /* University info card */
  .pd-info-card {
    background: var(--card); border-radius: 16px;
    border: 1.5px solid var(--border); box-shadow: var(--shadow);
    padding: 20px 22px;
  }
  .pd-info-card-title {
    font-size: 11px; font-weight: 700; letter-spacing: 1.5px;
    text-transform: uppercase; color: var(--muted); margin-bottom: 14px;
  }
  .pd-info-row {
    display: flex; align-items: center; gap: 10px;
    padding: 10px 0; border-bottom: 1px solid var(--border);
    font-size: 13.5px;
  }
  .pd-info-row:last-child { border-bottom: none; padding-bottom: 0; }
  .pd-info-row-icon { color: var(--p); flex-shrink: 0; }
  .pd-info-row-label { color: var(--muted); font-weight: 500; flex: 1; }
  .pd-info-row-val { font-weight: 700; color: var(--dark); text-align: right; }

  /* ── STATES ── */
  .pd-loading {
    display: flex; align-items: center; justify-content: center;
    gap: 12px; padding: 100px;
    color: var(--muted); font-size: 14px; font-weight: 600;
  }
  @keyframes spin { to { transform: rotate(360deg); } }
  .spin { animation: spin 0.8s linear infinite; }

  .pd-error {
    display: flex; align-items: center; gap: 10px;
    background: #fff2f2; border: 1.5px solid #ffd0d0;
    color: #dc2626; padding: 16px 20px; border-radius: 14px;
    font-size: 14px; font-weight: 600;
  }

  /* ── RESPONSIVE ── */
  @media (max-width: 900px) {
    .pd { padding: 20px 18px; }
    .pd-layout { grid-template-columns: 1fr; }
    .pd-sidebar { order: -1; }
    .pd-apply-card-top { padding: 20px; }
  }
  @media (max-width: 600px) {
    .pd { padding: 16px 14px; }
    .pd-stats { grid-template-columns: 1fr; }
    .pd-banner { height: 160px; }
  }
`;

/* ─── helpers ─── */
const money = (n) =>
  Number(n || 0).toLocaleString(undefined, { maximumFractionDigits: 0 });

const fmtDate = (d) => {
  if (!d) return "—";
  const dt = new Date(d);
  if (isNaN(dt.getTime())) return "—";
  return dt.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
};

const deadlineStatus = (d) => {
  if (!d) return "";
  const diff = new Date(d) - new Date();
  if (diff < 0) return "past";
  if (diff < 1000 * 60 * 60 * 24 * 14) return "soon";
  return "";
};

export default function ProgramDetail() {
  const { id } = useParams();
  const [program, setProgram] = useState(null);
  const [msg, setMsg]         = useState("");
  const [msgType, setMsgType] = useState(""); // "success" | "error"
  const [applying, setApplying] = useState(false);
  const [applied, setApplied]   = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get(`/programs/${id}`);
        const p = res.data.program || res.data;
        setProgram(p);
      } catch (e) {
        setMsg(e.response?.data?.message || "Program not found.");
        setMsgType("error");
      }
    })();
  }, [id]);

  /* — same apply logic as original — */
  const apply = async () => {
    setMsg("");
    setApplying(true);
    try {
      await api.post(`/applications/${id}`);
      setMsg("Application submitted successfully!");
      setMsgType("success");
      setApplied(true);
    } catch (e) {
      setMsg(e.response?.data?.message || "Already applied or an error occurred.");
      setMsgType("error");
    } finally {
      setApplying(false);
    }
  };

  /* ── LOADING ── */
  if (!program && !msg) {
    return (
      <div className="pd">
        <style>{css}</style>
        <div className="pd-loading">
          <Loader2 size={22} className="spin" /> Loading program…
        </div>
      </div>
    );
  }

  /* ── ERROR ── */
  if (!program && msg) {
    return (
      <div className="pd">
        <style>{css}</style>
        <Link className="pd-back" to="/student/programs">
          <ArrowLeft size={15} /> Back to Programs
        </Link>
        <div className="pd-error">
          <AlertCircle size={18} /> {msg}
        </div>
      </div>
    );
  }

  const scholarship = Number(program.scholarshipAmount || 0);
  const total       = Number(program.tuitionTotal || 0);
  const left        = Math.max(total - scholarship, 0);
  const ds          = deadlineStatus(program.deadline);

  return (
    <div className="pd">
      <style>{css}</style>

      {/* Back */}
      <Link className="pd-back" to="/student/programs">
        <ArrowLeft size={15} /> Back to Programs
      </Link>

      <div className="pd-layout">

        {/* ── MAIN CARD ── */}
        <div className="pd-main">
          {/* Banner */}
          <div className="pd-banner">
            {program.bannerImageUrl
              ? <img src={program.bannerImageUrl} alt="banner" className="pd-banner-img"
                  onError={(e) => { e.currentTarget.style.display = "none"; }} />
              : <div className="pd-banner-grid" />
            }
            <div className="pd-banner-overlay" />

            <div className="pd-banner-pills">
              {program.qsRankText && (
                <div className="pd-pill qs">QS {program.qsRankText}</div>
              )}
              {program.country && (
                <div className="pd-pill country">
                  <MapPin size={11} strokeWidth={2.5} /> {program.country}
                </div>
              )}
            </div>

            {/* Logo */}
            <div className="pd-logo">
              {program.universityLogoUrl
                ? <img src={program.universityLogoUrl} alt={program.universityName}
                    onError={(e) => { e.currentTarget.style.display = "none"; }} />
                : <span className="pd-logo-fallback">
                    {(program.universityName || "U")[0].toUpperCase()}
                  </span>
              }
            </div>
          </div>

          {/* Body */}
          <div className="pd-body">
            <div className="pd-univ">{program.universityName || "University"}</div>
            <div className="pd-prog-tag">
              <BookOpen size={14} strokeWidth={2} />
              {program.title}
            </div>

            <div className="pd-divider" />

            {/* Stats grid */}
            <div className="pd-stats">
              <div className="pd-stat-box">
                <div className="pd-stat-key"><Globe size={12} strokeWidth={2} /> Country</div>
                <div className="pd-stat-val">{program.country || "—"}</div>
              </div>
              <div className="pd-stat-box">
                <div className="pd-stat-key"><DollarSign size={12} strokeWidth={2} /> Tuition</div>
                <div className="pd-stat-val">${money(program.tuition)}</div>
              </div>
              <div className="pd-stat-box">
                <div className="pd-stat-key"><GraduationCap size={12} strokeWidth={2} /> Min GPA</div>
                <div className="pd-stat-val">
                  {program.gpaRequired > 0 ? Number(program.gpaRequired).toFixed(1) : "—"}
                </div>
              </div>
              <div className="pd-stat-box">
                <div className="pd-stat-key"><Calendar size={12} strokeWidth={2} /> Deadline</div>
                <div className={`pd-stat-val ${ds === "past" ? "deadline-past" : ds === "soon" ? "deadline-soon" : ""}`}>
                  {fmtDate(program.deadline)}
                </div>
              </div>
            </div>

            {/* Description */}
            {program.description && (
              <>
                <div className="pd-divider" />
                <div className="pd-section-title">About This Program</div>
                <p className="pd-description">{program.description}</p>
              </>
            )}
          </div>
        </div>

        {/* ── SIDEBAR ── */}
        <div className="pd-sidebar">

          {/* Apply card */}
          <div className="pd-apply-card">
            <div className="pd-apply-card-top">
              <div className="pd-apply-card-grid" />
              <div className="pd-apply-label">Provided Offer</div>
              <div className="pd-apply-amount">
                ${money(scholarship > 0 ? scholarship : program.tuition)}
                {scholarship > 0 && <small>scholarship</small>}
              </div>
              {scholarship > 0 && total > 0 && (
                <div className="pd-apply-sub">
                  ${money(scholarship)} of ${money(total)} — student pays ≈ ${money(left)}
                </div>
              )}
            </div>

            <div className="pd-apply-body">
              <div className="pd-apply-rows">
                <div className="pd-apply-row">
                  <span className="pd-apply-row-key"><Globe size={14} strokeWidth={1.8} /> Country</span>
                  <span className="pd-apply-row-val">{program.country || "—"}</span>
                </div>
                <div className="pd-apply-row">
                  <span className="pd-apply-row-key"><GraduationCap size={14} strokeWidth={1.8} /> Min GPA</span>
                  <span className="pd-apply-row-val">
                    {program.gpaRequired > 0 ? Number(program.gpaRequired).toFixed(1) : "Not specified"}
                  </span>
                </div>
                <div className="pd-apply-row">
                  <span className="pd-apply-row-key"><Clock size={14} strokeWidth={1.8} /> Deadline</span>
                  <span className={`pd-apply-row-val ${ds === "past" ? "deadline-past" : ds === "soon" ? "deadline-soon" : ""}`}
                    style={{ color: ds === "past" ? "#dc2626" : ds === "soon" ? "#f97316" : "var(--dark)" }}>
                    {fmtDate(program.deadline)}
                  </span>
                </div>
              </div>

              {/* Apply button — same logic as original */}
              <button
                className={`pd-apply-btn${applied ? " success" : msgType === "error" ? " error" : ""}`}
                onClick={apply}
                disabled={applying || applied || ds === "past"}
              >
                {applying ? (
                  <><Loader2 size={16} className="spin" /> Submitting…</>
                ) : applied ? (
                  <><CheckCircle2 size={16} /> Applied!</>
                ) : ds === "past" ? (
                  "Deadline Passed"
                ) : (
                  <><Send size={15} /> Apply Now</>
                )}
              </button>

              {/* Message — same as original */}
              {msg && (
                <div className={`pd-msg ${msgType}`}>
                  {msgType === "success"
                    ? <CheckCircle2 size={15} style={{ flexShrink: 0 }} />
                    : <AlertCircle size={15} style={{ flexShrink: 0 }} />}
                  {msg}
                </div>
              )}
            </div>
          </div>

          {/* University info card */}
          <div className="pd-info-card">
            <div className="pd-info-card-title">University Info</div>
            <div className="pd-info-row">
              <Building2 size={15} className="pd-info-row-icon" strokeWidth={1.8} />
              <span className="pd-info-row-label">Institution</span>
              <span className="pd-info-row-val">{program.universityName || "—"}</span>
            </div>
            <div className="pd-info-row">
              <FileText size={15} className="pd-info-row-icon" strokeWidth={1.8} />
              <span className="pd-info-row-label">Program</span>
              <span className="pd-info-row-val" style={{ fontSize: 12 }}>{program.title}</span>
            </div>
            {program.country && (
              <div className="pd-info-row">
                <MapPin size={15} className="pd-info-row-icon" strokeWidth={1.8} />
                <span className="pd-info-row-label">Location</span>
                <span className="pd-info-row-val">{program.country}</span>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}