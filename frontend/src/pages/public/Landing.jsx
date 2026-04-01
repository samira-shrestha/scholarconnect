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
      {/* ── Background soft blobs ── */}
      <ellipse cx="260" cy="420" rx="200" ry="40" fill="#3aa1c9" fillOpacity="0.07" />
      <circle cx="380" cy="120" r="90" fill="#81C5A6" fillOpacity="0.12" />
      <circle cx="110" cy="200" r="70" fill="#3aa1c9" fillOpacity="0.09" />

      {/* ── Ground / platform ── */}
      <ellipse cx="220" cy="420" rx="130" ry="18" fill="#3aa1c9" fillOpacity="0.13" />

      {/* ── Student figure ── */}
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

      {/* ── Floating card: Match Found ── */}
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

      {/* ── Floating card: University badge ── */}
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

      {/* ── Floating card: Progress pill ── */}
      <g style={{ filter: "drop-shadow(0 4px 12px rgba(58,161,201,0.15))" }}>
        <rect x="340" y="110" width="140" height="52" rx="26" fill="white" />
        <rect x="340" y="110" width="140" height="52" rx="26" stroke="#3aa1c9" strokeWidth="1.2" strokeOpacity="0.25" />
        <circle cx="366" cy="136" r="16" fill="#e8f4fa" />
        {/* trend up lines */}
        <polyline points="356,142 362,136 366,140 376,128" stroke="#3aa1c9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <rect x="390" y="127" width="56" height="7" rx="3.5" fill="#0d2d3f" fillOpacity="0.8" />
        <rect x="390" y="138" width="38" height="5" rx="2.5" fill="#3aa1c9" fillOpacity="0.45" />
      </g>

      {/* ── Connection arcs between student and cards ── */}
      <path d="M262 350 Q310 330 318 250" stroke="#3aa1c9" strokeWidth="1.5" strokeDasharray="5 4" strokeOpacity="0.35" fill="none" />
      <path d="M178 340 Q130 300 100 214" stroke="#81C5A6" strokeWidth="1.5" strokeDasharray="5 4" strokeOpacity="0.35" fill="none" />
      <path d="M248 270 Q310 220 340 152" stroke="#3aa1c9" strokeWidth="1.5" strokeDasharray="5 4" strokeOpacity="0.25" fill="none" />

      {/* ── Floating dots decoration ── */}
      <circle cx="308" cy="180" r="5" fill="#3aa1c9" fillOpacity="0.4" />
      <circle cx="295" cy="162" r="3" fill="#81C5A6" fillOpacity="0.5" />
      <circle cx="168" cy="140" r="4" fill="#3aa1c9" fillOpacity="0.3" />
      <circle cx="420" cy="320" r="6" fill="#81C5A6" fillOpacity="0.3" />
      <circle cx="440" cy="295" r="3.5" fill="#3aa1c9" fillOpacity="0.25" />
      <circle cx="80" cy="300" r="5" fill="#81C5A6" fillOpacity="0.3" />

      {/* ── Animated floating ring ── */}
      <circle cx="220" cy="236" r="52" stroke="#3aa1c9" strokeWidth="1" strokeOpacity="0.15" strokeDasharray="8 6" fill="none">
        <animateTransform attributeName="transform" type="rotate" values="0 220 236; 360 220 236" dur="18s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}

/* ── CSS ── */
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,400&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --p: #3aa1c9;
    --s: #81C5A6;
    --dark: #0d2d3f;
    --text: #1a2e38;
    --muted: #5a7a89;
    --bg: #f2f9fc;
    --bg2: #eaf6f0;
    --card: #ffffff;
    --border: rgba(58,161,201,0.15);
    --r: 18px;
    --shadow: 0 4px 24px rgba(13,45,63,0.08);
    --shadow-lg: 0 16px 48px rgba(13,45,63,0.12);
    --font: 'Montserrat', sans-serif;
  }

  html { scroll-behavior: smooth; }
  body { overflow-x: hidden; }

  .sc {
    font-family: var(--font);
    background: #fff;
    color: var(--text);
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
  }

  /* ────────── NAV ────────── */
  .sc-nav {
    position: sticky; top: 0; z-index: 200;
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 6vw; height: 68px;
    background: rgba(255,255,255,0.94);
    backdrop-filter: blur(20px) saturate(1.5);
    border-bottom: 1px solid var(--border);
  }
  .sc-logo {
    font-size: 19px; font-weight: 900; color: var(--dark);
    letter-spacing: -0.6px; text-decoration: none; display: flex; align-items: center; gap: 8px;
  }
  .sc-logo-mark {
    width: 32px; height: 32px; border-radius: 9px;
    background: linear-gradient(135deg, var(--p), var(--s));
    display: flex; align-items: center; justify-content: center;
  }
  .sc-logo span { color: var(--p); }
  .sc-nav-center { display: flex; gap: 4px; }
  .sc-nav-item {
    padding: 7px 16px; border-radius: 8px;
    font-size: 13px; font-weight: 600; color: var(--muted);
    text-decoration: none; transition: all 0.18s ease;
    letter-spacing: 0.1px;
  }
  .sc-nav-item:hover { color: var(--dark); background: var(--bg); }
  .sc-nav-right { display: flex; gap: 8px; align-items: center; }
  .sc-nav-link {
    padding: 8px 18px; border-radius: 10px;
    font-size: 13px; font-weight: 700; text-decoration: none;
    transition: all 0.2s ease; font-family: var(--font);
    display: flex; align-items: center; gap: 6px;
  }
  .sc-nav-link.ghost { color: var(--dark); border: 1.5px solid rgba(58,161,201,0.3); }
  .sc-nav-link.ghost:hover { border-color: var(--p); color: var(--p); }
  .sc-nav-link.filled { background: var(--p); color: white; border: 1.5px solid var(--p); }
  .sc-nav-link.filled:hover { background: var(--dark); border-color: var(--dark); transform: translateY(-1px); box-shadow: 0 4px 14px rgba(58,161,201,0.3); }
  .sc-hamburger { display: none; background: none; border: none; cursor: pointer; padding: 6px; color: var(--dark); }

  /* ────────── HERO ────────── */
  .sc-hero {
    min-height: calc(100vh - 68px);
    display: grid; grid-template-columns: 1fr 1fr;
    align-items: center; gap: 24px;
    padding: 60px 6vw 60px;
    background: linear-gradient(145deg, #f2f9fc 0%, #eaf6f0 55%, #f2f9fc 100%);
    position: relative; overflow: hidden;
  }
  /* Subtle grid texture */
  .sc-hero::before {
    content: '';
    position: absolute; inset: 0;
    background-image:
      linear-gradient(rgba(58,161,201,0.05) 1px, transparent 1px),
      linear-gradient(90deg, rgba(58,161,201,0.05) 1px, transparent 1px);
    background-size: 40px 40px;
    pointer-events: none;
  }
  .sc-hero-left { position: relative; z-index: 2; }
  .sc-hero-right { position: relative; z-index: 2; display: flex; justify-content: center; }

  .sc-eyebrow {
    display: inline-flex; align-items: center; gap: 8px;
    background: rgba(58,161,201,0.08); border: 1px solid rgba(58,161,201,0.22);
    padding: 6px 14px; border-radius: 100px;
    font-size: 11px; font-weight: 700; color: var(--p);
    letter-spacing: 1.2px; text-transform: uppercase; margin-bottom: 22px;
  }
  .sc-eyebrow-dot {
    width: 6px; height: 6px; background: var(--s); border-radius: 50%;
    animation: blink 2.4s ease-in-out infinite;
  }
  @keyframes blink { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.4;transform:scale(1.6)} }

  .sc-h1 {
    font-size: clamp(36px, 4.8vw, 64px); font-weight: 900;
    line-height: 1.06; letter-spacing: -2px; color: var(--dark);
    margin-bottom: 22px;
  }
  .sc-h1 .line2 { color: var(--p); }
  .sc-h1 .line3 { color: var(--s); }

  .sc-hero-desc {
    font-size: 15.5px; font-weight: 400; color: var(--muted);
    line-height: 1.75; max-width: 440px; margin-bottom: 36px;
  }

  .sc-ctas { display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 48px; }
  .sc-btn {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 13px 26px; border-radius: 12px;
    font-size: 14px; font-weight: 700; text-decoration: none;
    transition: all 0.22s cubic-bezier(0.34,1.56,0.64,1);
    font-family: var(--font); cursor: pointer; border: none; line-height: 1;
  }
  .sc-btn-p { background: var(--p); color: white; }
  .sc-btn-p:hover { background: var(--dark); transform: translateY(-2px); box-shadow: 0 8px 24px rgba(58,161,201,0.35); }
  .sc-btn-o { background: transparent; color: var(--p); border: 2px solid var(--p); }
  .sc-btn-o:hover { background: var(--p); color: white; transform: translateY(-2px); }
  .sc-btn-s { background: var(--s); color: white; }
  .sc-btn-s:hover { background: #6ab891; transform: translateY(-2px); box-shadow: 0 8px 20px rgba(129,197,166,0.38); }
  .sc-btn-dark { background: var(--dark); color: white; }
  .sc-btn-dark:hover { background: var(--p); transform: translateY(-2px); }
  .sc-btn-sm { padding: 9px 18px; font-size: 13px; }
  .sc-btn-ghost-w { background: rgba(255,255,255,0.12); color: white; border: 1.5px solid rgba(255,255,255,0.3); }
  .sc-btn-ghost-w:hover { background: rgba(255,255,255,0.2); transform: translateY(-2px); }

  .sc-stats { display: flex; gap: 0; align-items: stretch; }
  .sc-stat { padding: 0 24px 0 0; }
  .sc-stat:not(:last-child) { border-right: 1px solid rgba(58,161,201,0.2); margin-right: 24px; }
  .sc-stat-n { font-size: 28px; font-weight: 900; color: var(--p); letter-spacing: -1.5px; line-height: 1; }
  .sc-stat-l { font-size: 12px; font-weight: 500; color: var(--muted); margin-top: 4px; }

  /* ────────── PORTAL CARDS ────────── */
  .sc-portal-row {
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 20px; margin-top: 32px;
  }
  .sc-portal {
    background: var(--card); border-radius: 20px; padding: 28px 24px;
    border: 1.5px solid var(--border);
    box-shadow: var(--shadow);
    transition: transform 0.28s cubic-bezier(0.34,1.3,0.64,1), box-shadow 0.28s ease;
    position: relative; overflow: hidden;
  }
  .sc-portal::before {
    content: ''; position: absolute; inset: 0; border-radius: 20px;
    background: linear-gradient(135deg, transparent 60%, rgba(58,161,201,0.04) 100%);
    pointer-events: none;
  }
  .sc-portal:hover { transform: translateY(-5px); box-shadow: var(--shadow-lg); }
  .sc-portal-icon-wrap {
    width: 46px; height: 46px; border-radius: 13px; margin-bottom: 14px;
    display: flex; align-items: center; justify-content: center;
  }
  .sc-portal.student .sc-portal-icon-wrap { background: rgba(58,161,201,0.1); color: var(--p); }
  .sc-portal.univ .sc-portal-icon-wrap { background: rgba(129,197,166,0.15); color: var(--s); }
  .sc-portal-title { font-size: 16px; font-weight: 800; color: var(--dark); margin-bottom: 7px; }
  .sc-portal-desc { font-size: 13px; color: var(--muted); line-height: 1.55; margin-bottom: 18px; font-weight: 400; }
  .sc-portal-actions { display: flex; gap: 8px; }

  /* ────────── SECTIONS SHARED ────────── */
  .sc-wrap { max-width: 1200px; margin: 0 auto; padding: 0 6vw; }
  .sc-tag {
    display: inline-flex; align-items: center; gap: 6px;
    font-size: 11px; font-weight: 700; letter-spacing: 1.8px;
    text-transform: uppercase; color: var(--s); margin-bottom: 14px;
  }
  .sc-h2 {
    font-size: clamp(26px, 3.2vw, 42px); font-weight: 900;
    letter-spacing: -1.2px; line-height: 1.1; color: var(--dark); margin-bottom: 14px;
  }
  .sc-h2 b { color: var(--p); font-weight: 900; }
  .sc-sub {
    font-size: 15px; color: var(--muted); line-height: 1.72;
    max-width: 520px; font-weight: 400;
  }

  /* ────────── WHY US ────────── */
  .sc-why { background: linear-gradient(160deg, var(--bg) 0%, var(--bg2) 100%); padding: 100px 0; }
  .sc-why-head { text-align: center; margin-bottom: 56px; }
  .sc-why-head .sc-sub { margin: 0 auto; }
  .sc-why-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
  .sc-wcard {
    background: var(--card); border-radius: var(--r); padding: 36px 28px;
    border: 1.5px solid var(--border); box-shadow: var(--shadow);
    transition: all 0.28s ease; position: relative; overflow: hidden;
    cursor: default;
  }
  .sc-wcard::after {
    content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 3px;
    border-radius: 0 0 var(--r) var(--r);
    background: linear-gradient(90deg, var(--p), var(--s));
    transform: scaleX(0); transform-origin: left;
    transition: transform 0.35s cubic-bezier(0.34,1.2,0.64,1);
  }
  .sc-wcard:hover { transform: translateY(-6px); box-shadow: var(--shadow-lg); border-color: rgba(58,161,201,0.3); }
  .sc-wcard:hover::after { transform: scaleX(1); }
  .sc-wcard-icon {
    width: 52px; height: 52px; border-radius: 15px; margin-bottom: 20px;
    display: flex; align-items: center; justify-content: center;
    background: linear-gradient(135deg, rgba(58,161,201,0.12), rgba(129,197,166,0.12));
    color: var(--p);
  }
  .sc-wcard h3 { font-size: 16px; font-weight: 800; color: var(--dark); margin-bottom: 10px; letter-spacing: -0.3px; }
  .sc-wcard p { font-size: 13.5px; color: var(--muted); line-height: 1.65; font-weight: 400; }

  /* ────────── SOLUTIONS ────────── */
  .sc-sol { padding: 100px 0; background: #fff; }
  .sc-sol-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 72px; align-items: center; }
  .sc-sol-list { display: flex; flex-direction: column; gap: 8px; margin-top: 36px; }
  .sc-sol-item {
    display: flex; gap: 16px; align-items: flex-start;
    padding: 18px 20px; border-radius: 14px; border: 1.5px solid transparent;
    transition: all 0.22s ease; cursor: default;
  }
  .sc-sol-item:hover { background: rgba(58,161,201,0.05); border-color: rgba(58,161,201,0.18); }
  .sc-sol-icon {
    width: 42px; height: 42px; border-radius: 12px; flex-shrink: 0;
    display: flex; align-items: center; justify-content: center;
    color: var(--p); background: rgba(58,161,201,0.1);
  }
  .sc-sol-item.alt .sc-sol-icon { color: var(--s); background: rgba(129,197,166,0.13); }
  .sc-sol-body h4 { font-size: 14.5px; font-weight: 700; color: var(--dark); margin-bottom: 5px; letter-spacing: -0.2px; }
  .sc-sol-body p { font-size: 13px; color: var(--muted); line-height: 1.58; font-weight: 400; }

  /* Gradient visual panel */
  .sc-sol-panel {
    border-radius: 28px;
    background: linear-gradient(145deg, #0d2d3f 0%, #0a3d52 50%, #1a5c6b 100%);
    padding: 48px 40px; box-shadow: 0 32px 80px rgba(13,45,63,0.22);
    position: relative; overflow: hidden;
  }
  .sc-sol-panel::before {
    content: ''; position: absolute; width: 300px; height: 300px; border-radius: 50%;
    top: -100px; right: -80px;
    background: radial-gradient(circle, rgba(58,161,201,0.2) 0%, transparent 70%);
  }
  .sc-sol-panel::after {
    content: ''; position: absolute; width: 200px; height: 200px; border-radius: 50%;
    bottom: -60px; left: -40px;
    background: radial-gradient(circle, rgba(129,197,166,0.18) 0%, transparent 70%);
  }
  .sc-panel-tag { font-size: 11px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: var(--s); margin-bottom: 10px; }
  .sc-panel-title { font-size: 22px; font-weight: 900; color: white; letter-spacing: -0.6px; margin-bottom: 6px; }
  .sc-panel-sub { font-size: 13px; color: rgba(255,255,255,0.55); font-weight: 400; margin-bottom: 28px; }
  .sc-steps-list { display: flex; flex-direction: column; gap: 12px; position: relative; z-index: 2; }
  .sc-step {
    display: flex; align-items: center; gap: 14px;
    background: rgba(255,255,255,0.07); border-radius: 14px; padding: 14px 18px;
    border: 1px solid rgba(255,255,255,0.09);
    transition: background 0.2s;
  }
  .sc-step:hover { background: rgba(255,255,255,0.12); }
  .sc-step-n {
    width: 30px; height: 30px; border-radius: 50%; flex-shrink: 0;
    background: linear-gradient(135deg, var(--p), var(--s));
    display: flex; align-items: center; justify-content: center;
    font-size: 12px; font-weight: 800; color: white;
  }
  .sc-step-icon { color: rgba(255,255,255,0.55); flex-shrink: 0; }
  .sc-step-text { font-size: 13.5px; font-weight: 600; color: white; }
  .sc-panel-cta { margin-top: 28px; position: relative; z-index: 2; }

  /* ────────── TESTIMONIALS ────────── */
  .sc-testi { padding: 100px 0; background: linear-gradient(160deg, var(--bg) 0%, var(--bg2) 100%); }
  .sc-testi-head { text-align: center; margin-bottom: 56px; }
  .sc-testi-head .sc-sub { margin: 0 auto; }
  .sc-tgrid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
  .sc-tcard {
    background: var(--card); border-radius: var(--r); padding: 32px 28px;
    border: 1.5px solid var(--border); box-shadow: var(--shadow);
    transition: all 0.28s ease; display: flex; flex-direction: column;
  }
  .sc-tcard:hover { transform: translateY(-5px); box-shadow: var(--shadow-lg); border-color: rgba(58,161,201,0.28); }
  .sc-tcard-stars { display: flex; gap: 3px; color: #f5a623; margin-bottom: 16px; }
  .sc-tcard-quote {
    font-size: 14.5px; color: var(--text); line-height: 1.68; font-weight: 400;
    font-style: italic; flex: 1; margin-bottom: 24px; position: relative; padding-left: 20px;
  }
  .sc-tcard-quote::before {
    content: ''; position: absolute; left: 0; top: 4px; bottom: 4px;
    width: 3px; border-radius: 2px;
    background: linear-gradient(to bottom, var(--p), var(--s));
  }
  .sc-tcard-author { display: flex; align-items: center; gap: 12px; }
  .sc-tcard-avatar {
    width: 44px; height: 44px; border-radius: 50%; flex-shrink: 0;
    display: flex; align-items: center; justify-content: center;
    font-size: 15px; font-weight: 800; color: white;
  }
  .sc-tcard-name { font-size: 14px; font-weight: 700; color: var(--dark); line-height: 1.2; }
  .sc-tcard-role { font-size: 12px; color: var(--muted); font-weight: 400; margin-top: 3px; }

  /* ────────── CTA BAND ────────── */
  .sc-cta-wrap { padding: 0 24px 32px; }
  .sc-cta {
    background: linear-gradient(145deg, var(--dark) 0%, #0a3d52 60%, #124f63 100%);
    border-radius: 28px; padding: 80px 6vw;
    display: flex; align-items: center; justify-content: space-between; gap: 40px;
    position: relative; overflow: hidden; flex-wrap: wrap;
  }
  .sc-cta::before {
    content: ''; position: absolute; width: 450px; height: 450px; border-radius: 50%;
    top: -180px; right: -100px;
    background: radial-gradient(circle, rgba(58,161,201,0.2) 0%, transparent 70%);
  }
  .sc-cta::after {
    content: ''; position: absolute; width: 320px; height: 320px; border-radius: 50%;
    bottom: -130px; left: -60px;
    background: radial-gradient(circle, rgba(129,197,166,0.16) 0%, transparent 70%);
  }
  /* Grid texture on CTA */
  .sc-cta-inner-bg {
    position: absolute; inset: 0; border-radius: 28px; overflow: hidden;
    background-image:
      linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
    background-size: 36px 36px;
  }
  .sc-cta-left { position: relative; z-index: 2; }
  .sc-cta-tag { font-size: 11px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: var(--s); margin-bottom: 12px; }
  .sc-cta-title { font-size: clamp(24px, 3vw, 40px); font-weight: 900; color: white; letter-spacing: -1px; line-height: 1.1; margin-bottom: 10px; }
  .sc-cta-title span { color: var(--s); }
  .sc-cta-sub { font-size: 15px; color: rgba(255,255,255,0.5); font-weight: 400; }
  .sc-cta-btns { display: flex; gap: 12px; position: relative; z-index: 2; flex-wrap: wrap; align-items: center; }
  .sc-btn-white { background: white; color: var(--p); }
  .sc-btn-white:hover { background: var(--s); color: white; transform: translateY(-2px); }

  /* ────────── FOOTER ────────── */
  .sc-footer {
    display: flex; align-items: center; justify-content: space-between;
    padding: 24px 6vw; border-top: 1px solid var(--border); flex-wrap: wrap; gap: 12px;
  }
  .sc-footer-logo { font-size: 16px; font-weight: 900; color: var(--dark); display: flex; align-items: center; gap: 7px; }
  .sc-footer-logo span { color: var(--p); }
  .sc-footer-copy { font-size: 12.5px; color: var(--muted); font-weight: 400; }

  /* ────────── RESPONSIVE ────────── */
  @media (max-width: 1024px) {
    .sc-why-grid { grid-template-columns: 1fr 1fr; }
    .sc-sol-grid { gap: 48px; }
  }
  @media (max-width: 860px) {
    .sc-hero { grid-template-columns: 1fr; min-height: auto; padding: 50px 6vw 40px; gap: 40px; }
    .sc-hero-left { order: 2; }
    .sc-hero-right { order: 1; }
    .sc-hero-desc { max-width: 100%; }
    .sc-hero-right svg { max-width: 380px; }
    .sc-sol-grid { grid-template-columns: 1fr; gap: 40px; }
    .sc-sol-panel { order: -1; padding: 36px 28px; }
    .sc-tgrid { grid-template-columns: 1fr 1fr; }
    .sc-portal-row { grid-template-columns: 1fr 1fr; }
  }
  @media (max-width: 640px) {
    .sc-nav-center { display: none; }
    .sc-nav-right { display: none; }
    .sc-hamburger { display: flex; }
    .sc-mobile-menu {
      position: fixed; inset: 68px 0 0 0; background: white; z-index: 199;
      display: flex; flex-direction: column; gap: 4px; padding: 20px 6vw;
      border-top: 1px solid var(--border); box-shadow: 0 8px 32px rgba(0,0,0,0.12);
    }
    .sc-mobile-link {
      display: flex; align-items: center; gap: 10px;
      padding: 13px 16px; border-radius: 12px; font-size: 14px;
      font-weight: 600; color: var(--dark); text-decoration: none;
      transition: background 0.18s;
    }
    .sc-mobile-link:hover { background: var(--bg); }
    .sc-mobile-link.cta { background: var(--p); color: white; margin-top: 8px; }
    .sc-h1 { font-size: 34px; }
    .sc-why-grid { grid-template-columns: 1fr; }
    .sc-tgrid { grid-template-columns: 1fr; }
    .sc-portal-row { grid-template-columns: 1fr; }
    .sc-cta { padding: 52px 6vw; }
    .sc-cta-wrap { padding: 0 12px 20px; }
    .sc-stats { gap: 16px; flex-wrap: wrap; }
    .sc-stat:not(:last-child) { border-right: none; margin-right: 0; padding-right: 0; }
  }

  /* ────────── FLOAT ANIMATIONS (illustration cards) ────────── */
  @keyframes float-a {
    0%,100% { transform: translateY(0); }
    50% { transform: translateY(-8px); }
  }
  @keyframes float-b {
    0%,100% { transform: translateY(0); }
    50% { transform: translateY(-6px); }
  }
  @keyframes float-c {
    0%,100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }
`;

/* ── DATA ── */
const WHY = [
  { Icon: Search, title: "Smart Matching", desc: "Our system matches students to programs based on academic profile, goals, and budget — no guessing involved." },
  { Icon: Zap, title: "Fast Applications", desc: "Apply to multiple universities in minutes. One profile, one process, zero repetition across forms." },
  { Icon: Award, title: "Verified Programs", desc: "Every listing is verified directly from partner institutions, ensuring accurate requirements and deadlines." },
  { Icon: TrendingUp, title: "Transparent Process", desc: "See eligibility, costs, and deadlines clearly before you apply. No surprises, no hidden fees." },
  { Icon: Globe, title: "Global Reach", desc: "Access programs from universities across the world — all connected in one unified platform." },
  { Icon: Users, title: "Dedicated Support", desc: "Students and universities both receive ongoing guidance throughout the entire application journey." },
];

const SOLUTIONS = [
  { Icon: FileText, title: "Centralized Applications", desc: "Manage all your university applications from a single, beautifully organized dashboard.", alt: false },
  { Icon: Bell, title: "Real-time Notifications", desc: "Get instant alerts when universities view, shortlist, or respond to your application.", alt: false },
  { Icon: BarChart3, title: "University Analytics", desc: "Institutions gain powerful insights into applicant quality, program demand, and conversion.", alt: true },
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
    quote: "ScholarConnect made finding the right program so much easier. I applied to five universities in one afternoon — something that would have taken me weeks before.",
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
      <style>{css}</style>

      {/* ── NAV ── */}
      <nav className="sc-nav">
        <Link className="sc-logo" to="/">
          <div className="sc-logo-mark">
            <GraduationCap size={17} color="white" strokeWidth={2.5} />
          </div>
          Scholar<span>Connect</span>
        </Link>

        <div className="sc-nav-center">
          <a className="sc-nav-item" href="#why">Why Us</a>
          <a className="sc-nav-item" href="#solutions">Solutions</a>
          <a className="sc-nav-item" href="#testimonials">Testimonials</a>
        </div>

        <div className="sc-nav-right">
          <Link className="sc-nav-link ghost" to="/student/login">
            <LogIn size={14} /> Login
          </Link>
          <Link className="sc-nav-link filled" to="/student/register">
            Get Started <ChevronRight size={14} />
          </Link>
        </div>

        <button className="sc-hamburger" onClick={() => setMenuOpen(o => !o)} aria-label="Toggle menu">
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="sc-mobile-menu" onClick={() => setMenuOpen(false)}>
          <a className="sc-mobile-link" href="#why"><BookOpen size={16} /> Why Us</a>
          <a className="sc-mobile-link" href="#solutions"><Zap size={16} /> Solutions</a>
          <a className="sc-mobile-link" href="#testimonials"><Star size={16} /> Testimonials</a>
          <Link className="sc-mobile-link" to="/student/login"><LogIn size={16} /> Student Login</Link>
          <Link className="sc-mobile-link" to="/university/login"><Building2 size={16} /> University Login</Link>
          <Link className="sc-mobile-link cta" to="/student/register"><UserPlus size={16} /> Get Started Free</Link>
        </div>
      )}

      {/* ── HERO ── */}
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
            ScholarConnect bridges ambitious students with the world's best universities.
            Browse programs, apply in minutes, and let the right institutions find you.
          </p>

          <div className="sc-ctas">
            <Link className="sc-btn sc-btn-p" to="/student/register">
              Start for Free <ArrowRight size={15} />
            </Link>
            <Link className="sc-btn sc-btn-o" to="/university/register">
              For Universities
            </Link>
          </div>

          <div className="sc-stats">
            <div className="sc-stat">
              <div className="sc-stat-n">100+</div>
              <div className="sc-stat-l">Programs Listed</div>
            </div>
            <div className="sc-stat">
              <div className="sc-stat-n">50+</div>
              <div className="sc-stat-l">Universities</div>
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
              <div className="sc-portal-title">I'm a University</div>
              <p className="sc-portal-desc">Review applications, manage programs, and discover great students.</p>
              <div className="sc-portal-actions">
                <Link className="sc-btn sc-btn-s sc-btn-sm" to="/university/login">
                  <LogIn size={13} /> Log In
                </Link>
                <Link className="sc-btn sc-btn-o sc-btn-sm" to="/university/register">Register</Link>
              </div>
            </div>
          </div>
        </div>

        {/* ILLUSTRATION */}
        <div className="sc-hero-right">
          <HeroIllustration />
        </div>
      </section>

      {/* ── WHY US ── */}
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

      {/* ── SOLUTIONS ── */}
      <section className="sc-sol" id="solutions">
        <div className="sc-wrap">
          <div className="sc-sol-grid">
            <div>
              <div className="sc-tag"><Zap size={13} /> Our Solutions</div>
              <h2 className="sc-h2">Everything you need, <b>in one place</b></h2>
              <p className="sc-sub">
                Whether you're a student chasing a scholarship or a university recruiting top talent,
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

      {/* ── TESTIMONIALS ── */}
      <section className="sc-testi" id="testimonials">
        <div className="sc-wrap">
          <div className="sc-testi-head">
            <div className="sc-tag"><Star size={13} /> Testimonials</div>
            <h2 className="sc-h2">Loved by <b>students &amp; universities</b></h2>
            <p className="sc-sub">
              Thousands of students have found their dream programs and universities have discovered
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

      {/* ── CTA BAND ── */}
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
            <Link className="sc-btn sc-btn-ghost-w" to="/university/register">
              <Building2 size={15} /> List Your University
            </Link>
          </div>
        </div>
      </div>

      {/* ── FOOTER ── */}
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