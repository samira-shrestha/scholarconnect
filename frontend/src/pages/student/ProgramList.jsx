import React, { useEffect, useState } from "react";
import api from "../../api/axios.js";
import { Link } from "react-router-dom";
import {
  Search, Globe, GraduationCap,
  Calendar, BookOpen, X, ChevronDown,
  Loader2, AlertCircle, MapPin,
  SlidersHorizontal, CheckCircle2
} from "lucide-react";

/* helpers */
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

/* Single card */
function ProgramCard({ p }) {
  const status = deadlineStatus(p.deadline);

  /* Build the offer description text from available fields */
  const offerText = p.description
    ? p.description
    : [
      p.scholarshipAmount > 0 && `Rs ${money(p.scholarshipAmount)} Scholarship`,
      p.tuitionTotal > 0 && `Rs ${money(p.tuitionTotal)} Tuition`,
    ]
      .filter(Boolean)
      .join(", ") || "View details for full offer information";

  return (
    <div className="bg-brand-card rounded-[20px] border-[1.5px] border-brand-border shadow-[0_2px_16px_rgba(13,45,63,0.07)] overflow-hidden transition-all duration-[280ms] ease-[cubic-bezier(0.34,1.1,0.64,1)] flex flex-col hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(13,45,63,0.13)] hover:border-[rgba(58,161,201,0.25)]">
      {/* Banner */}
      <div className="h-[160px] relative bg-gradient-to-br from-[#e8f4fa] to-[#d5ede5] overflow-visible shrink-0">
        {p.bannerImageUrl
          ? <img src={p.bannerImageUrl} alt="banner" className="w-full h-full object-cover block"
            onError={(e) => { e.currentTarget.style.display = "none"; }} />
          : <div className="absolute inset-0 bg-[linear-gradient(rgba(58,161,201,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(58,161,201,0.07)_1px,transparent_1px)] bg-[size:22px_22px]" />
        }

        {/* Large logo overlapping banner bottom-left */}
        <div className="absolute left-5 -bottom-7 w-20 h-20 rounded-[18px] bg-white border-2 border-brand-border flex items-center justify-center shadow-[0_8px_24px_rgba(13,45,63,0.13)] overflow-hidden z-[2] shrink-0">
          {p.universityLogoUrl
            ? <img src={p.universityLogoUrl} alt={p.universityName} className="w-full h-full object-cover"
              onError={(e) => { e.currentTarget.style.display = "none"; }} />
            : <span className="text-[28px] font-black text-brand font-sans">
              {(p.universityName || "U")[0].toUpperCase()}
            </span>
          }
        </div>
      </div>

      {/* Body */}
      <div className="pt-[38px] px-5 pb-4 flex-1 flex flex-col gap-3">
        {/* University name */}
        <div className="flex items-center gap-[6px] mb-[-3px]">
          <div className="text-[18px] font-black text-[brand-dark] tracking-[-0.4px] leading-[1.2]">{p.universityName || "University"}</div>
          {p.universityIsVerified && (
            <CheckCircle2 color="#3AA1C9" size={16} fill="#E8F4FA" strokeWidth={2.5} className="mt-[-2px] shrink-0" />
          )}
        </div>
        <div className="text-[15px] font-bold text-brand-text">{p.title || "Program"}</div>

        {/* QS rank row — orange like screenshot */}
        {p.qsRankText && (
          <div className="flex items-center gap-[7px] text-[14px] font-extrabold text-[#d97706] mt-[2px]">
            <div className="w-[22px] h-[22px] rounded-full bg-[#d97706] text-white text-[9px] font-black tracking-[0.3px] flex items-center justify-center shrink-0">QS</div>
            {p.qsRankText}
          </div>
        )}

        <div className="h-[1px] bg-brand-border my-1" />

        {/* Provided offer as text */}
        <div>
          <div className="text-[11px] font-bold tracking-[0.8px] uppercase text-brand-muted mb-1.5">Provided Offers</div>
          <div className="text-[15.5px] font-bold text-brand-dark leading-[1.45]">{offerText}</div>
        </div>

        <div className="h-[1px] bg-brand-border my-1" />

        {/* Date rows with icons — like screenshot */}
        <div className="flex flex-col gap-[7px]">
          {p.deadline && (
            <div className={`flex items-center gap-[9px] text-[13.5px] font-semibold ${status === "past" ? "text-[#dc2626]" : status === "soon" ? "text-[#f97316]" : "text-brand-muted"}`}>
              <Calendar size={16} className="shrink-0" strokeWidth={1.8} />
              Deadline: {safeDate(p.deadline)}
            </div>
          )}
          {p.gpaRequired > 0 && (
            <div className="flex items-center gap-[9px] text-[13.5px] font-semibold text-brand-muted">
              <GraduationCap size={16} className="shrink-0" strokeWidth={1.8} />
              Min GPA: {Number(p.gpaRequired).toFixed(1)}
            </div>
          )}
          {p.country && (
            <div className="flex items-center gap-[9px] text-[13.5px] font-semibold text-brand-muted">
              <MapPin size={16} className="shrink-0" strokeWidth={1.8} />
              {p.country}
            </div>
          )}
        </div>
      </div>

      {/* Footer — dark full-width button like screenshot */}
      <div className="py-1 px-5 pb-5">
        <Link className="flex items-center justify-center gap-2 w-full p-3.5 rounded-[14px] bg-brand text-white text-[14px] font-bold font-sans no-underline transition-all duration-[220ms] ease-[cubic-bezier(0.34,1.2,0.64,1)] hover:bg-brand-dark hover:-translate-y-0.5 hover:shadow-[0_6px_18px_rgba(58,161,201,0.32)]" to={`/student/programs/${p._id}`}>
          View Offer Details
        </Link>
      </div>
    </div>
  );
}

/* MAIN COMPONENT */
export default function ProgramList() {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [countryFilter, setCountryFilter] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const response = await api.get("/programs");
        const list = Array.isArray(response.data) ? response.data : response.data.programs || [];
        setPrograms(list);
      } catch (e) {
        setError(e.response?.data?.message || e.message || "Failed to load programs");
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
    <div className="font-sans bg-brand-bg min-h-screen py-8 px-9 text-brand-text antialiased max-md:py-5 max-md:px-[18px] max-sm:py-4 max-sm:px-3.5">
      {/* HEADER */}
      <div className="mb-7">
        <div className="text-[11px] font-bold text-brand-muted tracking-[1px] uppercase mb-2 flex items-center gap-1.5">
          Student Portal <span className="opacity-40">›</span> Programs
        </div>
        <h1 className="text-[26px] font-black text-brand-dark tracking-[-0.8px] mb-1.5">Available Offers</h1>
        <p className="text-[14px] text-brand-muted font-normal leading-[1.6]">Browse scholarships and apply to programs.</p>
      </div>

      {/* STATS */}
      {!loading && !error && (
        <div className="flex gap-5 mb-6 flex-wrap items-center max-sm:gap-3">
          <div className="flex items-center gap-2">
            <span className="text-[20px] font-black text-brand-dark tracking-[-0.8px]">{programs.length}</span>
            <span className="text-[12px] text-brand-muted font-medium">Programs</span>
          </div>
          {countries.length > 0 && (
            <>
              <div className="w-[1px] h-[28px] bg-brand-border" />
              <div className="flex items-center gap-2">
                <span className="text-[20px] font-black text-brand-dark tracking-[-0.8px]">{countries.length}</span>
                <span className="text-[12px] text-brand-muted font-medium">Countries</span>
              </div>
            </>
          )}
          {closingSoon > 0 && (
            <>
              <div className="w-[1px] h-[28px] bg-brand-border" />
              <div className="flex items-center gap-2">
                <span className="text-[20px] font-black tracking-[-0.8px]" style={{ color: "#f97316" }}>{closingSoon}</span>
                <span className="text-[12px] text-brand-muted font-medium">Closing Soon</span>
              </div>
            </>
          )}
        </div>
      )}

      {/* ERROR */}
      {error && (
        <div className="flex items-center gap-2.5 bg-[#fff2f2] border-[1.5px] border-[#ffd0d0] text-[#dc2626] py-3.5 px-[18px] rounded-[14px] text-[13.5px] font-semibold mb-5">
          <AlertCircle size={16} /> {error}
        </div>
      )}

      {/* TOOLBAR */}
      {!loading && !error && (
        <div className="flex items-center gap-2.5 mb-6 flex-wrap">
          <div className="flex items-center gap-2.5 bg-brand-card border-[1.5px] border-brand-border rounded-xl px-3.5 flex-1 min-w-[200px] transition-all duration-200 focus-within:border-brand focus-within:shadow-[0_0_0_3px_rgba(58,161,201,0.1)]">
            <Search size={15} className="text-brand-muted shrink-0" />
            <input
              className="flex-1 border-none outline-none py-[11px] text-[13.5px] font-medium text-brand-text bg-transparent font-sans placeholder:text-[#b0c8d4] placeholder:font-normal"
              placeholder="Search programs, universities, countries…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
              <button className="bg-transparent border-none cursor-pointer text-brand-muted flex p-[2px] transition-colors duration-[150ms] hover:text-brand-dark" onClick={() => setSearch("")}>
                <X size={14} />
              </button>
            )}
          </div>

          <div className="flex gap-2 flex-wrap">
            {/* Country filter */}
            {countries.length > 0 && (
              <div className="flex items-center gap-[7px] bg-brand-card border-[1.5px] border-brand-border rounded-[10px] px-3 cursor-pointer transition-colors duration-[180ms] focus-within:border-brand hover:border-[rgba(58,161,201,0.4)]">
                <Globe size={13} className="text-brand-muted shrink-0" />
                <select
                  className="border-none outline-none py-[9px] text-[13px] font-semibold text-brand-muted bg-transparent font-sans cursor-pointer appearance-none pr-1"
                  value={countryFilter}
                  onChange={(e) => setCountryFilter(e.target.value)}
                >
                  <option value="">All Countries</option>
                  {countries.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
                <ChevronDown size={12} className="text-brand-muted shrink-0" />
              </div>
            )}

            {/* Sort */}
            <div className="flex items-center gap-[7px] bg-brand-card border-[1.5px] border-brand-border rounded-[10px] px-3 cursor-pointer transition-colors duration-[180ms] focus-within:border-brand hover:border-[rgba(58,161,201,0.4)]">
              <SlidersHorizontal size={13} className="text-brand-muted shrink-0" />
              <select
                className="border-none outline-none py-[9px] text-[13px] font-semibold text-brand-muted bg-transparent font-sans cursor-pointer appearance-none pr-1"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="newest">Newest</option>
                <option value="deadline">By Deadline</option>
                <option value="tuition_asc">Tuition: Low → High</option>
                <option value="tuition_desc">Tuition: High → Low</option>
              </select>
              <ChevronDown size={12} className="text-brand-muted shrink-0" />
            </div>
          </div>

          {filtered.length > 0 && (
            <span className="text-[13px] font-semibold text-brand-muted whitespace-nowrap ml-auto">
              {filtered.length} result{filtered.length !== 1 ? "s" : ""}
            </span>
          )}
        </div>
      )}

      {/* CONTENT */}
      {loading ? (
        <div className="flex items-center justify-center gap-3 p-20 text-brand-muted text-[14px] font-semibold">
          <Loader2 size={22} className="animate-spin" /> Loading programs…
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 px-6">
          <div className="w-[72px] h-[72px] rounded-[20px] bg-[rgba(58,161,201,0.08)] flex items-center justify-center mx-auto mb-5 text-brand">
            <BookOpen size={30} strokeWidth={1.5} />
          </div>
          <div className="text-[18px] font-black text-brand-dark mb-2">
            {search || countryFilter ? "No results found" : "No offers available right now."}
          </div>
          <div className="text-[14px] text-brand-muted max-w-[320px] mx-auto leading-[1.65]">
            {search || countryFilter
              ? "Try adjusting your search or filters."
              : "Check back soon — universities are adding new programs regularly."}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-5 max-md:grid-cols-[repeat(auto-fill,minmax(280px,1fr))] max-sm:grid-cols-1">
          {filtered.map((p) => (
            <ProgramCard key={p._id} p={p} />
          ))}
        </div>
      )}
    </div>
  );
}