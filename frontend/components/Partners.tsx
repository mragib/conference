"use client";

import { Crown, Globe, Zap } from "lucide-react";
import Image from "next/image";

export default function Partners() {
  const partners = [
    {
      name: "East West University",
      logo: "/images/partners/ewu.png",
      cat: "Organizing",
      tier: "Lead Organizer",
      icon: Crown,
      color: "border-[#C5A059]",
      bg: "bg-[#C5A059]/5",
    },
    {
      name: "Mind Mapper",
      logo: "/images/partners/mind-mapper-logo.png",
      cat: "Organizing",
      tier: "Strategic Partner",
      icon: Globe,
      color: "border-[#003366]",
      bg: "bg-slate-50",
    },
    {
      name: "The Daily Star",
      logo: "/images/partners/the-daily-star-logo.png",
      cat: "Platinum",
      tier: "Media Partner",
      icon: Zap,
      color: "border-slate-200",
      bg: "bg-white",
    },
  ];

  return (
    <section
      id="partners"
      className="min-h-screen w-full flex items-center justify-center bg-[#FDFCFB] relative overflow-hidden py-24 md:py-16"
    >
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.05] pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[40vw] h-[40vw] bg-[#C5A059] rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[30vw] h-[30vw] bg-[#003366] rounded-full blur-[100px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full flex flex-col items-center">
        {/* Header Section */}
        <div className="text-center mb-16 space-y-4">
          {/* <div className="flex items-center justify-center gap-3 text-[#C5A059] font-black text-[10px] md:text-xs uppercase tracking-[0.4em] animate-in fade-in slide-in-from-bottom-2 duration-700">
            <Handshake size={18} /> Global Alliances
          </div> */}
          <h3 className="text-4xl md:text-6xl font-black text-[#003366] uppercase tracking-tighter leading-none">
            IN COLLABORATION{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C5A059] to-[#E5C07B]">
              WITH
            </span>
          </h3>
          <p className="text-slate-400 text-xs md:text-sm font-bold uppercase tracking-[0.2em] max-w-1.5xl mx-auto">
            Collaborating with leading institutions
          </p>
        </div>

        {/* Partners Layout Grid - 🚀 ADDED justify-center to keep items in middle */}
        <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 justify-center gap-6 md:gap-8 max-w-4xl mx-auto">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="group flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100"
            >
              {/* Logo Container */}
              <div
                className={`relative aspect-square w-full rounded-[2rem] border-2 ${partner.color} ${partner.bg} flex items-center justify-center p-6 md:p-10 transition-all duration-500 shadow-sm group-hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] group-hover:-translate-y-2 overflow-hidden`}
              >
                {/* Floating Category Icon */}
                <div className="absolute top-4 right-4 text-slate-300 group-hover:text-[#C5A059] group-hover:rotate-12 transition-all duration-500">
                  <partner.icon size={16} strokeWidth={2.5} />
                </div>

                {/* Subtle Background Badge for Category */}
                {/* <div className="absolute bottom-0 left-0 w-full py-2 bg-slate-50 border-t border-slate-100 translate-y-full group-hover:translate-y-0 transition-transform duration-500 flex justify-center">
                  <span className="text-[7px] font-black text-[#003366] uppercase tracking-widest">
                    {partner.cat}
                  </span>
                </div> */}

                <div className="relative w-full h-full transition-transform duration-700 group-hover:scale-110">
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    fill
                    sizes="(max-width: 768px) 50vw, 33vw"
                    className="object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                </div>
              </div>

              {/* Text Meta */}
              <div className="mt-5 text-center space-y-1">
                <h4 className="text-[11px] md:text-xs font-black text-[#003366] uppercase tracking-tight leading-tight group-hover:text-[#C5A059] transition-colors">
                  {partner.name}
                </h4>
                <div className="flex items-center justify-center gap-1.5">
                  <span className="h-px w-3 bg-[#C5A059]/40"></span>
                  <p className="text-[8px] md:text-[9px] font-bold text-slate-400 uppercase tracking-[0.15em]">
                    {partner.tier}
                  </p>
                  <span className="h-px w-3 bg-[#C5A059]/40"></span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
