import { Send } from "lucide-react";

const SubmitPage = () => {
  const CHARACTER_LIMIT = 500;

  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-12 custom-scrollbar bg-slate-50/30">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-[2rem] md:rounded-[3rem] p-6 md:p-12 shadow-2xl border border-slate-100 space-y-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#003366] via-[#C5A059] to-[#003366]" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8"></div>

          <button
            type="button"
            className="w-full py-5 bg-[#001A41] text-white font-black uppercase tracking-[0.2em] text-xs rounded-2xl shadow-2xl hover:bg-[#C5A059] hover:text-[#001A41] active:scale-[0.98] transition-all flex items-center justify-center gap-4"
          >
            <Send size={18} /> Preview Submission
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubmitPage;
