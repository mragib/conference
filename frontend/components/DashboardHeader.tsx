import { PlusCircle } from "lucide-react";

export const DashboardHeader = ({ menuName }: { menuName: string }) => {
  return (
    <header className="h-28 md:h-32 bg-[#001A41] flex items-center justify-between px-6 md:px-12 shadow-2xl shrink-0 z-20">
      <div className="flex items-center gap-4 md:gap-6">
        <div className="p-2 md:p-3 bg-white/5 border border-white/10 rounded-2xl text-[#C5A059]">
          <PlusCircle size={24} />
        </div>
        <div>
          <h1 className="text-xl md:text-3xl font-black text-white uppercase tracking-tighter">
            {menuName}
          </h1>
          <p className="text-[8px] md:text-[10px] text-slate-400 font-black uppercase tracking-[0.25em] mt-1">
            SCM Conference 2026
          </p>
        </div>
      </div>
    </header>
  );
};
