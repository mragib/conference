"use client";

import { ArrowUpRight, Megaphone } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

export default function Marquee() {
  const router = useRouter();
  const pathname = usePathname();

  const newsItems = [
    {
      text: "Abstract Submission Deadline Extended to May 30, 2026!",
      link: "#guidelines",
    },
    {
      text: "Prof. Dr. Robert Higgins confirmed as Lead Keynote Speaker.",
      link: "#speakers",
    },
    {
      text: "Early Bird Registration is now OPEN — Save up to 20%!",
      link: "#pricing",
    },
    {
      text: "Special Session on 'AI in Supply Chain' added to the tracks.",
      link: "#about",
    },
    {
      text: "IEEE Bangladesh Section joins as Technical Co-Sponsor.",
      link: "#partners",
    },
  ];

  const scrollNews = [...newsItems, ...newsItems, ...newsItems];

  const handleAction = (id: string) => {
    const sectionId = id.replace("#", "");
    const element = document.getElementById(sectionId);
    if (pathname === "/" && element) {
      window.scrollTo({ top: element.offsetTop - 80, behavior: "smooth" });
    } else {
      router.push(`/${id}`);
    }
  };

  return (
    <div className="fixed bottom-0 left-0 w-full z-[90] bg-[#003366] text-white border-t border-white/10 py-3 shadow-[0_-10px_25px_-5px_rgba(0,0,0,0.4)] group overflow-hidden">
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.33%);
          }
        }
        .marquee-wrapper {
          display: flex !important;
          flex-direction: row !important;
          flex-wrap: nowrap !important;
          width: max-content;
          animation: marquee 40s linear infinite;
          will-change: transform;
        }
        .marquee-item {
          flex-shrink: 0 !important;
          display: flex !important;
          align-items: center;
          white-space: nowrap !important;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 flex items-center gap-4 relative">
        {/* Updates Badge - Fixed to Left */}
        <div className="shrink-0 flex items-center gap-2 bg-[#C5A059] text-[#003366] px-3 md:px-4 py-1.5 rounded-full shadow-lg z-20">
          <Megaphone size={14} className="animate-bounce" />
          <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest whitespace-nowrap">
            Updates
          </span>
        </div>

        {/* Scrolling Area - Restricted to one line */}
        <div className="flex-1 overflow-hidden whitespace-nowrap">
          <div className="marquee-wrapper group-hover:[animation-play-state:paused]">
            {scrollNews.map((news, index) => (
              <button
                key={index}
                onClick={() => handleAction(news.link)}
                className="marquee-item gap-3 px-6 md:px-8 transition-all duration-300 hover:text-[#C5A059] cursor-pointer"
              >
                <span className="text-xs md:text-sm font-bold tracking-tight">
                  {news.text}
                </span>
                <ArrowUpRight
                  size={12}
                  className="opacity-40 group-hover:opacity-100 transition-opacity shrink-0"
                />
                <span className="ml-2 text-white/20 font-light shrink-0">
                  |
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
