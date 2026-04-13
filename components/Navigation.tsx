"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const NAV_LINKS = [
  { label: "Works", href: "#works" },
  { label: "Services", href: "#principles" },
  { label: "Pricing", href: "#pricing" },
  { label: "Contact", href: "#contact" },
];

export default function Navigation() {
  const headerRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const menuLinksRef = useRef<HTMLDivElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Scroll detection for background change
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Mobile menu animation
  useEffect(() => {
    if (!mobileMenuRef.current || !menuLinksRef.current) return;

    if (isMobileOpen) {
      document.body.style.overflow = "hidden";
      gsap.to(mobileMenuRef.current, {
        opacity: 1,
        visibility: "visible",
        duration: 0.4,
        ease: "power3.out",
      });
      gsap.fromTo(
        menuLinksRef.current.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: "power3.out",
          delay: 0.2,
        }
      );
    } else {
      document.body.style.overflow = "";
      gsap.to(mobileMenuRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          if (mobileMenuRef.current) {
            mobileMenuRef.current.style.visibility = "hidden";
          }
        },
      });
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-600 ease-cinematic ${
          isScrolled
            ? "bg-[rgba(255,255,255,0.85)] backdrop-blur-md shadow-[0_1px_0_rgba(0,0,0,0.06)]"
            : "bg-transparent"
        }`}
        role="banner"
      >
        <div className="container-lumiere flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, "#home")}
            className="font-display text-text-primary text-sm md:text-base font-bold tracking-tight"
            aria-label="S.SATOU - トップに戻る"
          >
            S.SATOU
          </a>

          {/* Desktop Nav */}
          <nav
            className="hidden md:flex items-center gap-8"
            aria-label="メインナビゲーション"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="nav-link font-mono text-xs uppercase tracking-widest text-text-secondary hover:text-text-primary transition-colors duration-400 relative group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-px bg-accent group-hover:w-full transition-all duration-400 ease-cinematic" />
              </a>
            ))}
            <a
              href="mailto:hello@lumiere.studio"
              className="font-mono text-xs text-text-secondary hover:text-accent transition-colors duration-400"
            >
              hello@lumiere.studio
            </a>
          </nav>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            aria-label={isMobileOpen ? "メニューを閉じる" : "メニューを開く"}
            aria-expanded={isMobileOpen}
          >
            <span
              className={`block w-6 h-px bg-text-primary transition-all duration-400 ${
                isMobileOpen ? "rotate-45 translate-y-[3.5px]" : ""
              }`}
            />
            <span
              className={`block w-6 h-px bg-text-primary transition-all duration-400 ${
                isMobileOpen ? "-rotate-45 -translate-y-[3.5px]" : ""
              }`}
            />
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        ref={mobileMenuRef}
        className="fixed inset-0 z-[99] bg-bg-primary flex items-center justify-center opacity-0 invisible md:hidden"
        role="dialog"
        aria-modal="true"
        aria-label="モバイルメニュー"
      >
        <div ref={menuLinksRef} className="flex flex-col items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="font-display text-3xl text-text-primary hover:text-accent transition-colors duration-400"
            >
              {link.label}
            </a>
          ))}
          <a
            href="mailto:hello@lumiere.studio"
            className="font-mono text-sm text-text-secondary hover:text-accent transition-colors duration-400 mt-4"
          >
            hello@lumiere.studio
          </a>
        </div>
      </div>
    </>
  );
}
