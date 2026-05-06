import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";

export default function CollegeDashboard() {
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState({
    totalPrograms: 0,
    applications: 0,
    accepted: 0,
    pending: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await api.get("/college/dashboard");
        setDashboardData(res.data);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const stats = [
    { label: "Total Programs", value: dashboardData.totalPrograms, color: "purple" },
    { label: "Applications", value: dashboardData.applications, color: "cyan" },
    { label: "Accepted", value: dashboardData.accepted, color: "teal" },
    { label: "Pending Review", value: dashboardData.pending, color: "amber" }
  ];

  const actions = [
    { label: "Create New Program", icon: "+", path: "/college/programs" },
    { label: "Review Applications", icon: "📋", path: "/college/applications" },
    { label: "Generate Reports", icon: "📊", path: "/college/dashboard" },
    { label: "Manage Scholarships", icon: "💰", path: "/college/programs" }
  ];

  return (
    <div className="uni-dash">
      <div className="uni-header">
        <h2 className="uni-title">College Dashboard</h2>
        <p className="uni-subtitle">Manage your programs and track application metrics</p>
      </div>

      <div className="uni-stats">
        {stats.map((s, i) => (
          <div key={i} className="uni-stat-card">
            <div className={`uni-stat-icon ${s.color}`}>
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
                    s.color === "purple"
                      ? "#818cf8"
                      : s.color === "cyan"
                        ? "#3aa1c9"
                        : s.color === "teal"
                          ? "#81C5A6"
                          : "#fbbf24"
                }}
              >
                {s.color === "purple" && (
                  <>
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                  </>
                )}
                {s.color === "cyan" && (
                  <>
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                  </>
                )}
                {s.color === "teal" && <polyline points="20 6 9 17 4 12" />}
                {s.color === "amber" && (
                  <>
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </>
                )}
              </svg>
            </div>

            <div className="uni-stat-value">
              {loading ? "..." : s.value}
            </div>
            <div className="uni-stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="uni-actions">
        <h3 className="uni-actions-title">Quick Actions</h3>
        <div className="uni-actions-grid">
          {actions.map((action, i) => (
            <button
              key={i}
              className="uni-action-btn"
              onClick={() => navigate(action.path)}
              type="button"
            >
              <span className="uni-action-icon">{action.icon}</span>
              {action.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}