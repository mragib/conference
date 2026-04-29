"use client";

import {
  ChevronDown,
  LayoutDashboard,
  Mail,
  Menu,
  Phone,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import SignOutButton from "./signOutButton";
import SignOutButtonNavbar from "./signOutButtonNavbar";

const navLinks = [
  { name: "Dates", href: "/key-dates" },
  { name: "Keynote Speaker", href: "/keynote-speaker" },
  { name: "Guidelines", href: "/guidelines" },
  { name: "Committee", href: "/committee" },
  { name: "Registration Fee", href: "/pricing" },
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

  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      const scrollPos = window.scrollY;

      const isInnerPage = pathname !== "/"; // 👈 ALL inner pages

      setIsScrolled(scrollPos > 10 || isInnerPage);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

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
        {/* --- TOP CONTACT BAR: HIDDEN ON MOBILE --- */}
        {!isScrolled && (
          <div className="hidden lg:block w-full bg-black/40 backdrop-blur-md border-b border-white/5">
            <div className="max-w-7xl mx-auto px-4 lg:px-8 flex justify-end h-10 items-center">
              <div className="flex items-center gap-6">
                <a
                  href="mailto:helpdesk-scm@ewubd.edu"
                  className="flex items-center gap-2 group"
                >
                  <Mail size={14} className="text-[#C5A059]" />
                  <span className="text-[10px] font-bold text-white uppercase group-hover:text-[#C5A059] tracking-wider transition-colors">
                    helpdesk-scm@ewubd.edu
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
        <div
          className={`w-full transition-all duration-500 ${!isScrolled ? "bg-black/30 backdrop-blur-lg py-3" : "py-2"}`}
        >
          <div className="max-w-7xl lg:max-w-max mx-auto px-4 lg:px-8 flex justify-between items-center">
            <Link
              href="/"
              className="flex items-center gap-3 shrink-0 group pr-6"
            >
              <div className="relative w-11 h-11 md:w-14 md:h-14 rounded-xl overflow-hidden bg-white/10 border border-white/20 p-1.5 transition-all">
                <Image
                  src="/images/logo.png"
                  alt="Logo"
                  fill
                  sizes="56px"
                  className="object-contain p-1"
                  priority
                />
              </div>
              <div className="flex flex-col uppercase leading-none text-white drop-shadow-md">
                <h1 className="font-black text-sm md:text-xl tracking-tighter">
                  SCM <span className="text-[#C5A059]">CONFERENCE</span>
                </h1>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-1 xl:gap-2">
              <div
                className="relative group"
                onMouseEnter={() => setIsAboutOpen(true)}
                onMouseLeave={() => setIsAboutOpen(false)}
              >
                <button className="px-3 xl:px-4 py-2 rounded-full text-[10px] xl:text-[11px] font-black uppercase text-white hover:text-white flex items-center gap-1 cursor-pointer">
                  About{" "}
                  <ChevronDown
                    size={14}
                    className={`transition-transform ${isAboutOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {isAboutOpen && (
                  <div className="absolute top-full left-0 w-48 pt-2 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="bg-[#002147] border border-white/10 rounded-2xl p-2 shadow-2xl backdrop-blur-xl">
                      <Link
                        href="/about-ewu"
                        className="block px-4 py-3 rounded-xl text-[10px] font-bold text-white/70 hover:text-white hover:bg-white/5 transition-colors uppercase"
                      >
                        About EWU
                      </Link>
                      <Link
                        href="/about-conference"
                        className="block px-4 py-3 rounded-xl text-[10px] font-bold text-white/70 hover:text-white hover:bg-white/5 transition-colors uppercase"
                      >
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
                  className={`px-3 xl:px-4 py-2 rounded-full text-[10px] xl:text-[11px] font-black uppercase transition-all duration-300 border ${
                    pathname === link.href
                      ? "bg-white/20 border-white/40 text-white"
                      : "text-white/80 border-transparent hover:text-white"
                  }`}
                >
                  {link.name}
                </Link>
              ))}

              <div className="h-5 w-px bg-white/10 mx-1 xl:mx-2"></div>
              {user ? (
                <div className="flex items-center gap-5">
                  <Link
                    href="/dashboard"
                    className="text-white hover:text-[#C5A059] transition-all font-bold flex items-center gap-2 uppercase"
                  >
                    <LayoutDashboard size={16} /> Dashboard
                  </Link>
                  <SignOutButtonNavbar />
                </div>
              ) : (
                <div className="flex items-center gap-3 xl:gap-5">
                  <Link
                    href="/signin"
                    className="text-white font-black text-[10px] hover:text-[#C5A059] uppercase transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/signup"
                    className="bg-[#C5A059] text-[#002147] px-5 py-2.5 rounded-xl font-black text-[10px] hover:bg-white active:scale-95 transition-all uppercase"
                  >
                    Join Now
                  </Link>
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
      <div
        className={`fixed inset-0 z-[200] lg:hidden transition-all duration-500 ${isMobileMenuOpen ? "visible" : "invisible"}`}
      >
        <div
          className={`absolute inset-0 bg-[#001021]/95 backdrop-blur-md transition-opacity ${isMobileMenuOpen ? "opacity-100" : "opacity-0"}`}
          onClick={() => setIsMobileMenuOpen(false)}
        />
        <div
          className={`absolute right-0 top-0 h-full w-[85%] bg-[#002147] p-6 transition-transform duration-500 flex flex-col ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}
        >
          <div className="flex justify-between items-start mb-8">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-white/10 border border-white/20 p-1.5">
                <Image
                  src="/images/logo.png"
                  alt="Logo"
                  fill
                  sizes="48px"
                  className="object-contain p-1"
                />
              </div>
              <h2 className="text-[#C5A059] font-black text-sm uppercase">
                SCM Conference
              </h2>
            </div>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/50 border border-white/10"
            >
              <X size={20} />
            </button>
          </div>

          <div className="flex-grow overflow-y-auto space-y-1">
            {/* MOBILE ABOUT DROPDOWN */}
            <div className="border-b border-white/5">
              <button
                onClick={() => setIsMobileAboutOpen(!isMobileAboutOpen)}
                className="w-full flex items-center justify-between p-4 font-black uppercase text-xs tracking-wide text-[#C5A059]"
              >
                About
                <ChevronDown
                  size={16}
                  className={`transition-transform duration-300 ${isMobileAboutOpen ? "rotate-180" : ""}`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${isMobileAboutOpen ? "max-h-40 bg-white/5" : "max-h-0"}`}
              >
                <Link
                  href="/about-ewu"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block p-4 pl-8 text-white/60 font-bold uppercase text-[11px] border-b border-white/5"
                >
                  About EWU
                </Link>
                <Link
                  href="/about-conference"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block p-4 pl-8 text-white/60 font-bold uppercase text-[11px]"
                >
                  About Conference
                </Link>
              </div>
            </div>

            {/* Mobile Nav Links */}
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`w-full flex items-center justify-between p-4 rounded-xl font-bold uppercase transition-all text-xs tracking-wide group border-b border-white/5 last:border-0 ${pathname === link.href ? "bg-white/10 text-white" : "text-white/60 hover:bg-white/5"}`}
              >
                {link.name}
                <div
                  className={`w-1.5 h-1.5 rounded-full transition-all ${pathname === link.href ? "bg-[#C5A059] scale-125 shadow-[0_0_8px_#C5A059]" : "bg-white/10 group-hover:bg-[#C5A059]"}`}
                />
              </Link>
            ))}
          </div>

          {/* --- MOBILE DRAWER BOTTOM: CONTACT + AUTH ACTIONS --- */}
          <div className="mt-auto pt-6 border-t border-white/10 space-y-4">
            <div className="space-y-3 px-2">
              <a
                href="mailto:helpdesk-scm@ewubd.edu"
                className="flex items-center gap-3 text-white/50 hover:text-[#C5A059] transition-colors"
              >
                <Mail size={16} className="text-[#C5A059]" />
                <span className="text-[10px] font-bold uppercase tracking-wider">
                  helpdesk-scm@ewubd.edu
                </span>
              </a>
              <div className="flex items-center gap-3 text-white/50">
                <Phone size={16} className="text-[#C5A059]" />
                <span className="text-[10px] font-bold uppercase tracking-wider">
                  09666775577 | EXT-213/132
                </span>
              </div>
            </div>

            {/* <Link
                href="/signin"
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-3.5 border border-white/10 text-white rounded-xl font-black uppercase text-[10px] bg-white/5 text-center"
              >
                Login
              </Link>
              <Link
                href="/signup"
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-3.5 bg-[#C5A059] text-[#002147] rounded-xl font-black uppercase text-[10px] shadow-lg text-center"
              >
                Join Now
              </Link> */}
            {user ? (
              <div className="grid grid-cols-2 gap-3">
                <Link
                  href="/dashboard"
                  className="text-white hover:text-[#C5A059] transition-all font-bold flex items-center gap-2 uppercase border-2 border-[#C5A059] px-4 py-3.5 rounded-xl text-center"
                >
                  <LayoutDashboard size={16} /> Dashboard
                </Link>
                <SignOutButton className="text-white hover:text-[#C5A059] transition-all font-bold flex items-center gap-2 uppercase border-2 border-[#C5A059] px-4 py-3.5 rounded-xl text-center" />
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                <Link
                  href="/signin"
                  className="py-3.5 border border-white/10 text-white rounded-xl font-black uppercase text-[10px] bg-white/5 text-center"
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  className="py-3.5 bg-[#C5A059] text-[#002147] rounded-xl font-black uppercase text-[10px] shadow-lg text-center"
                >
                  Join Now
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
