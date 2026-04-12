"use client";

import {
  Calendar,
  ChevronRight,
  Clock,
  FileText,
  Send,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Hero() {
  const session = null;

  return (
    <div className="relative min-h-screen w-full overflow-hidden flex items-center justify-center bg-black">
      {/* Dynamic Background */}
      <div
        className="absolute inset-0 bg-cover bg-center scale-105 animate-slow-zoom"
        style={{ backgroundImage: "url('/images/hero.jpg')" }}
      />

      {/* 🚀 LIGHTER OVERLAY: Reduced opacity levels for a brighter look */}
      <div className="absolute " />

      {/* Animated Ambient Glow */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#C5A059]/20 rounded-full blur-[120px] animate-pulse pointer-events-none" />

      <div className="relative z-10 w-full pt-24 pb-10 px-6">
        <div className="max-w-6xl mx-auto text-center text-white flex flex-col items-center">
          {/* --- REDESIGNED TWO-COLUMN BADGE --- */}
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 mb-8 animate-in fade-in slide-in-from-top-4 duration-1000">
            <div className="flex flex-col items-center md:items-end md:border-r md:border-white/20 md:pr-8">
              <h3 className="text-[#C5A059] text-[11px] md:text-[13px] font-black uppercase tracking-[0.3em] leading-tight text-center md:text-right drop-shadow-md">
                Department of Business Administration
              </h3>
              <span className="text-slate-100 text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em] mt-1 drop-shadow-sm">
                East West University
              </span>
            </div>

            <div className="flex items-center gap-3 bg-black/20 backdrop-blur-xl border border-white/20 px-5 py-2 rounded-full hover:bg-white/10 transition-colors cursor-default">
              <Sparkles size={14} className="text-[#C5A059] animate-pulse" />
              <h2 className="text-[#C5A059] text-[10px] md:text-[11px] font-black uppercase tracking-[0.4em] whitespace-nowrap">
                Academic Excellence 2026
              </h2>
            </div>
          </div>

          {/* 🚀 READABILITY: Added shadow filter to maintain contrast on lighter BG */}
          <h1 className="text-[1.75rem] sm:text-[2.25rem] md:text-[3rem] lg:text-[3.5rem] font-black leading-[1.1] tracking-tighter uppercase mb-6 animate-in fade-in slide-in-from-bottom-6 duration-1000 px-2 text-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)]">
            International Conference on <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C5A059] to-[#E5C07B]">
              Building Resilient Supply Chains
            </span>
          </h1>

          {/* DATE & TIME SECTION WITH COUNTDOWN */}
          <div className="flex flex-col items-center gap-6 mb-10">
            <div className="flex flex-wrap justify-center gap-4 md:gap-8 bg-black/30 backdrop-blur-xl border border-white/20 p-4 md:p-6 rounded-[1.5rem] md:rounded-[2rem] shadow-2xl">
              <div className="flex items-center gap-3 px-2 md:px-4 border-r border-white/10">
                <Calendar className="text-[#C5A059] w-4 h-4 md:w-5 md:h-5" />
                <div className="text-left">
                  <p className="text-[0.45rem] md:text-[0.5rem] font-black text-[#C5A059] uppercase tracking-widest leading-none mb-1">
                    Conference Date
                  </p>
                  <p className="text-[0.75rem] md:text-[1rem] font-bold text-white leading-none">
                    18-19 Dec 2026
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 px-2 md:px-4 md:pr-8 border-r border-white/10 md:border-r-0 lg:border-r lg:border-white/10">
                <Clock className="text-[#C5A059] w-4 h-4 md:w-5 md:h-5" />
                <div className="text-left">
                  <p className="text-[0.45rem] md:text-[0.5rem] font-black text-[#C5A059] uppercase tracking-widest leading-none mb-1">
                    Event Schedule
                  </p>
                  <p className="text-[0.75rem] md:text-[1rem] font-bold text-white leading-none">
                    10am - 8pm
                  </p>
                </div>
              </div>

              <div className="px-2 md:px-4">
                <CountdownTimer targetDate="2026-12-18T10:00:00" />
              </div>
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto px-6">
            <Link
              href="/cfp"
              scroll={false}
              className="group flex items-center justify-center gap-2 border border-white/40 bg-black/20 backdrop-blur-md px-8 py-4 rounded-xl font-bold uppercase text-[0.6875rem] tracking-widest hover:bg-white hover:text-[#003366] transition-all duration-300 active:scale-95 text-white shadow-lg"
            >
              <FileText
                size={16}
                className="group-hover:rotate-12 transition-transform"
              />
              Call For Papers
            </Link>

            {session ? (
              <Link
                href="/dashboard/submit"
                className="flex items-center justify-center gap-2 bg-[#C5A059] text-[#003366] px-10 py-4 rounded-xl font-black uppercase text-[0.6875rem] tracking-widest shadow-2xl hover:bg-white transition-all duration-300 active:scale-95"
              >
                <Send size={16} />
                <span>Submit Paper</span>
              </Link>
            ) : (
              <Link
                href="/signup"
                scroll={false}
                className="flex items-center justify-center gap-2 bg-[#C5A059] text-[#003366] px-10 py-4 rounded-xl font-black uppercase text-[0.6875rem] tracking-widest shadow-2xl hover:bg-white transition-all duration-300 active:scale-95"
              >
                <ChevronRight size={18} />
                <span>Register Now</span>
              </Link>
            )}
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes slow-zoom {
          from {
            transform: scale(1);
          }
          to {
            transform: scale(1.1);
          }
        }
        .animate-slow-zoom {
          animation: slow-zoom 20s infinite alternate ease-in-out;
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
    <div className="flex gap-4 items-center">
      <div className="text-center">
        <p className="text-[0.45rem] md:text-[0.5rem] font-black text-[#C5A059] uppercase tracking-widest mb-1">
          Time to Event
        </p>
        <div className="flex gap-1 md:gap-2">
          <TimeBox val={timeLeft.days} unit="D" />
          <TimeBox val={timeLeft.hours} unit="H" />
          <TimeBox val={timeLeft.mins} unit="M" />
          <TimeBox val={timeLeft.secs} unit="S" />
        </div>
      </div>
    </div>
  );
}

function TimeBox({ val, unit }: { val: number; unit: string }) {
  return (
    <div className="bg-white/10 border border-white/5 rounded-lg px-1.5 md:px-2 py-1 min-w-[2rem] md:min-w-[2.5rem]">
      <p className="text-[0.7rem] md:text-[0.875rem] font-black text-white leading-none">
        {val.toString().padStart(2, "0")}
      </p>
      <p className="text-[0.35rem] md:text-[0.4375rem] font-bold text-[#C5A059] uppercase">
        {unit}
      </p>
    </div>
  );
}
