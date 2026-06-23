"use client";

import {
  BookOpen,
  Calendar,
  ChevronRight,
  Clock,
  ExternalLink,
  FileText,
  Sparkles,
  X,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function Hero() {
  const session = null;
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 🚀 REF FOR OUTSIDE CLICK DETECTION
  const modalRef = useRef(null);

  // 🚀 DETECT OUTSIDE CLICK
  useEffect(() => {
    function handleOutsideClick(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsModalOpen(false);
      }
    }
    if (isModalOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isModalOpen]);

  return (
    <div className="relative min-h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Dynamic Background */}
      <div
        className="absolute inset-0 bg-cover bg-center scale-100 animate-slow-zoom"
        style={{ backgroundImage: "url('/images/new-hero.webp')" }}
      />

      {/* FIXED READABILITY OVERLAY */}
      <div className="absolute inset-0 z-0" />

      {/* Animated Ambient Glow */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full blur-[120px] animate-pulse pointer-events-none" />

      <div className="relative z-10 w-full pt-32 pb-10 px-4 md:px-6">
        <div className="max-w-7xl mx-auto text-center text-white flex flex-col items-center">
          {/* --- TOP BADGES --- */}
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 mb-8 md:mb-10 animate-in fade-in slide-in-from-top-4 duration-1000">
            <div className="flex flex-col items-center md:items-end bg-black/40 backdrop-blur-md border border-white/10 px-6 py-2.5 rounded-2xl md:rounded-r-none md:border-r-0">
              <h3 className="text-[#C5A059] text-[10px] md:text-[13px] font-black uppercase tracking-[0.3em] leading-tight text-center md:text-right drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                Department of Business Administration
              </h3>
              <span className="text-white text-[9px] md:text-[11px] font-bold uppercase tracking-[0.2em] mt-1 drop-shadow-md">
                East West University
              </span>
            </div>

            <div className="flex items-center gap-3 bg-black/60 backdrop-blur-md border border-[#C5A059]/30 px-4 py-2 md:px-5 md:py-2.5 rounded-full shadow-xl">
              <Sparkles size={14} className="text-[#C5A059] animate-pulse" />
              <h2 className="text-[#C5A059] text-[9px] md:text-[11px] font-black uppercase tracking-[0.4em] whitespace-nowrap">
                Academic Excellence 2026
              </h2>
            </div>
          </div>

          {/* RESPONSIVE TWO-LINE TITLE */}
          <h1 className="flex flex-col items-center text-center tracking-tighter uppercase mb-10 animate-in fade-in slide-in-from-bottom-6 duration-1000 px-2 w-full">
            <span className="text-[1.2rem] sm:text-[2rem] md:text-[2.5rem] lg:text-[3rem] font-black leading-tight text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)] md:drop-shadow-[0_8px_16px_rgba(0,0,0,1)] block w-full">
              International Conference on
            </span>
            <span className="text-[0.9rem] sm:text-[1.4rem] md:text-[1.8rem] lg:text-[2.2rem] font-black leading-tight text-transparent bg-clip-text bg-gradient-to-r from-[#C5A059] via-[#E5C07B] to-[#C5A059] mt-2 md:mt-3 drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)] md:drop-shadow-[0_8px_16px_rgba(0,0,0,1)] block w-full">
              Building Resilient Supply Chains
            </span>
          </h1>

          {/* DATE & TIME SECTION */}
          <div className="flex flex-col items-center gap-6 mb-12 w-full max-w-5xl">
            <div className="flex flex-col md:flex-row justify-center bg-black/40 backdrop-blur-xl border border-white/10 rounded-[2rem] shadow-2xl overflow-hidden w-full md:w-auto divide-y md:divide-y-0 md:divide-x divide-white/10 items-center">
              <div className="flex items-center gap-4 px-6 md:px-10 py-5">
                <Calendar className="text-[#C5A059] w-5 h-5 md:w-6 md:h-6" />
                <div className="text-left">
                  <p className="text-[0.6rem] font-black text-[#C5A059] uppercase tracking-widest leading-none mb-1.5">
                    Conference Date
                  </p>
                  <p className="text-sm md:text-lg font-bold text-white leading-none">
                    18-19 Dec 2026
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4 px-6 md:px-10 py-5">
                <Clock className="text-[#C5A059] w-5 h-5 md:w-6 md:h-6" />
                <div className="text-left">
                  <p className="text-[0.6rem] font-black text-[#C5A059] uppercase tracking-widest leading-none mb-1.5">
                    Event Schedule
                  </p>
                  <p className="text-sm md:text-lg font-bold text-white leading-none">
                    10am - 8pm
                  </p>
                </div>
              </div>
              <div className="px-6 md:px-10 py-5 flex items-center justify-center">
                <CountdownTimer targetDate="2026-12-18T10:00:00" />
              </div>
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex flex-col lg:flex-row gap-4 md:gap-5 w-full lg:w-auto px-4 items-center justify-center">
            <Link
              href="/cfp"
              scroll={false}
              className="w-full sm:w-auto group flex items-center justify-center gap-3 border-2 border-white/20 bg-black/60 backdrop-blur-md px-8 md:px-10 py-4 rounded-2xl font-black uppercase text-[0.7rem] md:text-[0.75rem] tracking-[0.15em] hover:bg-white hover:text-[#003366] hover:border-white transition-all duration-300 active:scale-95 text-white shadow-2xl"
            >
              <FileText
                size={18}
                className="group-hover:rotate-12 transition-transform"
              />
              Call For Papers
            </Link>

            <button
              onClick={() => setIsModalOpen(true)}
              type="button"
              className="w-full sm:w-auto group flex items-center justify-center gap-3 border-2 border-[#C5A059]/40 bg-gradient-to-r from-[#002147]/80 to-[#003366]/80 backdrop-blur-md px-8 md:px-10 py-4 rounded-2xl font-black uppercase text-[0.7rem] md:text-[0.75rem] tracking-[0.15em] hover:from-[#C5A059] hover:to-[#E5C07B] hover:text-[#002147] hover:border-[#C5A059] transition-all duration-300 active:scale-95 text-[#C5A059] shadow-2xl"
            >
              <BookOpen
                size={18}
                className="group-hover:scale-110 transition-transform text-[#C5A059] group-hover:text-[#002147]"
              />
              Journal Collaboration
            </button>

            <Link
              href="/dashboard/payment"
              scroll={false}
              className="w-full sm:w-auto flex items-center justify-center gap-3 bg-[#C5A059] text-[#003366] px-10 md:px-12 py-4 rounded-2xl font-black uppercase text-[0.7rem] md:text-[0.75rem] tracking-[0.15em] shadow-[0_20px_50px_rgba(197,160,89,0.3)] hover:bg-white transition-all duration-300 active:scale-95"
            >
              <ChevronRight size={20} strokeWidth={3} />
              <span>Register Now</span>
            </Link>
          </div>
        </div>
      </div>

      {/* --- COLLABORATION MODAL WITH OUTSIDE CLOSE & THEMATIC ACCENT HEADER --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[250] flex items-center justify-center p-4 bg-[#001A41]/85 backdrop-blur-md animate-in fade-in duration-300">
          <div
            ref={modalRef}
            className="bg-white w-full max-w-xl rounded-[2.5rem] shadow-2xl overflow-hidden relative border border-slate-100 flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200"
          >
            {/* 🚀 Updated Header: Thematic Gradient Top Border Bar */}
            <div className="absolute top-0 left-0 right-0 h-25 bg-gradient-to-r from-[#003366] via-[#C5A059] to-[#003366]" />

            {/* Modal Header Container */}
            <div className="p-6 md:p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/70 relative">
              {/* Subtle background thematic geometric line grid aesthetic indicator */}
              <div className="absolute top-0 right-12 bottom-0 w-32 opacity-5 pointer-events-none bg-[radial-gradient(#003366_1px,transparent_1px)] [background-size:16px_16px]" />

              <div className="flex items-center gap-3 relative z-10">
                <div className="p-2.5 bg-[#002147] text-[#C5A059] rounded-xl shadow-md border border-white/10">
                  <BookOpen size={20} />
                </div>
                <div>
                  <h3 className="text-sm font-black text-[#003366] uppercase tracking-widest leading-none">
                    Publication Partnership
                  </h3>
                  <p className="text-[8px] text-slate-400 font-bold uppercase tracking-[0.2em] mt-1.5">
                    Official OSCM Journal Alignment
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 bg-white text-slate-400 hover:text-red-500 rounded-xl transition-all shadow-sm border border-slate-100 relative z-10 active:scale-95"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Scroll Body */}
            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 text-center custom-scrollbar">
              {/* Journal Logo Space */}
              <div className="relative w-full h-44 max-w-[280px] mx-auto bg-slate-50 rounded-2xl border border-slate-100 p-4 shadow-inner flex items-center justify-center">
                <img
                  src="/images/hero/oscm.png"
                  alt="OSCM Journal Logo"
                  className="max-w-full max-h-full object-contain"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                    const parent = e.currentTarget.parentElement;
                    if (parent && !parent.querySelector(".fallback-el")) {
                      const el = document.createElement("div");
                      el.className =
                        "fallback-el text-xs font-black text-[#003366] uppercase tracking-widest";
                      el.innerText = "OSCM JOURNAL LOGO";
                      parent.appendChild(el);
                    }
                  }}
                />
              </div>

              {/* Informative Paragraph Box */}
              <p className="text-slate-600 text-sm leading-relaxed text-justify bg-slate-50/50 p-5 rounded-2xl border border-slate-100 shadow-sm font-medium">
                The conference is collaborating with{" "}
                <strong className="text-[#003366] font-black">
                  ‘Operations and Supply Chain Management: An International
                  Journal (OSCM)’
                </strong>
                , whereby selected manuscripts will be invited to submit to the
                journal. For more information about the journal, visit:{" "}
                <a
                  href="https://journal.oscm-forum.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#C5A059] font-bold underline hover:text-[#002147] transition-colors"
                >
                  https://journal.oscm-forum.org/
                </a>
              </p>

              {/* Publication Credentials Metadata */}
              <div className="grid grid-cols-2 gap-3 text-center">
                <div className="bg-slate-50 px-4 py-2.5 rounded-xl border border-slate-100 shadow-sm">
                  <span className="text-[8px] font-black text-slate-400 uppercase tracking-wider block mb-0.5">
                    Standard Print
                  </span>
                  <span className="text-xs font-bold text-[#003366]">
                    ISSN: 1979-3561
                  </span>
                </div>
                <div className="bg-slate-50 px-4 py-2.5 rounded-xl border border-slate-100 shadow-sm">
                  <span className="text-[8px] font-black text-slate-400 uppercase tracking-wider block mb-0.5">
                    Electronic Format
                  </span>
                  <span className="text-xs font-bold text-[#003366]">
                    EISSN: 2579-9363
                  </span>
                </div>
              </div>
            </div>

            {/* Modal Action Footer */}
            <div className="p-4 md:p-6 bg-slate-50/50 border-t border-slate-100 flex flex-col sm:flex-row justify-end items-center gap-3">
              <a
                href="https://journal.oscm-forum.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-[#003366] text-white font-black uppercase text-[10px] rounded-xl hover:bg-[#C5A059] hover:text-[#002147] transition-all shadow-md group"
              >
                <span>Visit Journal Portal</span>
                <ExternalLink
                  size={12}
                  className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                />
              </a>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes slow-zoom {
          from {
            transform: scale(1);
          }
          to {
            transform: scale(1.12);
          }
        }
        .animate-slow-zoom {
          animation: slow-zoom 30s infinite alternate ease-in-out;
        }
      `}</style>
    </div>
  );
}

function CountdownTimer({ targetDate }: { targetDate: string }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    mins: 0,
    secs: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const difference = +new Date(targetDate) - +new Date();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          mins: Math.floor((difference / 1000 / 60) % 60),
          secs: Math.floor((difference / 1000) % 60),
        });
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="flex flex-col items-center md:items-start">
      <p className="text-[0.6rem] font-black text-[#C5A059] uppercase tracking-widest mb-2 leading-none">
        Time to Event
      </p>
      <div className="flex gap-2">
        <TimeBox val={timeLeft.days} unit="D" />
        <TimeBox val={timeLeft.hours} unit="H" />
        <TimeBox val={timeLeft.mins} unit="M" />
        <TimeBox val={timeLeft.secs} unit="S" />
      </div>
    </div>
  );
}

function TimeBox({ val, unit }: { val: number; unit: string }) {
  return (
    <div className="bg-white/10 border border-white/10 rounded-xl px-2 md:px-2.5 py-1.5 md:py-2 min-w-[2.5rem] md:min-w-[3rem] flex flex-col items-center shadow-lg">
      <p className="text-sm md:text-xl font-black text-white leading-none mb-1">
        {val.toString().padStart(2, "0")}
      </p>
      <p className="text-[0.45rem] md:text-[0.5rem] font-black text-[#C5A059] uppercase leading-none">
        {unit}
      </p>
    </div>
  );
}
