import React, { useEffect, useMemo, useState } from "react";
import api from "../../api/axios";

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800;900&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --p: #3aa1c9;
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

  .ua-wrap {
    font-family: var(--font);
    background: var(--bg);
    min-height: 100vh;
    padding: 32px 36px;
    color: var(--text);
    -webkit-font-smoothing: antialiased;
  }

  /* ── HEADER ── */
  .ua-header {
    display: flex;
    justify-content: space-between;
    gap: 12px;
    flex-wrap: wrap;
    margin-bottom: 20px;
  }
  .ua-header h2 {
    font-size: 26px;
    font-weight: 900;
    color: var(--dark);
    letter-spacing: -0.8px;
    margin-bottom: 6px;
  }
  .ua-subtitle {
    opacity: 0.7;
    font-size: 14px;
    font-weight: 500;
    color: var(--muted);
  }
  .ua-refresh-btn {
    padding: 10px 18px;
    border-radius: 12px;
    border: 1.5px solid var(--border);
    background: var(--card);
    cursor: pointer;
    font-weight: 700;
    font-size: 13px;
    font-family: var(--font);
    color: var(--dark);
    box-shadow: var(--shadow);
    transition: all 0.2s;
    align-self: flex-start;
  }
  .ua-refresh-btn:hover {
    border-color: rgba(58,161,201,0.4);
    box-shadow: var(--shadow-lg);
  }

  /* ── FILTERS ── */
  .ua-filters {
    display: flex;
    gap: 10px;
    align-items: center;
    flex-wrap: wrap;
    margin-bottom: 20px;
  }
  .ua-search {
    flex: 1;
    min-width: 240px;
    padding: 11px 14px;
    border-radius: 12px;
    border: 1.5px solid var(--border);
    background: var(--card);
    font-size: 13.5px;
    font-weight: 500;
    font-family: var(--font);
    color: var(--text);
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
  }
  .ua-search::placeholder { color: #b0c8d4; font-weight: 400; }
  .ua-search:focus {
    border-color: var(--p);
    box-shadow: 0 0 0 3px rgba(58,161,201,0.1);
  }
  .ua-select {
    padding: 11px 14px;
    border-radius: 12px;
    border: 1.5px solid var(--border);
    background: var(--card);
    font-weight: 700;
    font-size: 13px;
    font-family: var(--font);
    color: var(--muted);
    cursor: pointer;
    outline: none;
    transition: border-color 0.18s;
  }
  .ua-select:focus { border-color: var(--p); }

  /* ── STATES ── */
  .ua-loading { margin-top: 18px; font-size: 14px; font-weight: 600; color: var(--muted); }
  .ua-error {
    margin-top: 18px;
    background: #fff2f2;
    border: 1.5px solid #ffd0d0;
    color: #dc2626;
    padding: 14px 18px;
    border-radius: 14px;
    font-size: 13.5px;
    font-weight: 600;
  }
  .ua-empty { margin-top: 18px; opacity: 0.7; font-size: 14px; font-weight: 500; color: var(--muted); }

  /* ── LIST ── */
  .ua-list {
    display: flex;
    flex-direction: column;
    gap: 14px;
    margin-top: 4px;
  }

  /* ── CARD ── */
  .ua-card {
    background: var(--card);
    border: 1.5px solid var(--border);
    border-radius: 20px;
    padding: 20px;
    box-shadow: var(--shadow);
    transition: all 0.26s cubic-bezier(0.34,1.1,0.64,1);
  }
  .ua-card:hover {
    transform: translateY(-3px);
    box-shadow: var(--shadow-lg);
    border-color: rgba(58,161,201,0.25);
  }

  .ua-card-top {
    display: flex;
    justify-content: space-between;
    gap: 10px;
    flex-wrap: wrap;
    align-items: flex-start;
  }
  .ua-card-title {
    font-weight: 900;
    font-size: 15.5px;
    color: var(--dark);
    letter-spacing: -0.3px;
    line-height: 1.3;
  }
  .ua-card-univ {
    font-size: 13px;
    opacity: 0.7;
    font-weight: 600;
    color: var(--muted);
    margin-top: 3px;
  }

  /* Status badge */
  .ua-badge {
    display: inline-block;
    padding: 4px 12px;
    border-radius: 999px;
    font-size: 12px;
    font-weight: 700;
    font-family: var(--font);
    text-transform: capitalize;
    white-space: nowrap;
    flex-shrink: 0;
    border: 1.5px solid var(--border);
    color: var(--muted);
    background: rgba(107,143,160,0.08);
  }
  .ua-badge[data-status="accepted"] { background: rgba(22,101,52,0.1);   color: #166534; border-color: rgba(22,101,52,0.25); }
  .ua-badge[data-status="rejected"] { background: rgba(220,38,38,0.08);  color: #b91c1c; border-color: rgba(220,38,38,0.22); }
  .ua-badge[data-status="pending"]  { background: rgba(251,191,36,0.13); color: #b45309; border-color: rgba(251,191,36,0.4); }

  /* Student info */
  .ua-student {
    margin-top: 12px;
    font-size: 14px;
    opacity: 0.85;
    color: var(--text);
  }
  .ua-student-name { font-weight: 800; color: var(--dark); }
  .ua-student-date { margin-top: 4px; font-size: 13px; opacity: 0.7; color: var(--muted); }

  /* Actions */
  .ua-actions {
    margin-top: 14px;
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
  }
  .ua-btn {
    padding: 10px 18px;
    border-radius: 12px;
    cursor: pointer;
    font-weight: 800;
    font-size: 13px;
    font-family: var(--font);
    transition: all 0.2s;
    border: 1.5px solid;
  }
  .ua-btn:disabled { opacity: 0.5; cursor: not-allowed; }
  .ua-btn-accept {
    border-color: #bfead0;
    background: white;
    color: #0f7a3a;
  }
  .ua-btn-accept:not(:disabled):hover { background: #eafff3; }
  .ua-btn-accept.active { background: #eafff3; }

  .ua-btn-reject {
    border-color: #ffd0d0;
    background: white;
    color: #b00020;
  }
  .ua-btn-reject:not(:disabled):hover { background: #ffecec; }
  .ua-btn-reject.active { background: #ffecec; }

  @media (max-width: 600px) {
    .ua-wrap { padding: 16px 14px; }
  }
`;

export default function UniversityApplications() {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [updatingId, setUpdatingId] = useState(null);
  const [filter, setFilter] = useState("all"); // all | pending | accepted | rejected
  const [q, setQ] = useState("");

  const fetchApps = async () => {
    setErr("");
    setLoading(true);
    try {
      const res = await api.get("/applications/university/list");
      const list = res.data.applications || res.data || [];
      setApps(Array.isArray(list) ? list : []);
    } catch (e) {
      setErr(e.response?.data?.message || "Failed to load applications");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApps();
  }, []);

  const updateStatus = async (id, status) => {
    setUpdatingId(id);
    try {
      await api.patch(`/applications/${id}`, { status });

      // optimistic UI update
      setApps((prev) =>
        prev.map((a) => (a._id === id ? { ...a, status } : a))
      );
    } catch (e) {
      alert(e.response?.data?.message || "Failed to update status");
    } finally {
      setUpdatingId(null);
    }
  };

  const filtered = useMemo(() => {
    const text = q.trim().toLowerCase();

    return apps.filter((a) => {
      const statusOk = filter === "all" ? true : a.status === filter;

      const studentName = (a.student?.name || "").toLowerCase();
      const studentEmail = (a.student?.email || "").toLowerCase();
      const programTitle = (a.program?.title || "").toLowerCase();

      const textOk = !text
        ? true
        : studentName.includes(text) ||
          studentEmail.includes(text) ||
          programTitle.includes(text);

      return statusOk && textOk;
    });
  }, [apps, filter, q]);

  const badgeStyle = (status) => {
    const base = {
      padding: "5px 10px",
      borderRadius: 999,
      fontSize: 12,
      fontWeight: 700,
      border: "1px solid #e6e6e6",
      display: "inline-block",
    };

    if (status === "accepted") return { ...base, background: "#eafff3", color: "#0f7a3a", borderColor: "#bfead0" };
    if (status === "rejected") return { ...base, background: "#ffecec", color: "#b00020", borderColor: "#ffd0d0" };
    return { ...base, background: "#fff7e6", color: "#9a6700", borderColor: "#ffe2a8" }; // pending
  };

  return (
    <div className="ua-wrap">
      <style>{css}</style>

      <div className="ua-header">
        <div>
          <h2 style={{ marginTop: 0, marginBottom: 6 }}>University Applications</h2>
          <div className="ua-subtitle">
            Review students who applied to your programs.
          </div>
        </div>

        <button onClick={fetchApps} className="ua-refresh-btn">
          Refresh
        </button>
      </div>

      {/* Filters */}
      <div className="ua-filters">
        <input
          placeholder="Search by student name, email, or program…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className="ua-search"
        />

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="ua-select"
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="accepted">Accepted</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      {/* Content */}
      {loading ? (
        <div className="ua-loading">Loading…</div>
      ) : err ? (
        <div className="ua-error">{err}</div>
      ) : filtered.length === 0 ? (
        <div className="ua-empty">No applications found.</div>
      ) : (
        <div className="ua-list">
          {filtered.map((a) => (
            <div key={a._id} className="ua-card">
              {/* Header row */}
              <div className="ua-card-top">
                <div>
                  <div className="ua-card-title">{a.program?.title || "Program"}</div>
                  <div className="ua-card-univ">
                    University: {a.program?.universityName || "—"}
                  </div>
                </div>

                <span
                  className="ua-badge"
                  data-status={(a.status || "").toLowerCase().trim()}
                >
                  {a.status}
                </span>
              </div>

              {/* Student info */}
              <div className="ua-student">
                <div>
                  <span className="ua-student-name">Student:</span>{" "}
                  {a.student?.name || "—"} ({a.student?.email || "—"})
                </div>
                <div className="ua-student-date">
                  Applied: {a.createdAt ? new Date(a.createdAt).toLocaleString() : "—"}
                </div>
              </div>

              {/* Actions */}
              <div className="ua-actions">
                <button
                  disabled={updatingId === a._id || a.status === "accepted"}
                  onClick={() => updateStatus(a._id, "accepted")}
                  className={`ua-btn ua-btn-accept${a.status === "accepted" ? " active" : ""}`}
                >
                  {updatingId === a._id ? "Updating…" : "Accept"}
                </button>

                <button
                  disabled={updatingId === a._id || a.status === "rejected"}
                  onClick={() => updateStatus(a._id, "rejected")}
                  className={`ua-btn ua-btn-reject${a.status === "rejected" ? " active" : ""}`}
                >
                  {updatingId === a._id ? "Updating…" : "Reject"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}