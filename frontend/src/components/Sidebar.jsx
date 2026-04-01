import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import {
  LayoutDashboard,
  BookOpen,
  FileText,
  Building2,
  GraduationCap,
  LogOut,
  ChevronDown,
  Settings,
  Bell,
  Users,
  BarChart2,
  HelpCircle,
  PanelLeftClose,
  PanelLeftOpen,
  Dot,
} from "lucide-react";

/* ─────────────────────────────────────────────
   MENU DEFINITIONS
───────────────────────────────────────────── */
const STUDENT_MENU = [
  {
    section: "Main",
    items: [
      { label: "Dashboard",       to: "/student/dashboard",    Icon: LayoutDashboard },
      { label: "Programs",        to: "/student/programs",     Icon: BookOpen        },
      { label: "My Applications", to: "/student/applications", Icon: FileText        },
    ],
  },
  {
    section: "Account",
    items: [
      { label: "Notifications", to: "/notifications", Icon: Bell     },
      { label: "Settings",      to: "/settings",      Icon: Settings },
      { label: "Help & FAQ",    to: "/help",           Icon: HelpCircle },
    ],
  },
];

const UNIVERSITY_MENU = [
  {
    section: "Main",
    items: [
      { label: "Dashboard",       to: "/university/dashboard",    Icon: LayoutDashboard },
      { label: "Manage Programs", to: "/university/programs",     Icon: BookOpen        },
      { label: "Applications",    to: "/university/applications", Icon: FileText        },
      { label: "Students",        to: "/university/students",     Icon: Users           },
      { label: "Analytics",       to: "/university/analytics",    Icon: BarChart2       },
    ],
  },
  {
    section: "Account",
    items: [
      { label: "Notifications", to: "/notifications", Icon: Bell       },
      { label: "Settings",      to: "/settings",      Icon: Settings   },
      { label: "Help & FAQ",    to: "/help",           Icon: HelpCircle },
    ],
  },
];

/* ─────────────────────────────────────────────
   CSS
───────────────────────────────────────────── */
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&display=swap');

  *, *::before, *::after { box-sizing: border-box; }

  :root {
    --p: #3aa1c9;
    --s: #81C5A6;
    --dark: #0d2d3f;
    --text: #1a2e38;
    --muted: #7a9aaa;
    --border: #e8f0f4;
    --bg-hover: #f0f8fc;
    --bg-active: #e6f4fa;
    --font: 'Montserrat', sans-serif;
  }

  /* ── SHELL ── */
  .sb2 {
    font-family: var(--font);
    width: 248px;
    min-height: 100vh;
    background: #ffffff;
    border-right: 1px solid var(--border);
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    transition: width 0.28s cubic-bezier(0.4,0,0.2,1);
    overflow: hidden;
    position: relative;
    -webkit-font-smoothing: antialiased;
  }
  .sb2.collapsed {
    width: 68px;
  }

  /* ── TOP: LOGO + COLLAPSE ── */
  .sb2-top {
    display: flex; align-items: center; justify-content: space-between;
    padding: 18px 16px 16px;
    border-bottom: 1px solid var(--border);
    flex-shrink: 0; min-height: 64px;
  }
  .sb2-logo {
    display: flex; align-items: center; gap: 10px;
    text-decoration: none; overflow: hidden; flex: 1; min-width: 0;
  }
  .sb2-logo-mark {
    width: 34px; height: 34px; border-radius: 10px; flex-shrink: 0;
    background: linear-gradient(135deg, var(--p), var(--s));
    display: flex; align-items: center; justify-content: center;
    box-shadow: 0 2px 10px rgba(58,161,201,0.3);
  }
  .sb2-logo-text { overflow: hidden; white-space: nowrap; }
  .sb2-logo-name { font-size: 14px; font-weight: 900; color: var(--dark); letter-spacing: -0.4px; line-height: 1.15; }
  .sb2-logo-sub  { font-size: 10px; font-weight: 600; color: var(--muted); letter-spacing: 0.4px; text-transform: uppercase; margin-top: 1px; }

  .sb2-collapse-btn {
    width: 30px; height: 30px; border-radius: 8px; border: 1px solid var(--border);
    background: white; cursor: pointer; flex-shrink: 0;
    display: flex; align-items: center; justify-content: center;
    color: var(--muted); transition: all 0.18s ease; margin-left: 6px;
  }
  .sb2-collapse-btn:hover { background: var(--bg-hover); color: var(--p); border-color: rgba(58,161,201,0.3); }

  /* ── SCROLL AREA ── */
  .sb2-scroll {
    flex: 1; overflow-y: auto; overflow-x: hidden; padding: 8px 0;
  }
  .sb2-scroll::-webkit-scrollbar { width: 0; }

  /* ── SECTION ── */
  .sb2-section { padding: 8px 0 4px; }
  .sb2-section-header {
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 16px; margin-bottom: 4px; cursor: pointer;
    user-select: none;
  }
  .sb2-section-label {
    font-size: 10px; font-weight: 700; letter-spacing: 1.4px;
    text-transform: uppercase; color: var(--muted);
    white-space: nowrap; overflow: hidden;
    transition: opacity 0.2s;
  }
  .sb2.collapsed .sb2-section-label { opacity: 0; }
  .sb2-section-chevron {
    color: var(--muted); flex-shrink: 0;
    transition: transform 0.22s ease;
  }
  .sb2-section-chevron.open { transform: rotate(0deg); }
  .sb2-section-chevron.closed { transform: rotate(-90deg); }
  .sb2.collapsed .sb2-section-chevron { opacity: 0; }

  .sb2-section-items {
    overflow: hidden;
    transition: max-height 0.28s cubic-bezier(0.4,0,0.2,1), opacity 0.2s;
  }
  .sb2-section-items.closed { max-height: 0 !important; opacity: 0; }

  /* ── NAV ITEM ── */
  .sb2-item {
    display: flex; align-items: center; gap: 10px;
    padding: 9px 12px 9px 16px;
    margin: 1px 8px; border-radius: 10px;
    text-decoration: none; cursor: pointer;
    font-size: 13px; font-weight: 600;
    color: var(--muted);
    transition: all 0.18s ease;
    position: relative; white-space: nowrap; overflow: hidden;
  }
  .sb2-item:hover {
    background: var(--bg-hover);
    color: var(--dark);
  }
  .sb2-item.active {
    background: var(--bg-active);
    color: var(--p);
  }
  .sb2-item.active .sb2-item-icon { color: var(--p); }
  .sb2-item.active::before {
    content: '';
    position: absolute; left: 0; top: 25%; bottom: 25%;
    width: 3px; border-radius: 0 3px 3px 0;
    background: linear-gradient(to bottom, var(--p), var(--s));
  }
  .sb2-item-icon { flex-shrink: 0; color: #9ab5c2; transition: color 0.18s; }
  .sb2-item:hover .sb2-item-icon { color: var(--dark); }
  .sb2-item-label { flex: 1; transition: opacity 0.2s; overflow: hidden; }
  .sb2.collapsed .sb2-item-label { opacity: 0; width: 0; }

  /* Badge */
  .sb2-badge {
    background: var(--p); color: white;
    font-size: 10px; font-weight: 700;
    padding: 2px 7px; border-radius: 100px;
    flex-shrink: 0; transition: opacity 0.2s;
  }
  .sb2.collapsed .sb2-badge { opacity: 0; }

  /* Collapsed tooltip (title attr handled by browser) */
  .sb2.collapsed .sb2-item { justify-content: center; padding: 10px; margin: 1px 8px; }

  /* ── DIVIDER ── */
  .sb2-divider {
    height: 1px; background: var(--border);
    margin: 6px 16px;
  }

  /* ── USER CARD at BOTTOM ── */
  .sb2-user-wrap {
    border-top: 1px solid var(--border);
    padding: 12px 10px;
    flex-shrink: 0;
  }
  .sb2-user {
    display: flex; align-items: center; gap: 10px;
    padding: 10px 10px; border-radius: 12px;
    background: #f7fbfd; border: 1px solid var(--border);
    cursor: pointer; transition: all 0.18s ease;
    position: relative;
  }
  .sb2-user:hover { background: var(--bg-hover); border-color: rgba(58,161,201,0.25); }
  .sb2-avatar {
    width: 34px; height: 34px; border-radius: 50%; flex-shrink: 0;
    background: linear-gradient(135deg, var(--p), var(--s));
    display: flex; align-items: center; justify-content: center;
    font-size: 12px; font-weight: 800; color: white;
    box-shadow: 0 2px 8px rgba(58,161,201,0.28);
    position: relative;
  }
  .sb2-avatar-dot {
    position: absolute; bottom: 0; right: 0;
    width: 9px; height: 9px; border-radius: 50%;
    background: var(--s); border: 2px solid white;
  }
  .sb2-user-info { flex: 1; min-width: 0; overflow: hidden; transition: opacity 0.2s, width 0.2s; }
  .sb2-user-name { font-size: 12.5px; font-weight: 700; color: var(--dark); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .sb2-user-role { font-size: 11px; font-weight: 500; color: var(--muted); text-transform: capitalize; margin-top: 1px; }
  .sb2.collapsed .sb2-user-info { opacity: 0; width: 0; }
  .sb2.collapsed .sb2-logout-btn-wrap { opacity: 0; width: 0; overflow: hidden; }

  .sb2-logout-btn-wrap { flex-shrink: 0; transition: opacity 0.2s; }
  .sb2-logout-btn {
    width: 30px; height: 30px; border-radius: 8px;
    border: 1px solid var(--border); background: white;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; color: var(--muted); transition: all 0.18s ease;
  }
  .sb2-logout-btn:hover { background: #fff0f0; border-color: #ffcccc; color: #e74c3c; }

  /* Collapsed: clicking avatar logs out via a tooltip-style logout */
  .sb2.collapsed .sb2-user { justify-content: center; padding: 8px; }
`;

/* ─────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────── */
export default function Sidebar() {
  const { user, logout } = useAuth();
  const location  = useLocation();
  const navigate  = useNavigate();

  const [collapsed, setCollapsed] = useState(false);
  const [openSections, setOpenSections] = useState({ Main: true, Account: true });

  const menu = user?.role === "student" ? STUDENT_MENU : UNIVERSITY_MENU;

  const initials = user?.name
    ? user.name.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase()
    : user?.role === "student" ? "ST" : "UN";

  const onLogout = () => { logout(); navigate("/"); };
  const isActive = (to) => location.pathname === to;

  const toggleSection = (name) => {
    if (collapsed) return;
    setOpenSections((s) => ({ ...s, [name]: !s[name] }));
  };

  /* Estimate height for smooth collapse: each item ~38px + padding */
  const itemH = (count) => count * 40 + 8;

  return (
    <div className={`sb2${collapsed ? " collapsed" : ""}`}>
      <style>{css}</style>

      {/* ── TOP ── */}
      <div className="sb2-top">
        <Link className="sb2-logo" to="/">
          <div className="sb2-logo-mark">
            {user?.role === "university"
              ? <Building2    size={17} color="white" strokeWidth={2.2} />
              : <GraduationCap size={17} color="white" strokeWidth={2.2} />}
          </div>
          {!collapsed && (
            <div className="sb2-logo-text">
              <div className="sb2-logo-name">ScholarConnect</div>
              <div className="sb2-logo-sub">
                {user?.role === "university" ? "University Portal" : "Student Portal"}
              </div>
            </div>
          )}
        </Link>

        <button
          className="sb2-collapse-btn"
          onClick={() => setCollapsed((c) => !c)}
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed
            ? <PanelLeftOpen  size={15} strokeWidth={2} />
            : <PanelLeftClose size={15} strokeWidth={2} />}
        </button>
      </div>

      {/* ── SCROLL AREA ── */}
      <div className="sb2-scroll">
        {menu.map(({ section, items }) => (
          <div className="sb2-section" key={section}>

            {/* Section header */}
            <div
              className="sb2-section-header"
              onClick={() => toggleSection(section)}
            >
              <span className="sb2-section-label">{section}</span>
              {!collapsed && (
                <ChevronDown
                  size={13}
                  strokeWidth={2.5}
                  className={`sb2-section-chevron ${openSections[section] ? "open" : "closed"}`}
                />
              )}
            </div>

            {/* Items */}
            <div
              className={`sb2-section-items ${(!openSections[section] && !collapsed) ? "closed" : ""}`}
              style={{ maxHeight: itemH(items.length) }}
            >
              {items.map(({ label, to, Icon, badge }) => (
                <Link
                  key={to}
                  to={to}
                  className={`sb2-item${isActive(to) ? " active" : ""}`}
                  title={collapsed ? label : undefined}
                >
                  <Icon
                    size={17}
                    strokeWidth={isActive(to) ? 2.2 : 1.8}
                    className="sb2-item-icon"
                  />
                  <span className="sb2-item-label">{label}</span>
                  {badge && !collapsed && (
                    <span className="sb2-badge">{badge}</span>
                  )}
                </Link>
              ))}
            </div>

            <div className="sb2-divider" />
          </div>
        ))}
      </div>

      {/* ── USER CARD ── */}
      <div className="sb2-user-wrap">
        <div className="sb2-user" title={collapsed ? `${user?.name || "My Account"} — click to logout` : undefined}>
          <div className="sb2-avatar">
            {initials}
            <div className="sb2-avatar-dot" />
          </div>

          {!collapsed && (
            <>
              <div className="sb2-user-info">
                <div className="sb2-user-name">{user?.name || "My Account"}</div>
                <div className="sb2-user-role">{user?.role || "user"}</div>
              </div>
              <div className="sb2-logout-btn-wrap">
                <button
                  className="sb2-logout-btn"
                  onClick={onLogout}
                  title="Log out"
                >
                  <LogOut size={14} strokeWidth={2} />
                </button>
              </div>
            </>
          )}

          {collapsed && (
            <button
              style={{
                position: "absolute", inset: 0, width: "100%", height: "100%",
                background: "transparent", border: "none", cursor: "pointer", borderRadius: 12,
              }}
              onClick={onLogout}
              title="Log out"
            />
          )}
        </div>
      </div>
    </div>
  );
}