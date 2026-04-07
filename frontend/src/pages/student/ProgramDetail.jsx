import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../../api/axios.js";
import {
  ArrowLeft, Globe, DollarSign, GraduationCap, Calendar,
  BookOpen, Building2, Clock, CheckCircle2, AlertCircle,
  MapPin, Send, Loader2, FileText,
} from "lucide-react";



/* helpers */
const money = (n) =>
  Number(n || 0).toLocaleString(undefined, { maximumFractionDigits: 0 });

const fmtDate = (d) => {
  if (!d) return "—";
  const dt = new Date(d);
  if (isNaN(dt.getTime())) return "—";
  return dt.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
};

const deadlineStatus = (d) => {
  if (!d) return "";
  const diff = new Date(d) - new Date();
  if (diff < 0) return "past";
  if (diff < 1000 * 60 * 60 * 24 * 14) return "soon";
  return "";
};

export default function ProgramDetail() {
  const { id } = useParams();
  const [program, setProgram] = useState(null);
  const [msg, setMsg] = useState("");
  const [msgType, setMsgType] = useState(""); // "success" | "error"
  const [applying, setApplying] = useState(false);
  const [applied, setApplied] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const response = await api.get(`/programs/${id}`);
        const p = response.data.program || response.data;
        setProgram(p);
      } catch (e) {
        setMsg(e.response?.data?.message || "Program not found.");
        setMsgType("error");
      }
    })();
  }, [id]);

  /* — same apply logic as original — */
  const apply = async () => {
    setMsg("");
    setApplying(true);
    try {
      await api.post(`/applications/${id}`);
      setMsg("Application submitted successfully!");
      setMsgType("success");
      setApplied(true);
    } catch (e) {
      setMsg(e.response?.data?.message || "Already applied or an error occurred.");
      setMsgType("error");
    } finally {
      setApplying(false);
    }
  };

  /* LOADING */
  if (!program && !msg) {
    return (
      <div className="font-sans bg-brand-bg min-h-screen py-8 px-9 text-brand-text antialiased max-md:py-5 max-md:px-[18px] max-sm:py-4 max-sm:px-[14px]">

        <div className="flex items-center justify-center gap-3 p-[100px] text-brand-muted text-[14px] font-semibold">
          <Loader2 size={22} className="animate-spin" /> Loading program…
        </div>
      </div>
    );
  }

  /* ERROR */
  if (!program && msg) {
    return (
      <div className="font-sans bg-brand-bg min-h-screen py-8 px-9 text-brand-text antialiased max-md:py-5 max-md:px-[18px] max-sm:py-4 max-sm:px-[14px]">

        <Link className="inline-flex items-center gap-[7px] text-[13px] font-semibold text-brand-muted no-underline mb-6 transition-colors duration-[180ms] hover:text-brand" to="/student/programs">
          <ArrowLeft size={15} /> Back to Programs
        </Link>
        <div className="flex items-center gap-[10px] bg-[#fff2f2] border-[1.5px] border-[#ffd0d0] text-[#dc2626] py-4 px-5 rounded-[14px] text-[14px] font-semibold">
          <AlertCircle size={18} /> {msg}
        </div>
      </div>
    );
  }

  const scholarship = Number(program.scholarshipAmount || 0);
  const total = Number(program.tuitionTotal || 0);
  const left = Math.max(total - scholarship, 0);
  const ds = deadlineStatus(program.deadline);

  return (
    <div className="font-sans bg-brand-bg min-h-screen py-8 px-9 text-brand-text antialiased max-md:py-5 max-md:px-[18px] max-sm:py-4 max-sm:px-[14px]">


      {/* Back */}
      <Link className="inline-flex items-center gap-[7px] text-[13px] font-semibold text-brand-muted no-underline mb-6 transition-colors duration-[180ms] hover:text-brand" to="/student/programs">
        <ArrowLeft size={15} /> Back to Programs
      </Link>

      <div className="grid grid-cols-[1fr_340px] gap-6 items-start max-md:grid-cols-1">

        {/* MAIN CARD */}
        <div className="bg-brand-card rounded-[20px] border-[1.5px] border-brand-border shadow-[0_2px_16px_rgba(13,45,63,0.07)] overflow-hidden">
          {/* Banner */}
          <div className="h-[220px] bg-gradient-to-br from-[#e8f4fa] to-[#d5ede5] relative overflow-hidden max-sm:h-[160px]">
            {program.bannerImageUrl
              ? <img src={program.bannerImageUrl} alt="banner" className="w-full h-full object-cover block"
                onError={(e) => { e.currentTarget.style.display = "none"; }} />
              : <div className="absolute inset-0 bg-[linear-gradient(rgba(58,161,201,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(58,161,201,0.08)_1px,transparent_1px)] bg-[size:26px_26px]" />
            }
            <div className="absolute inset-0 bg-gradient-to-b from-[rgba(13,45,63,0.05)] to-[rgba(13,45,63,0.5)]" />

            <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
              {program.qsRankText && (
                <div className="inline-flex items-center gap-[6px] backdrop-blur-md rounded-full py-[6px] px-[14px] text-[12px] font-bold border border-[rgba(255,255,255,0.3)] bg-[rgba(255,243,220,0.92)] text-[#b36200]">QS {program.qsRankText}</div>
              )}
              {program.country && (
                <div className="inline-flex items-center gap-[6px] backdrop-blur-md rounded-full py-[6px] px-[14px] text-[12px] font-bold border border-[rgba(255,255,255,0.3)] bg-[rgba(255,255,255,0.92)] text-brand-dark">
                  <MapPin size={11} strokeWidth={2.5} /> {program.country}
                </div>
              )}
            </div>

            {/* Logo */}
            <div className="absolute left-6 -bottom-[26px] w-16 h-16 rounded-[18px] bg-white border-[2.5px] border-brand-border flex items-center justify-center shadow-[0_8px_24px_rgba(13,45,63,0.14)] overflow-hidden z-[2]">
              {program.universityLogoUrl
                ? <img src={program.universityLogoUrl} alt={program.universityName}
                  onError={(e) => { e.currentTarget.style.display = "none"; }} />
                : <span className="text-[22px] font-black text-brand font-sans">
                  {(program.universityName || "U")[0].toUpperCase()}
                </span>
              }
            </div>
          </div>

          {/* Body */}
          <div className="pt-11 px-7 pb-7">
            <div className="flex items-center gap-[8px] mb-1.5">
              <div className="text-[24px] font-black text-brand-dark tracking-[-0.6px]">{program.universityName || "University"}</div>
              {program.universityIsVerified && (
                <CheckCircle2 color="#3AA1C9" size={22} fill="#E8F4FA" strokeWidth={2.5} className="shrink-0" />
              )}
            </div>
            <div className="inline-flex items-center gap-[6px] text-[14px] font-semibold text-brand mb-5">
              <BookOpen size={14} strokeWidth={2} />
              {program.title}
            </div>

            <div className="h-px bg-brand-border my-5" />

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-[14px] mb-6 max-sm:grid-cols-1">
              <div className="bg-brand-bg rounded-[14px] p-4 border-[1.5px] border-brand-border transition-colors duration-[180ms] hover:border-[rgba(58,161,201,0.3)]">
                <div className="flex items-center gap-[6px] text-[10.5px] font-bold tracking-[1px] uppercase text-brand-muted mb-[7px]"><Globe size={12} strokeWidth={2} /> Country</div>
                <div className="text-[17px] font-extrabold text-brand-dark tracking-[-0.3px]">{program.country || "—"}</div>
              </div>
              <div className="bg-brand-bg rounded-[14px] p-4 border-[1.5px] border-brand-border transition-colors duration-[180ms] hover:border-[rgba(58,161,201,0.3)]">
                <div className="flex items-center gap-[6px] text-[10.5px] font-bold tracking-[1px] uppercase text-brand-muted mb-[7px]"> Tuition</div>
                <div className="text-[17px] font-extrabold text-brand-dark tracking-[-0.3px]">Rs {money(program.tuition)}</div>
              </div>
              <div className="bg-brand-bg rounded-[14px] p-4 border-[1.5px] border-brand-border transition-colors duration-[180ms] hover:border-[rgba(58,161,201,0.3)]">
                <div className="flex items-center gap-[6px] text-[10.5px] font-bold tracking-[1px] uppercase text-brand-muted mb-[7px]"><GraduationCap size={12} strokeWidth={2} /> Min GPA</div>
                <div className="text-[17px] font-extrabold text-brand-dark tracking-[-0.3px]">
                  {program.gpaRequired > 0 ? Number(program.gpaRequired).toFixed(1) : "—"}
                </div>
              </div>
              <div className="bg-brand-bg rounded-[14px] p-4 border-[1.5px] border-brand-border transition-colors duration-[180ms] hover:border-[rgba(58,161,201,0.3)]">
                <div className="flex items-center gap-[6px] text-[10.5px] font-bold tracking-[1px] uppercase text-brand-muted mb-[7px]"><Calendar size={12} strokeWidth={2} /> Deadline</div>
                <div className={`text-[17px] font-extrabold tracking-[-0.3px] ${ds === "past" ? "text-[#dc2626]" : ds === "soon" ? "text-[#f97316]" : "text-brand-dark"}`}>
                  {fmtDate(program.deadline)}
                </div>
              </div>
            </div>

            {/* Description */}s
            {program.description && (
              <>
                <div className="h-px bg-brand-border my-5" />
                <div className="text-[11px] font-bold tracking-[1.5px] uppercase text-brand-muted mb-3">About This Program</div>
                <p className="text-[14.5px] text-brand-muted leading-relaxed font-normal">{program.description}</p>
              </>
            )}
          </div>
        </div>

        {/* SIDEBAR */}
        <div className="flex flex-col gap-4 max-md:-order-1">

          {/* Apply card */}
          <div className="bg-brand-card rounded-[20px] border-[1.5px] border-brand-border shadow-[0_2px_16px_rgba(13,45,63,0.07)] overflow-hidden">
            <div className="bg-gradient-to-br from-brand-dark via-[#0a3d52] to-[#1a5c6b] py-6 px-[22px] relative overflow-hidden before:absolute before:w-[180px] before:h-[180px] before:rounded-full before:-top-[70px] before:-right-[50px] before:bg-[radial-gradient(circle,rgba(58,161,201,0.25)_0%,transparent_70%)] after:absolute after:w-[120px] after:h-[120px] after:rounded-full after:-bottom-[50px] after:-left-[20px] after:bg-[radial-gradient(circle,rgba(129,197,166,0.2)_0%,transparent_70%)] max-md:py-5 max-md:px-5">
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:24px_24px]" />
              <div className="relative z-[2] text-[10.5px] font-bold tracking-[1.5px] uppercase text-[#81C5A6] mb-2">Provided Offer</div>
              <div className="relative z-[2] text-[34px] font-black text-white tracking-[-1.5px] leading-none">
                Rs {money(scholarship > 0 ? scholarship : program.tuition)}
                {scholarship > 0 && <span className="text-[16px] font-semibold text-white/60 ml-[6px]">scholarship</span>}
              </div>
              {scholarship > 0 && total > 0 && (
                <div className="relative z-[2] text-[12px] text-white/55 font-medium mt-2">
                  Rs {money(scholarship)} of Rs {money(total)} — student pays ≈ Rs {money(left)}
                </div>
              )}
            </div>

            <div className="py-5 px-[22px]">
              <div className="flex flex-col gap-[10px] mb-5">
                <div className="flex items-center justify-between text-[13px] pb-[10px] border-b border-brand-border last:border-none last:pb-0">
                  <span className="flex items-center gap-[7px] font-semibold text-brand-muted"><Globe size={14} strokeWidth={1.8} /> Country</span>
                  <span className="font-bold text-brand-dark text-right">{program.country || "—"}</span>
                </div>
                <div className="flex items-center justify-between text-[13px] pb-[10px] border-b border-brand-border last:border-none last:pb-0">
                  <span className="flex items-center gap-[7px] font-semibold text-brand-muted"><GraduationCap size={14} strokeWidth={1.8} /> Min GPA</span>
                  <span className="font-bold text-brand-dark text-right">
                    {program.gpaRequired > 0 ? Number(program.gpaRequired).toFixed(1) : "Not specified"}
                  </span>
                </div>
                <div className="flex items-center justify-between text-[13px] pb-[10px] border-b border-brand-border last:border-none last:pb-0">
                  <span className="flex items-center gap-[7px] font-semibold text-brand-muted"><Clock size={14} strokeWidth={1.8} /> Deadline</span>
                  <span className={`font-bold text-right ${ds === "past" ? "text-[#dc2626]" : ds === "soon" ? "text-[#f97316]" : "text-brand-dark"}`}
                    style={{ color: ds === "past" ? "#dc2626" : ds === "soon" ? "#f97316" : "var(--dark)" }}>
                    {fmtDate(program.deadline)}
                  </span>
                </div>
              </div>

              {/* Apply button — same logic as original */}
              <button
                className={`w-full p-[14px] rounded-xl border-none text-white text-[15px] font-bold font-sans cursor-pointer flex items-center justify-center gap-[9px] transition-all duration-[220ms] ease-[cubic-bezier(0.34,1.2,0.64,1)] disabled:opacity-55 disabled:cursor-not-allowed hover:not-disabled:bg-brand-dark hover:not-disabled:-translate-y-0.5 hover:not-disabled:shadow-[0_8px_24px_rgba(58,161,201,0.32)] ${applied ? "bg-[#155c40]" : msgType === "error" ? "bg-[#9b1c1c]" : "bg-brand"}`}
                onClick={apply}
                disabled={applying || applied || ds === "past"}
              >
                {applying ? (
                  <><Loader2 size={16} className="animate-spin" /> Submitting…</>
                ) : applied ? (
                  <><CheckCircle2 size={16} /> Applied!</>
                ) : ds === "past" ? (
                  "Deadline Passed"
                ) : (
                  <><Send size={15} /> Apply Now</>
                )}
              </button>

              {/* Message — same as original */}
              {msg && (
                <div className={`flex items-start gap-[10px] py-3 px-[14px] rounded-[11px] text-[13px] font-semibold mt-3 leading-[1.45] ${msgType === "success" ? "bg-[#edfaf4] border-[1.5px] border-[#a7e8c7] text-[#155c40]" : "bg-[#fff2f2] border-[1.5px] border-[#ffd0d0] text-[#9b1c1c]"}`}>
                  {msgType === "success"
                    ? <CheckCircle2 size={15} style={{ flexShrink: 0 }} />
                    : <AlertCircle size={15} style={{ flexShrink: 0 }} />}
                  {msg}
                </div>
              )}
            </div>
          </div>

          {/* University info card */}
          <div className="bg-brand-card rounded-[16px] border-[1.5px] border-brand-border shadow-[0_2px_16px_rgba(13,45,63,0.07)] py-5 px-[22px]">
            <div className="text-[11px] font-bold tracking-[1.5px] uppercase text-brand-muted mb-3.5">University Info</div>
            <div className="flex items-center gap-[10px] py-2.5 border-b border-brand-border text-[13.5px] last:border-none last:pb-0">
              <Building2 size={15} className="text-brand shrink-0" strokeWidth={1.8} />
              <span className="text-brand-muted font-medium flex-1">Institution</span>
              <div className="flex items-center gap-1.5 font-bold text-brand-dark text-right justify-end">
                <span>{program.universityName || "—"}</span>
                {program.universityIsVerified && (
                  <CheckCircle2 color="#3AA1C9" size={14} fill="#E8F4FA" strokeWidth={2.5} className="shrink-0" />
                )}
              </div>
            </div>
            <div className="flex items-center gap-[10px] py-2.5 border-b border-brand-border text-[13.5px] last:border-none last:pb-0">
              <FileText size={15} className="text-brand shrink-0" strokeWidth={1.8} />
              <span className="text-brand-muted font-medium flex-1">Program</span>
              <span className="font-bold text-brand-dark text-right" style={{ fontSize: 12 }}>{program.title}</span>
            </div>
            {program.country && (
              <div className="flex items-center gap-[10px] py-2.5 border-b border-brand-border text-[13.5px] last:border-none last:pb-0">
                <MapPin size={15} className="text-brand shrink-0" strokeWidth={1.8} />
                <span className="text-brand-muted font-medium flex-1">Location</span>
                <span className="font-bold text-brand-dark text-right">{program.country}</span>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}