import { ClipboardCheck } from "lucide-react";

const ReviewerHeader = ({
  menuName,
  menuText,
}: {
  menuName: string;
  menuText: string;
}) => {
  return (
    <header className="h-32 bg-[#001A41] flex items-center justify-between px-10 shadow-2xl shrink-0 z-20">
      <div className="flex items-center gap-5">
        <div className="p-3 bg-white/5 border border-white/10 rounded-2xl text-[#C5A059]">
          <ClipboardCheck size={26} strokeWidth={2.5} />
        </div>
        <div>
          <h1 className="text-xl font-black text-white uppercase tracking-tighter leading-none">
            {menuName}
          </h1>
          <p className="text-[9px] text-slate-400 font-black uppercase tracking-[0.25em] mt-1.5 opacity-80">
            {menuText}
          </p>
        </div>
      </div>
    </header>
  );
};

export default ReviewerHeader;
