"use client";

import {
  AlertCircle,
  BadgeDollarSign,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Download,
  FileDown,
  FileEdit,
  FileText,
  Layers,
  Map,
  X,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function Guidelines() {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const modalRef = useRef<HTMLDivElement>(null); // Ref for outside click detection

  useEffect(() => {
    if (activeModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [activeModal]);

  // Handler for closing when clicking the dark backdrop
  const handleOutsideClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      setActiveModal(null);
    }
  };

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
      id: "abstract",
      title: "Abstract Formatting Guideline",
      desc: "A Structured Abstracts should be between 500 to 750 words, including Purpose, Design/Methodology, Findings, Theoretical Implications and Practical Implications.",
      icon: FileEdit,
      color: "text-orange-500",
      bg: "bg-orange-500/10",
      isModal: true,
    },
    {
      id: "paper",
      title: "Full Paper Formatting Guideline",
      desc: "Technical requirements for the structure of the manuscript, layout, and submission requirements.",
      icon: BookOpen,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
      isModal: true,
    },
    {
      id: "pricing",
      title: "Registration Fees",
      desc: "Breakdown for Students, Professionals, and International attendees.",
      icon: BadgeDollarSign,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
      link: "pricing",
      isModal: false,
    },
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
            researchers submitting to SCM Conference 2026.
          </p>
        </div>

        {/* Guidelines Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
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
                <button
                  onClick={() =>
                    step.isModal
                      ? setActiveModal(step.id)
                      : scrollToSection(step.link!)
                  }
                  className="flex items-center gap-1.5 text-[9px] lg:text-[10px] font-black uppercase tracking-widest text-[#003366] hover:text-[#C5A059] transition-colors group/btn cursor-pointer"
                >
                  View Details
                  <ChevronRight
                    size={12}
                    className="group-hover/btn:translate-x-1 transition-transform"
                  />
                </button>
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
                className="flex items-center justify-center gap-3 px-6 py-4 bg-[#C5A059] text-[#003366] rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-[#003366] hover:text-white transition-all active:scale-95 group"
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

      {/* --- TEXT MODALS WITH OUTSIDE CLICK FIXED --- */}
      {activeModal && (
        <div
          className="fixed inset-0 z-[150] flex items-center justify-center p-4 md:p-6 bg-[#001021]/95 backdrop-blur-md animate-in fade-in duration-300 cursor-pointer"
          onClick={handleOutsideClick}
        >
          <div
            ref={modalRef}
            className="bg-white w-full max-w-5xl max-h-[90vh] rounded-[2.5rem] shadow-2xl overflow-hidden relative flex flex-col cursor-default"
          >
            {/* Thematic Modal Header */}
            <div className="w-full bg-[#003366] p-5 md:px-10 md:py-6 flex items-center justify-between border-b border-white/10 relative overflow-hidden shrink-0">
              <div className="flex items-center gap-4 md:gap-6 relative z-10">
                <div className="bg-white/10 p-2 rounded-xl backdrop-blur-sm border border-white/10 shrink-0">
                  <img
                    src="/images/logo.png"
                    alt="Logo"
                    className="h-10 md:h-12 w-auto object-contain"
                  />
                </div>
                <div className="flex flex-col text-left">
                  <h2 className="text-white font-black text-base md:text-xl leading-none tracking-tight uppercase">
                    SCM <span className="text-[#C5A059]">CONFERENCE</span>
                  </h2>
                  <span className="text-white/60 text-[9px] md:text-[11px] tracking-[0.2em] mt-1 font-bold uppercase">
                    {activeModal === "abstract"
                      ? "Abstract Formatting Guideline"
                      : "Full Paper Formatting Guideline"}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setActiveModal(null)}
                className="text-white/40 hover:text-white transition-colors p-2 cursor-pointer bg-white/5 rounded-full"
              >
                <X size={24} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 md:p-10 overflow-y-auto no-scrollbar bg-white">
              {activeModal === "abstract" ? (
                <div className="space-y-6">
                  <div className="p-6 bg-orange-50 border-l-4 border-orange-500 rounded-r-2xl">
                    <p className="text-sm md:text-base font-bold text-orange-900 leading-relaxed">
                      A structured abstract (maximum 500-750 words) including
                      the following elements:
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      "Purpose",
                      "Design/Methodology",
                      "Findings",
                      "Theoretical Implications",
                      "Practical Implications",
                    ].map((item, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100"
                      >
                        <CheckCircle2
                          className="text-[#C5A059] shrink-0"
                          size={20}
                        />
                        <span className="font-black text-[#003366] text-xs md:text-sm uppercase tracking-tight">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-8">
                  <div className="bg-[#C5A059]/10 p-4 rounded-xl text-center border-b-4 border-[#C5A059]">
                    <h4 className="font-black text-[#003366] uppercase text-lg">
                      Structure of the Manuscript
                    </h4>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="p-5 border border-slate-100 rounded-2xl bg-slate-50 group hover:border-[#C5A059] transition-colors">
                        <h5 className="font-black text-[#003366] uppercase text-xs tracking-widest mb-3 border-b border-slate-200 pb-2 flex items-center gap-2">
                          <div className="w-2 h-2 bg-[#C5A059] rounded-full" />{" "}
                          Title & Keywords
                        </h5>
                        <p className="text-xs text-slate-600 font-bold mb-3 italic">
                          The title should be concise, informative, and
                          reflective of the main focus of the study.
                        </p>
                        <p className="text-xs text-slate-600">
                          Provide up to **five(5)** relevant keywords that
                          reflect the core themes of the study.
                        </p>
                      </div>

                      <div className="p-5 border border-slate-100 rounded-2xl bg-slate-50 group hover:border-[#C5A059] transition-colors">
                        <h5 className="font-black text-[#003366] uppercase text-xs tracking-widest mb-3 border-b border-slate-200 pb-2 flex items-center gap-2">
                          <div className="w-2 h-2 bg-[#C5A059] rounded-full" />{" "}
                          Main Body & References
                        </h5>
                        <ul className="text-xs text-slate-600 font-bold grid grid-cols-2 gap-2 uppercase tracking-tighter">
                          <li>• Introduction</li>
                          <li>• Lit. Review</li>
                          <li>• Methodology</li>
                          <li>• Results</li>
                          <li>• Discussion</li>
                          <li>• Conclusion</li>
                        </ul>
                        <div className="mt-4 pt-4 border-t border-slate-200">
                          <p className="text-[10px] font-black text-[#C5A059] uppercase mb-1">
                            References Style:
                          </p>
                          <p className="text-[11px] text-slate-600 font-bold">
                            All references must follow the **APA 7th edition**
                            citation and referencing style.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="p-5 border border-red-100 rounded-2xl bg-red-50/50">
                        <h5 className="font-black text-red-600 uppercase text-xs tracking-widest mb-3 border-b border-red-100 pb-2 flex items-center gap-2">
                          <AlertCircle size={14} /> Common Pitfalls to Avoid
                        </h5>
                        <ul className="space-y-3">
                          <li className="text-[11px] leading-relaxed">
                            <span className="font-black text-red-800 uppercase block">
                              Failure to Follow Template:
                            </span>
                            Manuscripts that do not adhere to the required
                            formatting template may face rejection.
                          </li>
                          <li className="text-[11px] leading-relaxed">
                            <span className="font-black text-red-800 uppercase block">
                              Plagiarism Index:
                            </span>
                            Similarity index must remain **below 20%** via
                            Turnitin.
                          </li>
                        </ul>
                      </div>

                      <div className="p-5 border border-slate-100 rounded-2xl bg-slate-50">
                        <h5 className="font-black text-[#C5A059] uppercase text-xs tracking-widest mb-3 border-b border-slate-200 pb-2">
                          Layout & Submission Requirements
                        </h5>
                        <ul className="text-[10px] font-bold text-slate-600 space-y-2 uppercase leading-tight">
                          <li>• Font: Times New Roman, Size 12, Spacing 1.5</li>
                          <li>• Length: 6-8 Pages (Within 6000 words)</li>
                          <li>
                            • Margins: 2.54cm Top/Bottom, 3.18cm Left/Right
                          </li>
                          <li>• Format: Word (.doc/.docx) or PDF</li>
                          <li>
                            • AI Policy: Tools only for editing/proofreading,
                            not content production.
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row gap-4 justify-between items-center shrink-0">
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                Download PDF version for complete details
              </p>
              <a
                href={
                  activeModal === "abstract"
                    ? "/template/abstract_formatting_guideline.pdf"
                    : "/template/paper_guide.pdf"
                }
                className="flex items-center gap-2 px-6 py-3 bg-[#003366] text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-[#C5A059] transition-colors"
                download
              >
                <Download size={16} /> Download Guideline
              </a>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
