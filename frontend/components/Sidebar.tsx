"use client";

import { Role } from "@/lib/type";
import {
  BarChart3,
  ClipboardCheck,
  FileText,
  Landmark,
  LayoutDashboard,
  Menu,
  PlusCircle,
  Settings,
  ShieldCheck,
  UserCircle,
  Users,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import SignOutButton from "./signOutButton";

const Sidebar = ({ user }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const researcherItems = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { name: "Submit Abstract", icon: PlusCircle, path: "/dashboard/submit" },
    { name: "My Abstracts", icon: FileText, path: "/dashboard/abstracts" },
    { name: "Profile", icon: UserCircle, path: "/dashboard/profile" },
    // { name: "Event Timeline", icon: Calendar, path: "/dashboard/schedule" },
    // { name: "Certificates", icon: Award, path: "/dashboard/certificates" },
  ];

  const reviewerItems = [
    { name: "Review Overview", icon: LayoutDashboard, path: "/reviewer" },
    {
      name: "Review Abstracts",
      icon: ClipboardCheck,
      path: "/reviewer/abstracts",
    },
    {
      name: "My Abstracts",
      icon: FileText,
      path: "/reviewer/my-abstracts",
    },
    {
      name: "Submit Abstract",
      icon: PlusCircle,
      path: "/reviewer/submit",
    },
    { name: "Profile", icon: UserCircle, path: "/reviewer/profile" },
    // {
    //   name: "Completed Reviews",
    //   icon: CheckCircle,
    //   path: "/reviewer/completed",
    // },
  ];

  const adminItems = [
    { name: "Admin Console", icon: ShieldCheck, path: "/admin" },
    { name: "Manage Abstracts", icon: BarChart3, path: "/admin/abstracts" },
    // { name: "Event Schedule", icon: Calendar, path: "/admin/schedule" },
    // { name: "Finance & Revenue", icon: CreditCard, path: "/admin/finance" },
    { name: "Reviewer Management", icon: Users, path: "/admin/reviewers" },

    { name: "User Management", icon: Users, path: "/admin/users" },
    // { name: "Sub Themes", icon: SwatchBook, path: "/admin/sub-themes" },
    // { name: "Activity Logs", icon: History, path: "/admin/logs" },
  ];

  const authorityItems = [
    { name: "Authority Desk", icon: Landmark, path: "/authority" },
    { name: "Event Stats", icon: BarChart3, path: "/authority/stats" },
  ];

  const userRole = user?.role;
  const isAdmin = userRole === "ADMIN";
  const isReviewer = userRole === "REVIEWER";
  const isAuthority = userRole === "AUTHORITY";

  const getMenuItems = () => {
    if (userRole === Role.ADMIN) {
      return [
        ...adminItems,
        // { name: "Profile", icon: UserCircle, path: "/dashboard/profile" },
        { name: "Settings", icon: Settings, path: "/admin/settings" },
      ];
    }

    if (userRole === Role.REVIEWER) return [...reviewerItems];
    if (userRole === Role.AUTHORITY) return [...authorityItems];
    return [...researcherItems];
  };
  const menuItems = getMenuItems();
  return (
    <>
      {/* Mobile Trigger Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-[#003366] flex items-center justify-between px-6 z-[60] shadow-md border-b border-white/5">
        <Link href="/" className="flex items-center gap-3 cursor-pointer">
          <Image
            src="/images/logo.png"
            alt="Logo"
            width={30}
            height={30}
            className="object-contain"
          />
          <h2 className="text-sm font-black text-white uppercase tracking-tighter">
            SCM <span className="text-[#C5A059]">Conference</span>
          </h2>
        </Link>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Backdrop for Mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[70] md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed md:sticky top-0 left-0 z-[80] flex flex-col w-72 bg-[#003366] text-white h-screen p-6 shadow-2xl transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0 "
        }`}
      >
        {/* BRANDED HEADER */}
        <div className="mb-10 flex flex-col items-center text-center animate-in fade-in duration-500">
          <Link
            href="/"
            className="relative w-16 h-16 mb-4 p-2 bg-white/10 rounded-2xl border border-white/10 shadow-xl"
          >
            <Image
              src="/images/logo.png"
              alt="Logo"
              fill
              sizes="64px"
              className="object-contain p-2"
              priority
            />
          </Link>
          <h2 className="text-xl font-black uppercase tracking-tighter leading-none text-white">
            SCM <span className="text-[#C5A059]">CONFERENCE</span>
          </h2>
          <p className="text-[10px] text-white/40 font-bold uppercase tracking-[0.2em] mt-2">
            INTERNATIONAL 2026
          </p>
          <div className="mt-4 px-4 py-1 bg-[#C5A059]/10 border border-[#C5A059]/20 rounded-full">
            <span className="text-[9px] text-[#C5A059] font-black uppercase tracking-widest">
              {isAdmin
                ? "Admin"
                : isReviewer
                  ? "Reviewer"
                  : isAuthority
                    ? "Authority"
                    : "Researcher"}{" "}
              Portal
            </span>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 space-y-2 overflow-y-auto no-scrollbar">
          {menuItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.name}
                href={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-bold text-xs uppercase tracking-wider group ${
                  isActive
                    ? "bg-[#C5A059] text-[#003366] shadow-lg"
                    : "text-slate-300 hover:bg-white/5 hover:text-white"
                }`}
              >
                <item.icon
                  size={18}
                  className={
                    isActive
                      ? "text-[#003366]"
                      : "text-slate-400 group-hover:text-[#C5A059]"
                  }
                />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* User Profile & Logout Section */}
        <div className="pt-6 border-t border-white/10 mt-auto">
          <div className="flex items-center gap-3 px-2 mb-6 text-left">
            {user?.image ? (
              <div className="relative w-10 h-10 shrink-0">
                <Image
                  src={user.image}
                  alt="Profile"
                  fill
                  sizes="40px"
                  className="rounded-full border-2 border-[#C5A059] object-cover shadow-lg"
                  priority
                />
              </div>
            ) : (
              <div className="w-10 h-10 shrink-0 rounded-full bg-[#C5A059] flex items-center justify-center text-[#003366] font-black uppercase border border-white/10 shadow-inner">
                {user?.name?.charAt(0) || "U"}
              </div>
            )}

            <div className="overflow-hidden">
              <p className="text-sm font-bold truncate text-white leading-tight">
                {user?.name}
              </p>
              <p className="text-[9px] text-slate-400 truncate uppercase tracking-tighter font-black mt-0.5 opacity-60">
                {user?.email}
              </p>
            </div>
          </div>
          <SignOutButton />

          {/* <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="flex items-center gap-3 w-full px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-xl transition-all font-bold uppercase text-[10px] tracking-widest group"
          >
            <LogOut
              size={18}
              className="group-hover:-translate-x-1 transition-transform"
            />
            Logout
          </button> */}
        </div>
      </aside>

      <div className="h-16 md:hidden" />
    </>
  );
};

export default Sidebar;
