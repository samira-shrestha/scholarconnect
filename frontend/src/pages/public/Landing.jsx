import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  GraduationCap, Building2, ArrowRight, CheckCircle2,
  Zap, Globe, ShieldCheck, BarChart3, Bell, FileText,
  Star, ChevronRight, Menu, X, BookOpen, Users, Award,
  Search, Send, TrendingUp, Lock, LogIn, UserPlus,
} from "lucide-react";


function HeroIllustration() {
  return (
    <svg
      viewBox="0 0 520 480"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", maxWidth: 520, height: "auto" }}
      aria-hidden="true"
    >
      {/* Background soft blobs */}
      <ellipse cx="260" cy="420" rx="200" ry="40" fill="#3aa1c9" fillOpacity="0.07" />
      <circle cx="380" cy="120" r="90" fill="#81C5A6" fillOpacity="0.12" />
      <circle cx="110" cy="200" r="70" fill="#3aa1c9" fillOpacity="0.09" />

      {/* Ground / platform */}
      <ellipse cx="220" cy="420" rx="130" ry="18" fill="#3aa1c9" fillOpacity="0.13" />

      {/* Student figure */}
      {/* Body */}
      <rect x="178" y="300" width="84" height="100" rx="20" fill="#3aa1c9" />
      {/* Shirt collar detail */}
      <path d="M220 300 L205 320 L220 312 L235 320 Z" fill="#2a8ab0" />
      {/* Legs */}
      <rect x="187" y="388" width="24" height="40" rx="8" fill="#0d2d3f" />
      <rect x="228" y="388" width="24" height="40" rx="8" fill="#0d2d3f" />
      {/* Shoes */}
      <rect x="182" y="420" width="32" height="14" rx="6" fill="#1a2e38" />
      <rect x="226" y="420" width="32" height="14" rx="6" fill="#1a2e38" />
      {/* Arms */}
      <rect x="148" y="308" width="32" height="18" rx="9" fill="#3aa1c9" transform="rotate(-20 148 308)" />
      <rect x="262" y="305" width="32" height="18" rx="9" fill="#3aa1c9" transform="rotate(15 262 305)" />
      {/* Head */}
      <circle cx="220" cy="275" r="38" fill="#fddbb4" />
      {/* Hair */}
      <path d="M183 265 Q185 238 220 235 Q255 238 257 265 Q248 252 220 250 Q192 252 183 265Z" fill="#2d1b0e" />
      {/* Eyes */}
      <circle cx="208" cy="272" r="4" fill="#2d1b0e" />
      <circle cx="232" cy="272" r="4" fill="#2d1b0e" />
      <circle cx="210" cy="270" r="1.5" fill="white" />
      <circle cx="234" cy="270" r="1.5" fill="white" />
      {/* Smile */}
      <path d="M210 283 Q220 292 230 283" stroke="#c4825a" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      {/* Graduation cap */}
      <rect x="196" y="238" width="48" height="8" rx="3" fill="#0d2d3f" />
      <polygon points="220,218 248,234 220,234 192,234" fill="#0d2d3f" />
      <line x1="248" y1="234" x2="255" y2="255" stroke="#81C5A6" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="255" cy="258" r="4" fill="#81C5A6" />
      {/* Laptop in hands */}
      <rect x="175" y="340" width="90" height="56" rx="8" fill="#e8f4f8" stroke="#3aa1c9" strokeWidth="1.5" />
      <rect x="180" y="345" width="80" height="42" rx="5" fill="#d0eaf5" />
      {/* Laptop screen content - mini UI */}
      <rect x="185" y="350" width="30" height="4" rx="2" fill="#3aa1c9" fillOpacity="0.7" />
      <rect x="185" y="358" width="50" height="3" rx="1.5" fill="#81C5A6" fillOpacity="0.6" />
      <rect x="185" y="364" width="40" height="3" rx="1.5" fill="#3aa1c9" fillOpacity="0.4" />
      <rect x="185" y="370" width="25" height="8" rx="4" fill="#3aa1c9" />
      <rect x="215" y="370" width="25" height="8" rx="4" fill="#81C5A6" />
      {/* Laptop base */}
      <rect x="165" y="394" width="110" height="8" rx="4" fill="#b8d8e8" />

      {/* Floating card: Match Found */}
      <g style={{ filter: "drop-shadow(0 8px 20px rgba(58,161,201,0.18))" }}>
        <rect x="318" y="200" width="155" height="72" rx="14" fill="white" />
        <rect x="318" y="200" width="155" height="72" rx="14" stroke="#3aa1c9" strokeWidth="1.2" strokeOpacity="0.3" />
        <circle cx="340" cy="226" r="12" fill="#e8f5f0" />
        {/* checkmark in circle */}
        <path d="M334 226 L338 230 L346 222" stroke="#81C5A6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="358" y="218" width="80" height="7" rx="3.5" fill="#0d2d3f" fillOpacity="0.85" />
        <rect x="358" y="229" width="55" height="5" rx="2.5" fill="#5a7a89" fillOpacity="0.5" />
        <rect x="330" y="248" width="52" height="13" rx="6.5" fill="#3aa1c9" />
        <rect x="388" y="248" width="52" height="13" rx="6.5" fill="#f0f8fc" stroke="#3aa1c9" strokeWidth="1" />
      </g>
      <animateTransform
        xlinkHref="[object SVGAnimatedRect]"
        attributeName="transform"
        type="translate"
        values="0 0; 0 -6; 0 0"
        dur="3.2s"
        repeatCount="indefinite"
      />

      {/* Floating card: college badge */}
      <g style={{ filter: "drop-shadow(0 6px 16px rgba(13,45,63,0.12))" }}>
        <rect x="22" y="148" width="138" height="66" rx="14" fill="white" />
        <rect x="22" y="148" width="138" height="66" rx="14" stroke="#81C5A6" strokeWidth="1.2" strokeOpacity="0.4" />
        <rect x="34" y="160" width="22" height="22" rx="8" fill="#e8f5f0" />
        {/* building icon lines */}
        <rect x="38" y="170" width="4" height="10" rx="1" fill="#81C5A6" />
        <rect x="44" y="166" width="4" height="14" rx="1" fill="#81C5A6" />
        <rect x="50" y="163" width="4" height="17" rx="1" fill="#3aa1c9" />
        <rect x="62" y="162" width="68" height="6" rx="3" fill="#0d2d3f" fillOpacity="0.8" />
        <rect x="62" y="172" width="48" height="5" rx="2.5" fill="#5a7a89" fillOpacity="0.5" />
        <rect x="34" y="190" width="116" height="14" rx="7" fill="#f0f8fc" />
        <rect x="34" y="190" width="60" height="14" rx="7" fill="#81C5A6" fillOpacity="0.25" />
        <rect x="36" y="193" width="34" height="8" rx="4" fill="#81C5A6" />
      </g>

      {/* Floating card: Progress pill */}
      <g style={{ filter: "drop-shadow(0 4px 12px rgba(58,161,201,0.15))" }}>
        <rect x="340" y="110" width="140" height="52" rx="26" fill="white" />
        <rect x="340" y="110" width="140" height="52" rx="26" stroke="#3aa1c9" strokeWidth="1.2" strokeOpacity="0.25" />
        <circle cx="366" cy="136" r="16" fill="#e8f4fa" />
        {/* trend up lines */}
        <polyline points="356,142 362,136 366,140 376,128" stroke="#3aa1c9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <rect x="390" y="127" width="56" height="7" rx="3.5" fill="#0d2d3f" fillOpacity="0.8" />
        <rect x="390" y="138" width="38" height="5" rx="2.5" fill="#3aa1c9" fillOpacity="0.45" />
      </g>

      {/* Connection arcs between student and cards */}
      <path d="M262 350 Q310 330 318 250" stroke="#3aa1c9" strokeWidth="1.5" strokeDasharray="5 4" strokeOpacity="0.35" fill="none" />
      <path d="M178 340 Q130 300 100 214" stroke="#81C5A6" strokeWidth="1.5" strokeDasharray="5 4" strokeOpacity="0.35" fill="none" />
      <path d="M248 270 Q310 220 340 152" stroke="#3aa1c9" strokeWidth="1.5" strokeDasharray="5 4" strokeOpacity="0.25" fill="none" />

      {/* Floating dots decoration */}
      <circle cx="308" cy="180" r="5" fill="#3aa1c9" fillOpacity="0.4" />
      <circle cx="295" cy="162" r="3" fill="#81C5A6" fillOpacity="0.5" />
      <circle cx="168" cy="140" r="4" fill="#3aa1c9" fillOpacity="0.3" />
      <circle cx="420" cy="320" r="6" fill="#81C5A6" fillOpacity="0.3" />
      <circle cx="440" cy="295" r="3.5" fill="#3aa1c9" fillOpacity="0.25" />
      <circle cx="80" cy="300" r="5" fill="#81C5A6" fillOpacity="0.3" />

      {/* Animated floating ring */}
      <circle cx="220" cy="236" r="52" stroke="#3aa1c9" strokeWidth="1" strokeOpacity="0.15" strokeDasharray="8 6" fill="none">
        <animateTransform attributeName="transform" type="rotate" values="0 220 236; 360 220 236" dur="18s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}


/* DATA */
const WHY = [
  { Icon: Search, title: "Smart Matching", desc: "Our system matches students to programs based on academic profile, goals, and budget — no guessing involved." },
  { Icon: Zap, title: "Fast Applications", desc: "Apply to multiple college in minutes. One profile, one process, zero repetition across forms." },
  { Icon: Award, title: "Verified Programs", desc: "Every listing is verified directly from partner institutions, ensuring accurate requirements and deadlines." },
  { Icon: TrendingUp, title: "Transparent Process", desc: "See eligibility, costs, and deadlines clearly before you apply. No surprises, no hidden fees." },
  { Icon: Globe, title: "Global Reach", desc: "Access programs from college across the world — all connected in one unified platform." },
  { Icon: Users, title: "Dedicated Support", desc: "Students and college both receive ongoing guidance throughout the entire application journey." },
];

const SOLUTIONS = [
  { Icon: FileText, title: "Centralized Applications", desc: "Manage all your college applications from a single, beautifully organized dashboard.", alt: false },
  { Icon: Bell, title: "Real-time Notifications", desc: "Get instant alerts when college view, shortlist, or respond to your application.", alt: false },
  { Icon: BarChart3, title: "college Analytics", desc: "Institutions gain powerful insights into applicant quality, program demand, and conversion.", alt: true },
  { Icon: Lock, title: "Secure Document Sharing", desc: "Safely upload and share transcripts and supporting documents with verified institutions.", alt: true },
];

const STEPS = [
  { Icon: UserPlus, text: "Create your student profile" },
  { Icon: Search, text: "Browse & filter programs" },
  { Icon: Send, text: "Submit applications instantly" },
  { Icon: CheckCircle2, text: "Receive & compare offers" },
];

const TESTIMONIALS = [
  {
    name: "Samira Shrestha", role: "Computer Science Student",
    quote: "ScholarConnect made finding the right program so much easier. I applied to five college in one afternoon — something that would have taken me weeks before.",
    color: "#3aa1c9", initials: "SS", stars: 5,
  },
  {
    name: "Surendra Subedi", role: "Principal, KMC",
    quote: "As a principal, this platform has transformed our workflow. We now receive far better-matched applicants and spend less time on administration.",
    color: "#81C5A6", initials: "SS", stars: 5,
  },
  {
    name: "Kanchan Thapa", role: "Business Administration Student",
    quote: "I was completely overwhelmed by my options until ScholarConnect matched me to programs I actually qualify for. The whole experience felt tailored to me.",
    color: "#5b9dc9", initials: "KT", stars: 4,
  },
];

export default function Landing() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Close menu on resize
  useEffect(() => {
    const close = () => setMenuOpen(false);
    window.addEventListener("resize", close);
    return () => window.removeEventListener("resize", close);
  }, []);

  return (
    <div className="sc">


      {/* NAV */}
      <nav className="sc-nav">
        <Link className="sc-logo" to="/">
          <div className="sc-logo-mark">
            <GraduationCap size={35} color="#3AA1C9" strokeWidth={2.5} />
          </div>
          Scholar<span>Connect</span>
        </Link>

        <div className="sc-nav-center">
          <a className="sc-nav-item" href="#why">Why Us</a>
          <a className="sc-nav-item" href="#solutions">Solutions</a>
          <a className="sc-nav-item" href="#testimonials">Testimonials</a>
        </div>

        <div className="sc-nav-right">
          <Link className="sc-nav-link ghost" to="/login">
            <LogIn size={14} /> Login
          </Link>
          <Link className="sc-nav-link filled" to="/register">
            Get Started <ChevronRight size={14} />
          </Link>
        </div>

        <button className="sc-hamburger" onClick={() => setMenuOpen(o => !o)} aria-label="Toggle menu">
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {menuOpen && (
        <div className="sc-mobile-menu" onClick={() => setMenuOpen(false)}>
          <a className="sc-mobile-link" href="#why"><BookOpen size={16} /> Why Us</a>
          <a className="sc-mobile-link" href="#solutions"><Zap size={16} /> Solutions</a>
          <a className="sc-mobile-link" href="#testimonials"><Star size={16} /> Testimonials</a>
          <Link className="sc-mobile-link" to="/login"><LogIn size={16} /> Login</Link>
          <Link className="sc-mobile-link cta" to="/register"><UserPlus size={16} /> Get Started Free</Link>
        </div>
      )}

      {/* HERO */}
      <section className="sc-hero">
        <div className="sc-hero-left">
          <div className="sc-eyebrow">
            <span className="sc-eyebrow-dot" />
            Now open for applications
          </div>

          <h1 className="sc-h1">
            Your future,<br />
            <span className="line2">scholarships</span><br />
            <span className="line3">&amp; dream programs.</span>
          </h1>

          <p className="sc-hero-desc">
            ScholarConnect bridges ambitious students with the world's best college.
            Browse programs, apply in minutes, and let the right institutions find you.
          </p>

          <div className="sc-ctas">
            <Link className="sc-btn sc-btn-p" to="/student/register">
              Start for Free <ArrowRight size={15} />
            </Link>
            <Link className="sc-btn sc-btn-o" to="/college/register">
              For college
            </Link>
          </div>

          <div className="sc-stats">
            <div className="sc-stat">
              <div className="sc-stat-n">100+</div>
              <div className="sc-stat-l">Programs Listed</div>
            </div>
            <div className="sc-stat">
              <div className="sc-stat-n">50+</div>
              <div className="sc-stat-l">Colleges</div>
            </div>
            <div className="sc-stat">
              <div className="sc-stat-n">94%</div>
              <div className="sc-stat-l">Success Rate</div>
            </div>
          </div>

          {/* Portal cards below stats */}
          <div className="sc-portal-row">
            <div className="sc-portal student">
              <div className="sc-portal-icon-wrap">
                <GraduationCap size={22} strokeWidth={2} />
              </div>
              <div className="sc-portal-title">I'm a Student</div>
              <p className="sc-portal-desc">Browse scholarships, compare programs, and apply worldwide from one place.</p>
              <div className="sc-portal-actions">
                <Link className="sc-btn sc-btn-p sc-btn-sm" to="/student/login">
                  <LogIn size={13} /> Log In
                </Link>
                <Link className="sc-btn sc-btn-o sc-btn-sm" to="/student/register">Register</Link>
              </div>
            </div>

            <div className="sc-portal univ">
              <div className="sc-portal-icon-wrap">
                <Building2 size={22} strokeWidth={2} />
              </div>
              <div className="sc-portal-title">I'm a College</div>
              <p className="sc-portal-desc">Review applications, manage programs, and discover great students.</p>
              <div className="sc-portal-actions">
                <Link className="sc-btn sc-btn-s sc-btn-sm" to="/college/login">
                  <LogIn size={13} /> Log In
                </Link>
                <Link className="sc-btn sc-btn-o sc-btn-sm" to="/college/register">Register</Link>
              </div>
            </div>
          </div>
        </div>

        {/* ILLUSTRATION */}
        <div className="sc-hero-right">
          <HeroIllustration />
        </div>
      </section>

      {/* WHY US */}
      <section className="sc-why" id="why">
        <div className="sc-wrap">
          <div className="sc-why-head">
            <div className="sc-tag"><CheckCircle2 size={13} /> Why ScholarConnect</div>
            <h2 className="sc-h2">The smarter way to <b>find your program</b></h2>
            <p className="sc-sub">
              We eliminate the guesswork from applying abroad. No more endless browsing,
              no mismatched applications — just clarity, confidence, and the right fit.
            </p>
          </div>
          <div className="sc-why-grid">
            {WHY.map(({ Icon, title, desc }) => (
              <div className="sc-wcard" key={title}>
                <div className="sc-wcard-icon"><Icon size={22} strokeWidth={1.8} /></div>
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SOLUTIONS */}
      <section className="sc-sol" id="solutions">
        <div className="sc-wrap">
          <div className="sc-sol-grid">
            <div>
              <div className="sc-tag"><Zap size={13} /> Our Solutions</div>
              <h2 className="sc-h2">Everything you need, <b>in one place</b></h2>
              <p className="sc-sub">
                Whether you're a student chasing a scholarship or a college recruiting top talent,
                ScholarConnect gives you the tools to move faster and decide smarter.
              </p>
              <div className="sc-sol-list">
                {SOLUTIONS.map(({ Icon, title, desc, alt }) => (
                  <div className={`sc-sol-item${alt ? " alt" : ""}`} key={title}>
                    <div className="sc-sol-icon"><Icon size={18} strokeWidth={1.8} /></div>
                    <div className="sc-sol-body">
                      <h4>{title}</h4>
                      <p>{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="sc-sol-panel">
              <div style={{ position: "relative", zIndex: 2 }}>
                <div className="sc-panel-tag">How it works</div>
                <div className="sc-panel-title">From profile to enrolled</div>
                <div className="sc-panel-sub">Your application journey in 4 simple steps</div>
              </div>
              <div className="sc-steps-list">
                {STEPS.map(({ Icon, text }, i) => (
                  <div className="sc-step" key={text}>
                    <div className="sc-step-n">{i + 1}</div>
                    <Icon size={15} className="sc-step-icon" strokeWidth={1.8} />
                    <div className="sc-step-text">{text}</div>
                  </div>
                ))}
              </div>
              <div className="sc-panel-cta">
                <Link className="sc-btn sc-btn-s" to="/student/register">
                  Start Now <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="sc-testi" id="testimonials">
        <div className="sc-wrap">
          <div className="sc-testi-head">
            <div className="sc-tag"><Star size={13} /> Testimonials</div>
            <h2 className="sc-h2">Loved by <b>students &amp; college</b></h2>
            <p className="sc-sub">
              Thousands of students have found their dream programs and college have discovered
              outstanding talent — all through ScholarConnect.
            </p>
          </div>
          <div className="sc-tgrid">
            {TESTIMONIALS.map((t) => (
              <div className="sc-tcard" key={t.name}>
                <div className="sc-tcard-stars">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={14} fill={i < t.stars ? "#f5a623" : "none"} strokeWidth={i < t.stars ? 0 : 1.5} />
                  ))}
                </div>
                <p className="sc-tcard-quote">{t.quote}</p>
                <div className="sc-tcard-author">
                  <div className="sc-tcard-avatar" style={{ background: t.color }}>{t.initials}</div>
                  <div>
                    <div className="sc-tcard-name">{t.name}</div>
                    <div className="sc-tcard-role">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BAND */}
      <div className="sc-cta-wrap">
        <div className="sc-cta">
          <div className="sc-cta-inner-bg" />
          <div className="sc-cta-left">
            <div className="sc-cta-tag">Get started today</div>
            <div className="sc-cta-title">
              Ready to find your <span>perfect match?</span>
            </div>
            <div className="sc-cta-sub">
              Join thousands of students already discovering their path.
            </div>
          </div>
          <div className="sc-cta-btns">
            <Link className="sc-btn sc-btn-white" to="/student/register">
              <UserPlus size={15} /> Start as a Student
            </Link>
            <Link className="sc-btn sc-btn-ghost-w" to="/college/register">
              <Building2 size={15} /> List Your College
            </Link>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="sc-footer">
        <div className="sc-footer-logo">
          <div className="sc-logo-mark" style={{ width: 26, height: 26, borderRadius: 7 }}>
            <GraduationCap size={14} color="white" strokeWidth={2.5} />
          </div>
          Scholar<span>Connect</span>
        </div>
        <div className="sc-footer-copy">
          © {new Date().getFullYear()} ScholarConnect. All rights reserved.
        </div>
      </footer>
    </div>
  );
}