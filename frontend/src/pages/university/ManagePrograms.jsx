import React, { useEffect, useMemo, useState } from "react";
import api from "../../api/axios";
import {
  Plus, X, Trash2, Eye, EyeOff, RefreshCw,
  BookOpen, Globe, DollarSign, Calendar, Award,
  Image, Link2, AlertCircle, CheckCircle2,
  Loader2, MapPin,
} from "lucide-react";

/* ─────────────────────────────────────────────
   CSS
───────────────────────────────────────────── */
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&display=swap');

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
    --shadow-lg: 0 16px 48px rgba(13,45,63,0.13);
  }

  .mp { font-family: var(--font); padding: 32px 36px; background: var(--bg); min-height: 100vh; color: var(--text); -webkit-font-smoothing: antialiased; }

  /* ── HEADER ── */
  .mp-header { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 28px; gap: 16px; flex-wrap: wrap; }
  .mp-breadcrumb { font-size: 11px; font-weight: 700; color: var(--muted); letter-spacing: 1px; text-transform: uppercase; margin-bottom: 6px; display: flex; align-items: center; gap: 6px; }
  .mp-title { font-size: 26px; font-weight: 900; color: var(--dark); letter-spacing: -0.8px; }
  .mp-subtitle { font-size: 13.5px; color: var(--muted); font-weight: 400; margin-top: 5px; }
  .mp-header-actions { display: flex; gap: 10px; align-items: center; }

  .mp-refresh-btn {
    display: inline-flex; align-items: center; gap: 7px;
    padding: 10px 16px; border-radius: 11px;
    border: 1.5px solid var(--border); background: var(--card);
    font-size: 13px; font-weight: 600; color: var(--muted);
    cursor: pointer; font-family: var(--font); transition: all 0.18s;
  }
  .mp-refresh-btn:hover { border-color: var(--p); color: var(--p); }

  .mp-add-btn {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 11px 22px; border-radius: 11px;
    background: var(--p); color: white; border: none;
    font-size: 13.5px; font-weight: 700; font-family: var(--font);
    cursor: pointer; transition: all 0.2s cubic-bezier(0.34,1.2,0.64,1);
  }
  .mp-add-btn:hover { background: var(--dark); transform: translateY(-2px); box-shadow: 0 6px 20px rgba(58,161,201,0.35); }

  /* ── STATS ── */
  .mp-stats { display: flex; gap: 16px; margin-bottom: 24px; flex-wrap: wrap; }
  .mp-stat-card {
    background: var(--card); border-radius: 14px; padding: 18px 20px;
    border: 1.5px solid var(--border); box-shadow: var(--shadow);
    display: flex; align-items: center; gap: 12px; flex: 1; min-width: 130px;
  }
  .mp-stat-icon { width: 40px; height: 40px; border-radius: 11px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
  .mp-stat-icon.blue   { background: rgba(58,161,201,0.1);  color: var(--p); }
  .mp-stat-icon.green  { background: rgba(129,197,166,0.15); color: var(--s); }
  .mp-stat-icon.orange { background: rgba(251,146,60,0.12);  color: #f97316; }
  .mp-stat-val { font-size: 22px; font-weight: 900; color: var(--dark); letter-spacing: -0.8px; line-height: 1; }
  .mp-stat-label { font-size: 12px; color: var(--muted); font-weight: 500; margin-top: 3px; }

  /* ── ERROR ── */
  .mp-error { display: flex; align-items: center; gap: 10px; background: #fff2f2; border: 1.5px solid #ffd0d0; color: #dc2626; padding: 14px 18px; border-radius: 12px; font-size: 13px; font-weight: 600; margin-bottom: 20px; }

  /* ── GRID ── */
  .mp-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 18px; }

  /* ── OFFER CARD ── */
  .mp-card {
    background: var(--card); border-radius: 20px;
    border: 1.5px solid var(--border); box-shadow: var(--shadow);
    overflow: hidden; transition: all 0.25s ease; display: flex; flex-direction: column;
  }
  .mp-card:hover { transform: translateY(-3px); box-shadow: var(--shadow-lg); border-color: rgba(58,161,201,0.25); }

  .mp-banner {
    height: 140px; position: relative;
    background: linear-gradient(135deg, #e8f4fa, #d5ede5);
    overflow: visible; flex-shrink: 0;
  }
  .mp-banner-img { width: 100%; height: 100%; object-fit: cover; display: block; }
  .mp-banner-grid {
    position: absolute; inset: 0;
    background-image:
      linear-gradient(rgba(58,161,201,0.07) 1px, transparent 1px),
      linear-gradient(90deg, rgba(58,161,201,0.07) 1px, transparent 1px);
    background-size: 22px 22px;
  }
  .mp-status-badge {
    position: absolute; top: 10px; right: 10px;
    display: flex; align-items: center; gap: 5px;
    padding: 4px 10px; border-radius: 100px;
    font-size: 11px; font-weight: 700; backdrop-filter: blur(6px);
  }
  .mp-status-badge.active   { background: rgba(129,197,166,0.92); color: #0d4a2e; }
  .mp-status-badge.inactive { background: rgba(239,68,68,0.88); color: white; }

  .mp-card-logo {
    position: absolute; left: 16px; bottom: -22px;
    width: 60px; height: 60px; border-radius: 15px;
    background: white; border: 2px solid var(--border);
    display: flex; align-items: center; justify-content: center;
    box-shadow: 0 6px 20px rgba(13,45,63,0.12);
    overflow: hidden; z-index: 2;
  }
  .mp-card-logo img { width: 100%; height: 100%; object-fit: cover; }
  .mp-card-logo-fb { font-size: 22px; font-weight: 900; color: var(--p); font-family: var(--font); }

  .mp-card-body { padding: 32px 18px 14px; flex: 1; display: flex; flex-direction: column; gap: 10px; }
  .mp-card-univ { font-size: 16px; font-weight: 900; color: var(--dark); letter-spacing: -0.3px; }
  .mp-card-qs { font-size: 13px; font-weight: 700; color: #d97706; display: flex; align-items: center; gap: 6px; }
  .mp-qs-dot { width: 18px; height: 18px; border-radius: 50%; background: #d97706; color: white; font-size: 7px; font-weight: 900; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
  .mp-card-country { font-size: 12.5px; color: var(--muted); font-weight: 500; display: flex; align-items: center; gap: 5px; }
  .mp-card-divider { height: 1px; background: var(--border); }
  .mp-card-offer-label { font-size: 10px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; color: var(--muted); margin-bottom: 4px; }
  .mp-card-offer-amount { font-size: 20px; font-weight: 900; color: var(--dark); letter-spacing: -0.5px; }
  .mp-card-offer-sub { font-size: 12px; color: var(--muted); font-weight: 500; margin-top: 3px; }
  .mp-card-deadline { display: flex; align-items: center; gap: 7px; font-size: 12.5px; font-weight: 600; color: var(--muted); }
  .mp-card-title-label { font-size: 11px; color: var(--muted); font-weight: 500; }
  .mp-card-title-val { font-size: 12.5px; font-weight: 700; color: var(--dark); }

  .mp-card-actions { padding: 0 18px 18px; display: flex; gap: 8px; }
  .mp-toggle-btn {
    flex: 1; padding: 9px 12px; border-radius: 10px;
    font-size: 12.5px; font-weight: 700; font-family: var(--font);
    cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 6px;
    transition: all 0.18s; border: 1.5px solid;
  }
  .mp-toggle-btn.is-active   { background: rgba(129,197,166,0.12); border-color: rgba(129,197,166,0.4); color: #1a7a50; }
  .mp-toggle-btn.is-inactive { background: var(--bg); border-color: var(--border); color: var(--muted); }
  .mp-del-btn {
    width: 38px; height: 38px; border-radius: 10px; flex-shrink: 0;
    border: 1.5px solid #ffd0d0; background: #fff0f0;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; color: #dc2626; transition: all 0.18s;
  }
  .mp-del-btn:hover { background: #dc2626; color: white; border-color: #dc2626; }

  /* ── EMPTY ── */
  .mp-empty { text-align: center; padding: 80px 24px; background: var(--card); border-radius: 20px; border: 1.5px dashed var(--border); }
  .mp-empty-icon { width: 64px; height: 64px; border-radius: 18px; background: rgba(58,161,201,0.08); display: flex; align-items: center; justify-content: center; margin: 0 auto 18px; color: var(--p); }
  .mp-empty-title { font-size: 17px; font-weight: 900; color: var(--dark); margin-bottom: 8px; }
  .mp-empty-sub { font-size: 13.5px; color: var(--muted); max-width: 300px; margin: 0 auto 24px; line-height: 1.65; font-weight: 400; }

  /* ── LOADING ── */
  .mp-loading { display: flex; align-items: center; justify-content: center; gap: 12px; padding: 80px; color: var(--muted); font-size: 14px; font-weight: 600; }
  @keyframes spin { to { transform: rotate(360deg); } }
  .spin { animation: spin 0.8s linear infinite; }

  /* ── MODAL ── */
  .mp-overlay {
    position: fixed; inset: 0; background: rgba(13,45,63,0.46);
    backdrop-filter: blur(5px); z-index: 1000;
    display: flex; align-items: center; justify-content: center; padding: 20px;
    animation: fadeIn 0.18s ease;
  }
  @keyframes fadeIn { from{opacity:0} to{opacity:1} }

  .mp-modal {
    background: white; border-radius: 22px;
    width: 100%; max-width: 580px; max-height: 92vh;
    overflow-y: auto; box-shadow: 0 28px 90px rgba(13,45,63,0.25);
    animation: slideUp 0.26s cubic-bezier(0.34,1.2,0.64,1);
    display: flex; flex-direction: column;
  }
  @keyframes slideUp { from{opacity:0;transform:translateY(24px) scale(0.97)} to{opacity:1;transform:translateY(0) scale(1)} }
  .mp-modal::-webkit-scrollbar { width: 0; }

  .mp-modal-head {
    padding: 26px 28px 20px;
    display: flex; align-items: flex-start; justify-content: space-between; gap: 12px;
    border-bottom: 1px solid var(--border);
    position: sticky; top: 0; background: white; z-index: 10;
  }
  .mp-modal-icon { width: 42px; height: 42px; border-radius: 12px; background: rgba(58,161,201,0.1); color: var(--p); display: flex; align-items: center; justify-content: center; margin-bottom: 10px; }
  .mp-modal-title { font-size: 19px; font-weight: 900; color: var(--dark); letter-spacing: -0.5px; }
  .mp-modal-sub { font-size: 13px; color: var(--muted); font-weight: 400; margin-top: 3px; }
  .mp-modal-close {
    width: 32px; height: 32px; border-radius: 9px; border: 1.5px solid var(--border);
    background: transparent; cursor: pointer; display: flex; align-items: center; justify-content: center;
    color: var(--muted); transition: all 0.15s; flex-shrink: 0;
  }
  .mp-modal-close:hover { background: var(--bg); color: var(--dark); }

  .mp-modal-body { padding: 22px 28px; flex: 1; }
  .mp-modal-err { display: flex; align-items: center; gap: 9px; background: #fff2f2; border: 1.5px solid #ffd0d0; color: #dc2626; padding: 11px 14px; border-radius: 11px; font-size: 13px; font-weight: 600; margin-bottom: 18px; }

  .mp-form { display: flex; flex-direction: column; gap: 14px; }
  .mp-form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
  .mp-section-sep { font-size: 10px; font-weight: 700; letter-spacing: 1.4px; text-transform: uppercase; color: var(--muted); padding-top: 6px; }

  .mp-field { display: flex; flex-direction: column; gap: 5px; }
  .mp-label { font-size: 11.5px; font-weight: 700; color: var(--text); }
  .mp-label span { color: #dc2626; margin-left: 2px; }
  .mp-input-wrap {
    display: flex; align-items: center; gap: 9px; padding: 0 12px;
    border-radius: 11px; border: 1.5px solid var(--border); background: white; transition: all 0.18s;
  }
  .mp-input-wrap:focus-within { border-color: var(--p); box-shadow: 0 0 0 3px rgba(58,161,201,0.1); }
  .mp-input-icon { color: var(--muted); flex-shrink: 0; }
  .mp-input {
    flex: 1; border: none; outline: none; padding: 11px 0;
    font-size: 13.5px; font-weight: 500; color: var(--dark);
    background: transparent; font-family: var(--font);
  }
  .mp-input::placeholder { color: #b8cdd8; font-weight: 400; }
  .mp-textarea-wrap { border-radius: 11px; border: 1.5px solid var(--border); padding: 11px 13px; transition: all 0.18s; }
  .mp-textarea-wrap:focus-within { border-color: var(--p); box-shadow: 0 0 0 3px rgba(58,161,201,0.1); }
  .mp-textarea { resize: vertical; min-height: 72px; width: 100%; border: none; outline: none; font-size: 13.5px; font-weight: 500; color: var(--dark); background: transparent; font-family: var(--font); }
  .mp-textarea::placeholder { color: #b8cdd8; font-weight: 400; }

  /* Math preview */
  .mp-preview {
    background: rgba(58,161,201,0.06); border: 1px solid rgba(58,161,201,0.15);
    border-radius: 10px; padding: 11px 14px;
    font-size: 12.5px; color: var(--muted); font-weight: 500; line-height: 1.55;
  }
  .mp-preview strong { color: var(--dark); }

  .mp-modal-foot {
    padding: 16px 28px 24px; display: flex; gap: 10px;
    border-top: 1px solid var(--border);
    position: sticky; bottom: 0; background: white;
  }
  .mp-cancel-btn {
    padding: 12px 22px; border-radius: 11px; border: 1.5px solid var(--border);
    background: transparent; font-size: 13.5px; font-weight: 700;
    color: var(--muted); cursor: pointer; font-family: var(--font); transition: all 0.18s;
  }
  .mp-cancel-btn:hover { border-color: var(--dark); color: var(--dark); }
  .mp-submit-btn {
    flex: 1; padding: 13px; border-radius: 11px; border: none;
    background: var(--p); color: white;
    font-size: 14px; font-weight: 700; font-family: var(--font);
    cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px;
    transition: all 0.22s cubic-bezier(0.34,1.2,0.64,1);
  }
  .mp-submit-btn:hover:not(:disabled) { background: var(--dark); transform: translateY(-1px); box-shadow: 0 6px 20px rgba(58,161,201,0.3); }
  .mp-submit-btn:disabled { opacity: 0.55; cursor: not-allowed; }

  @media (max-width: 700px) {
    .mp { padding: 20px 16px; }
    .mp-form-row { grid-template-columns: 1fr; }
    .mp-modal { max-height: 100vh; border-radius: 22px 22px 0 0; align-self: flex-end; }
    .mp-grid { grid-template-columns: 1fr; }
  }
`;

/* ─── helpers ─── */
const money = (n) => Number(n || 0).toLocaleString(undefined, { maximumFractionDigits: 0 });
const calcLeft = (t, s) => Math.max(Number(t || 0) - Number(s || 0), 0);
const fmtDate = (d) => {
  if (!d) return "—";
  const dt = new Date(d);
  return isNaN(dt) ? "—" : dt.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
};

const EMPTY = {
  title: "", country: "", tuitionTotal: "", scholarshipAmount: "",
  deadline: "", qsRankText: "", universityLogoUrl: "", bannerImageUrl: "", description: "",
};

export default function ManagePrograms() {
  const [loading, setLoading]     = useState(true);
  const [err, setErr]             = useState("");
  const [saving, setSaving]       = useState(false);
  const [items, setItems]         = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm]           = useState(EMPTY);
  const [formErr, setFormErr]     = useState("");

  const fetchMine = async () => {
    setErr(""); setLoading(true);
    try {
      const res = await api.get("/programs/mine/list");
      setItems(res.data.programs || []);
    } catch (e) {
      setErr(e.response?.data?.message || "Failed to load your offers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchMine(); }, []);

  const onChange = (key) => (e) => setForm((prev) => ({ ...prev, [key]: e.target.value }));
  const reset = () => { setForm(EMPTY); setFormErr(""); };
  const openModal  = () => { reset(); setShowModal(true); };
  const closeModal = () => { setShowModal(false); reset(); };

  /* ── Create — same logic as original ── */
  const createOffer = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) { setFormErr("Offer title is required."); return; }
    setFormErr(""); setSaving(true);
    try {
      const payload = {
        title: form.title.trim(),
        country: form.country.trim(),
        tuitionTotal: Number(form.tuitionTotal || 0),
        scholarshipAmount: Number(form.scholarshipAmount || 0),
        deadline: form.deadline || null,
        qsRankText: form.qsRankText.trim(),
        universityLogoUrl: form.universityLogoUrl.trim(),
        bannerImageUrl: form.bannerImageUrl.trim(),
        description: form.description.trim(),
      };
      const res = await api.post("/programs", payload);
      setItems((prev) => [res.data.program, ...prev]);
      closeModal();
    } catch (e2) {
      setFormErr(e2.response?.data?.message || "Failed to create offer.");
    } finally {
      setSaving(false);
    }
  };

  /* ── Toggle — same logic as original ── */
  const toggleActive = async (id, nextVal) => {
    try {
      await api.patch(`/programs/${id}`, { isActive: nextVal });
      setItems((prev) => prev.map((p) => (p._id === id ? { ...p, isActive: nextVal } : p)));
    } catch (e) {
      alert(e.response?.data?.message || "Failed to update");
    }
  };

  /* ── Delete — same logic as original ── */
  const deleteOffer = async (id) => {
    if (!confirm("Delete this offer?")) return;
    try {
      await api.delete(`/programs/${id}`);
      setItems((prev) => prev.filter((p) => p._id !== id));
    } catch (e) {
      alert(e.response?.data?.message || "Failed to delete");
    }
  };

  const activeCount = useMemo(() => items.filter((x) => x.isActive).length, [items]);

  return (
    <div className="mp">
      <style>{css}</style>

      {/* ── HEADER ── */}
      <div className="mp-header">
        <div>
          <div className="mp-breadcrumb">University Portal · Programs</div>
          <h1 className="mp-title">Manage Offers</h1>
          <p className="mp-subtitle">Create and manage scholarship offers for students.</p>
        </div>
        <div className="mp-header-actions">
          <button className="mp-refresh-btn" onClick={fetchMine}>
            <RefreshCw size={14} strokeWidth={2} /> Refresh
          </button>
          <button className="mp-add-btn" onClick={openModal}>
            <Plus size={16} strokeWidth={2.5} /> Add Offer
          </button>
        </div>
      </div>

      {/* ── STATS ── */}
      <div className="mp-stats">
        <div className="mp-stat-card">
          <div className="mp-stat-icon blue"><BookOpen size={18} strokeWidth={1.8} /></div>
          <div><div className="mp-stat-val">{items.length}</div><div className="mp-stat-label">Total Offers</div></div>
        </div>
        <div className="mp-stat-card">
          <div className="mp-stat-icon green"><CheckCircle2 size={18} strokeWidth={1.8} /></div>
          <div><div className="mp-stat-val">{activeCount}</div><div className="mp-stat-label">Active</div></div>
        </div>
        <div className="mp-stat-card">
          <div className="mp-stat-icon orange"><EyeOff size={18} strokeWidth={1.8} /></div>
          <div><div className="mp-stat-val">{items.length - activeCount}</div><div className="mp-stat-label">Inactive</div></div>
        </div>
      </div>

      {/* ── ERROR ── */}
      {err && <div className="mp-error"><AlertCircle size={16} /> {err}</div>}

      {/* ── CONTENT ── */}
      {loading ? (
        <div className="mp-loading"><Loader2 size={22} className="spin" /> Loading offers…</div>
      ) : items.length === 0 ? (
        <div className="mp-empty">
          <div className="mp-empty-icon"><BookOpen size={28} strokeWidth={1.5} /></div>
          <div className="mp-empty-title">No offers yet</div>
          <div className="mp-empty-sub">Create your first scholarship offer so students can discover and apply to your programs.</div>
          <button className="mp-add-btn" onClick={openModal} style={{ marginTop: 0 }}>
            <Plus size={15} /> Create First Offer
          </button>
        </div>
      ) : (
        <div className="mp-grid">
          {items.map((p) => (
            <div className="mp-card" key={p._id}>
              {/* Banner */}
              <div className="mp-banner">
                {p.bannerImageUrl
                  ? <img src={p.bannerImageUrl} alt="banner" className="mp-banner-img"
                      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                      onError={(e) => { e.currentTarget.style.display = "none"; }} />
                  : <div className="mp-banner-grid" />
                }
                <div className={`mp-status-badge ${p.isActive ? "active" : "inactive"}`}>
                  {p.isActive ? <Eye size={10} /> : <EyeOff size={10} />}
                  {p.isActive ? "Active" : "Inactive"}
                </div>
                <div className="mp-card-logo">
                  {p.universityLogoUrl
                    ? <img src={p.universityLogoUrl} alt="logo" style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        onError={(e) => { e.currentTarget.style.display = "none"; }} />
                    : <span className="mp-card-logo-fb">{(p.universityName || "U")[0]}</span>
                  }
                </div>
              </div>

              {/* Card body */}
              <div className="mp-card-body">
                <div className="mp-card-univ">{p.universityName}</div>

                {p.qsRankText ? (
                  <div className="mp-card-qs">
                    <div className="mp-qs-dot">QS</div>
                    {p.qsRankText}
                  </div>
                ) : p.country ? (
                  <div className="mp-card-country">
                    <MapPin size={12} strokeWidth={2} /> {p.country}
                  </div>
                ) : null}

                <div className="mp-card-divider" />

                <div>
                  <div className="mp-card-offer-label">Provided Offer</div>
                  <div className="mp-card-offer-amount">${money(p.scholarshipAmount)} scholarship</div>
                  <div className="mp-card-offer-sub">
                    ${money(p.scholarshipAmount)} of ${money(p.tuitionTotal)} — student pays ≈ ${money(calcLeft(p.tuitionTotal, p.scholarshipAmount))}
                  </div>
                </div>

                <div className="mp-card-deadline">
                  <Calendar size={13} strokeWidth={2} />
                  Deadline: {fmtDate(p.deadline)}
                </div>

                <div className="mp-card-divider" />
                <div>
                  <div className="mp-card-title-label">Offer title</div>
                  <div className="mp-card-title-val">{p.title}</div>
                </div>
              </div>

              {/* Actions */}
              <div className="mp-card-actions">
                <button
                  className={`mp-toggle-btn ${p.isActive ? "is-active" : "is-inactive"}`}
                  onClick={() => toggleActive(p._id, !p.isActive)}
                >
                  {p.isActive ? <Eye size={13} /> : <EyeOff size={13} />}
                  {p.isActive ? "Active" : "Inactive"}
                </button>
                <button className="mp-del-btn" onClick={() => deleteOffer(p._id)} title="Delete">
                  <Trash2 size={15} strokeWidth={2} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ─────────────── CREATE MODAL ─────────────── */}
      {showModal && (
        <div className="mp-overlay" onClick={(e) => e.target === e.currentTarget && !saving && closeModal()}>
          <div className="mp-modal">

            {/* Header */}
            <div className="mp-modal-head">
              <div>
                <div className="mp-modal-icon"><Plus size={20} strokeWidth={2} /></div>
                <div className="mp-modal-title">Create New Offer</div>
                <div className="mp-modal-sub">Fill in the details to publish a scholarship offer.</div>
              </div>
              <button className="mp-modal-close" onClick={closeModal} disabled={saving}>
                <X size={16} />
              </button>
            </div>

            {/* Body */}
            <div className="mp-modal-body">
              {formErr && (
                <div className="mp-modal-err"><AlertCircle size={15} /> {formErr}</div>
              )}

              <form className="mp-form" id="offer-form" onSubmit={createOffer}>

                <div className="mp-section-sep">Basic Info</div>
                <div className="mp-form-row">
                  <div className="mp-field">
                    <label className="mp-label">Offer Title <span>*</span></label>
                    <div className="mp-input-wrap">
                      <BookOpen size={14} className="mp-input-icon" />
                      <input className="mp-input" placeholder="e.g. BSc Computer Science" value={form.title} onChange={onChange("title")} required />
                    </div>
                  </div>
                  <div className="mp-field">
                    <label className="mp-label">Location</label>
                    <div className="mp-input-wrap">
                      <Globe size={14} className="mp-input-icon" />
                      <input className="mp-input" placeholder="e.g. Kathmandu" value={form.country} onChange={onChange("country")} />
                    </div>
                  </div>
                </div>

                <div className="mp-section-sep">Financials</div>
                <div className="mp-form-row">
                  <div className="mp-field">
                    <label className="mp-label">Tuition Total ($)</label>
                    <div className="mp-input-wrap">
                      <DollarSign size={14} className="mp-input-icon" />
                      <input className="mp-input" type="number" min="0" placeholder="60000" value={form.tuitionTotal} onChange={onChange("tuitionTotal")} />
                    </div>
                  </div>
                  <div className="mp-field">
                    <label className="mp-label">Scholarship Amount ($)</label>
                    <div className="mp-input-wrap">
                      <Award size={14} className="mp-input-icon" />
                      <input className="mp-input" type="number" min="0" placeholder="45000" value={form.scholarshipAmount} onChange={onChange("scholarshipAmount")} />
                    </div>
                  </div>
                </div>

                {(form.tuitionTotal || form.scholarshipAmount) && (
                  <div className="mp-preview">
                    Scholarship: <strong>${money(form.scholarshipAmount)}</strong> of <strong>${money(form.tuitionTotal)}</strong>
                    {" · "}Student pays ≈ <strong>${money(calcLeft(form.tuitionTotal, form.scholarshipAmount))}</strong>
                  </div>
                )}

                <div className="mp-section-sep">Dates & Ranking</div>
                <div className="mp-form-row">
                  <div className="mp-field">
                    <label className="mp-label">Application Deadline</label>
                    <div className="mp-input-wrap">
                      <Calendar size={14} className="mp-input-icon" />
                      <input className="mp-input" type="date" value={form.deadline} onChange={onChange("deadline")} />
                    </div>
                  </div>
                  <div className="mp-field">
                    <label className="mp-label">QS / Ranking Text</label>
                    <div className="mp-input-wrap">
                      <Award size={14} className="mp-input-icon" />
                      <input className="mp-input" placeholder="e.g. #1" value={form.qsRankText} onChange={onChange("qsRankText")} />
                    </div>
                  </div>
                </div>

                <div className="mp-section-sep">Media URLs</div>
                <div className="mp-field">
                  <label className="mp-label">University Logo URL</label>
                  <div className="mp-input-wrap">
                    <Image size={14} className="mp-input-icon" />
                    <input className="mp-input" placeholder="https://..." value={form.universityLogoUrl} onChange={onChange("universityLogoUrl")} />
                  </div>
                </div>
                <div className="mp-field">
                  <label className="mp-label">Banner Image URL</label>
                  <div className="mp-input-wrap">
                    <Link2 size={14} className="mp-input-icon" />
                    <input className="mp-input" placeholder="https://..." value={form.bannerImageUrl} onChange={onChange("bannerImageUrl")} />
                  </div>
                </div>

                <div className="mp-section-sep">Offer Description</div>
                <div className="mp-field">
                  <label className="mp-label">Description</label>
                  <div className="mp-textarea-wrap">
                    <textarea
                      className="mp-textarea"
                      placeholder='e.g. "Full Scholarship, Accommodation, Stipend worth $1,200/month"'
                      value={form.description}
                      onChange={onChange("description")}
                      rows={3}
                    />
                  </div>
                </div>

              </form>
            </div>

            {/* Footer */}
            <div className="mp-modal-foot">
              <button className="mp-cancel-btn" onClick={closeModal} disabled={saving}>Cancel</button>
              <button className="mp-submit-btn" form="offer-form" type="submit" disabled={saving}>
                {saving
                  ? <><Loader2 size={15} className="spin" /> Creating…</>
                  : <><Plus size={15} /> Create Offer</>}
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}