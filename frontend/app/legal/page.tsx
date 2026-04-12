"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import {
  Database,
  EyeOff,
  FileText,
  Globe,
  Lock,
  ShieldCheck,
} from "lucide-react";
import { useState } from "react";

// --- SUB-COMPONENTS (Original logic preserved) ---
function PrivacySection() {
  const sections = [
    {
      title: "Data Sovereignty & AI Ethics",
      icon: Globe,
      content:
        "Conference DBA guarantees 'Research Sovereignty'. Submitted manuscripts are protected by a 'No-LLM' clause, ensuring your work is never used to train commercial AI models.",
    },
    {
      title: "Identity & ORCID encryption",
      icon: Database,
      content:
        "We collect institutional affiliations and ORCID iDs to ensure accurate citation mapping. Sensitive personal data is encrypted via AES-256 and stored on localized sovereign servers.",
    },
    {
      title: "Cross-Border Data Transfer",
      icon: Lock,
      content:
        "International participant data is managed under strict GDPR and local Bangladesh digital security frameworks, ensuring safe transit for global academic collaboration.",
    },
    {
      title: "On-Site Privacy (EWU 2026)",
      icon: EyeOff,
      content:
        "For physical attendees at East West University, digital check-in logs and temporary biometric records are purged from our local infrastructure within 72 hours post-event.",
    },
    {
      title: "Zero-Tracking Policy",
      icon: ShieldCheck,
      content:
        "We use essential session cookies only. We do not employ third-party advertising pixels, cross-site tracking, or behavioral analytics that profile academic researchers.",
    },
  ];

  return (
    <div className="bg-white rounded-[2.5rem] p-8 md:p-16 shadow-xl border border-slate-100 animate-in fade-in zoom-in duration-700 w-full">
      <div className="space-y-12">
        {sections.map((sec, i) => (
          <div key={i} className="flex flex-row gap-8 group max-w-4xl">
            <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-[#003366] group-hover:bg-[#003366] group-hover:text-white transition-all shrink-0 shadow-sm">
              <sec.icon size={24} />
            </div>
            <div>
              <h4 className="font-black text-[#003366] uppercase text-sm tracking-widest mb-2">
                {sec.title}
              </h4>
              <p className="text-slate-500 text-base leading-relaxed font-medium">
                {sec.content}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TermsSection() {
  const terms = [
    {
      label: "Originality",
      desc: "Similarity index exceeding 15% results in disqualification. Self-plagiarism must be cited appropriately.",
    },
    {
      label: "Indexing",
      desc: "Accepted papers are submitted for Scopus and Web of Science indexing, subject to publisher editorial benchmarks.",
    },
    {
      label: "AI Usage",
      desc: "Use of Generative AI in research must be documented in the methodology. Purely AI-generated papers are strictly prohibited.",
    },
    {
      label: "Attendance",
      desc: "At least one author must register and present (physical or virtual). No-show results in removal from the final repository.",
    },
    {
      label: "Refunds",
      desc: "Refunds permitted until June 10 (minus 25% administrative fee). No refunds are processed after the early-bird deadline.",
    },
    {
      label: "Certification",
      desc: "Blockchain-verified digital certificates will be issued to all participants.",
    },
    {
      label: "Intellectual Property",
      desc: "Authors retain copyright while granting the Conference the right of first publication and distribution.",
    },
  ];

  return (
    <div className="bg-[#003366] rounded-[2.5rem] p-8 md:p-16 shadow-2xl relative overflow-hidden animate-in fade-in zoom-in duration-700 w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10">
        {terms.map((term, i) => (
          <div
            key={i}
            className="border-l-2 border-[#C5A059]/30 pl-6 hover:border-[#C5A059] transition-colors"
          >
            <div className="flex items-center gap-3 mb-2">
              <FileText size={16} className="text-[#C5A059]" />
              <h4 className="font-bold text-[#C5A059] text-xs uppercase tracking-[0.2em]">
                {term.label}
              </h4>
            </div>
            <p className="text-white/80 text-sm leading-relaxed italic">
              {term.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function EthicsSection() {
  const ethics = [
    {
      title: "Double-Blind Peer Review",
      content:
        "To ensure unbiased evaluation, both the reviewer and author identities are concealed throughout the review process.",
    },
    {
      title: "AI Disclosure & Transparency",
      content:
        "Authors must explicitly disclose the use of Generative AI tools in the drafting or data analysis phases.",
    },
    {
      title: "COPE Compliance & Integrity",
      content:
        "Conference DBA 2026 strictly adheres to the Code of Conduct and Best Practice Guidelines set by COPE.",
    },
    {
      title: "Conflict of Interest",
      content:
        "All participants must disclose any relationships that could inappropriately influence their research findings.",
    },
    {
      title: "Inclusive Research Practices",
      content:
        "We prioritize diversity in our scientific committee and research involvement.",
    },
    {
      title: "Sustainability & Green Research",
      content:
        "Preference is given to studies that demonstrate environmentally sustainable methodologies.",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in zoom-in duration-700 w-full">
      {ethics.map((item, i) => (
        <div
          key={i}
          className="bg-white p-10 rounded-[2.5rem] border border-[#C5A059]/20 shadow-lg relative group overflow-hidden"
        >
          <h4 className="text-[#003366] font-black uppercase text-sm tracking-widest mb-4 flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-[#C5A059]" /> {item.title}
          </h4>
          <p className="text-slate-500 text-sm md:text-base leading-relaxed font-medium">
            {item.content}
          </p>
          <div className="absolute bottom-0 left-0 w-0 h-1 bg-[#C5A059] group-hover:w-full transition-all duration-500" />
        </div>
      ))}
    </div>
  );
}

export default function LegalPage() {
  const [activeTab, setActiveTab] = useState("privacy");

  return (
    <div className="relative min-h-screen w-full bg-white selection:bg-[#C5A059] selection:text-white">
      <Navbar />

      {/* --- COMPACT FULL WIDTH HEADER (Badge Removed) --- */}
      <section className="w-full flex flex-col items-center justify-center relative overflow-hidden px-5 md:px-10 pt-28 md:pt-36 pb-6">
        <div className="max-w-7xl w-full relative z-10">
          <header className="text-center flex flex-col items-center">
            <h2 className="text-[#C5A059] text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] mb-1">
              Protocol Ref:{" "}
              <span className="text-[#003366]">EWU-DBA-2026-LEG</span>
            </h2>

            <h1 className="text-3xl md:text-5xl font-black text-[#003366] leading-tight uppercase tracking-tighter">
              LEGAL <span className="text-[#C5A059]">& COMPLIANCE</span>
            </h1>

            <p className="text-slate-400 text-[10px] md:text-xs font-bold uppercase tracking-widest max-w-2xl mt-3 border-t border-slate-100 pt-4">
              Research Sovereignty • Data Integrity • Ethical Standards
            </p>
          </header>
        </div>
      </section>

      {/* --- CONTENT AREA --- */}
      <main className="relative z-10 flex flex-col items-center pb-24 px-4 max-w-7xl mx-auto w-full">
        {/* Compact Tab Switcher */}
        <div className="flex bg-slate-50 p-1 rounded-xl shadow-sm border border-slate-200 mb-10">
          {["privacy", "terms", "ethics"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 md:px-12 py-2.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${
                activeTab === tab
                  ? "bg-[#003366] text-white shadow-md scale-105"
                  : "text-slate-400 hover:text-[#003366]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="w-full">
          {activeTab === "privacy" && <PrivacySection />}
          {activeTab === "terms" && <TermsSection />}
          {activeTab === "ethics" && <EthicsSection />}
        </div>
      </main>

      <Footer />
    </div>
  );
}
