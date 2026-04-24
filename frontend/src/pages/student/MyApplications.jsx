import React, { useEffect, useState } from "react";
import api from "../../api/axios.js";
import { Link } from "react-router-dom";
import {
  Calendar, GraduationCap, MapPin, Loader2, AlertCircle, BookOpen
} from "lucide-react";

/* helpers */
const money = (n) => Number(n || 0).toLocaleString(undefined, { maximumFractionDigits: 0 });

const safeDate = (d) => {
  if (!d) return "—";
  const dt = new Date(d);
  if (isNaN(dt.getTime())) return "—";
  return dt.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
};

/* Single Apply Card */
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

  const status = (item.status || "").toLowerCase();
  
  // Tailwind status badge colors
  let statusBadgeClasses = "bg-white/95 border-[1.5px] ";
  if (status === "pending") {
    statusBadgeClasses += "text-[#b45309] border-[#fcd34d]";
  } else if (status === "approved" || status === "accepted") {
    statusBadgeClasses += "text-[#166534] border-[#86efac]";
  } else if (status === "rejected" || status === "declined") {
    statusBadgeClasses += "text-[#b91c1c] border-[#fca5a5]";
  } else {
    statusBadgeClasses += "text-gray-600 border-gray-300";
  }

  return (
    <div className="bg-brand-card rounded-[20px] border-[1.5px] border-brand-border shadow-[0_2px_16px_rgba(13,45,63,0.07)] overflow-hidden transition-all duration-[280ms] ease-[cubic-bezier(0.34,1.1,0.64,1)] flex flex-col relative hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(13,45,63,0.13)] hover:border-[rgba(58,161,201,0.25)]">
      <div
        className={`absolute top-4 right-4 z-10 inline-flex items-center gap-[6px] backdrop-blur-md rounded-full py-[6px] px-[14px] text-[12px] font-extrabold capitalize tracking-[0.3px] shadow-[0_4px_12px_rgba(0,0,0,0.08)] ${statusBadgeClasses}`}
      >
        {item.status || "Pending"}
      </div>

      <div className="h-[160px] relative bg-gradient-to-br from-[#e8f4fa] to-[#d5ede5] overflow-visible shrink-0">
        {p.bannerImageUrl ? (
          <img
            src={p.bannerImageUrl}
            alt="banner"
            className="w-full h-full object-cover block"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        ) : (
          <div className="absolute inset-0 bg-[linear-gradient(rgba(58,161,201,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(58,161,201,0.07)_1px,transparent_1px)] bg-[size:22px_22px]" />
        )}

        <div className="absolute left-5 -bottom-7 w-20 h-20 rounded-[18px] bg-white border-2 border-brand-border flex items-center justify-center shadow-[0_8px_24px_rgba(13,45,63,0.13)] overflow-hidden z-[2] shrink-0">
          {p.universityLogoUrl ? (
            <img
              src={p.universityLogoUrl}
              alt={p.universityName || "Logo"}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          ) : (
            <span className="text-[28px] font-black text-brand font-sans">
              {(p.universityName || "U")[0].toUpperCase()}
            </span>
          )}
        </div>
      </div>

      <div className="pt-[38px] px-5 pb-4 flex-1 flex flex-col gap-3">
        <div className="text-[18px] font-black text-brand-dark tracking-[-0.4px] leading-[1.2]">{p.universityName || "University"}</div>
        <div className="text-[15px] font-bold text-brand-text">
          {p.title || p.programName || p.courseName || item.programTitle || "Program"}
        </div>

        {p.affiliation && (
          <div className="flex items-center gap-[7px] text-[14px] font-extrabold text-[#d97706] mt-[2px]">
            <div className="px-[6px] h-[22px] rounded-full bg-[#d97706] text-white text-[9px] font-black tracking-[0.3px] flex items-center justify-center shrink-0">Affiliated to</div>
            {p.affiliation}
          </div>
        )}

        <div className="h-[1px] bg-brand-border my-1" />

        <div>
          <div className="text-[11px] font-bold tracking-[0.8px] uppercase text-brand-muted mb-1.5">Provided Offers</div>
          <div className="text-[15.5px] font-bold text-brand-dark leading-[1.45]">{offerText}</div>
        </div>

        <div className="h-[1px] bg-brand-border my-1" />

        <div className="flex flex-col gap-[7px]">
          {p.country && (
            <div className="flex items-center gap-[9px] text-[13.5px] font-semibold text-brand-muted">
              <MapPin size={16} className="shrink-0" strokeWidth={1.8} />
              {p.country}
            </div>
          )}

          {p.gpaRequired > 0 && (
            <div className="flex items-center gap-[9px] text-[13.5px] font-semibold text-brand-muted">
              <GraduationCap size={16} className="shrink-0" strokeWidth={1.8} />
              Min GPA: {Number(p.gpaRequired).toFixed(1)}
            </div>
          )}

          <div className="flex items-center gap-[9px] text-[13.5px] font-semibold text-brand-muted">
            <Calendar size={16} className="shrink-0" strokeWidth={1.8} />
            Applied: {safeDate(item.createdAt)}
          </div>
        </div>
      </div>
    </div>
  );
}

/* MAIN COMPONENT */
export default function MyApplications() {
  const [apps, setApps] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const response = await api.get("/applications/student/list");
        const list = Array.isArray(response.data)
          ? response.data
          : response.data.applications || [];
        setApps(list);
      } catch (e) {
        setError(e.response?.data?.message || "Failed to load applications");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="font-sans bg-brand-bg min-h-screen py-8 px-9 text-brand-text antialiased max-md:py-5 max-md:px-[18px] max-sm:py-4 max-sm:px-3.5">
      <div className="mb-7">
        <h1 className="text-[26px] font-black text-brand-dark tracking-[-0.8px] mb-1.5">My Applications</h1>
        <p className="text-[14px] text-brand-muted font-normal leading-[1.6]">
          Track the status of your university applications.
        </p>
      </div>

      {error && (
        <div className="flex items-center gap-2.5 bg-[#fff2f2] border-[1.5px] border-[#ffd0d0] text-[#dc2626] py-3.5 px-[18px] rounded-[14px] text-[13.5px] font-semibold mb-5">
          <AlertCircle size={16} /> {error}
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center gap-3 p-20 text-brand-muted text-[14px] font-semibold">
          <Loader2 size={22} className="animate-spin" /> Loading your applications...
        </div>
      ) : apps.length === 0 ? (
        <div className="text-center py-20 px-6">
          <div className="w-[72px] h-[72px] rounded-[20px] bg-[rgba(58,161,201,0.08)] flex items-center justify-center mx-auto mb-5 text-brand">
            <BookOpen size={30} strokeWidth={1.5} />
          </div>
          <div className="text-[18px] font-black text-brand-dark mb-2">No applications yet</div>
          <div className="text-[14px] text-brand-muted max-w-[320px] mx-auto leading-[1.65]">
            Don&apos;t have any pending matches. Head to the programs page and apply!
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-5 mt-4 max-md:grid-cols-[repeat(auto-fill,minmax(280px,1fr))] max-sm:grid-cols-1">
          {apps.map((a) => (
            <ApplicationCard key={a._id} item={a} />
          ))}
        </div>
      )}
    </div>
  );
}