"use client";

import {
  ArrowRight,
  BookOpen,
  GitBranch,
  Globe,
  Info,
  School,
  Send,
  Target,
  X,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

export default function About() {
  const router = useRouter();
  const [isSubThemesOpen, setIsSubThemesOpen] = useState(false);

  const subThemes = [
    "Strategic Issues in Supply Chain Management",
    "Global Supply Chain Integration",
    "Industrial Application of Supply Chain Management",
    "Supply Chain Sustainability",
    "Circular Economy",
    "Supply Chain Digtization/AI application in SCM",
    "Supply Chain Management and SDGs",
    "Geo Politics, Geo Economy and SCM",
    "Supply Chain Finance",
    "Supply Chain Optimization",
    "Talent Management in SCM",
    "Outsourcing Logistics Services",
    "Responsible and Ethical SCM",
    "Building Adaptive and Risk-Intelligent Supply Chains",
  ];

  const features = [
    {
      icon: (
        <Globe
          className="text-[#003366] group-hover:text-white transition-colors"
          size={18}
        />
      ),
      title: "Global Networking",
      desc: "Connect with researchers from 15+ countries.",
    },
    {
      icon: (
        <BookOpen
          className="text-[#003366] group-hover:text-white transition-colors"
          size={18}
        />
      ),
      title: "Publications",
      desc: "High-impact Scopus proceedings indexing.",
    },
    {
      icon: (
        <Target
          className="text-[#003366] group-hover:text-white transition-colors"
          size={18}
        />
      ),
      title: "Academic Growth",
      desc: "Workshops for professional scaling.",
    },
  ];

  useEffect(() => {
    document.body.style.overflow = isSubThemesOpen ? "hidden" : "unset";
  }, [isSubThemesOpen]);

  const handleStartSubmission = () => {
    setIsSubThemesOpen(false);
    router.push("/signup", { scroll: false });
  };

  return (
    <section
      id="about"
      className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-white px-5 md:px-10 py-12 lg:py-0"
    >
      <style jsx global>{`
        @keyframes blink-outline {
          0% {
            box-shadow: 0 0 0 0px rgba(197, 160, 89, 0.7);
          }
          50% {
            box-shadow: 0 0 0 6px rgba(197, 160, 89, 0);
          }
          100% {
            box-shadow: 0 0 0 0px rgba(197, 160, 89, 0);
          }
        }
        .animate-blink-outline {
          animation: blink-outline 2s infinite;
        }
      `}</style>

      {/* Background Accents */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-[-5%] left-[-5%] w-[40vw] h-[40vw] bg-[#C5A059]/20 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-5%] right-[-5%] w-[40vw] h-[40vw] bg-[#003366]/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-7xl mx-auto w-full h-full flex flex-col justify-center relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-12 items-center">
          {/* Left Column: Image Area */}
          <div className="lg:col-span-5 hidden lg:block relative">
            <div className="relative group">
              <div className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white transition-all duration-700 group-hover:-translate-y-2">
                <img
                  src="/images/about-conference.jpg"
                  alt="Conference Building"
                  className="w-full h-auto lg:h-[550px] object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-6 left-6 z-30 w-20 h-20 bg-black/40 backdrop-blur-md rounded-2xl p-2 border border-white/50 group-hover:scale-110 transition-transform duration-500">
                  <img
                    src="/images/logo.png"
                    alt="EWU Logo"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Content Area */}
          <div className="lg:col-span-7 space-y-6">
            <header className="space-y-2 text-left">
              <h2 className="text-[#C5A059] text-[10px] md:text-xs font-medium uppercase tracking-[0.3em] leading-none">
                Welcome to{" "}
                <span className="font-black text-[#003366]">International</span>{" "}
                Conference on
              </h2>

              {/* Line 2 Fixed to 1 Line on Desktop */}
              <h1 className="text-4xl md:text-3xl lg:text-[2.75rem] font-black text-[#003366] leading-tight uppercase tracking-tighter ">
                Building <span className="text-[#C5A059]">Resilient</span>{" "}
                Supply Chains
              </h1>
            </header>

            <p className="text-slate-500 text-sm md:text-base leading-relaxed font-medium max-w-2xl border-l-4 border-[#C5A059]/30 pl-5 italic text-left">
              The Conference on Building Resilient Supply Chains offers a
              vibrant forum for exploring how organizations can effectively
              anticipate, withstand, and recover from disruptions in today's
              volatile global landscape.
            </p>

            {/* Feature Icons Stats - Sound Box Outlines */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              {features.map((item, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-start gap-2 p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:bg-white hover:border-[#C5A059] hover:shadow-xl transition-all duration-300 group shadow-sm"
                >
                  <div className="w-9 h-9 shrink-0 rounded-xl bg-white flex items-center justify-center border border-slate-100 group-hover:bg-[#003366] transition-all duration-300 shadow-sm">
                    {item.icon}
                  </div>
                  <div className="space-y-0.5">
                    <h4 className="font-black text-[#003366] text-[10px] uppercase tracking-wide group-hover:text-[#C5A059]">
                      {item.title}
                    </h4>
                    <p className="text-slate-400 text-[9px] font-medium leading-tight">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Reorganized Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-4">
              <Link
                href="/about-conference"
                className="bg-white text-[#003366] border border-[#003366]/20 px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest hover:border-[#003366] transition-all flex items-center justify-center gap-2 shadow-sm active:scale-95"
              >
                <Info size={14} className="text-[#C5A059]" />
                Conference Details
              </Link>

              <button
                onClick={() => setIsSubThemesOpen(true)}
                className="group bg-[#003366] text-white px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all animate-blink-outline cursor-pointer"
              >
                <GitBranch size={14} className="text-[#C5A059]" />
                <span>Sub Themes & Tracks</span>
                <ArrowRight
                  size={12}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </button>

              <Link
                href="/about-ewu"
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-50 border border-slate-200 text-[#003366] font-black text-[10px] uppercase tracking-widest hover:bg-white hover:border-[#C5A059] transition-all active:scale-95"
              >
                <School size={14} className="text-[#C5A059]" />
                <span>About EWU</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Sub-Themes Modal - Thematic Header with Logo */}
      {isSubThemesOpen && (
        <ModalWrapper
          onClose={() => setIsSubThemesOpen(false)}
          title="Submission Tracks"
        >
          <div className="space-y-6 flex flex-col">
            <div className="bg-[#003366]/5 p-4 rounded-xl border-l-4 border-[#C5A059]">
              <p className="text-slate-600 text-sm leading-relaxed font-medium italic">
                Papers and abstracts are invited under the following sub themes:
              </p>
            </div>
            <ThemesGrid themes={subThemes} />
            <div className="mt-4 p-6 bg-slate-50 border border-dashed border-slate-200 rounded-2xl text-center">
              <button
                onClick={handleStartSubmission}
                className="inline-flex items-center gap-2 bg-[#C5A059] text-[#003366] px-8 py-3 rounded-xl font-black uppercase tracking-widest text-[10px] shadow-md hover:bg-[#003366] hover:text-white transition-all active:scale-95"
              >
                Call for Paper <Send size={14} />
              </button>
            </div>
          </div>
        </ModalWrapper>
      )}
    </section>
  );
}

function ModalWrapper({
  onClose,
  title,
  children,
}: {
  onClose: any;
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-[#001A33]/90 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      <div className="relative bg-white w-full max-w-4xl max-h-[85vh] rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden border border-white/20 animate-in fade-in zoom-in duration-500">
        {/* Thematic Header with Logo */}
        <div className="shrink-0 bg-[#003366] p-6 md:p-8 flex justify-between items-center relative overflow-hidden">
          <div className="flex items-center gap-5 relative z-10">
            <div className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-2xl p-2 border border-white/20">
              <img
                src="/images/logo.png"
                alt="Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col">
              <h3 className="text-white font-black text-xl md:text-2xl leading-none tracking-tight uppercase">
                SCM <span className="text-[#C5A059]">Conference</span>
              </h3>
              <span className="text-white/50 text-[9px] md:text-[11px] font-bold tracking-[0.2em] mt-1 uppercase">
                {title}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-red-500 transition-colors relative z-10"
          >
            <X size={20} />
          </button>
        </div>
        <div className="flex-grow overflow-y-auto p-6 md:p-10 custom-scrollbar text-left">
          {children}
        </div>
        <div className="shrink-0 p-5 bg-slate-50 border-t border-slate-100 flex justify-between items-center px-10">
          <span className="text-[9px] font-black text-[#003366]/30 uppercase tracking-widest">
            East West University
          </span>
          <button
            onClick={onClose}
            className="text-[#003366] font-black text-[10px] uppercase tracking-widest hover:text-[#C5A059] transition-colors"
          >
            Close View
          </button>
        </div>
      </div>
    </div>
  );
}

function ThemesGrid({ themes }: { themes: any }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-2">
      {themes.map((theme: any, i: number) => (
        <div
          key={i}
          className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-transparent hover:border-[#C5A059]/30 transition-all group"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-[#C5A059] group-hover:scale-125 transition-transform shrink-0"></div>
          <span className="text-[#003366] text-[10px] font-bold uppercase">
            {theme}
          </span>
        </div>
      ))}
    </div>
  );
}
