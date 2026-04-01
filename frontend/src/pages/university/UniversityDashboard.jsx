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

  .uni-dash {
    font-family: var(--font);
    background: var(--bg);
    min-height: 100vh;
    padding: 32px 36px;
    color: var(--text);
  }

  .uni-header {
    margin-bottom: 28px;
  }

  .uni-title {
    font-size: 28px;
    font-weight: 900;
    color: var(--dark);
    letter-spacing: -0.7px;
    margin-bottom: 8px;
  }

  .uni-subtitle {
    font-size: 14px;
    color: var(--muted);
    font-weight: 500;
  }

  /* stats */
  .uni-stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 18px;
    margin-bottom: 28px;
  }

  .uni-stat-card {
    background: var(--card);
    border: 1.5px solid var(--border);
    border-radius: 16px;
    padding: 22px 24px;
    box-shadow: var(--shadow);
    transition: all 0.2s;
    cursor: pointer;
  }

  .uni-stat-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 24px rgba(13,45,63,0.12);
    border-color: rgba(58,161,201,0.3);
  }

  .uni-stat-icon {
    width: 44px;
    height: 44px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 14px;
  }

  .uni-stat-icon.purple { background: rgba(129,140,248,0.1); }
  .uni-stat-icon.cyan { background: rgba(58,161,201,0.1); }
  .uni-stat-icon.teal { background: rgba(129,197,166,0.1); }
  .uni-stat-icon.amber { background: rgba(251,191,36,0.1); }

  .uni-stat-value {
    font-size: 32px;
    font-weight: 900;
    color: var(--dark);
    letter-spacing: -1px;
    margin-bottom: 6px;
  }

  .uni-stat-label {
    font-size: 13px;
    font-weight: 600;
    color: var(--muted);
    letter-spacing: 0.3px;
  }

  /* content */
  .uni-content {
    display: grid;
    grid-template-columns: 1.5fr 1fr;
    gap: 20px;
    margin-bottom: 28px;
  }

  .uni-card {
    background: var(--card);
    border: 1.5px solid var(--border);
    border-radius: 18px;
    padding: 26px 24px;
    box-shadow: var(--shadow);
  }

  .uni-card-title {
    font-size: 18px;
    font-weight: 800;
    color: var(--dark);
    margin-bottom: 20px;
    letter-spacing: -0.4px;
  }

  .uni-list {
    display: flex;
    flex-direction: column;
    gap: 14px;
    margin-bottom: 18px;
  }

  .uni-item {
    background: var(--bg);
    border: 1.5px solid var(--border);
    border-radius: 12px;
    padding: 16px 18px;
    transition: all 0.18s;
  }

  .uni-item:hover {
    background: #e8f4f8;
    border-color: rgba(58,161,201,0.25);
  }

  .uni-item-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 8px;
  }

  .uni-item-name {
    font-size: 14px;
    font-weight: 700;
    color: var(--dark);
    margin-bottom: 4px;
  }

  .uni-item-detail {
    font-size: 12.5px;
    color: var(--muted);
    font-weight: 500;
  }

  .uni-badge {
    padding: 4px 12px;
    border-radius: 8px;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.3px;
  }

  .badge-new {
    background: #edfaf4;
    color: #155c40;
    border: 1px solid #a7e8c7;
  }

  .badge-review {
    background: #fff8ed;
    color: #b36200;
    border: 1px solid #ffd68a;
  }

  .badge-active {
    background: #e8f4f8;
    color: #0a5c7a;
    border: 1px solid #a7d7ea;
  }

  .uni-item-meta {
    font-size: 11.5px;
    color: var(--muted);
    font-weight: 500;
  }

  .uni-btn {
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

  .uni-btn:hover {
    background: var(--p);
    color: white;
    transform: translateY(-1px);
  }

  .uni-btn.primary {
    background: var(--p);
    color: white;
    border: none;
  }

  .uni-btn.primary:hover {
    background: var(--dark);
  }

  /* activity feed */
  .activity-feed {
    max-height: 380px;
    overflow-y: auto;
  }

  .activity-feed::-webkit-scrollbar {
    width: 6px;
  }

  .activity-feed::-webkit-scrollbar-track {
    background: var(--bg);
    border-radius: 3px;
  }

  .activity-feed::-webkit-scrollbar-thumb {
    background: var(--border);
    border-radius: 3px;
  }

  .activity-feed::-webkit-scrollbar-thumb:hover {
    background: var(--muted);
  }

  .activity-entry {
    padding: 14px 16px;
    border-bottom: 1px solid var(--border);
  }

  .activity-entry:last-child {
    border-bottom: none;
  }

  .activity-entry:hover {
    background: var(--bg);
  }

  .activity-title {
    font-size: 13px;
    font-weight: 600;
    color: var(--dark);
    margin-bottom: 4px;
  }

  .activity-desc {
    font-size: 12px;
    color: var(--muted);
    font-weight: 400;
    margin-bottom: 6px;
  }

  .activity-time {
    font-size: 11px;
    color: var(--muted);
    font-weight: 500;
  }

  /* quick actions */
  .uni-actions {
    background: linear-gradient(135deg, var(--dark) 0%, #0a3d52 50%, #1a5c6b 100%);
    border-radius: 18px;
    padding: 32px 28px;
    box-shadow: 0 8px 32px rgba(13,45,63,0.16);
    position: relative;
    overflow: hidden;
  }

  .uni-actions::before {
    content: '';
    position: absolute;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    top: -80px;
    right: -60px;
    background: radial-gradient(circle, rgba(58,161,201,0.2) 0%, transparent 70%);
  }

  .uni-actions-title {
    position: relative;
    font-size: 20px;
    font-weight: 800;
    color: white;
    margin-bottom: 20px;
    letter-spacing: -0.5px;
  }

  .uni-actions-grid {
    position: relative;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 14px;
  }

  .uni-action-btn {
    padding: 18px 20px;
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
    text-align: left;
  }

  .uni-action-btn:hover {
    background: rgba(255,255,255,0.2);
    border-color: rgba(255,255,255,0.35);
    transform: translateY(-2px);
  }

  .uni-action-icon {
    display: inline-block;
    margin-right: 8px;
    font-size: 16px;
  }

  @media (max-width: 1100px) {
    .uni-content { grid-template-columns: 1fr; }
  }

  @media (max-width: 900px) {
    .uni-dash { padding: 24px 20px; }
  }

  @media (max-width: 600px) {
    .uni-dash { padding: 18px 16px; }
    .uni-stats { grid-template-columns: 1fr; }
  }
`;

export default function UniversityDashboard() {
  const stats = [
    { label: "Total Programs", value: "24", color: "purple" },
    { label: "Applications", value: "156", color: "cyan" },
    { label: "Accepted", value: "89", color: "teal" },
    { label: "Pending Review", value: "47", color: "amber" }
  ];

  const programs = [
    { name: "Computer Science MS", applicants: "42 applications", status: "Active", date: "Updated 2h ago" },
    { name: "Data Science PhD", applicants: "28 applications", status: "Active", date: "Updated 5h ago" },
    { name: "Business Analytics MBA", applicants: "31 applications", status: "Active", date: "Updated 1d ago" }
  ];

  const recentApps = [
    { student: "Samira Shrestha", program: "Computer Science MS", status: "New", time: "5 min ago" },
    { student: "Jeevan Khatiwoda", program: "Data Science PhD", status: "Review", time: "15 min ago" },
    { student: "Kanchan Thapa", program: "Business Analytics MBA", status: "New", time: "1 hour ago" },
    { student: "Roshan Baral", program: "Computer Science MS", status: "Review", time: "2 hours ago" }
  ];

  const activities = [
    { title: "New Application Received", desc: "Roshan Baral applied to Computer Science MS", time: "5 minutes ago" },
    { title: "Application Under Review", desc: "Jeevan Khatiwoda's application moved to review stage", time: "15 minutes ago" },
    { title: "Scholarship Offered", desc: "$15,000 scholarship offered to Kanchan Thapa", time: "1 hour ago" },
    { title: "Program Updated", desc: "Data Science PhD deadline extended", time: "2 hours ago" },
    { title: "Document Uploaded", desc: "Samira Shrestha uploaded CV", time: "3 hours ago" },
    { title: "Interview Scheduled", desc: "Samira Shrestha scheduled for interview", time: "5 hours ago" }
  ];

  const actions = [
    { label: "Create New Program", icon: "+" },
    { label: "Review Applications", icon: "📋" },
    { label: "Generate Reports", icon: "📊" },
    { label: "Manage Scholarships", icon: "💰" }
  ];

  return (
    <div className="uni-dash">
      <style>{css}</style>

      <div className="uni-header">
        <h2 className="uni-title">University Dashboard</h2>
        <p className="uni-subtitle">Manage your programs and track application metrics</p>
      </div>

      {/* stats */}
      <div className="uni-stats">
        {stats.map((s, i) => (
          <div key={i} className="uni-stat-card">
            <div className={`uni-stat-icon ${s.color}`}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                style={{ color: s.color === 'purple' ? '#818cf8' : s.color === 'cyan' ? '#3aa1c9' : s.color === 'teal' ? '#81C5A6' : '#fbbf24' }}>
                {s.color === 'purple' && <><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></>}
                {s.color === 'cyan' && <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></>}
                {s.color === 'teal' && <polyline points="20 6 9 17 4 12"/>}
                {s.color === 'amber' && <><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></>}
              </svg>
            </div>
            <div className="uni-stat-value">{s.value}</div>
            <div className="uni-stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      {/* content */}
      <div className="uni-content">
        {/* programs */}
        <div className="uni-card">
          <h3 className="uni-card-title">Active Programs</h3>
          <div className="uni-list">
            {programs.map((p, i) => (
              <div key={i} className="uni-item">
                <div className="uni-item-header">
                  <div>
                    <div className="uni-item-name">{p.name}</div>
                    <div className="uni-item-detail">{p.applicants}</div>
                  </div>
                  <span className={`uni-badge badge-active`}>
                    {p.status}
                  </span>
                </div>
                <div className="uni-item-meta">{p.date}</div>
              </div>
            ))}
          </div>
          <button className="uni-btn">View All Programs</button>
        </div>

        {/* activity */}
        <div className="uni-card">
          <h3 className="uni-card-title">Recent Activity</h3>
          <div className="activity-feed">
            {activities.map((a, i) => (
              <div key={i} className="activity-entry">
                <div className="activity-title">{a.title}</div>
                <div className="activity-desc">{a.desc}</div>
                <div className="activity-time">{a.time}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* recent applications */}
      <div className="uni-card" style={{ marginBottom: '28px' }}>
        <h3 className="uni-card-title">Recent Applications</h3>
        <div className="uni-list">
          {recentApps.map((a, i) => (
            <div key={i} className="uni-item">
              <div className="uni-item-header">
                <div>
                  <div className="uni-item-name">{a.student}</div>
                  <div className="uni-item-detail">{a.program}</div>
                </div>
                <span className={`uni-badge badge-${a.status.toLowerCase()}`}>
                  {a.status}
                </span>
              </div>
              <div className="uni-item-meta">{a.time}</div>
            </div>
          ))}
        </div>
        <button className="uni-btn primary">Review All Applications</button>
      </div>

      {/* actions */}
      <div className="uni-actions">
        <h3 className="uni-actions-title">Quick Actions</h3>
        <div className="uni-actions-grid">
          {actions.map((action, i) => (
            <button key={i} className="uni-action-btn">
              <span className="uni-action-icon">{action.icon}</span>
              {action.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}