"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Award, GraduationCap, ShieldCheck } from "lucide-react";

export default function AboutEWUPage() {
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
            {/* LEFT COLUMN: Image & Stats */}
            <div className="lg:col-span-5 flex flex-col gap-6 lg:sticky lg:top-32">
              <div className="relative group">
                <div className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white transition-all duration-700">
                  <img
                    src="/images/about-conference.jpg"
                    alt="East West University Campus"
                    className="w-full h-auto lg:h-[500px] object-cover"
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

              {/* Stats Highlight under Photo */}
              <div className="grid grid-cols-3 gap-3">
                <div className="flex flex-col items-center text-center p-3 bg-white rounded-2xl border-2 border-[#C5A059] shadow-sm transform transition-transform hover:-translate-y-1">
                  <Award className="text-[#C5A059] mb-1.5" size={20} />
                  <p className="text-[8px] font-black text-[#003366] uppercase leading-tight">
                    ACBSP <br /> Accredited
                  </p>
                </div>
                <div className="flex flex-col items-center text-center p-3 bg-white rounded-2xl border-2 border-[#C5A059] shadow-sm transform transition-transform hover:-translate-y-1">
                  <ShieldCheck className="text-[#C5A059] mb-1.5" size={20} />
                  <p className="text-[8px] font-black text-[#003366] uppercase leading-tight">
                    ACCA <br /> Accredited
                  </p>
                </div>
                <div className="flex flex-col items-center text-center p-3 bg-white rounded-2xl border-2 border-[#C5A059] shadow-sm transform transition-transform hover:-translate-y-1">
                  <GraduationCap className="text-[#C5A059] mb-1.5" size={20} />
                  <p className="text-[8px] font-black text-[#003366] uppercase leading-tight">
                    AACSB <br /> Member
                  </p>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Content */}
            <div className="lg:col-span-7 space-y-8">
              <header className="space-y-2 text-left">
                <h2 className="text-[#C5A059] text-[10px] md:text-xs font-black uppercase tracking-[0.4em]">
                  Academic Excellence{" "}
                  <span className="font-bold">Since 1996</span>
                </h2>
                {/* Refined Title: More readable and compact */}
                <h4 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#003366] leading-[1.1] uppercase tracking-tighter">
                  East West University <br />&<br />
                  <span className="text-xl md:text-3xl text-[#C5A059]">
                    Department of Business Administration
                  </span>
                </h4>
              </header>

              <div className="space-y-6 text-slate-600 text-sm md:text-base leading-relaxed font-medium border-l-4 border-[#C5A059]/30 pl-6 text-justify">
                <p>
                  East West University (EWU), one of Bangladesh&apos;s leading
                  private universities, is recognized for its commitment to
                  academic excellence. With a strong emphasis on
                  interdisciplinary learning and sustainability, EWU actively
                  engages with pressing global challenges, including economic
                  resilience and sustainable development.
                </p>
                <p>
                  The Department of Business Administration (BA) stands out as a
                  center of excellence in business education, maintaining
                  rigorous international standards. Its programs are accredited
                  by the Accreditation Council for Business Schools and Programs
                  (ACBSP) and the Association of Chartered Certified Accountants
                  (ACCA), and are further recognized by leading national
                  professional bodies, including the Institute of Chartered
                  Accountants of Bangladesh (ICAB), the Institute of Cost and
                  Management Accountants of Bangladesh (ICMAB), and the
                  Institute of Chartered Secretaries of Bangladesh (ICSB).
                </p>
                <p>
                  Reflecting its focus on applied learning and industry
                  relevance, the department offers a specialized major in Supply
                  Chain Management as a core academic program. Through its
                  engagement in research and collaboration in areas such as
                  supply chain management, sustainability, and operational
                  resilience, the department is uniquely positioned to host this
                  conference and support meaningful scholarly exchange.
                </p>
              </div>

              {/* Bottom padding for standard margin */}
              <div className="pb-10"></div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
