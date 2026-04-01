import React, { useEffect, useState } from "react";
import api from "../../api/axios.js";
import { Link } from "react-router-dom";
import {
  Calendar, GraduationCap, MapPin, Loader2, AlertCircle, BookOpen
} from "lucide-react";

/* ─────────────────────────────────────────────
   CSS
───────────────────────────────────────────── */
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
    --r: 16px;
    --shadow: 0 2px 16px rgba(13,45,63,0.07);
    --shadow-lg: 0 16px 48px rgba(13,45,63,0.13);
  }

  .ma {
    font-family: var(--font);
    background: var(--bg);
    min-height: 100vh;
    padding: 32px 36px;
    color: var(--text);
    -webkit-font-smoothing: antialiased;
  }

  /* ── HEADER ── */
  .ma-header { margin-bottom: 28px; }
  .ma-title { font-size: 26px; font-weight: 900; color: var(--dark); letter-spacing: -0.8px; margin-bottom: 6px; }
  .ma-subtitle { font-size: 14px; color: var(--muted); font-weight: 400; line-height: 1.6; }

  /* ── GRID ── */
  .ma-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 20px;
    margin-top: 16px;
  }

  /* ── PROGRAM CARD ── */
  .ma-card {
    background: var(--card); border-radius: 20px;
    border: 1.5px solid var(--border); box-shadow: var(--shadow);
    overflow: hidden; transition: all 0.28s cubic-bezier(0.34,1.1,0.64,1);
    display: flex; flex-direction: column; position: relative;
  }
  .ma-card:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-lg);
    border-color: rgba(58,161,201,0.25);
  }

  /* Status badge floating top right */
  .ma-status-badge {
    position: absolute; top: 16px; right: 16px; z-index: 3;
    display: inline-flex; align-items: center; gap: 6px;
    backdrop-filter: blur(8px); border-radius: 100px;
    padding: 6px 14px; font-size: 12px; font-weight: 800;
    text-transform: capitalize; letter-spacing: 0.3px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  }
  .ma-status-badge[data-status="pending"]   { background: rgba(255,255,255,0.95); color: #b45309; border: 1.5px solid #fcd34d; }
  .ma-status-badge[data-status="approved"],
  .ma-status-badge[data-status="accepted"]  { background: rgba(255,255,255,0.95); color: #166534; border: 1.5px solid #86efac; }
  .ma-status-badge[data-status="rejected"],
  .ma-status-badge[data-status="declined"]  { background: rgba(255,255,255,0.95); color: #b91c1c; border: 1.5px solid #fca5a5; }

  /* Banner */
  .ma-banner {
    height: 160px; position: relative;
    background: linear-gradient(135deg, #e8f4fa 0%, #d5ede5 100%);
    overflow: visible; flex-shrink: 0;
  }
  .ma-banner-img { width: 100%; height: 100%; object-fit: cover; display: block; }
  .ma-banner-grid {
    position: absolute; inset: 0;
    background-image:
      linear-gradient(rgba(58,161,201,0.07) 1px, transparent 1px),
      linear-gradient(90deg, rgba(58,161,201,0.07) 1px, transparent 1px);
    background-size: 22px 22px;
  }

  /* Logo */
  .ma-logo {
    position: absolute; left: 20px; bottom: -28px;
    width: 80px; height: 80px; border-radius: 18px;
    background: white; border: 2px solid var(--border);
    display: flex; align-items: center; justify-content: center;
    box-shadow: 0 8px 24px rgba(13,45,63,0.13);
    overflow: hidden; z-index: 2; flex-shrink: 0;
  }
  .ma-logo img { width: 100%; height: 100%; object-fit: cover; }
  .ma-logo-fallback {
    font-size: 28px; font-weight: 900; color: var(--p);
    font-family: var(--font);
  }

  /* Card body */
  .ma-body { padding: 38px 20px 16px; flex: 1; display: flex; flex-direction: column; gap: 12px; }

  /* University name */
  .ma-univ { font-size: 18px; font-weight: 900; color: var(--dark); letter-spacing: -0.4px; line-height: 1.2; }
  .ma-course { font-size: 15px; font-weight: 700; color: var(--text); }

  /* QS rank row */
  .ma-qs-row {
    display: flex; align-items: center; gap: 7px;
    font-size: 14px; font-weight: 800; color: #d97706;
    margin-top: 2px;
  }
  .ma-qs-badge {
    width: 22px; height: 22px; border-radius: 50%;
    background: #d97706; color: white;
    font-size: 9px; font-weight: 900; letter-spacing: 0.3px;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
  }

  .ma-divider { height: 1px; background: var(--border); margin: 4px 0; }

  /* Provided offers text block */
  .ma-offer-label {
    font-size: 11px; font-weight: 700; letter-spacing: 0.8px;
    text-transform: uppercase; color: var(--muted); margin-bottom: 6px;
  }
  .ma-offer-text {
    font-size: 15.5px; font-weight: 700; color: var(--dark); line-height: 1.45;
  }

  /* Date rows */
  .ma-dates { display: flex; flex-direction: column; gap: 7px; }
  .ma-date-row { display: flex; align-items: center; gap: 9px; font-size: 13.5px; font-weight: 600; color: var(--muted); }
  .ma-date-icon { flex-shrink: 0; }

  /* Card footer */
  .ma-footer { padding: 4px 20px 20px; }

  /* View Details button */
  .ma-details-btn {
    display: flex; align-items: center; justify-content: center; gap: 8px;
    width: 100%; padding: 14px;
    border-radius: 14px;
    background: var(--p); color: white;
    font-size: 14px; font-weight: 700; font-family: var(--font);
    text-decoration: none; transition: all 0.22s cubic-bezier(0.34,1.2,0.64,1);
  }
  .ma-details-btn:hover {
    background: var(--dark);
    transform: translateY(-2px);
    box-shadow: 0 6px 18px rgba(58,161,201,0.32);
  }

  /* ── STATES ── */
  .ma-loading {
    display: flex; align-items: center; justify-content: center;
    gap: 12px; padding: 80px;
    color: var(--muted); font-size: 14px; font-weight: 600;
  }
  @keyframes spin { to { transform: rotate(360deg); } }
  .spin { animation: spin 0.8s linear infinite; }

  .ma-empty { text-align: center; padding: 80px 24px; }
  .ma-empty-icon {
    width: 72px; height: 72px; border-radius: 20px;
    background: rgba(58,161,201,0.08);
    display: flex; align-items: center; justify-content: center;
    margin: 0 auto 20px; color: var(--p);
  }
  .ma-empty-title { font-size: 18px; font-weight: 900; color: var(--dark); margin-bottom: 8px; }
  .ma-empty-sub { font-size: 14px; color: var(--muted); max-width: 320px; margin: 0 auto; line-height: 1.65; }

  .ma-error {
    display: flex; align-items: center; gap: 10px;
    background: #fff2f2; border: 1.5px solid #ffd0d0;
    color: #dc2626; padding: 14px 18px; border-radius: 14px;
    font-size: 13.5px; font-weight: 600; margin-bottom: 20px;
  }

  /* ── RESPONSIVE ── */
  @media (max-width: 900px) {
    .ma { padding: 20px 18px; }
    .ma-grid { grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); }
  }
  @media (max-width: 600px) {
    .ma { padding: 16px 14px; }
    .ma-grid { grid-template-columns: 1fr; }
  }
`;

/* ─── helpers ─── */
const money = (n) => Number(n || 0).toLocaleString(undefined, { maximumFractionDigits: 0 });

const safeDate = (d) => {
  if (!d) return "—";
  const dt = new Date(d);
  if (isNaN(dt.getTime())) return "—";
  return dt.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
};

/* ─── Single Apply Card ─── */
function ApplicationCard({ item }) {
  const p = item.program || {};

  const offerText = p.description
    ? p.description
    : [
      p.scholarshipAmount > 0 && `$${money(p.scholarshipAmount)} Scholarship`,
      p.tuitionTotal > 0 && `$${money(p.tuitionTotal)} Tuition`,
    ]
      .filter(Boolean)
      .join(", ") || "View details for full offer information";

  return (
    <div className="ma-card">
      <div
        className="ma-status-badge"
        data-status={(item.status || "").toLowerCase()}
      >
        {item.status || "Pending"}
      </div>

      <div className="ma-banner">
        {p.bannerImageUrl ? (
          <img
            src={p.bannerImageUrl}
            alt="banner"
            className="ma-banner-img"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        ) : (
          <div className="ma-banner-grid" />
        )}

        <div className="ma-logo">
          {p.universityLogoUrl ? (
            <img
              src={p.universityLogoUrl}
              alt={p.universityName || "Logo"}
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          ) : (
            <span className="ma-logo-fallback">
              {(p.universityName || "U")[0].toUpperCase()}
            </span>
          )}
        </div>
      </div>

      <div className="ma-body">
        <div className="ma-univ">{p.universityName || "University"}</div>
        <div className="ma-course">
          {p.title || p.programName || p.courseName || item.programTitle || "Program"}
        </div>

        {p.qsRankText && (
          <div className="ma-qs-row">
            <div className="ma-qs-badge">QS</div>
            {p.qsRankText}
          </div>
        )}

        <div className="ma-divider" />

        <div>
          <div className="ma-offer-label">Provided Offers</div>
          <div className="ma-offer-text">{offerText}</div>
        </div>

        <div className="ma-divider" />

        <div className="ma-dates">
          {p.country && (
            <div className="ma-date-row">
              <MapPin size={16} className="ma-date-icon" strokeWidth={1.8} />
              {p.country}
            </div>
          )}

          {p.gpaRequired > 0 && (
            <div className="ma-date-row">
              <GraduationCap size={16} className="ma-date-icon" strokeWidth={1.8} />
              Min GPA: {Number(p.gpaRequired).toFixed(1)}
            </div>
          )}

          <div className="ma-date-row">
            <Calendar size={16} className="ma-date-icon" strokeWidth={1.8} />
            Applied: {safeDate(item.createdAt)}
          </div>
        </div>
      </div>


    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */
export default function MyApplications() {
  const [apps, setApps] = useState([]);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get("/applications/student/list");
        const list = Array.isArray(res.data)
          ? res.data
          : res.data.applications || [];
        setApps(list);
      } catch (e) {
        setErr(e.response?.data?.message || "Failed to load applications");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="ma">
      <style>{css}</style>

      <div className="ma-header">
        <h1 className="ma-title">My Applications</h1>
        <p className="ma-subtitle">
          Track the status of your university applications.
        </p>
      </div>

      {err && (
        <div className="ma-error">
          <AlertCircle size={16} /> {err}
        </div>
      )}

      {loading ? (
        <div className="ma-loading">
          <Loader2 size={22} className="spin" /> Loading your applications...
        </div>
      ) : apps.length === 0 ? (
        <div className="ma-empty">
          <div className="ma-empty-icon">
            <BookOpen size={30} strokeWidth={1.5} />
          </div>
          <div className="ma-empty-title">No applications yet</div>
          <div className="ma-empty-sub">
            Don&apos;t have any pending matches. Head to the programs page and apply!
          </div>
        </div>
      ) : (
        <div className="ma-grid">
          {apps.map((a) => (
            <ApplicationCard key={a._id} item={a} />
          ))}
        </div>
      )}
    </div>
  );
}