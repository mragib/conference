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

  // Repeat for seamless loop
  const scrollNews = [...newsItems, ...newsItems, ...newsItems];

  const handleAction = (id: string) => {
    const sectionId = id.replace("#", "");
    const element = document.getElementById(sectionId);

    if (pathname === "/" && element) {
      // If on home page and element exists, scroll to it
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: "smooth",
      });
    } else {
      // If on any other page, redirect to home page with hash
      router.push(`/${id}`);
    }
  };

  return (
    <div className="fixed bottom-0 left-0 w-full z-[90] bg-[#003366] text-white border-t border-white/10 py-3 shadow-[0_-10px_25px_-5px_rgba(0,0,0,0.4)] group">
      {/* 🚀 CRITICAL FIX: Injected Keyframes so it works on all pages */}
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.33%);
          }
        }
        .animate-marquee-infinite {
          display: flex;
          animation: marquee 40s linear infinite;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 flex items-center gap-4">
        {/* Animated Updates Badge */}
        <div className="shrink-0 flex items-center gap-2 bg-[#C5A059] text-[#003366] px-4 py-1.5 rounded-full shadow-lg z-10">
          <Megaphone size={14} className="animate-bounce" />
          <span className="text-[10px] font-black uppercase tracking-widest whitespace-nowrap">
            Updates
          </span>
        </div>

        {/* Scrolling Text Container */}
        <div className="relative flex overflow-x-hidden w-full items-center">
          <div className="animate-marquee-infinite whitespace-nowrap gap-12 items-center group-hover:[animation-play-state:paused]">
            {scrollNews.map((news, index) => (
              <button
                key={index}
                onClick={() => handleAction(news.link)}
                className="flex items-center gap-3 transition-all duration-300 hover:text-[#C5A059] cursor-pointer group/item shrink-0"
              >
                <span className="text-xs md:text-sm font-bold tracking-tight uppercase">
                  {news.text}
                </span>
                <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center opacity-0 group-hover/item:opacity-100 transition-opacity">
                  <ArrowUpRight size={12} />
                </div>
                {/* Visual Separator */}
                <span className="ml-4 text-white/20 font-light">|</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
