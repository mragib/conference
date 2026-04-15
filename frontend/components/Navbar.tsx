"use client";

import { ChevronDown, Mail, Menu, Phone, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const navLinks = [
  { name: "About", id: "about" },
  { name: "Dates", id: "important-dates" },
  { name: "Guidelines", id: "guidelines" },
  { name: "Committee", id: "committee" },
  { name: "Registration Fee", id: "pricing" },
  { name: "Partners", id: "partners" },
  { name: "Contact", id: "contact" },
];

export default function Navbar({ user }: { user?: any }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isMobileAboutOpen, setIsMobileAboutOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
      setIsMobileMenuOpen(false);
    } else {
      router.push(`/#${id}`);
    }
  };

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      const scrollPos = window.scrollY;
      const isSpecialPage =
        pathname.startsWith("/about-") || pathname === "/legal";
      setIsScrolled(scrollPos > 10 || isSpecialPage);

      if (scrollPos < 300) {
        setActiveSection("");
        return;
      }

      const sections = navLinks.map((link) => document.getElementById(link.id));
      const scrollPosition = scrollPos + 150;
      sections.forEach((section) => {
        if (
          section &&
          scrollPosition >= section.offsetTop &&
          scrollPosition < section.offsetTop + section.offsetHeight
        ) {
          setActiveSection(section.id);
        }
      });
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  if (!mounted)
    return <div className="h-20 bg-transparent fixed top-0 w-full z-[100]" />;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${
          isScrolled
            ? "bg-[#002147]/95 backdrop-blur-xl shadow-2xl"
            : "bg-transparent"
        }`}
      >
        {/* --- TOP CONTACT BAR: HIDDEN ON MOBILE (hidden lg:block) --- */}
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
          <div className="max-w-7xl mx-auto px-4 lg:px-8 flex justify-between items-center">
            <Link href="/" className="flex items-center gap-3 shrink-0 group">
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
                {/* <p className="text-[7px] md:text-[9px] text-white/60 font-bold tracking-[0.15em] mt-1">
                  International 2026
                </p> */}
              </div>
            </Link>

            <div className="hidden lg:flex items-center gap-1 xl:gap-2">
              <div className="flex items-center gap-0.5">
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

                {navLinks
                  .filter((l) => l.id !== "about")
                  .map((link) => (
                    <button
                      key={link.id}
                      onClick={() => scrollToSection(link.id)}
                      className={`px-3 cursor-pointer xl:px-4 py-2 rounded-full text-[10px] xl:text-[11px] font-black uppercase transition-all duration-300 border ${
                        activeSection === link.id
                          ? "bg-white/20 border-white/40 text-white"
                          : "text-white/80 border-transparent hover:text-white"
                      }`}
                    >
                      {link.name}
                    </button>
                  ))}
              </div>

              <div className="h-5 w-px bg-white/10 mx-1 xl:mx-2"></div>

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
              <div className="flex flex-col uppercase leading-tight text-white">
                <h2 className="text-[#C5A059] font-black text-sm">
                  SCM Conference
                </h2>
                {/* <p className="text-[9px] text-white/40 font-bold tracking-[0.1em]">
                  INTERNATIONAL 2026
                </p> */}
              </div>
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

            {navLinks
              .filter((l) => l.id !== "about")
              .map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className={`w-full flex items-center justify-between p-4 rounded-xl font-bold uppercase transition-all text-xs tracking-wide group border-b border-white/5 last:border-0 ${activeSection === link.id ? "bg-white/10 text-white" : "text-white/60 hover:bg-white/5"}`}
                >
                  {link.name}
                  <div
                    className={`w-1.5 h-1.5 rounded-full transition-all ${activeSection === link.id ? "bg-[#C5A059] scale-125 shadow-[0_0_8px_#C5A059]" : "bg-white/10 group-hover:bg-[#C5A059]"}`}
                  />
                </button>
              ))}
          </div>

          {/* --- MOBILE DRAWER BOTTOM: CONTACT + AUTH ACTIONS --- */}
          <div className="mt-auto pt-6 border-t border-white/10 space-y-4">
            {/* Contact row moved here for mobile ONLY */}
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

            <div className="grid grid-cols-2 gap-3">
              <Link
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
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
