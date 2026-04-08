import { BarChart3 } from "lucide-react";

const AdminHeader = ({ menuName }: { menuName: string }) => {
  return (
    <header className="h-32 bg-[#001A41] flex items-center justify-between px-12 shadow-2xl relative shrink-0">
      <div className="flex items-center gap-6">
        <div className="p-3 bg-white/5 border border-white/10 rounded-2xl text-[#C5A059] shadow-inner">
          <BarChart3 size={28} strokeWidth={2.5} />
        </div>
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tighter leading-none">
            {menuName}
          </h1>
          <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.25em] mt-2 opacity-80">
            Conference Operations & System Health
          </p>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
