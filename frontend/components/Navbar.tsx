"use client";

import {
  ChevronDown,
  LayoutDashboard,
  Mail,
  Menu,
  Phone,
  X,
  BookOpen,
  ExternalLink
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import SignOutButtonNavbar from "./signOutButtonNavbar";

const navLinks = [
  { name: "Dates", href: "/key-dates" },
  { name: "Speakers", href: "/keynote-speaker" },
  { name: "Guidelines", href: "/guidelines" },
  { name: "Committee", href: "/committee" },
  { name: "Registration", href: "/pricing" },
  { name: "Partners", href: "/partners" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar({ user }: { user?: any }) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isMobileAboutOpen, setIsMobileAboutOpen] = useState(false);
  
  // Modal & Auth Dropdown states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAuthDropdownOpen, setIsAuthDropdownOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      const scrollPos = window.scrollY;
      const isInnerPage = pathname !== "/";
      setIsScrolled(scrollPos > 10 || isInnerPage);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  // Handle outside click for the modal
  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setIsModalOpen(false);
      }
    }
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isModalOpen]);

  if (!mounted) return null;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${
          isScrolled
            ? "bg-[#002147]/95 backdrop-blur-xl shadow-2xl"
            : "bg-transparent"
        }`}
      >
        {/* --- TOP CONTACT BAR --- */}
        {!isScrolled && (
          <div className="hidden lg:block w-full bg-black/40 backdrop-blur-md border-b border-white/5">
            <div className="max-w-7xl mx-auto px-4 lg:px-8 flex justify-end h-10 items-center">
              <div className="flex items-center gap-6">
                <a href="mailto:helpdesk-scm@ewubd.edu" className="flex items-center gap-2 group">
                  <Mail size={14} className="text-[#C5A059]" />
                  <span className="text-[10px] font-bold text-white uppercase group-hover:text-[#C5A059] tracking-wider transition-colors">
                    helpdesk-scm@ewubd.edu
                  </span>
                </a>
                <a href="mailto:helpdesk.scm@ewubd.edu" className="flex items-center gap-2 group">
                  <Mail size={14} className="text-[#C5A059]" />
                  <span className="text-[10px] font-bold text-white uppercase group-hover:text-[#C5A059] tracking-wider transition-colors">
                    helpdesk.scm@ewubd.edu
                  </span>
                </a>
                <div className="w-px h-3 bg-white/20"></div>
                <div className="flex items-center gap-2">
                  <Phone size={14} className="text-[#C5A059]" />
                  <span className="text-[10px] font-bold text-white uppercase tracking-wider">
                    09666775577 | EXT-213/132
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* --- MAIN NAV --- */}
        <div className={`w-full transition-all duration-500 ${!isScrolled ? "bg-black/30 backdrop-blur-lg py-3" : "py-1.5"}`}>
          {/* 🚀 FIXED LAYOUT CONTAINER: Changed from max-w-7xl to strict max-w-6xl / max-w-7xl content boundaries to group logo and links together */}
          <div className="max-w-7xl mx-auto px-4 flex justify-between items-center w-full">
            
            {/* Left Brand Area (Logo + Main Text) */}
            <div className="flex items-center gap-6 shrink-0">
              <Link href="/" className="flex items-center gap-2.5 group pr-2">
                <div className="relative w-10 h-10 md:w-12 md:h-12 rounded-xl overflow-hidden bg-white/10 border border-white/20 p-1.5 transition-all">
                  <Image src="/images/logo.png" alt="Logo" fill sizes="56px" className="object-contain p-1" priority />
                </div>
                <div className="flex flex-col uppercase leading-none text-white drop-shadow-md">
                  <h1 className="font-black text-xs md:text-base tracking-tighter">
                    SCM <span className="text-[#C5A059]">CONFERENCE</span>
                  </h1>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation Links Grouped Together */}
            {/* 🚀 RECONFIGURED RESPONSIVE CONTAINER: tight padding gaps to keep elements safely inside screen limits */}
            <div className="hidden lg:flex items-center gap-1 xl:gap-2 shrink-0 select-none">
              <div
                className="relative group"
                onMouseEnter={() => setIsAboutOpen(true)}
                onMouseLeave={() => setIsAboutOpen(false)}
              >
                <button className="px-2 py-2 rounded-full text-[10px] xl:text-[11px] font-black uppercase text-white hover:text-white flex items-center gap-0.5 cursor-pointer tracking-tight">
                  About{" "}
                  <ChevronDown size={12} className={`transition-transform ${isAboutOpen ? "rotate-180" : ""}`} />
                </button>
                {isAboutOpen && (
                  <div className="absolute top-full left-0 w-48 pt-2 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="bg-[#002147] border border-white/10 rounded-2xl p-2 shadow-2xl backdrop-blur-xl">
                      <Link href="/about-ewu" className="block px-4 py-3 rounded-xl text-[10px] font-bold text-white/70 hover:text-white hover:bg-white/5 transition-colors uppercase">
                        About EWU
                      </Link>
                      <Link href="/about-conference" className="block px-4 py-3 rounded-xl text-[10px] font-bold text-white/70 hover:text-white hover:bg-white/5 transition-colors uppercase">
                        About Conference
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-2 xl:px-3 py-2 rounded-full text-[10px] xl:text-[11px] font-black uppercase transition-all duration-300 border tracking-tight ${
                    pathname === link.href
                      ? "bg-white/20 border-white/40 text-white"
                      : "text-white/80 border-transparent hover:text-white"
                  }`}
                >
                  {link.name}
                </Link>
              ))}

              {/* Journal Collaboration Action Item Layout */}
              <button
                onClick={() => setIsModalOpen(true)}
                className="ml-0.5 pl-2.5 pr-2 py-1 rounded-xl text-[9px] xl:text-[10px] font-black uppercase text-[#C5A059] hover:text-white transition-all cursor-pointer flex items-center gap-2 bg-white/5 border border-white/10 hover:border-[#C5A059]/40 shadow-sm group tracking-tight"
              >
                <div className="flex flex-col text-right tracking-tight leading-[1.2] text-white/90 group-hover:text-[#C5A059] transition-colors">
                  <span>Journal</span>
                  <span>Collaboration</span>
                </div>
                <div className="w-px h-5 bg-white/20 group-hover:bg-[#C5A059]/40 transition-colors" />
                <div className="relative w-14 h-7 md:w-16 md:h-8 rounded bg-white p-0.5 shadow-md flex items-center justify-center overflow-hidden border border-white/20 group-hover:scale-105 transition-transform duration-300 shrink-0">
                  <img src="/images/hero/oscm.png" alt="OSCM Journal Logo" className="w-full h-full object-cover" />
                </div>
              </button>

              <div className="h-5 w-px bg-white/10 mx-1 xl:mx-1.5"></div>
              
              {user ? (
                <div className="flex items-center gap-3">
                  <Link href="/dashboard" className="text-white hover:text-[#C5A059] transition-all font-bold flex items-center gap-1 uppercase text-[10px] xl:text-[11px]">
                    <LayoutDashboard size={14} /> Dashboard
                  </Link>
                  <SignOutButtonNavbar />
                </div>
              ) : (
                <div 
                  className="relative group"
                  onMouseEnter={() => setIsAuthDropdownOpen(true)}
                  onMouseLeave={() => setIsAuthDropdownOpen(false)}
                >
                  <button className="px-3 py-2 bg-[#C5A059] text-[#002147] rounded-xl font-black text-[10px] flex items-center gap-0.5 uppercase tracking-wider transition-all cursor-pointer shadow-md whitespace-nowrap">
                    Join Portal <ChevronDown size={11} className={`transition-transform duration-300 ${isAuthDropdownOpen ? "rotate-180" : ""}`} />
                  </button>
                  {isAuthDropdownOpen && (
                    <div className="absolute top-full right-0 w-36 pt-2 animate-in fade-in slide-in-from-top-2 duration-200">
                      <div className="bg-[#002147] border border-white/10 rounded-2xl p-1.5 shadow-2xl backdrop-blur-xl space-y-1">
                        <Link href="/signin" className="block text-center px-4 py-2 rounded-xl text-[10px] font-black text-white/80 hover:text-[#C5A059] hover:bg-white/5 transition-all uppercase">
                          Sign In
                        </Link>
                        <Link href="/signup" className="block text-center px-4 py-2 bg-[#C5A059] text-[#002147] rounded-xl text-[10px] font-black hover:bg-white transition-all uppercase">
                          Join Now
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            <button
              className="lg:hidden p-2 text-white bg-black/20 backdrop-blur-md rounded-xl border border-white/10"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </nav>

      {/* --- MOBILE DRAWER --- */}
      <div className={`fixed inset-0 z-[200] lg:hidden transition-all duration-500 ${isMobileMenuOpen ? "visible" : "invisible"}`}>
        <div className={`absolute inset-0 bg-[#001021]/95 backdrop-blur-md transition-opacity ${isMobileMenuOpen ? "opacity-100" : "opacity-0"}`} onClick={() => setIsMobileMenuOpen(false)} />
        <div className={`absolute right-0 top-0 h-full w-[85%] bg-[#002147] p-6 transition-transform duration-500 flex flex-col ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}>
          <div className="flex justify-between items-start mb-8">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-white/10 border border-white/20 p-1.5">
                <Image src="/images/logo.png" alt="Logo" fill sizes="48px" className="object-cover p-1" />
              </div>
              <h2 className="text-white font-black text-sm uppercase">SCM <span className="text-[#C5A059]">CONFERENCE</span></h2>
            </div>
            <button onClick={() => setIsMobileMenuOpen(false)} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/50 border border-white/10">
              <X size={20} />
            </button>
          </div>

          <div className="flex-grow overflow-y-auto space-y-1">
            <div className="border-b border-white/5">
              <button onClick={() => setIsMobileAboutOpen(!isMobileAboutOpen)} className="w-full flex items-center justify-between p-4 font-black uppercase text-xs tracking-wide text-[#C5A059]">
                About <ChevronDown size={16} className={`transition-transform duration-300 ${isMobileAboutOpen ? "rotate-180" : ""}`} />
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${isMobileAboutOpen ? "max-h-40 bg-white/5" : "max-h-0"}`}>
                <Link href="/about-ewu" onClick={() => setIsMobileMenuOpen(false)} className="block p-4 pl-8 text-white/60 font-bold uppercase text-[11px] border-b border-white/5">About EWU</Link>
                <Link href="/about-conference" onClick={() => setIsMobileMenuOpen(false)} className="block p-4 pl-8 text-white/60 font-bold uppercase text-[11px]">About Conference</Link>
              </div>
            </div>

            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setIsMobileMenuOpen(false)} className={`w-full flex items-center justify-between p-4 rounded-xl font-bold uppercase transition-all text-xs tracking-wide group border-b border-white/5 last:border-0 ${pathname === link.href ? "bg-white/10 text-white" : "text-white/60 hover:bg-white/5"}`}>
                {link.name}
              </Link>
            ))}

            <button 
              onClick={() => { setIsMobileMenuOpen(false); setIsModalOpen(true); }} 
              className="w-full flex items-center justify-between p-4 text-[#C5A059] font-black uppercase text-xs tracking-wide hover:bg-white/5 rounded-xl text-left border-t border-white/5"
            >
              <div className="flex flex-col leading-[1.2]">
                <span>Journal</span>
                <span>Collaboration</span>
              </div>
              <div className="relative w-14 h-7 rounded overflow-hidden shrink-0 bg-white p-0.5 shadow-md">
                <img src="/images/hero/oscm.png" alt="OSCM" className="w-full h-full object-cover" />
              </div>
            </button>
          </div>

          <div className="mt-auto pt-6 border-t border-white/10 space-y-4">
            <div className="space-y-3 px-2">
              <a href="mailto:helpdesk-scm@ewubd.edu" className="flex items-center gap-3 text-white/50 hover:text-[#C5A059] transition-colors">
                <Mail size={16} className="text-[#C5A059]" />
                <span className="text-[10px] font-bold uppercase tracking-wider">helpdesk-scm@ewubd.edu</span>
              </a>
              <a href="mailto:helpdesk.scm@ewubd.edu" className="flex items-center gap-3 text-white/50 hover:text-[#C5A059] transition-colors">
                <Mail size={16} className="text-[#C5A059]" />
                <span className="text-[10px] font-bold uppercase tracking-wider">helpdesk.scm@ewubd.edu</span>
              </a>
              <div className="flex items-center gap-3 text-white/50">
                <Phone size={16} className="text-[#C5A059]" />
                <span className="text-[10px] font-bold uppercase tracking-wider">09666775577 | EXT-213/132</span>
              </div>
            </div>

            {user ? (
              <div className="grid grid-cols-2 gap-3">
                <Link href="/dashboard" className="text-white hover:text-[#C5A059] transition-all font-bold flex items-center justify-center gap-2 uppercase border border-[#C5A059] px-4 py-3.5 rounded-xl text-center text-[10px]">
                  <LayoutDashboard size={14} /> Dashboard
                </Link>
                <SignOutButtonNavbar />
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                <Link href="/signin" onClick={() => setIsMobileMenuOpen(false)} className="py-3.5 border border-white/10 text-white rounded-xl font-black uppercase text-[10px] bg-white/5 text-center">Sign In</Link>
                <Link href="/signup" onClick={() => setIsMobileMenuOpen(false)} className="py-3.5 bg-[#C5A059] text-[#002147] rounded-xl font-black uppercase text-[10px] shadow-lg text-center">Join Now</Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* --- COLLABORATION MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[250] flex items-center justify-center p-4 bg-[#001A41]/85 backdrop-blur-md animate-in fade-in duration-300">
          <div ref={modalRef} className="bg-white w-full max-w-xl rounded-[2.5rem] shadow-2xl overflow-hidden relative border border-slate-100 flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200">
            <div className="absolute top-0 left-0 right-0 h-25 bg-gradient-to-r from-[#003366] via-[#C5A059] to-[#003366]" />
            
            <div className="p-6 md:p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/70 relative">
              <div className="absolute top-0 right-12 bottom-0 w-32 opacity-5 pointer-events-none bg-[radial-gradient(#003366_1px,transparent_1px)] [background-size:16px_16px]" />
              <div className="flex items-center gap-3 relative z-10">
                <div className="p-2.5 bg-[#002147] text-[#C5A059] rounded-xl shadow-md border border-white/10">
                  <BookOpen size={20} />
                </div>
                <div>
                  <h3 className="text-sm font-black text-[#003366] uppercase tracking-widest leading-none">Publication Partnership</h3>
                  <p className="text-[8px] text-slate-400 font-bold uppercase tracking-[0.2em] mt-1.5">Official OSCM Journal Alignment</p>
                </div>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="p-2 bg-white text-slate-400 hover:text-red-500 rounded-xl transition-all shadow-sm border border-slate-100 relative z-10 active:scale-95"><X size={18} /></button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 text-center custom-scrollbar">
              <div className="relative w-full h-36 max-w-[340px] mx-auto bg-slate-50/50 rounded-2xl border border-slate-100/80 p-5 shadow-inner flex items-center justify-center">
                <img
                  src="/images/hero/oscm.png"
                  alt="OSCM Journal Logo"
                  className="w-full h-full object-contain transform transition-transform duration-500 hover:scale-105"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    const parent = e.currentTarget.parentElement;
                    if(parent && !parent.querySelector('.fallback-el')) {
                      const el = document.createElement('div');
                      el.className = 'fallback-el text-xs font-black text-[#003366] uppercase tracking-widest';
                      el.innerText = 'OSCM JOURNAL LOGO';
                      parent.appendChild(el);
                    }
                  }}
                />
              </div>

              <p className="text-slate-600 text-sm leading-relaxed text-justify bg-slate-50/50 p-5 rounded-2xl border border-slate-100 shadow-sm font-medium">
                The conference is collaborating with <strong className="text-[#003366] font-black">‘Operations and Supply Chain Management: An International Journal (OSCM)’</strong>, whereby selected manuscripts will be invited to submit to the journal. For more information about the journal, visit: <a href="https://journal.oscm-forum.org/" target="_blank" rel="noopener noreferrer" className="text-[#C5A059] font-bold underline hover:text-[#002147] transition-colors">https://journal.oscm-forum.org/</a>
              </p>

              <div className="grid grid-cols-2 gap-3 text-center">
                <div className="bg-slate-50 px-4 py-2.5 rounded-xl border border-slate-100 shadow-sm">
                  <span className="text-[8px] font-black text-slate-400 uppercase tracking-wider block mb-0.5">Standard Print</span>
                  <span className="text-xs font-bold text-[#003366]">ISSN: 1979-3561</span>
                </div>
                <div className="bg-slate-50 px-4 py-2.5 rounded-xl border border-slate-100 shadow-sm">
                  <span className="text-[8px] font-black text-slate-400 uppercase tracking-wider block mb-0.5">Electronic Format</span>
                  <span className="text-xs font-bold text-[#003366]">EISSN: 2579-9363</span>
                </div>
              </div>
            </div>

            <div className="p-4 md:p-6 bg-slate-50/50 border-t border-slate-100 flex flex-col sm:flex-row justify-end items-center gap-3">
              <a href="https://journal.oscm-forum.org/" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-[#003366] text-white font-black uppercase text-[10px] rounded-xl hover:bg-[#C5A059] hover:text-[#002147] transition-all shadow-md group">
                <span>Visit Journal Portal</span>
                <ExternalLink size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}