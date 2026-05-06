import React, { useEffect, useMemo, useState } from "react";
import api from "../../api/axios";

export default function CollegeApplications() {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState(null);
  const [filter, setFilter] = useState("all"); // all | pending | accepted | rejected
  const [q, setQ] = useState("");

  const fetchApps = async () => {
    setError("");
    setLoading(true);
    try {
      const response = await api.get("/applications/college/list");
      const list = response.data.applications || response.data || [];
      setApps(Array.isArray(list) ? list : []);
    } catch (e) {
      setError(e.response?.data?.message || "Failed to load applications");
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

  return (
    <div className="font-sans bg-brand-bg min-h-screen py-8 px-9 text-brand-text max-md:py-4 max-md:px-3.5 antialiased">
      <div className="flex justify-between gap-3 flex-wrap mb-5">
        <div>
          <h2 className="mt-0 mb-1.5 text-[26px] font-black text-brand-dark tracking-[-0.8px]">college Applications</h2>
          <div className="opacity-70 text-[14px] font-medium text-brand-muted">
            Review students who applied to your programs.
          </div>
        </div>

        <button onClick={fetchApps} className="py-2.5 px-[18px] rounded-xl border-[1.5px] border-brand-border bg-brand-card cursor-pointer font-bold text-[13px] font-sans text-brand-dark shadow-[0_2px_16px_rgba(13,45,63,0.07)] transition-all duration-200 self-start hover:border-[rgba(58,161,201,0.4)] hover:shadow-[0_16px_48px_rgba(13,45,63,0.13)]">
          Refresh
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-2.5 items-center flex-wrap mb-5">
        <input
          placeholder="Search by student name, email, or program…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className="flex-1 min-w-[240px] py-[11px] px-[14px] rounded-xl border-[1.5px] border-brand-border bg-brand-card text-[13.5px] font-medium font-sans text-brand-text outline-none transition-all duration-200 placeholder:text-[#b0c8d4] placeholder:font-normal focus:border-brand focus:shadow-[0_0_0_3px_rgba(58,161,201,0.1)]"
        />

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="py-[11px] px-[14px] rounded-xl border-[1.5px] border-brand-border bg-brand-card font-bold text-[13px] font-sans text-brand-muted cursor-pointer outline-none transition-all duration-[180ms] focus:border-brand"
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="accepted">Accepted</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      {/* Content */}
      {loading ? (
        <div className="mt-[18px] text-[14px] font-semibold text-brand-muted">Loading…</div>
      ) : error ? (
        <div className="mt-[18px] bg-[#fff2f2] border-[1.5px] border-[#ffd0d0] text-[#dc2626] py-[14px] px-[18px] rounded-[14px] text-[13.5px] font-semibold">{error}</div>
      ) : filtered.length === 0 ? (
        <div className="mt-[18px] opacity-70 text-[14px] font-medium text-brand-muted">No applications found.</div>
      ) : (
        <div className="flex flex-col gap-3.5 mt-1">
          {filtered.map((a) => (
            <div key={a._id} className="bg-brand-card border-[1.5px] border-brand-border rounded-[20px] p-5 shadow-[0_2px_16px_rgba(13,45,63,0.07)] transition-all duration-200 hover:-translate-y-[3px] hover:shadow-[0_16px_48px_rgba(13,45,63,0.13)] hover:border-[rgba(58,161,201,0.25)]">
              {/* Header row */}
              <div className="flex justify-between gap-2.5 flex-wrap items-start">
                <div>
                  <div className="font-black text-[15.5px] text-brand-dark tracking-[-0.3px] leading-[1.3]">{a.program?.title || "Program"}</div>
                  <div className="text-[13px] opacity-70 font-semibold text-brand-muted mt-[3px]">
                    college: {a.program?.collegeName || "—"}
                  </div>
                </div>

                <span
                  className={`inline-block py-1 px-3 rounded-full text-[12px] font-bold font-sans capitalize whitespace-nowrap shrink-0 border-[1.5px] ${(a.status || "").toLowerCase().trim() === 'accepted' ? 'bg-[rgba(22,101,52,0.1)] text-[#166534] border-[rgba(22,101,52,0.25)]' :
                    (a.status || "").toLowerCase().trim() === 'rejected' ? 'bg-[rgba(220,38,38,0.08)] text-[#b91c1c] border-[rgba(220,38,38,0.22)]' :
                      'bg-[rgba(251,191,36,0.13)] text-[#b45309] border-[rgba(251,191,36,0.4)]'
                    }`}
                >
                  {a.status}
                </span>
              </div>

              {/* Student info */}
              <div className="mt-4 p-4 rounded-[14px] bg-[rgba(58,161,201,0.03)] border-[1.5px] border-[rgba(58,161,201,0.1)] transition-colors duration-200 hover:bg-[rgba(58,161,201,0.05)]">
                <div className="text-[12px] uppercase tracking-[0.5px] font-black text-brand-muted mb-2.5 opacity-80">Applicant Details</div>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2.5">
                    <svg className="w-[18px] h-[18px] text-brand shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                    <span className="font-extrabold text-[14.5px] text-brand-dark tracking-[-0.2px] truncate">{a.student?.name || "Unknown Student"}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <svg className="w-[18px] h-[18px] text-brand-muted shrink-0 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                    <span className="text-[13.5px] font-medium text-brand-text truncate">{a.student?.email || "No email provided"}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <svg className="w-[18px] h-[18px] text-brand-muted shrink-0 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"></path></svg>
                    <span className="text-[13px] font-medium text-brand-muted truncate hover:text-brand-text transition-colors">ID: {a.student?._id || "—"}</span>
                  </div>
                  <div className="flex justify-between items-center gap-2.5 flex-wrap">
                    <div className="flex items-center gap-2.5">
                      <svg className="w-[18px] h-[18px] text-brand-muted shrink-0 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z"></path><path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path></svg>
                      <span className="text-[13px] font-medium text-brand-muted">Qual: <span className="font-bold text-brand-text">{a.student?.qualificationLevel || "—"}</span></span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <svg className="w-[18px] h-[18px] text-brand-muted shrink-0 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
                      <span className="text-[13px] font-medium text-brand-muted">GPA: <span className="font-bold text-brand-text">{a.student?.gpa !== undefined && a.student?.gpa !== null ? a.student?.gpa : "—"}</span></span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <svg className="w-[18px] h-[18px] text-brand-muted shrink-0 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                    <span className="text-[13px] font-medium text-brand-muted">Applied: {a.createdAt ? new Date(a.createdAt).toLocaleString(undefined, { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : "—"}</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-3.5 flex gap-2.5 flex-wrap">
                <button
                  disabled={updatingId === a._id || a.status === "accepted"}
                  onClick={() => updateStatus(a._id, "accepted")}
                  className={`py-2.5 px-[18px] rounded-xl cursor-pointer font-extrabold text-[13px] font-sans transition-all duration-200 border-[1.5px] ${a.status === "accepted" ? "border-[#bfead0] bg-[#eafff3] text-[#0f7a3a]" : "border-[#bfead0] bg-white text-[#0f7a3a] hover:not-disabled:bg-[#eafff3] disabled:opacity-50 disabled:cursor-not-allowed"
                    }`}
                >
                  {updatingId === a._id ? "Updating…" : "Accept"}
                </button>

                <button
                  disabled={updatingId === a._id || a.status === "rejected"}
                  onClick={() => updateStatus(a._id, "rejected")}
                  className={`py-2.5 px-[18px] rounded-xl cursor-pointer font-extrabold text-[13px] font-sans transition-all duration-200 border-[1.5px] ${a.status === "rejected" ? "border-[#ffd0d0] bg-[#ffecec] text-[#b00020]" : "border-[#ffd0d0] bg-white text-[#b00020] hover:not-disabled:bg-[#ffecec] disabled:opacity-50 disabled:cursor-not-allowed"
                    }`}
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