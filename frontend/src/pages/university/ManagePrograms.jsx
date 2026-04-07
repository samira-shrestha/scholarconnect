import React, { useEffect, useMemo, useState } from "react";
import api from "../../api/axios";
import {
  Plus, X, Trash2, Eye, EyeOff, RefreshCw,
  BookOpen, Globe, DollarSign, Calendar, Award,
  Image, Link2, AlertCircle, CheckCircle2,
  Loader2, MapPin, IndianRupee, Edit
} from "lucide-react";

/* ─────────────────────────────────────────────
   CSS
───────────────────────────────────────────── */


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
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [saving, setSaving] = useState(false);
  const [items, setItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(EMPTY);
  const [formErr, setFormErr] = useState("");
  const [editingId, setEditingId] = useState(null);

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
  const openModal = () => { reset(); setShowModal(true); };
  const closeModal = () => { setShowModal(false); reset(); setEditingId(null); };

  const openEditModal = (prog) => {
    setForm({
      title: prog.title || "",
      country: prog.country || "",
      tuitionTotal: prog.tuitionTotal || "",
      scholarshipAmount: prog.scholarshipAmount || "",
      deadline: prog.deadline ? new Date(prog.deadline).toISOString().split('T')[0] : "",
      qsRankText: prog.qsRankText || "",
      universityLogoUrl: prog.universityLogoUrl || "",
      bannerImageUrl: prog.bannerImageUrl || "",
      description: prog.description || "",
    });
    setEditingId(prog._id);
    setShowModal(true);
  };

  /* ── Submit (Create & Update) ── */
  const submitOffer = async (e) => {
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
      
      if (editingId) {
        const res = await api.put(`/programs/${editingId}`, payload);
        setItems((prev) => prev.map((p) => (p._id === editingId ? res.data.program : p)));
      } else {
        const res = await api.post("/programs", payload);
        setItems((prev) => [res.data.program, ...prev]);
      }
      closeModal();
    } catch (e2) {
      setFormErr(e2.response?.data?.message || (editingId ? "Failed to update offer." : "Failed to create offer."));
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

              <div className="mp-card-actions">
                <button
                  className={`mp-toggle-btn ${p.isActive ? "is-active" : "is-inactive"}`}
                  onClick={() => toggleActive(p._id, !p.isActive)}
                >
                  {p.isActive ? <Eye size={13} /> : <EyeOff size={13} />}
                  {p.isActive ? "Active" : "Inactive"}
                </button>
                <button className="mp-edit-btn" onClick={() => openEditModal(p)} title="Edit">
                  <Edit size={15} strokeWidth={2} />
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
                <div className="mp-modal-title">{editingId ? "Edit Offer" : "Create New Offer"}</div>
                <div className="mp-modal-sub">{editingId ? "Update the details of your scholarship offer." : "Fill in the details to publish a scholarship offer."}</div>
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

              <form className="mp-form" id="offer-form" onSubmit={submitOffer}>

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
                      <IndianRupee size={14} className="mp-input-icon" />
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
                  ? <><Loader2 size={15} className="spin" /> {editingId ? "Saving…" : "Creating…"}</>
                  : editingId ? <><Edit size={15} /> Save Changes</> : <><Plus size={15} /> Create Offer</>}
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}