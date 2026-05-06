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
} from "lucide-react";

/* MENU DEFINITIONS */
const STUDENT_MENU = [
  {
    section: "Main",
    items: [
      { label: "Dashboard", to: "/student/dashboard", Icon: LayoutDashboard },
      { label: "Programs", to: "/student/programs", Icon: BookOpen },
      { label: "My Applications", to: "/student/applications", Icon: FileText },
    ],
  },

];

const college_MENU = [
  {
    section: "Main",
    items: [
      { label: "Dashboard", to: "/college/dashboard", Icon: LayoutDashboard },
      { label: "Manage Programs", to: "/college/programs", Icon: BookOpen },
      { label: "Applications", to: "/college/applications", Icon: FileText },
    ],
  },

];

/* COMPONENT */
export default function Sidebar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const [collapsed, setCollapsed] = useState(false);
  const [openSections, setOpenSections] = useState({ Main: true, Account: true });

  const menu = user?.role === "student" ? STUDENT_MENU : college_MENU;

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
    <div
      className={`font-sans bg-white border-r border-[#e8f0f4] flex flex-col shrink-0 h-screen max-h-screen sticky top-0 transition-[width] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] overflow-hidden antialiased
  ${collapsed ? "w-[68px]" : "w-[248px]"}`}
    >
      {/* TOP */}
      <div className="flex items-center justify-between pb-4 pt-[18px] px-4 border-b border-[#e8f0f4] shrink-0 min-h-[64px]">
        <Link className="flex items-center gap-2.5 no-underline overflow-hidden flex-1 min-w-0" to="/">
          <div className="w-[34px] h-[34px] rounded-[10px] shrink-0 bg-[#EAF6FB] flex items-center justify-center shadow-[0_2px_10px_rgba(58,161,201,0.3)]">
            {user?.role?.trim()?.toLowerCase() === "college" ? (
              <Building2 size={22} color="#3AA1C9" strokeWidth={2.2} />
            ) : (
              <GraduationCap size={22} color="#3AA1C9" strokeWidth={2.2} />
            )}
          </div>
          {!collapsed && (
            <div className="overflow-hidden whitespace-nowrap">
              <div className="text-[14px] font-bold text-brand-dark tracking-[-0.4px] leading-[1.15]">ScholarConnect</div>
              <div className="text-[10px] font-semibold text-[#7a9aaa] tracking-[0.4px] uppercase mt-[1px]">
                {user?.role === "college" ? "college Portal" : "Student Portal"}
              </div>
            </div>
          )}
        </Link>

        <button
          className="w-[30px] h-[30px] rounded-lg border border-[#e8f0f4] bg-white cursor-pointer shrink-0 flex items-center justify-center text-[#7a9aaa] transition-all duration-200 ease-in ml-1.5 hover:bg-[#f0f8fc] hover:text-brand hover:border-[rgba(58,161,201,0.3)]"
          onClick={() => setCollapsed((c) => !c)}
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed
            ? <PanelLeftOpen size={15} strokeWidth={2} />
            : <PanelLeftClose size={15} strokeWidth={2} />}
        </button>
      </div>

      {/* SCROLL AREA */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden py-2 scrollbar-none">
        {menu.map(({ section, items }) => (
          <div className="py-2" key={section}>

            {/* Section header */}
            <div
              className="flex items-center justify-between px-4 mb-1 cursor-pointer select-none"
              onClick={() => toggleSection(section)}
            >
              <span className={`text-[10px] font-bold tracking-[1.4px] uppercase text-[#7a9aaa] whitespace-nowrap overflow-hidden transition-opacity duration-200 ${collapsed ? "opacity-0" : "opacity-100"}`}>
                {section}
              </span>
              {!collapsed && (
                <ChevronDown
                  size={13}
                  strokeWidth={2.5}
                  className={`text-[#7a9aaa] shrink-0 transition-transform duration-200 ease-in ${openSections[section] ? "rotate-0" : "-rotate-90"}`}
                />
              )}
            </div>

            {/* Items */}
            <div
              className={`overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${!openSections[section] && !collapsed ? "max-h-0 opacity-0" : "opacity-100"}`}
              style={(!openSections[section] && !collapsed) ? undefined : { maxHeight: itemH(items.length) }}
            >
              {items.map(({ label, to, Icon, badge }) => {
                const active = isActive(to);
                return (
                  <Link
                    key={to}
                    to={to}
                    className={`flex items-center gap-2.5 mx-2 my-[1px] rounded-[10px] no-underline cursor-pointer text-[13px] font-semibold transition-all duration-200 relative whitespace-nowrap overflow-hidden group
                    ${collapsed ? "justify-center p-[10px]" : "py-[9px] pr-3 pl-4"}
                    ${active ? "bg-[#e6f4fa] text-brand" : "text-[#7a9aaa] hover:bg-[#f0f8fc] hover:text-brand-dark"}
                    `}
                    title={collapsed ? label : undefined}
                  >
                    <Icon
                      size={17}
                      strokeWidth={active ? 2.2 : 1.8}
                      className={`shrink-0 transition-colors duration-200 ${active ? "text-brand" : "text-[#9ab5c2] group-hover:text-brand-dark"}`}
                    />
                    <span className={`flex-1 transition-opacity duration-200 overflow-hidden ${collapsed ? "opacity-0 w-0" : "opacity-100"}`}>
                      {label}
                    </span>
                    {badge && !collapsed && (
                      <span className={`bg-brand text-white text-[10px] font-bold py-[2px] px-[7px] rounded-full shrink-0 transition-opacity duration-200 ${collapsed ? "opacity-0" : "opacity-100"}`}>
                        {badge}
                      </span>
                    )}
                    {active && (
                      <div className="absolute left-0 top-[25%] bottom-[25%] w-[3px] rounded-r-[3px] bg-gradient-to-b from-brand to-brand-secondary" />
                    )}
                  </Link>
                );
              })}
            </div>


          </div>
        ))}
      </div>

      {/* USER CARD */}
      <div className="border-t border-[#e8f0f4] py-3 px-2.5 shrink-0">
        <div
          className={`flex items-center rounded-xl bg-[#f7fbfd] border border-[#e8f0f4] cursor-pointer transition-all duration-200 relative hover:bg-[#f0f8fc] hover:border-[rgba(58,161,201,0.25)]
          ${collapsed ? "justify-center p-2" : "gap-2.5 p-2.5"}`}
          title={collapsed ? `${user?.name || "My Account"} — click to logout` : undefined}
        >
          <div className="relative w-[34px] h-[34px] rounded-full shrink-0 bg-gradient-to-br from-brand to-brand-secondary flex items-center justify-center text-[12px] font-extrabold text-[#3AA1C9] shadow-[0_2px_8px_rgba(58,161,201,0.28)]">
            {initials}
            <div className="absolute bottom-0 right-0 w-[9px] h-[9px] rounded-full bg-brand-secondary border-2 border-white" />
          </div>

          {!collapsed && (
            <>
              <div className="flex-1 min-w-0 overflow-hidden transition-all duration-200">
                <div className="text-[12.5px] font-bold text-brand-dark whitespace-nowrap overflow-hidden text-ellipsis">
                  {user?.name || "My Account"}
                </div>
                <div className="text-[11px] font-medium text-[#7a9aaa] capitalize mt-[1px]">
                  {user?.role || "user"}
                </div>
              </div>
              <div className="shrink-0 transition-opacity duration-200">
                <button
                  className="w-[30px] h-[30px] rounded-lg border border-[#e8f0f4] bg-white flex items-center justify-center cursor-pointer text-[#7a9aaa] transition-all duration-200 hover:bg-[#fff0f0] hover:border-[#ffcccc] hover:text-[#e74c3c]"
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
              className="absolute inset-0 w-full h-full bg-transparent border-none cursor-pointer rounded-xl"
              onClick={onLogout}
              title="Log out"
            />
          )}
        </div>
      </div>
    </div>
  );
}