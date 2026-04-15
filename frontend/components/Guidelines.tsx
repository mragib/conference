"use client";

import {
  BadgeDollarSign,
  BookOpen,
  ChevronRight,
  Download,
  FileDown,
  FileEdit,
  FileText,
  Layers,
  Map,
} from "lucide-react";
import Link from "next/link";

export default function Guidelines() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const steps = [
    {
      title: "Abstract Formatting Guideline",
      desc: "A Structured Abstracts should be between 500 to 750 words, including Purpose, Design/Methodology, Findings, Theoretical Implications and Practical Implications.",
      icon: FileEdit,
      color: "text-orange-500",
      bg: "bg-orange-500/10",
      link: "/template/abstract_formatting_guideline.pdf",
      isExternal: true,
      isDownload: true,
    },
    {
      title: "Full Paper Formatting Guideline",
      desc: "Technical requirements for the structure of the manuscript, layout, and submission requirements.",
      icon: BookOpen,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
      link: "/template/paper_guide.pdf",
      isExternal: true,
      isDownload: true,
    },
    {
      title: "Registration Fees",
      desc: "Breakdown for Students, Professionals, and International attendees.",
      icon: BadgeDollarSign,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
      link: "pricing",
      isExternal: false,
      isDownload: false,
    },
    // {
    //   title: "Publication Ethics",
    //   desc: "Guidelines on plagiarism and COPE ethical standards.",
    //   icon: Scale,
    //   color: "text-red-500",
    //   bg: "bg-red-500/10",
    //   link: "/legal",
    //   isExternal: true,
    //   isDownload: false,
    // },
  ];

  return (
    <section
      id="guidelines"
      className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-white pt-24 pb-12 md:py-8"
      style={{
        background: `radial-gradient(at 100% 0%, rgba(197, 160, 89, 0.05) 0px, transparent 50%), 
                     radial-gradient(at 0% 100%, rgba(0, 51, 102, 0.03) 0px, transparent 50%),
                     #FFFFFF`,
      }}
    >
      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full h-full flex flex-col justify-center">
        {/* Header */}
        <div className="mb-8 md:mb-10 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 text-[#C5A059] font-black text-[9px] md:text-[10px] uppercase tracking-[0.4em] mb-3 bg-[#C5A059]/10 px-3 py-1 rounded-full">
            <Layers size={12} /> Information Hub
          </div>
          <h3 className="text-3xl md:text-5xl lg:text-6xl font-black text-[#003366] uppercase tracking-tighter leading-tight">
            Submission <span className="text-[#C5A059]">Guidelines</span>
          </h3>
          <p className="text-slate-400 text-[11px] md:text-sm font-medium mt-3 max-w-xl leading-relaxed hidden xs:block">
            Essential technical requirements and ethical standards for
            researchers submitting to Conference DBA 2026.
          </p>
        </div>

        {/* Guidelines Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {steps.map((step, index) => (
            <div
              key={index}
              className="group relative p-5 lg:p-8 rounded-[2rem] bg-white border border-slate-100 hover:border-[#C5A059] hover:shadow-[0_20px_50px_rgba(197,160,89,0.1)] transition-all duration-500 hover:-translate-y-1 flex flex-col justify-between overflow-hidden"
            >
              <div>
                <div
                  className={`w-12 h-12 lg:w-14 lg:h-14 ${step.bg} ${step.color} rounded-2xl flex items-center justify-center mb-4 lg:mb-6 shadow-sm`}
                >
                  <step.icon size={24} />
                </div>

                <div className="space-y-2">
                  <h4 className="text-sm lg:text-lg font-black text-[#003366] uppercase tracking-tight">
                    {step.title}
                  </h4>
                  <p className="text-slate-500 text-[10px] lg:text-[11px] leading-relaxed font-medium">
                    {step.desc}
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-50">
                {step.isDownload ? (
                  <a
                    href={step.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-[9px] lg:text-[10px] font-black uppercase tracking-widest text-[#003366] hover:text-[#C5A059] transition-colors group/btn cursor-pointer"
                  >
                    View Details
                    <ChevronRight
                      size={12}
                      className="group-hover/btn:translate-x-1 transition-transform"
                    />
                  </a>
                ) : step.isExternal ? (
                  <Link
                    href={step.link}
                    className="flex items-center gap-1.5 text-[9px] lg:text-[10px] font-black uppercase tracking-widest text-[#003366] hover:text-[#C5A059] transition-colors group/btn"
                  >
                    View Details
                    <ChevronRight
                      size={12}
                      className="group-hover/btn:translate-x-1 transition-transform"
                    />
                  </Link>
                ) : (
                  <button
                    onClick={() => scrollToSection(step.link)}
                    className="flex items-center gap-1.5 text-[9px] lg:text-[10px] font-black uppercase tracking-widest text-[#003366] hover:text-[#C5A059] transition-colors group/btn cursor-pointer"
                  >
                    View Details
                    <ChevronRight
                      size={12}
                      className="group-hover/btn:translate-x-1 transition-transform"
                    />
                  </button>
                )}
              </div>

              <span className="absolute top-4 right-6 text-4xl lg:text-5xl font-black text-slate-100/40 pointer-events-none">
                0{index + 1}
              </span>
            </div>
          ))}
        </div>

        {/* Download Kit Section */}
        <div className="mt-12 p-8 md:p-10 rounded-[2.5rem] bg-slate-50 border border-slate-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
            <FileDown size={120} className="text-[#003366]" />
          </div>

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#003366] text-white flex items-center justify-center shadow-lg">
                  <Download size={20} />
                </div>
                <h4 className="text-xl font-black text-[#003366] uppercase tracking-tight">
                  Author Download Kit
                </h4>
              </div>
              <p className="text-slate-500 text-xs md:text-sm font-medium max-w-md">
                Download the official formatting templates and event guides
                required for your submission.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <a
                href="/template/abstract_formatting_guideline.pdf"
                download="abstract_formatting_guideline.pdf"
                className="flex items-center justify-center gap-3 px-6 py-4 bg-white border-2 border-slate-100 text-[#003366] rounded-2xl font-black text-[10px] uppercase tracking-widest hover:border-[#C5A059] hover:shadow-xl transition-all active:scale-95 group"
              >
                <FileText
                  size={18}
                  className="text-blue-500 group-hover:scale-110 transition-transform"
                />
                <span>Sample Abstract</span>
              </a>

              <a
                href="/template/paper_guide.pdf"
                download="full_paper_formatting_guideline.pdf"
                className="flex items-center justify-center gap-3 px-6 py-4 bg-white border-2 border-slate-100 text-[#003366] rounded-2xl font-black text-[10px] uppercase tracking-widest hover:border-[#C5A059] hover:shadow-xl transition-all active:scale-95 group"
              >
                <FileText
                  size={18}
                  className="text-emerald-500 group-hover:scale-110 transition-transform"
                />
                <span>Sample Full Paper</span>
              </a>

              <a
                href="/template/event_flyer.pdf"
                download="Event_Flyer_Final_Version.pdf"
                className="flex items-center justify-center gap-3 px-6 py-4 bg-[#C5A059] text-[#003366] rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-[#003366] hover:text-white hover:shadow-xl transition-all active:scale-95 group"
              >
                <Map
                  size={18}
                  className="group-hover:scale-110 transition-transform"
                />
                <span>Event Flyer</span>
              </a>
            </div>
          </div>
        </div>

        {/* Action Footer */}
        <div className="mt-8 flex justify-center lg:justify-end">
          <Link
            href="/signup"
            scroll={false}
            className="w-full md:w-auto px-10 py-4 bg-[#003366] text-white rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] hover:bg-[#C5A059] transition-all shadow-2xl active:scale-95 flex items-center justify-center gap-3"
          >
            Start Your Submission <ChevronRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
