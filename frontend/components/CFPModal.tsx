"use client";
import { CheckCircle2, ClipboardCheck, FileText, Send, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function CFPModal({
  onStartSubmission,
}: {
  onStartSubmission: any;
}) {
  const router = useRouter();

  const handleClose = () => {
    router.back();
  };

  const topics = [
    "Strategic Issues in Supply Chain Management",
    "Global Supply Chain Integration",
    "Industrial Application of Supply Chain Management",
    "Supply Chain Sustainability",
    "Circular Economy",
    "Supply Chain Digtization/AI application in SCM",
    "Supply Chain Management and SDGs",
    "Geo Politics, Geo Economy and SCM",
    "Supply Chain Finance",
    "Supply Chain Optimization",
    "Talent Management in SCM",
    "Outsourcing Logistics Services",
    "Responsible and Ethical SCM",
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
      /**
       * 🚀 FIX: To break out of the intercepted modal state and ensure the
       * login/signup page UI actually renders, we use window.location.href.
       * This performs a full refresh to the target route.
       */
      window.location.href = "/signup";
    }
  };

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-white w-full max-w-[1000px] rounded-2xl md:rounded-[2.5rem] shadow-2xl overflow-hidden relative flex flex-col animate-in fade-in zoom-in duration-300 max-h-[96vh] md:max-h-[92vh] my-auto">
        {/* --- BRANDED FIXED HEADER --- */}
        <div className="w-full bg-[#003366] p-4 md:px-8 md:py-6 flex items-center justify-between border-b border-white/10 shrink-0 z-30">
          <div className="flex items-center gap-3 md:gap-5">
            <div className="bg-white/10 p-1.5 rounded-xl backdrop-blur-sm border border-white/10 shrink-0">
              <img
                src="/images/logo.png"
                alt="EWU Logo"
                className="h-8 md:h-12 w-auto object-contain"
              />
            </div>
            <div className="flex flex-col text-left">
              <h2 className="text-white font-black text-sm md:text-xl leading-none tracking-tight uppercase">
                SCM <span className="text-[#C5A059]">CONFERENCE</span>
              </h2>
              <span className="text-white/60 text-[8px] md:text-[11px] tracking-[0.3em] mt-1 font-bold uppercase">
                INTERNATIONAL 2026
              </span>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-all border border-white/10"
          >
            <X size={24} />
          </button>
        </div>

        {/* --- MODAL CONTENT BODY --- */}
        <div className="flex flex-col md:flex-row overflow-hidden flex-grow items-stretch">
          {/* Left Panel: Sidebar */}
          <div className="w-full md:w-[42%] bg-[#003366] p-6 md:p-10 text-white flex flex-col relative overflow-hidden shrink-0">
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-[#C5A059]/10 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="flex-grow flex flex-col justify-start space-y-6 md:space-y-8 text-left relative z-10">
              <div>
                <div className="bg-[#C5A059] w-14 h-1.5 mb-6"></div>
                <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-[0.95] mb-4">
                  Call for <br />
                  <span className="text-[#C5A059]">Papers</span>
                </h3>
                <p className="text-slate-300 text-xs md:text-sm font-medium leading-relaxed max-w-[280px]">
                  Submit original research contributing to sustainable supply
                  chains and global industry trends.
                </p>
              </div>

              <div className="flex items-center gap-4 bg-white/5 border border-white/10 p-4 rounded-2xl backdrop-blur-md">
                <div className="w-10 h-10 rounded-xl bg-[#C5A059]/20 flex items-center justify-center text-[#C5A059] shrink-0">
                  <FileText size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-0.5">
                    Format
                  </p>
                  <p className="text-xs md:text-sm font-bold text-white uppercase">
                    PDF (300 Word Abstract)
                  </p>
                </div>
              </div>

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

            {/* Sidebar Action */}
            <div className="relative z-20 mt-10 pt-4 border-t border-white/10">
              <button
                onClick={handleSubmissionRedirect}
                className="w-full bg-[#C5A059] text-[#003366] py-4 rounded-2xl font-black uppercase tracking-widest text-[11px] flex items-center justify-center gap-3 hover:bg-white transition-all shadow-2xl active:scale-95 group"
              >
                Start Submission
                <Send
                  size={16}
                  className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                />
              </button>
            </div>
          </div>

          {/* Right Panel: Scrollable Topics */}
          <div className="w-full md:w-[58%] p-6 md:p-12 bg-white flex flex-col overflow-hidden">
            <div className="mb-8 text-left shrink-0">
              <h4 className="text-2xl md:text-3xl font-black text-[#003366] uppercase tracking-tight leading-tight">
                Conference Topics
              </h4>
              <p className="text-slate-500 text-[10px] md:text-xs font-medium mt-2 uppercase tracking-wider italic">
                Ready to submit? Review our core research themes.
              </p>
            </div>

            <div className="flex-grow overflow-y-auto pr-2 custom-scrollbar mb-8">
              <div className="grid grid-cols-1 gap-2.5">
                {topics.map((topic) => (
                  <div
                    key={topic}
                    className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 group hover:border-[#C5A059]/30 transition-all"
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
            <div className="mt-auto p-6 rounded-[2rem] bg-[#003366]/5 border border-dashed border-[#003366]/20 text-center shrink-0">
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-3">
                Have your abstract ready?
              </p>
              <button
                onClick={handleSubmissionRedirect}
                className="text-[#003366] font-black text-xs md:text-sm uppercase tracking-widest flex items-center justify-center gap-2 mx-auto hover:text-[#C5A059] transition-colors relative z-20 group"
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

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f8fafc;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #c5a059;
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
}
