import React from "react";

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
  }

  .dash {
    font-family: var(--font);
    background: var(--bg);
    min-height: 100vh;
    padding: 32px 36px;
    color: var(--text);
  }

  .dash-header {
    margin-bottom: 28px;
  }

  .dash-title {
    font-size: 28px;
    font-weight: 900;
    color: var(--dark);
    letter-spacing: -0.7px;
    margin-bottom: 8px;
  }

  .dash-subtitle {
    font-size: 14px;
    color: var(--muted);
    font-weight: 500;
  }

  /* stats */
  .stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 18px;
    margin-bottom: 28px;
  }

  .stat-card {
    background: var(--card);
    border: 1.5px solid var(--border);
    border-radius: 16px;
    padding: 22px 24px;
    box-shadow: var(--shadow);
    transition: all 0.2s;
    cursor: pointer;
  }

  .stat-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 24px rgba(13,45,63,0.12);
    border-color: rgba(58,161,201,0.3);
  }

  .stat-icon {
    width: 44px;
    height: 44px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 14px;
  }

  .stat-icon.blue { background: rgba(58,161,201,0.1); }
  .stat-icon.green { background: rgba(39,174,96,0.1); }
  .stat-icon.orange { background: rgba(243,156,18,0.1); }
  .stat-icon.red { background: rgba(231,76,60,0.1); }

  .stat-value {
    font-size: 32px;
    font-weight: 900;
    color: var(--dark);
    letter-spacing: -1px;
    margin-bottom: 6px;
  }

  .stat-label {
    font-size: 13px;
    font-weight: 600;
    color: var(--muted);
    letter-spacing: 0.3px;
  }

  /* content grid */
  .content-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(420px, 1fr));
    gap: 20px;
    margin-bottom: 28px;
  }

  .section-card {
    background: var(--card);
    border: 1.5px solid var(--border);
    border-radius: 18px;
    padding: 26px 24px;
    box-shadow: var(--shadow);
  }

  .section-title {
    font-size: 18px;
    font-weight: 800;
    color: var(--dark);
    margin-bottom: 20px;
    letter-spacing: -0.4px;
  }

  .activity-list {
    display: flex;
    flex-direction: column;
    gap: 14px;
    margin-bottom: 18px;
  }

  .activity-item {
    background: var(--bg);
    border: 1.5px solid var(--border);
    border-radius: 12px;
    padding: 16px 18px;
    transition: all 0.18s;
  }

  .activity-item:hover {
    background: #e8f4f8;
    border-color: rgba(58,161,201,0.25);
  }

  .activity-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 8px;
  }

  .activity-program {
    font-size: 14px;
    font-weight: 700;
    color: var(--dark);
    margin-bottom: 4px;
  }

  .activity-university {
    font-size: 12.5px;
    color: var(--muted);
    font-weight: 500;
  }

  .activity-badge {
    padding: 4px 12px;
    border-radius: 8px;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.3px;
  }

  .badge-accepted {
    background: #edfaf4;
    color: #155c40;
    border: 1px solid #a7e8c7;
  }

  .badge-pending {
    background: #fff8ed;
    color: #b36200;
    border: 1px solid #ffd68a;
  }

  .badge-interview {
    background: #fff3cd;
    color: #856404;
    border: 1px solid #ffe5a0;
  }

  .activity-date {
    font-size: 11.5px;
    color: var(--muted);
    font-weight: 500;
  }

  .section-btn {
    width: 100%;
    padding: 13px;
    border: 2px solid var(--p);
    background: white;
    color: var(--p);
    border-radius: 11px;
    font-size: 14px;
    font-weight: 700;
    font-family: var(--font);
    cursor: pointer;
    transition: all 0.2s;
  }

  .section-btn:hover {
    background: var(--p);
    color: white;
    transform: translateY(-1px);
  }

  /* deadlines */
  .deadline-item {
    background: #fff8f0;
    border: 1.5px solid #ffe5cc;
    border-radius: 12px;
    padding: 16px 18px;
    transition: all 0.18s;
  }

  .deadline-item:hover {
    background: #ffeed9;
    border-color: #ffd68a;
  }

  .deadline-days {
    padding: 4px 12px;
    border-radius: 8px;
    font-size: 11px;
    font-weight: 700;
  }

  .days-urgent {
    background: #fff2f2;
    color: #9b1c1c;
    border: 1px solid #ffd0d0;
  }

  .days-warning {
    background: #fff3cd;
    color: #856404;
    border: 1px solid #ffe5a0;
  }

  .section-btn.primary {
    background: var(--p);
    color: white;
    border: none;
  }

  .section-btn.primary:hover {
    background: var(--dark);
  }

  /* quick actions */
  .actions-card {
    background: linear-gradient(135deg, var(--dark) 0%, #0a3d52 50%, #1a5c6b 100%);
    border-radius: 18px;
    padding: 32px 28px;
    box-shadow: 0 8px 32px rgba(13,45,63,0.16);
    position: relative;
    overflow: hidden;
  }

  .actions-card::before {
    content: '';
    position: absolute;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    top: -80px;
    right: -60px;
    background: radial-gradient(circle, rgba(58,161,201,0.2) 0%, transparent 70%);
  }

  .actions-title {
    position: relative;
    font-size: 20px;
    font-weight: 800;
    color: white;
    margin-bottom: 20px;
    letter-spacing: -0.5px;
  }

  .actions-grid {
    position: relative;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 14px;
  }

  .action-btn {
    padding: 16px;
    background: rgba(255,255,255,0.12);
    border: 1.5px solid rgba(255,255,255,0.2);
    border-radius: 12px;
    color: white;
    font-size: 13.5px;
    font-weight: 700;
    font-family: var(--font);
    cursor: pointer;
    transition: all 0.2s;
    backdrop-filter: blur(8px);
  }

  .action-btn:hover {
    background: rgba(255,255,255,0.2);
    border-color: rgba(255,255,255,0.35);
    transform: translateY(-2px);
  }

  @media (max-width: 900px) {
    .dash { padding: 24px 20px; }
    .content-grid { grid-template-columns: 1fr; }
  }

  @media (max-width: 600px) {
    .dash { padding: 18px 16px; }
    .stats-grid { grid-template-columns: 1fr; }
  }
`;

export default function StudentDashboard() {
  const stats = [
    { label: "Applications", value: "12", color: "blue" },
    { label: "Accepted", value: "3", color: "green" },
    { label: "Pending", value: "7", color: "orange" },
    { label: "Interviews", value: "2", color: "red" }
  ];

  const activities = [
    { program: "Computer Science", university: "MIT", status: "Accepted", date: "2 days ago" },
    { program: "Data Science", university: "Islington", status: "Pending", date: "5 days ago" },
    { program: "AI Engineering", university: "Herald", status: "Interview", date: "1 week ago" }
  ];

  const deadlines = [
    { program: "Machine Learning", university: "Islington", deadline: "Mar 15, 2026", days: 20 },
    { program: "Software Engineering", university: "British", deadline: "Mar 25, 2026", days: 30 },
    { program: "Cybersecurity", university: "Kings", deadline: "Apr 1, 2026", days: 37 }
  ];

  const actions = [
    "Start New Application",
    "Schedule Interview",
    "Upload Documents",
    "Contact Support"
  ];

  return (
    <div className="dash">
      <style>{css}</style>

      <div className="dash-header">
        <h2 className="dash-title">Welcome back</h2>
        <p className="dash-subtitle">Here's your application progress overview</p>
      </div>

      {/* stats */}
      <div className="stats-grid">
        {stats.map((s, i) => (
          <div key={i} className="stat-card">
            <div className={`stat-icon ${s.color}`}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                style={{ color: s.color === 'blue' ? '#3aa1c9' : s.color === 'green' ? '#27ae60' : s.color === 'orange' ? '#f39c12' : '#e74c3c' }}>
                {s.color === 'blue' && <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></>}
                {s.color === 'green' && <polyline points="20 6 9 17 4 12"/>}
                {s.color === 'orange' && <><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></>}
                {s.color === 'red' && <><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></>}
              </svg>
            </div>
            <div className="stat-value">{s.value}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      {/* content */}
      <div className="content-grid">
        {/* recent activity */}
        <div className="section-card">
          <h3 className="section-title">Recent Activity</h3>
          <div className="activity-list">
            {activities.map((a, i) => (
              <div key={i} className="activity-item">
                <div className="activity-header">
                  <div>
                    <div className="activity-program">{a.program}</div>
                    <div className="activity-university">{a.university}</div>
                  </div>
                  <span className={`activity-badge badge-${a.status.toLowerCase()}`}>
                    {a.status}
                  </span>
                </div>
                <div className="activity-date">{a.date}</div>
              </div>
            ))}
          </div>
          <button className="section-btn">View All Applications</button>
        </div>

        {/* deadlines */}
        <div className="section-card">
          <h3 className="section-title">Upcoming Deadlines</h3>
          <div className="activity-list">
            {deadlines.map((d, i) => (
              <div key={i} className="deadline-item">
                <div className="activity-header">
                  <div>
                    <div className="activity-program">{d.program}</div>
                    <div className="activity-university">{d.university}</div>
                  </div>
                  <span className={`deadline-days ${d.days <= 20 ? 'days-urgent' : 'days-warning'}`}>
                    {d.days} days
                  </span>
                </div>
                <div className="activity-date">Due: {d.deadline}</div>
              </div>
            ))}
          </div>
          <button className="section-btn primary">Browse More Programs</button>
        </div>
      </div>

      {/* quick actions */}
      <div className="actions-card">
        <h3 className="actions-title">Quick Actions</h3>
        <div className="actions-grid">
          {actions.map((action, i) => (
            <button key={i} className="action-btn">{action}</button>
          ))}
        </div>
      </div>
    </div>
  );
}