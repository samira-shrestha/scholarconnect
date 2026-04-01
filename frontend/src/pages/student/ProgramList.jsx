import React, { useEffect, useState } from "react";
import api from "../../api/axios.js";
import { Link } from "react-router-dom";
import {
  Search, Globe, GraduationCap,
  Calendar, BookOpen, X, ChevronDown,
  Loader2, AlertCircle, MapPin,
  SlidersHorizontal,
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

  .pl {
    font-family: var(--font);
    background: var(--bg);
    min-height: 100vh;
    padding: 32px 36px;
    color: var(--text);
    -webkit-font-smoothing: antialiased;
  }

  /* ── HEADER ── */
  .pl-header { margin-bottom: 28px; }
  .pl-breadcrumb {
    font-size: 11px; font-weight: 700; color: var(--muted);
    letter-spacing: 1px; text-transform: uppercase;
    margin-bottom: 8px; display: flex; align-items: center; gap: 6px;
  }
  .pl-breadcrumb-sep { opacity: 0.4; }
  .pl-title { font-size: 26px; font-weight: 900; color: var(--dark); letter-spacing: -0.8px; margin-bottom: 6px; }
  .pl-subtitle { font-size: 14px; color: var(--muted); font-weight: 400; line-height: 1.6; }

  /* ── STATS BAR ── */
  .pl-stats { display: flex; gap: 20px; margin-bottom: 24px; flex-wrap: wrap; align-items: center; }
  .pl-stat { display: flex; align-items: center; gap: 8px; }
  .pl-stat-num { font-size: 20px; font-weight: 900; color: var(--dark); letter-spacing: -0.8px; }
  .pl-stat-label { font-size: 12px; color: var(--muted); font-weight: 500; }
  .pl-stat-div { width: 1px; height: 28px; background: var(--border); }

  /* ── TOOLBAR ── */
  .pl-toolbar { display: flex; align-items: center; gap: 10px; margin-bottom: 24px; flex-wrap: wrap; }
  .pl-search-wrap {
    display: flex; align-items: center; gap: 10px;
    background: var(--card); border: 1.5px solid var(--border);
    border-radius: 12px; padding: 0 14px;
    flex: 1; min-width: 200px;
    transition: border-color 0.2s, box-shadow 0.2s;
  }
  .pl-search-wrap:focus-within {
    border-color: var(--p);
    box-shadow: 0 0 0 3px rgba(58,161,201,0.1);
  }
  .pl-search-icon { color: var(--muted); flex-shrink: 0; }
  .pl-search {
    flex: 1; border: none; outline: none; padding: 11px 0;
    font-size: 13.5px; font-weight: 500; color: var(--text);
    background: transparent; font-family: var(--font);
  }
  .pl-search::placeholder { color: #b0c8d4; font-weight: 400; }
  .pl-clear-btn {
    background: none; border: none; cursor: pointer;
    color: var(--muted); display: flex; padding: 2px;
    transition: color 0.15s;
  }
  .pl-clear-btn:hover { color: var(--dark); }

  .pl-filter-group { display: flex; gap: 8px; flex-wrap: wrap; }
  .pl-select-wrap {
    display: flex; align-items: center; gap: 7px;
    background: var(--card); border: 1.5px solid var(--border);
    border-radius: 10px; padding: 0 12px; cursor: pointer;
    transition: border-color 0.18s;
  }
  .pl-select-wrap:focus-within { border-color: var(--p); }
  .pl-select-wrap:hover { border-color: rgba(58,161,201,0.4); }
  .pl-select {
    border: none; outline: none; padding: 9px 0;
    font-size: 13px; font-weight: 600; color: var(--muted);
    background: transparent; font-family: var(--font);
    cursor: pointer; appearance: none; padding-right: 4px;
  }
  .pl-results-count {
    font-size: 13px; font-weight: 600; color: var(--muted);
    white-space: nowrap; margin-left: auto;
  }

  /* ── GRID ── */
  .pl-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 20px;
  }

  /* ── PROGRAM CARD ── */
  .pl-card {
    background: var(--card); border-radius: 20px;
    border: 1.5px solid var(--border); box-shadow: var(--shadow);
    overflow: hidden; transition: all 0.28s cubic-bezier(0.34,1.1,0.64,1);
    display: flex; flex-direction: column;
  }
  .pl-card:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-lg);
    border-color: rgba(58,161,201,0.25);
  }

  /* Banner — half width, logo overlaps left */
  .pl-banner {
    height: 160px; position: relative;
    background: linear-gradient(135deg, #e8f4fa 0%, #d5ede5 100%);
    overflow: visible; flex-shrink: 0;
  }
  .pl-banner-img { width: 100%; height: 100%; object-fit: cover; display: block; }
  .pl-banner-grid {
    position: absolute; inset: 0;
    background-image:
      linear-gradient(rgba(58,161,201,0.07) 1px, transparent 1px),
      linear-gradient(90deg, rgba(58,161,201,0.07) 1px, transparent 1px);
    background-size: 22px 22px;
  }

  /* Logo — large, left-aligned, overlaps banner bottom */
  .pl-logo {
    position: absolute; left: 20px; bottom: -28px;
    width: 80px; height: 80px; border-radius: 18px;
    background: white; border: 2px solid var(--border);
    display: flex; align-items: center; justify-content: center;
    box-shadow: 0 8px 24px rgba(13,45,63,0.13);
    overflow: hidden; z-index: 2; flex-shrink: 0;
  }
  .pl-logo img { width: 100%; height: 100%; object-fit: cover; }
  .pl-logo-fallback {
    font-size: 28px; font-weight: 900; color: var(--p);
    font-family: var(--font);
  }

  /* Card body */
  .pl-body { padding: 38px 20px 16px; flex: 1; display: flex; flex-direction: column; gap: 12px; }

  /* University name */
  .pl-univ { font-size: 18px; font-weight: 900; color: var(--dark); letter-spacing: -0.4px; line-height: 1.2; }

  /* QS rank row — orange, like screenshot */
  .pl-qs-row {
    display: flex; align-items: center; gap: 7px;
    font-size: 14px; font-weight: 800; color: #d97706;
    margin-top: 2px;
  }
  .pl-qs-badge {
    width: 22px; height: 22px; border-radius: 50%;
    background: #d97706; color: white;
    font-size: 9px; font-weight: 900; letter-spacing: 0.3px;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
  }

  .pl-divider { height: 1px; background: var(--border); margin: 4px 0; }

  /* Provided offers text block */
  .pl-offer-label {
    font-size: 11px; font-weight: 700; letter-spacing: 0.8px;
    text-transform: uppercase; color: var(--muted); margin-bottom: 6px;
  }
  .pl-offer-text {
    font-size: 15.5px; font-weight: 700; color: var(--dark); line-height: 1.45;
  }

  /* Date rows */
  .pl-dates { display: flex; flex-direction: column; gap: 7px; }
  .pl-date-row { display: flex; align-items: center; gap: 9px; font-size: 13.5px; font-weight: 600; color: var(--muted); }
  .pl-date-row.deadline { color: #dc2626; }
  .pl-date-row.soon { color: #f97316; }
  .pl-date-icon { flex-shrink: 0; }

  /* Card footer */
  .pl-footer { padding: 4px 20px 20px; }

  /* View Details button — full width, dark like screenshot */
  .pl-details-btn {
    display: flex; align-items: center; justify-content: center; gap: 8px;
    width: 100%; padding: 14px;
    border-radius: 14px;
    background: var(--p); color: white;
    font-size: 14px; font-weight: 700; font-family: var(--font);
    text-decoration: none; transition: all 0.22s cubic-bezier(0.34,1.2,0.64,1);
  }
  .pl-details-btn:hover {
    background: var(--dark);
    transform: translateY(-2px);
    box-shadow: 0 6px 18px rgba(58,161,201,0.32);
  }

  /* ── STATES ── */
  .pl-loading {
    display: flex; align-items: center; justify-content: center;
    gap: 12px; padding: 80px;
    color: var(--muted); font-size: 14px; font-weight: 600;
  }
  @keyframes spin { to { transform: rotate(360deg); } }
  .spin { animation: spin 0.8s linear infinite; }

  .pl-empty { text-align: center; padding: 80px 24px; }
  .pl-empty-icon {
    width: 72px; height: 72px; border-radius: 20px;
    background: rgba(58,161,201,0.08);
    display: flex; align-items: center; justify-content: center;
    margin: 0 auto 20px; color: var(--p);
  }
  .pl-empty-title { font-size: 18px; font-weight: 900; color: var(--dark); margin-bottom: 8px; }
  .pl-empty-sub { font-size: 14px; color: var(--muted); max-width: 320px; margin: 0 auto; line-height: 1.65; }

  .pl-error {
    display: flex; align-items: center; gap: 10px;
    background: #fff2f2; border: 1.5px solid #ffd0d0;
    color: #dc2626; padding: 14px 18px; border-radius: 14px;
    font-size: 13.5px; font-weight: 600; margin-bottom: 20px;
  }

  /* ── RESPONSIVE ── */
  @media (max-width: 900px) {
    .pl { padding: 20px 18px; }
    .pl-grid { grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); }
  }
  @media (max-width: 600px) {
    .pl { padding: 16px 14px; }
    .pl-grid { grid-template-columns: 1fr; }
    .pl-stats { gap: 12px; }
  }
  .pl-course {
  font-size: 15px;
  font-weight: 700;
  color: var(--text);
}
`;

/* ─── helpers ─── */
const money = (n) =>
  Number(n || 0).toLocaleString(undefined, { maximumFractionDigits: 0 });

const safeDate = (d) => {
  if (!d) return "—";
  const dt = new Date(d);
  if (isNaN(dt.getTime())) return "—";
  return dt.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
};

const deadlineStatus = (d) => {
  if (!d) return "";
  const diff = new Date(d) - new Date();
  if (diff < 0) return "past";
  if (diff < 1000 * 60 * 60 * 24 * 14) return "soon";
  return "";
};

/* ─── Single card ─── */
function ProgramCard({ p }) {
  const ds = deadlineStatus(p.deadline);

  /* Build the offer description text from available fields */
  const offerText = p.description
    ? p.description
    : [
      p.scholarshipAmount > 0 && `$${money(p.scholarshipAmount)} Scholarship`,
      p.tuitionTotal > 0 && `$${money(p.tuitionTotal)} Tuition`,
    ]
      .filter(Boolean)
      .join(", ") || "View details for full offer information";

  return (
    <div className="pl-card">
      {/* Banner */}
      <div className="pl-banner">
        {p.bannerImageUrl
          ? <img src={p.bannerImageUrl} alt="banner" className="pl-banner-img"
            onError={(e) => { e.currentTarget.style.display = "none"; }} />
          : <div className="pl-banner-grid" />
        }

        {/* Large logo overlapping banner bottom-left */}
        <div className="pl-logo">
          {p.universityLogoUrl
            ? <img src={p.universityLogoUrl} alt={p.universityName}
              onError={(e) => { e.currentTarget.style.display = "none"; }} />
            : <span className="pl-logo-fallback">
              {(p.universityName || "U")[0].toUpperCase()}
            </span>
          }
        </div>
      </div>

      {/* Body */}
      <div className="pl-body">
        {/* University name */}
        <div className="pl-univ">{p.universityName || "University"}</div>
        <div className="pl-course">{p.title || "Program"}</div>

        {/* QS rank row — orange like screenshot */}
        {p.qsRankText && (
          <div className="pl-qs-row">
            <div className="pl-qs-badge">QS</div>
            {p.qsRankText}
          </div>
        )}

        <div className="pl-divider" />

        {/* Provided offer as text */}
        <div>
          <div className="pl-offer-label">Provided Offers</div>
          <div className="pl-offer-text">{offerText}</div>
        </div>

        <div className="pl-divider" />

        {/* Date rows with icons — like screenshot */}
        <div className="pl-dates">
          {p.deadline && (
            <div className={`pl-date-row ${ds === "past" ? "deadline" : ds === "soon" ? "soon" : ""}`}>
              <Calendar size={16} className="pl-date-icon" strokeWidth={1.8} />
              Deadline: {safeDate(p.deadline)}
            </div>
          )}
          {p.gpaRequired > 0 && (
            <div className="pl-date-row">
              <GraduationCap size={16} className="pl-date-icon" strokeWidth={1.8} />
              Min GPA: {Number(p.gpaRequired).toFixed(1)}
            </div>
          )}
          {p.country && (
            <div className="pl-date-row">
              <MapPin size={16} className="pl-date-icon" strokeWidth={1.8} />
              {p.country}
            </div>
          )}
        </div>
      </div>

      {/* Footer — dark full-width button like screenshot */}
      <div className="pl-footer">
        <Link className="pl-details-btn" to={`/student/programs/${p._id}`}>
          View Offer Details
        </Link>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */
export default function ProgramList() {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [search, setSearch] = useState("");
  const [countryFilter, setCountryFilter] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await api.get("/programs");
        const list = Array.isArray(res.data) ? res.data : res.data.programs || [];
        setPrograms(list);
      } catch (e) {
        setErr(e.response?.data?.message || e.message || "Failed to load programs");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  /* unique countries for filter */
  const countries = [...new Set(programs.map((p) => p.country).filter(Boolean))].sort();

  /* filter + sort */
  const filtered = programs
    .filter((p) => {
      const q = search.toLowerCase();
      const matchSearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        (p.universityName || "").toLowerCase().includes(q) ||
        (p.country || "").toLowerCase().includes(q);
      const matchCountry = !countryFilter || p.country === countryFilter;
      return matchSearch && matchCountry;
    })
    .sort((a, b) => {
      if (sortBy === "newest") return new Date(b.createdAt) - new Date(a.createdAt);
      if (sortBy === "deadline") return new Date(a.deadline || "9999") - new Date(b.deadline || "9999");
      if (sortBy === "tuition_asc") return (a.tuition || 0) - (b.tuition || 0);
      if (sortBy === "tuition_desc") return (b.tuition || 0) - (a.tuition || 0);
      return 0;
    });

  const closingSoon = programs.filter((p) => deadlineStatus(p.deadline) === "soon").length;

  return (
    <div className="pl">
      <style>{css}</style>

      {/* ── HEADER ── */}
      <div className="pl-header">
        <div className="pl-breadcrumb">
          Student Portal <span className="pl-breadcrumb-sep">›</span> Programs
        </div>
        <h1 className="pl-title">Available Offers</h1>
        <p className="pl-subtitle">Browse scholarships and apply to programs.</p>
      </div>

      {/* ── STATS ── */}
      {!loading && !err && (
        <div className="pl-stats">
          <div className="pl-stat">
            <span className="pl-stat-num">{programs.length}</span>
            <span className="pl-stat-label">Programs</span>
          </div>
          {countries.length > 0 && (
            <>
              <div className="pl-stat-div" />
              <div className="pl-stat">
                <span className="pl-stat-num">{countries.length}</span>
                <span className="pl-stat-label">Countries</span>
              </div>
            </>
          )}
          {closingSoon > 0 && (
            <>
              <div className="pl-stat-div" />
              <div className="pl-stat">
                <span className="pl-stat-num" style={{ color: "#f97316" }}>{closingSoon}</span>
                <span className="pl-stat-label">Closing Soon</span>
              </div>
            </>
          )}
        </div>
      )}

      {/* ── ERROR ── */}
      {err && (
        <div className="pl-error">
          <AlertCircle size={16} /> {err}
        </div>
      )}

      {/* ── TOOLBAR ── */}
      {!loading && !err && (
        <div className="pl-toolbar">
          <div className="pl-search-wrap">
            <Search size={15} className="pl-search-icon" />
            <input
              className="pl-search"
              placeholder="Search programs, universities, countries…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
              <button className="pl-clear-btn" onClick={() => setSearch("")}>
                <X size={14} />
              </button>
            )}
          </div>

          <div className="pl-filter-group">
            {/* Country filter */}
            {countries.length > 0 && (
              <div className="pl-select-wrap">
                <Globe size={13} style={{ color: "var(--muted)", flexShrink: 0 }} />
                <select
                  className="pl-select"
                  value={countryFilter}
                  onChange={(e) => setCountryFilter(e.target.value)}
                >
                  <option value="">All Countries</option>
                  {countries.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
                <ChevronDown size={12} style={{ color: "var(--muted)", flexShrink: 0 }} />
              </div>
            )}

            {/* Sort */}
            <div className="pl-select-wrap">
              <SlidersHorizontal size={13} style={{ color: "var(--muted)", flexShrink: 0 }} />
              <select
                className="pl-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="newest">Newest</option>
                <option value="deadline">By Deadline</option>
                <option value="tuition_asc">Tuition: Low → High</option>
                <option value="tuition_desc">Tuition: High → Low</option>
              </select>
              <ChevronDown size={12} style={{ color: "var(--muted)", flexShrink: 0 }} />
            </div>
          </div>

          {filtered.length > 0 && (
            <span className="pl-results-count">
              {filtered.length} result{filtered.length !== 1 ? "s" : ""}
            </span>
          )}
        </div>
      )}

      {/* ── CONTENT ── */}
      {loading ? (
        <div className="pl-loading">
          <Loader2 size={22} className="spin" /> Loading programs…
        </div>
      ) : filtered.length === 0 ? (
        <div className="pl-empty">
          <div className="pl-empty-icon">
            <BookOpen size={30} strokeWidth={1.5} />
          </div>
          <div className="pl-empty-title">
            {search || countryFilter ? "No results found" : "No offers available right now."}
          </div>
          <div className="pl-empty-sub">
            {search || countryFilter
              ? "Try adjusting your search or filters."
              : "Check back soon — universities are adding new programs regularly."}
          </div>
        </div>
      ) : (
        <div className="pl-grid">
          {filtered.map((p) => (
            <ProgramCard key={p._id} p={p} />
          ))}
        </div>
      )}
    </div>
  );
}