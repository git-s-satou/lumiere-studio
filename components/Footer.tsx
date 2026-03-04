"use client";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Works", href: "#works" },
  { label: "Services", href: "#principles" },
  { label: "Pricing", href: "#pricing" },
];

const LEGAL_LINKS = [
  { label: "Terms & Conditions", href: "/legal/tokushoho" },
  { label: "Privacy Policy", href: "/legal/privacy" },
];

const SOCIAL_LINKS = [
  {
    label: "Instagram",
    href: "https://instagram.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5" aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://youtube.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5" aria-hidden="true">
        <path d="M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 12a29 29 0 00.46 5.58 2.78 2.78 0 001.94 2C5.12 20 12 20 12 20s6.88 0 8.6-.46a2.78 2.78 0 001.94-2A29 29 0 0023 12a29 29 0 00-.46-5.58z" />
        <path d="M9.75 15.02l5.75-3.27-5.75-3.27v6.54z" />
      </svg>
    ),
  },
  {
    label: "Vimeo",
    href: "https://vimeo.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5" aria-hidden="true">
        <path d="M22 7.42a5.7 5.7 0 01-1.54 3.88c-2.14 2.42-4.23 4.88-6.17 7.48a2.23 2.23 0 01-1.82 1.12c-.84.05-1.47-.48-1.97-1.14C9.42 17.2 8.3 15.65 7.22 14.08c-.6-.88-1.18-1.78-1.5-2.8a3.1 3.1 0 01.54-2.88 1.66 1.66 0 012.36-.2c.58.48.88 1.12 1.1 1.82.42 1.28.78 2.58 1.2 3.86.18.56.4 1.1.82 1.52.22.22.48.32.76.18.3-.16.48-.42.62-.72.58-1.28 1.08-2.58 1.18-4.02.06-.88-.16-1.68-.7-2.36-.68-.86-1.58-1.2-2.64-1.16-2.48.1-4.28 1.28-5.48 3.38-.54.94-.82 1.98-.88 3.06-.08 1.56.34 2.98 1.16 4.28" />
      </svg>
    ),
  },
];

export default function Footer() {
  const handleBackToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    const hero = document.querySelector("#home");
    if (hero) hero.scrollIntoView({ behavior: "smooth" });
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="border-t border-border" role="contentinfo">
      <div className="container-lumiere py-16 md:py-24">
        {/* Top row: Nav + Legal */}
        <div className="flex flex-col md:flex-row md:justify-between gap-10 mb-16">
          {/* Nav links */}
          <nav aria-label="フッターナビゲーション">
            <ul className="flex flex-wrap gap-6 md:gap-8">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="font-mono text-xs uppercase tracking-widest text-text-secondary hover:text-text-primary transition-colors duration-400"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Legal links — page navigation, no scroll override */}
          <nav aria-label="法的情報">
            <ul className="flex flex-wrap gap-6 md:gap-8">
              {LEGAL_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="font-mono text-xs uppercase tracking-widest text-text-secondary hover:text-text-primary transition-colors duration-400"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Social icons */}
        <div className="flex gap-6 mb-16">
          {SOCIAL_LINKS.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-secondary hover:text-text-primary transition-colors duration-400"
              aria-label={social.label}
            >
              {social.icon}
            </a>
          ))}
        </div>

        {/* Bottom row: Copyright + Back to top */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 pt-8 border-t border-border">
          <p className="font-mono text-xs text-text-secondary">
            LUMIERE STUDIO &copy;{new Date().getFullYear()}
          </p>

          <button
            onClick={handleBackToTop}
            className="font-mono text-xs uppercase tracking-widest text-text-secondary hover:text-accent transition-colors duration-400"
            aria-label="ページトップに戻る"
          >
            Back to top &uarr;
          </button>
        </div>
      </div>
    </footer>
  );
}
