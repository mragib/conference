"use client";

import { CheckCircle2, Globe2, Trophy } from "lucide-react";

export default function Highlights() {
  const themeHighlights = [
    "Scope for Publication in Peer Reviewed/Scopus Indexed Journals",
    "Renowned Keynote Speakers from Academia and Industry",
    "Academic-Industry Discussion and Industry Talk",
    "Opportunities for Oral Poster Presentation for students",
    "Attended by International Participants",
  ];

  return (
    <section
      id="highlights"
      className="min-h-screen lg:h-screen w-full flex items-center justify-center relative overflow-hidden bg-white py-12 lg:py-0"
    >
      {/* Background Decorative Element */}
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-[50vw] h-[50vw] bg-[#C5A059] rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-5%] w-[50vw] h-[50vw] bg-[#003366] rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full h-full flex flex-col justify-center">
        {/* Header */}
        <div className="mb-8 lg:mb-12 text-center lg:text-left shrink-0">
          <div className="inline-flex items-center gap-2 text-[#C5A059] font-black text-[9px] md:text-[10px] uppercase tracking-[0.4em] mb-3 bg-[#C5A059]/10 px-4 py-1.5 rounded-full">
            <Trophy size={14} /> Event Excellence
          </div>
          <h3 className="text-3xl md:text-5xl lg:text-6xl font-black text-[#003366] uppercase tracking-tighter leading-none">
            Conference <span className="text-[#C5A059]">Highlights</span>
          </h3>
        </div>

        {/* 🚀 TWO COLUMN LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* LEFT COLUMN: Main Info Card */}
          <div className="w-full">
            <div className="bg-[#003366] rounded-[2.5rem] p-8 md:p-12 flex flex-col justify-between text-white shadow-2xl relative overflow-hidden group border-4 border-white h-full min-h-[350px]">
              <div className="relative z-10">
                <h4 className="text-lg md:text-2xl font-bold text-white leading-tight group-hover:text-[#C5A059] transition-colors mb-8">
                  Sustainable business trends and technological evolution in
                  2026
                </h4>

                <div className="space-y-8">
                  <div className="space-y-2">
                    <p className="text-[#C5A059] text-[10px] font-black uppercase tracking-[0.3em]">
                      Conference Date
                    </p>
                    <h4 className="text-3xl md:text-4xl font-black leading-none tracking-tight">
                      18th-19th <span className="text-[#C5A059]">Dec</span> 2026
                    </h4>
                  </div>
                  <div className="space-y-2">
                    <p className="text-[#C5A059] text-[10px] font-black uppercase tracking-[0.3em]">
                      Event Schedule
                    </p>
                    <p className="text-white font-bold text-2xl md:text-3xl leading-tight">
                      10:00am - 8:00pm
                    </p>
                  </div>
                </div>
              </div>

              <Globe2
                size={220}
                className="absolute -bottom-12 -right-12 text-white opacity-[0.05] group-hover:rotate-12 transition-transform duration-1000 pointer-events-none"
              />
            </div>
          </div>

          {/* RIGHT COLUMN: Theme Highlights */}
          <div className="flex flex-col h-full">
            <div className="flex items-center gap-4 mb-6">
              <h4 className="text-[#003366] font-black text-sm md:text-base uppercase tracking-[0.2em] whitespace-nowrap">
                Theme Highlights
              </h4>
              <div className="h-px w-full bg-gradient-to-r from-slate-200 to-transparent"></div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {themeHighlights.map((text, i) => (
                <div
                  key={i}
                  className="group relative p-[1px] rounded-2xl transition-all duration-500 hover:translate-x-2"
                >
                  {/* Border Gradient */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#003366]/20 via-[#C5A059]/40 to-transparent group-hover:from-[#003366] group-hover:via-[#C5A059]"></div>

                  <div className="relative bg-white h-full p-4 md:p-5 rounded-[0.95rem] flex items-center gap-4 z-10 shadow-sm border border-slate-50">
                    <div className="shrink-0 bg-[#C5A059]/10 p-2 rounded-xl text-[#C5A059] group-hover:bg-[#003366] group-hover:text-white transition-all shadow-inner">
                      <CheckCircle2 size={18} />
                    </div>
                    <p className="text-[#003366] text-[11px] md:text-[13px] font-black leading-snug uppercase tracking-tight">
                      {text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Hide scrollbar logic for a cleaner 100vh feel */}
      <style jsx global>{`
        @media (min-width: 1024px) {
          body {
            overflow-x: hidden;
          }
        }
      `}</style>
    </section>
  );
}
