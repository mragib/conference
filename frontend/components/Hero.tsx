"use client";

import {
  Calendar,
  ChevronRight,
  Clock,
  FileText,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Hero() {
  const session = null;

  return (
    <div className="relative min-h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Dynamic Background */}
      <div
        className="absolute inset-0 bg-cover bg-center scale-105 animate-slow-zoom"
        style={{ backgroundImage: "url('/images/hero.jpg')" }}
      />

      {/* FIXED READABILITY OVERLAY */}
      <div className="absolute inset-0 z-0 bg-black/20" />

      {/* Animated Ambient Glow */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full blur-[120px] animate-pulse pointer-events-none" />

      <div className="relative z-10 w-full pt-32 pb-10 px-4 md:px-6">
        <div className="max-w-7xl mx-auto text-center text-white flex flex-col items-center">
          {/* --- TOP BADGES --- */}
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 mb-8 md:mb-10 animate-in fade-in slide-in-from-top-4 duration-1000">
            {/* 🚀 UPDATED: Added background container for better readability */}
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

          {/* 🚀 RESPONSIVE TWO-LINE TITLE */}
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
          <div className="flex flex-col sm:flex-row gap-4 md:gap-5 w-full sm:w-auto px-4">
            <Link
              href="/cfp"
              scroll={false}
              className="group flex items-center justify-center gap-3 border-2 border-white/20 bg-black/60 backdrop-blur-md px-8 md:px-10 py-4 rounded-2xl font-black uppercase text-[0.7rem] md:text-[0.75rem] tracking-[0.15em] hover:bg-white hover:text-[#003366] hover:border-white transition-all duration-300 active:scale-95 text-white shadow-2xl"
            >
              <FileText
                size={18}
                className="group-hover:rotate-12 transition-transform"
              />
              Call For Papers
            </Link>

            <Link
              href="/signup"
              scroll={false}
              className="flex items-center justify-center gap-3 bg-[#C5A059] text-[#003366] px-10 md:px-12 py-4 rounded-2xl font-black uppercase text-[0.7rem] md:text-[0.75rem] tracking-[0.15em] shadow-[0_20px_50px_rgba(197,160,89,0.3)] hover:bg-white transition-all duration-300 active:scale-95"
            >
              <ChevronRight size={20} strokeWidth={3} />
              <span>Register Now</span>
            </Link>
          </div>
        </div>
      </div>

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
