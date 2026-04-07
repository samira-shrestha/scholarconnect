import React, { useEffect, useState } from "react";
import api from "../../api/axios";

export default function StudentDashboard() {
  const [dashboardData, setDashboardData] = useState({
    applications: 0,
    accepted: 0,
    pending: 0,
    interviews: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudentDashboard = async () => {
      try {
        const res = await api.get("/applications/student/list");
        const applications = res.data.applications || [];

        const totalApplications = applications.length;
        const acceptedCount = applications.filter((a) => a.status === "accepted").length;
        const pendingCount = applications.filter((a) => a.status === "pending").length;

        setDashboardData({
          applications: totalApplications,
          accepted: acceptedCount,
          pending: pendingCount,
          interviews: 0, // static for now unless backend supports it
        });
      } catch (error) {
        console.error("Failed to fetch student dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudentDashboard();
  }, []);

  const stats = [
    { label: "Applications", value: dashboardData.applications, color: "blue" },
    { label: "Accepted", value: dashboardData.accepted, color: "green" },
    { label: "Pending", value: dashboardData.pending, color: "orange" },
    { label: "Interviews", value: dashboardData.interviews, color: "red" }
  ];

  const actions = [
    "Start New Application",
    "Schedule Interview",
    "Upload Documents",
    "Contact Support"
  ];

  return (
    <div className="dash">
      <div className="dash-header">
        <h2 className="dash-title">Welcome back</h2>
        <p className="dash-subtitle">Here's your application progress overview</p>
      </div>

      <div className="stats-grid">
        {stats.map((s, i) => (
          <div key={i} className="stat-card">
            <div className={`stat-icon ${s.color}`}>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                  color:
                    s.color === "blue"
                      ? "#3aa1c9"
                      : s.color === "green"
                        ? "#27ae60"
                        : s.color === "orange"
                          ? "#f39c12"
                          : "#e74c3c"
                }}
              >
                {s.color === "blue" && (
                  <>
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                  </>
                )}
                {s.color === "green" && <polyline points="20 6 9 17 4 12" />}
                {s.color === "orange" && (
                  <>
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </>
                )}
                {s.color === "red" && (
                  <>
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </>
                )}
              </svg>
            </div>

            <div className="stat-value">
              {loading ? "..." : s.value}
            </div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="actions-card">
        <h3 className="actions-title">Quick Actions</h3>
        <div className="actions-grid">
          {actions.map((action, i) => (
            <button key={i} className="action-btn" type="button">
              {action}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}