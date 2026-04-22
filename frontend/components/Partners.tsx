"use client";

import { Award, Crown, Globe, Heart, Star, Zap } from "lucide-react";
import Image from "next/image";

export default function Partners() {
  const partners = [
    {
      name: "East West University",
      logo: "/images/partners/ewu.png",
      tier: "Lead Organizer",
      icon: Crown,
      color: "border-[#C5A059]",
      bg: "bg-[#C5A059]/5",
    },
    {
      name: "Mind Mapper",
      logo: "/images/partners/mind-mapper-logo.jpg",
      tier: "Strategic Partner",
      icon: Globe,
      color: "border-[#003366]",
      bg: "bg-[#003366]/5",
    },
    {
      name: "The Daily Star",
      logo: "/images/partners/the-daily-star-logo.png",
      tier: "Media Partner",
      icon: Zap,
      color: "border-[#e11d48]",
      bg: "bg-[#e11d48]/5",
    },
    {
      name: "Nescafe",
      logo: "/images/partners/nescafe_logo.png",
      tier: "Gold Partner",
      icon: Star,
      color: "border-[#059669]",
      bg: "bg-[#059669]/5",
    },
    {
      name: "M. M. Ispahani Limited",
      logo: "/images/partners/ispahani_logo.png",
      tier: "Silver Partner",
      icon: Award,
      color: "border-[#7c3aed]",
      bg: "bg-[#7c3aed]/5",
    },
    {
      name: "Maggi",
      logo: "/images/partners/maggi_logo.png",
      tier: "Bronze Partner",
      icon: Heart,
      color: "border-[#ea580c]",
      bg: "bg-[#ea580c]/5",
    },
  ];

  return (
    <section className="w-full bg-[#FDFCFB] relative overflow-hidden py-24 md:py-16">
      <style jsx>{`
        @keyframes scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          display: flex;
          animation: scroll 30s linear infinite;
        }
        .marquee-container:hover .animate-marquee {
          animation-play-state: paused;
        }
      `}</style>

      {/* Header */}
      <div className="max-w-7xl mx-auto px-5 md:px-10 mb-16">
        <h3 className="text-4xl md:text-6xl font-black text-[#003366] uppercase tracking-tighter leading-none text-center">
          IN COLLABORATION{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C5A059] to-[#E5C07B]">
            WITH
          </span>
        </h3>
        <p className="text-slate-400 text-xs md:text-sm font-bold uppercase tracking-[0.2em] mt-4 text-center">
          Collaborating with leading institutions
        </p>
      </div>

      {/* Marquee Wrapper - Padding moved here so the scroll track starts flush */}
      <div className="marquee-container flex overflow-hidden w-full cursor-pointer pt-10 pb-10">
        <div className="animate-marquee gap-8 md:gap-12 pl-5 md:pl-10">
          {[...partners, ...partners, ...partners].map((partner, index) => (
            <div
              key={index}
              className="group flex flex-col items-center flex-shrink-0 w-32 md:w-40"
            >
              {/* Box Shape Container with 1.25x Zoom Effect */}
              <div
                className={`relative z-10 w-32 h-32 md:w-40 md:h-40 rounded-lg border-2 ${partner.color} ${partner.bg} flex items-center justify-center p-6 transition-all duration-300 shadow-sm hover:shadow-2xl hover:scale-125`}
              >
                {/* Floating Icon */}
                <div className="absolute top-2 right-2 text-slate-300 group-hover:text-[#C5A059] transition-all">
                  <partner.icon size={12} strokeWidth={2.5} />
                </div>

                {/* Logo Image */}
                <div className="relative w-full h-full">
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    fill
                    sizes="160px"
                    className="object-contain transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
              </div>

              {/* Text Meta */}
              <div className="mt-6 text-center space-y-1">
                <h4 className="text-[10px] md:text-xs font-black text-[#003366] uppercase tracking-tight group-hover:text-[#C5A059] transition-colors">
                  {partner.name}
                </h4>
                <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">
                  {partner.tier}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
