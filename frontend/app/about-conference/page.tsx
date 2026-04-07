"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Info } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AboutConferencePage() {
  const router = useRouter();

  return (
    <div className="relative min-h-screen w-full bg-[#FDFCFB] selection:bg-[#C5A059] selection:text-white">
      <Navbar />

      {/* --- HERO HEADER --- */}
      <div className="w-full bg-[#003366] pt-28 pb-12 md:pt-48 md:pb-20 px-6 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[160px] bg-gradient-to-b from-black/40 via-black/10 to-transparent pointer-events-none z-10" />

        <div className="max-w-5xl mx-auto relative z-10">
          <div className="flex flex-row items-center justify-center gap-3 md:gap-6 mb-2">
            <div className="w-10 h-10 md:w-16 md:h-16 bg-white/5 rounded-xl md:rounded-[1.5rem] text-[#C5A059] flex items-center justify-center border border-white/10 shadow-lg">
              <Info size={20} className="md:w-8 md:h-8" />
            </div>
            <h1 className="text-2xl md:text-6xl font-black text-white tracking-tighter uppercase">
              Conference <span className="text-[#C5A059]">Prospectus</span>
            </h1>
          </div>
          <p className="text-slate-400 text-[7px] md:text-[10px] font-black uppercase tracking-[0.3em] mt-2">
            International Conference 2026
          </p>
        </div>
      </div>

      {/* --- CONTENT AREA --- */}
      <main className="relative z-10 flex flex-col items-center -mt-6 md:-mt-10 pb-20 px-4">
        <div className="max-w-4xl w-full bg-white rounded-[1.5rem] md:rounded-[2.5rem] p-5 md:p-12 shadow-xl border border-slate-100 animate-in fade-in zoom-in duration-700">
          <div className="space-y-10">
            <p className="text-slate-600 text-sm md:text-lg leading-relaxed font-medium text-justify italic border-l-4 border-[#C5A059] pl-6">
              The Conference on Building Resilient Supply Chains offers a
              vibrant forum for exploring how organizations can effectively
              anticipate, withstand, and recover from disruptions in today's
              volatile global landscape. Through cutting-edge research
              presentations and engaging discussions, the conference delivers
              practical insights and innovative strategies to build resilient
              supply chains.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-8 bg-slate-50 rounded-[1.5rem] md:rounded-[2rem] border border-slate-100 shadow-sm hover:border-[#C5A059]/30 transition-all">
                <h5 className="font-black text-[#003366] text-xs uppercase mb-3 tracking-widest">
                  Venue
                </h5>
                <p className="text-slate-500 text-sm md:text-base font-bold">
                  East West University, Dhaka, Bangladesh.
                </p>
              </div>
              <div className="p-8 bg-slate-50 rounded-[1.5rem] md:rounded-[2rem] border border-slate-100 shadow-sm hover:border-[#C5A059]/30 transition-all">
                <h5 className="font-black text-[#003366] text-xs uppercase mb-3 tracking-widest">
                  Host
                </h5>
                <p className="text-slate-500 text-sm md:text-base font-bold">
                  Department of Business Administration, EWU
                </p>
              </div>
            </div>

            <div className="pt-8 border-t border-slate-100 flex justify-center">
              <button
                onClick={() => router.push("/")}
                className="bg-[#C5A059] text-[#003366] px-10 py-4 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-[#003366] hover:text-white transition-all shadow-lg active:scale-95"
              >
                Explore More
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
