"use client";
import { CheckCircle2, ClipboardCheck, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

export default function CFPModal({
  onStartSubmission,
}: {
  onStartSubmission: any;
}) {
  const router = useRouter();
  const modalRef = useRef<HTMLDivElement>(null);

  const handleClose = () => {
    router.back();
  };

  // 🚀 Logic to close when clicking the dark backdrop
  const handleOutsideClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      handleClose();
    }
  };

  const topics = [
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

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const handleSubmissionRedirect = (e: any) => {
    e?.preventDefault();
    if (onStartSubmission) {
      onStartSubmission();
    } else {
      window.location.href = "/signup";
    }
  };

  return (
    <div
      className="fixed inset-0 z-[150] flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-sm cursor-pointer"
      onClick={handleOutsideClick}
    >
      <div
        ref={modalRef}
        className="bg-white w-full max-w-[1000px] rounded-2xl md:rounded-[2.5rem] shadow-2xl overflow-hidden relative flex flex-col animate-in fade-in zoom-in duration-300 max-h-[96vh] md:max-h-[92vh] my-auto cursor-default"
        onClick={(e) => e.stopPropagation()} // Prevents closing when clicking inside content
      >
        {/* --- BRANDED FIXED HEADER --- */}
        <div className="w-full bg-[#003366] p-4 md:px-8 md:py-5 flex items-center justify-between border-b border-white/10 shrink-0 z-30">
          <div className="flex items-center gap-3 md:gap-5">
            <div className="bg-white/10 p-1.5 rounded-xl backdrop-blur-sm border border-white/10 shrink-0">
              <img
                src="/images/logo.png"
                alt="EWU Logo"
                className="h-8 md:h-10 w-auto object-contain"
              />
            </div>
            <div className="flex flex-col text-left">
              <h2 className="text-white font-black text-sm md:text-lg leading-none tracking-tight uppercase">
                SCM <span className="text-[#C5A059]">CONFERENCE</span>
              </h2>
              <span className="text-white/60 text-[8px] md:text-[10px] tracking-[0.3em] mt-1 font-bold uppercase">
                INTERNATIONAL 2026
              </span>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="w-10 h-10 md:w-11 md:h-11 flex items-center justify-center rounded-full text-white/40 hover:text-white hover:bg-white/10 transition-all border border-white/10 cursor-pointer"
          >
            <X size={22} />
          </button>
        </div>

        {/* --- MODAL CONTENT BODY --- */}
        <div className="flex flex-col md:flex-row overflow-hidden flex-grow items-stretch">
          {/* Left Panel: Sidebar */}
          <div className="w-full md:w-[40%] bg-[#003366] p-6 md:p-10 text-white flex flex-col relative overflow-hidden shrink-0">
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-[#C5A059]/10 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="flex-grow flex flex-col justify-start space-y-6 md:space-y-8 text-left relative z-10">
              <div>
                <div className="bg-[#C5A059] w-12 h-1.5 mb-6"></div>
                <h5 className="text-2xl md:text-3xl font-black uppercase tracking-tighter leading-[0.95] mb-4">
                  Call for <span className="text-[#C5A059]">Papers</span>
                </h5>
                <p className="text-slate-300 text-xs md:text-sm font-medium leading-relaxed max-w-[280px]">
                  Submit original research contributing to sustainable supply
                  chains and global industry trends.
                </p>
              </div>

              {/* 🚀 FIXED: Removed Format Card as per marked image */}

              <div className="space-y-3 pt-2">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#C5A059] mb-3">
                  Submission Readiness
                </p>
                {[
                  "Clear Research Methodology",
                  "Aligned with Conference Themes",
                  "Properly formatted Abstract",
                  "Contact Details Included",
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 text-[10px] md:text-xs text-slate-300 font-bold uppercase tracking-tight"
                  >
                    <ClipboardCheck
                      size={16}
                      className="text-[#C5A059] shrink-0"
                    />{" "}
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* 🚀 FIXED: Removed 'Start Submission' button from sidebar as per marked image */}
          </div>

          {/* Right Panel: Scrollable Topics */}
          <div className="w-full md:w-[60%] p-6 md:p-10 bg-white flex flex-col overflow-hidden">
            <div className="mb-6 text-left shrink-0">
              <h4 className="text-2xl md:text-3xl font-black text-[#003366] uppercase tracking-tight leading-tight">
                Conference Topics
              </h4>
              <p className="text-slate-500 text-[10px] md:text-xs font-medium mt-1 uppercase tracking-wider italic">
                Ready to submit? Review our core research themes.
              </p>
            </div>

            {/* 🚀 REMOVED VISIBLE SCROLLBAR GAPS */}
            <div className="flex-grow overflow-y-auto pr-1 no-scrollbar mb-6">
              <div className="grid grid-cols-1 gap-2">
                {topics.map((topic) => (
                  <div
                    key={topic}
                    className="flex items-center gap-4 p-3.5 rounded-2xl bg-slate-50 border border-slate-100 group hover:border-[#C5A059]/30 transition-all shadow-sm"
                  >
                    <CheckCircle2
                      size={18}
                      className="text-[#C5A059] shrink-0"
                    />
                    <span className="text-[10px] md:text-[11px] font-bold text-slate-600 uppercase tracking-tight group-hover:text-[#003366] text-left leading-tight">
                      {topic}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom CTA Box */}
            <div className="mt-auto p-6 rounded-[1.5rem] bg-[#003366]/5 border border-dashed border-[#003366]/20 text-center shrink-0">
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-3">
                Have your abstract ready?
              </p>
              <button
                onClick={handleSubmissionRedirect}
                className="text-[#003366] font-black text-xs md:text-sm uppercase tracking-widest flex items-center justify-center gap-2 mx-auto hover:text-[#C5A059] transition-colors relative z-20 group cursor-pointer"
              >
                Open Submission Form
                <span className="group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
