"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { CheckCircle2, MapPin, School } from "lucide-react";

export default function AboutConferencePage() {
  const subThemes = [
    "Strategic Issues in Supply Chain Management",
    "Global Supply Chain Integration",
    "Industrial Application of Supply Chain Management",
    "Supply Chain Sustainability",
    "Circular Economy",
    "Supply Chain Digtization/AI application in Supply Chain Management",
    "Supply Chain Management and SDGs",
    "Geo Politics, Geo Economy and Supply Chain Management",
    "Supply Chain Finance",
    "Supply Chain Optimization",
    "Talent Management in Supply Chain Management",
    "Outsourcing Logistics Services",
    "Responsible and Ethical Supply Chain Management",
    "Building Adaptive and Risk-Intelligent Supply Chains",
  ];

  return (
    <div className="relative min-h-screen w-full bg-white selection:bg-[#C5A059] selection:text-white">
      <Navbar />

      <section className="min-h-screen w-full flex items-center justify-center relative overflow-hidden px-5 md:px-10 py-24 lg:py-0">
        {/* Background Accents */}
        <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
          <div className="absolute top-[-5%] left-[-5%] w-[40vw] h-[40vw] bg-[#C5A059]/20 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-[-5%] right-[-5%] w-[40vw] h-[40vw] bg-[#003366]/10 rounded-full blur-[120px]"></div>
        </div>

        <div className="max-w-7xl mx-auto w-full h-full flex flex-col justify-center relative z-10 pt-20 md:pt-32 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-16 items-start">
            {/* LEFT COLUMN: Reduced Photo Size & Bold Highlighted Stats */}
            <div className="lg:col-span-5 flex flex-col gap-6 lg:sticky lg:top-32">
              <div className="relative group">
                <div className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white transition-all duration-700">
                  <img
                    src="/images/ewu-dawn.jpg"
                    alt="Conference Venue"
                    // 🚀 Reduced height for a more standard look
                    className="w-full h-auto lg:h-[420px] object-cover"
                  />
                  <div className="absolute top-6 left-6 z-30 w-16 h-16 bg-black/40 backdrop-blur-md rounded-2xl p-2 border border-white/50">
                    <img
                      src="/images/logo.png"
                      alt="EWU Logo"
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
              </div>

              {/* 🚀 Bold Highlighted Venue & Host Section */}
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4 p-5 bg-white rounded-2xl border-2 border-[#C5A059] shadow-lg transform transition-transform hover:-translate-y-1">
                  <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-[#C5A059] border border-slate-100 shadow-sm">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-[#003366]/40 uppercase tracking-widest leading-none mb-1">
                      Venue
                    </p>
                    <p className="text-xs md:text-sm font-black text-[#003366] uppercase">
                      East West University, Dhaka
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-5 bg-white rounded-2xl border-2 border-[#C5A059] shadow-lg transform transition-transform hover:-translate-y-1">
                  <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-[#C5A059] border border-slate-100 shadow-sm">
                    <School size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-[#003366]/40 uppercase tracking-widest leading-none mb-1">
                      Host
                    </p>
                    <p className="text-xs md:text-sm font-black text-[#003366] uppercase">
                      Dept. of Business Administration
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Detailed Content */}
            <div className="lg:col-span-7 space-y-10">
              <header className="space-y-2 text-left">
                <h2 className="text-[#C5A059] text-[10px] md:text-xs font-black uppercase tracking-[0.4em]">
                  Conference <span className="font-bold">Prospectus</span> 2026
                </h2>
                <h4 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#003366] leading-[1.1] uppercase tracking-tighter">
                  About The Conference <br />
                  <span className="text-xl md:text-3xl text-[#C5A059]">
                    on Building Resilient Supply Chains
                  </span>
                </h4>
              </header>

              <div className="space-y-6 text-slate-600 text-sm md:text-base leading-relaxed font-medium border-l-4 border-[#C5A059]/30 pl-6 text-justify italic">
                <p>
                  The Conference on Building Resilient Supply Chains offers a
                  vibrant forum for exploring how organizations can effectively
                  anticipate, withstand, and recover from disruptions in
                  today&apos;s volatile global landscape.
                </p>
                <p>
                  The event brings together leading academics, industry experts,
                  and policymakers to drive conversations on strategic risk
                  management, sustainability, digital innovation, and
                  transformative partnerships. Through cutting-edge research
                  presentations and engaging discussions, the conference
                  delivers practical insights and innovative strategies to build
                  resilient supply chains, advance operational excellence, and
                  ensure long-term competitiveness in interconnected global
                  markets.
                </p>
              </div>

              {/* Sub-Themes Section */}
              <div className="space-y-6 pt-4">
                <div className="flex items-center gap-4">
                  <div className="h-px flex-grow bg-slate-100"></div>
                  <h5 className="font-black text-[#003366] text-xs uppercase tracking-[0.2em]">
                    Conference Sub-Themes
                  </h5>
                  <div className="h-px flex-grow bg-slate-100"></div>
                </div>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-wider text-center">
                  Papers and abstracts are invited under the following sub
                  themes:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {subThemes.map((theme, index) => (
                    <div key={index} className="flex items-start gap-3 group">
                      <CheckCircle2
                        size={18}
                        className="text-[#C5A059] shrink-0 mt-0.5 group-hover:scale-110 transition-transform"
                      />
                      <span className="text-slate-600 text-[11px] md:text-xs font-bold uppercase leading-tight group-hover:text-[#003366] transition-colors">
                        {theme}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
