"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { School } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AboutEWUPage() {
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
              <School size={20} className="md:w-8 md:h-8" />
            </div>
            <h1 className="text-2xl md:text-6xl font-black text-white tracking-tighter uppercase">
              East West <span className="text-[#C5A059]">University</span>
            </h1>
          </div>
          <p className="text-slate-400 text-[7px] md:text-[10px] font-black uppercase tracking-[0.3em] mt-2">
            Academic Excellence Since 1996
          </p>
        </div>
      </div>

      {/* --- CONTENT AREA --- */}
      <main className="relative z-10 flex flex-col items-center -mt-6 md:-mt-10 pb-20 px-4">
        <div className="max-w-4xl w-full bg-white rounded-[1.5rem] md:rounded-[2.5rem] p-5 md:p-12 shadow-xl border border-slate-100 animate-in fade-in zoom-in duration-700">
          <div className="space-y-8">
            <div className="relative w-full h-64 md:h-96 rounded-[1.5rem] md:rounded-[2rem] overflow-hidden shadow-xl">
              <img
                src="/images/about-conference.jpg"
                alt="EWU Campus"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>

            <div className="space-y-6 text-slate-600 text-sm md:text-lg leading-relaxed font-medium text-justify">
              <p>
                East West University (EWU) is a prominent private institution in
                Bangladesh, established in 1996 with a mission to provide
                world-class education and foster academic excellence. The
                university offers a wide range of undergraduate and postgraduate
                programs across fields including Business Administration,
                Computer Science, Electrical Engineering, Law, and more.
              </p>
              <p>
                With a strong emphasis on research and innovation, EWU strives
                to foster critical thinking, problem-solving, and creative
                expression. The university is dedicated to building global
                partnerships and maintaining academic integrity. EWU’s highly
                qualified faculty members are dedicated to mentoring students,
                preparing them for leadership roles in both the local and global
                job markets.
              </p>
            </div>

            <div className="pt-6 border-t border-slate-100 flex justify-center">
              <button
                onClick={() => router.push("/")}
                className="bg-[#003366] text-white px-10 py-4 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-[#C5A059] transition-all shadow-lg active:scale-95"
              >
                Return to Home
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
