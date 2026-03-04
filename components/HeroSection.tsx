"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const VIDEO_ID = "ALYJi_eq9T4";

interface HeroSectionProps {
  isLoaded: boolean;
}

export default function HeroSection({ isLoaded }: HeroSectionProps) {
  const sectionRef  = useRef<HTMLElement>(null);
  const mainTextRef = useRef<HTMLHeadingElement>(null);
  const subTextRef  = useRef<HTMLParagraphElement>(null);
  const exploreRef  = useRef<HTMLDivElement>(null);
  const labelRef    = useRef<HTMLDivElement>(null);
  const bgRef       = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isLoaded) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      [mainTextRef, subTextRef, exploreRef, labelRef].forEach((r) => {
        if (r.current) r.current.style.opacity = "1";
      });
      return;
    }

    const tl = gsap.timeline({ delay: 0.2 });

    // 背景動画をスケールイン
    tl.fromTo(
      bgRef.current,
      { scale: 1.08 },
      { scale: 1, duration: 2.0, ease: "power3.out" },
      0
    );

    tl.fromTo(
      labelRef.current,
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
      0.1
    );

    if (mainTextRef.current) {
      const originalText = mainTextRef.current.textContent || "";
      mainTextRef.current.style.opacity = "1";
      mainTextRef.current.innerHTML = originalText
        .split("")
        .map((char) =>
          char === " "
            ? `<span class="inline-block">\u00A0</span>`
            : `<span class="inline-block" style="opacity:0;transform:translateY(28px)">${char}</span>`
        )
        .join("");

      tl.to(
        mainTextRef.current.querySelectorAll("span"),
        { opacity: 1, y: 0, duration: 0.07, stagger: 0.035, ease: "power3.out" },
        0.3
      );
    }

    tl.fromTo(
      subTextRef.current,
      { opacity: 0, y: 18 },
      { opacity: 1, y: 0, duration: 1.0, ease: "power3.out" },
      "-=0.4"
    );

    tl.fromTo(
      exploreRef.current,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
      "-=0.5"
    );

    return () => { tl.kill(); };
  }, [isLoaded]);

  const handleExploreClick = () => {
    const next = document.querySelector("#impact");
    if (next) next.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      aria-label="ヒーローセクション"
    >
      {/* ── 背景動画（自動再生・ループ・ミュート） ── */}
      <div
        ref={bgRef}
        className="absolute inset-0 z-0"
        aria-hidden="true"
        style={{ willChange: "transform" }}
      >
        <div className="absolute inset-0" style={{ overflow: "hidden" }}>
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${VIDEO_ID}?autoplay=1&mute=1&loop=1&playlist=${VIDEO_ID}&controls=0&showinfo=0&modestbranding=1&rel=0&playsinline=1&disablekb=1&iv_load_policy=3`}
            title=""
            allow="autoplay; encrypted-media"
            className="absolute border-0 pointer-events-none"
            style={{
              top: "50%",
              left: "50%",
              width: "177.78vh",
              height: "100vh",
              minWidth: "100%",
              minHeight: "100%",
              transform: "translate(-50%, -50%)",
            }}
            tabIndex={-1}
          />
        </div>

        {/* 暗めのオーバーレイ（テキスト視認性） */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/35 to-black/65" />

        {/* ヴィネット */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.55) 100%)",
          }}
        />
      </div>

      {/* ── テキストコンテンツ（白テキスト — 動画背景用） ── */}
      <div className="relative z-10 container-lumiere text-center">
        <div ref={labelRef} className="mb-6 flex justify-center" style={{ opacity: 0 }}>
          <span
            className="font-mono uppercase tracking-widest border px-4 py-1.5"
            style={{
              fontSize: "11px",
              color: "#c8a45c",
              borderColor: "rgba(200,164,92,0.35)",
            }}
          >
            Architectural Visualization &amp; Animation
          </span>
        </div>

        <h1
          ref={mainTextRef}
          className="font-display text-display-xl mb-6"
          style={{ opacity: 0, color: "#f0ede6", lineHeight: 1.2 }}
        >
          映像で、空間に命を吹き込む。
        </h1>

        <p
          ref={subTextRef}
          className="font-mono text-sm md:text-base tracking-wider max-w-2xl mx-auto"
          style={{ opacity: 0, color: "rgba(240,237,230,0.85)" }}
        >
          We breathe life into architecture through visual storytelling.
        </p>
      </div>

      {/* ── Explore インジケーター ── */}
      <div
        ref={exploreRef}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3 cursor-pointer"
        style={{ opacity: 0 }}
        onClick={handleExploreClick}
        role="button"
        tabIndex={0}
        aria-label="次のセクションへスクロール"
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") handleExploreClick();
        }}
      >
        <span
          className="font-mono text-xs uppercase tracking-widest"
          style={{ color: "rgba(240,237,230,0.6)" }}
        >
          Explore
        </span>
        <svg
          className="w-4 h-4 animate-bounce"
          style={{ color: "rgba(240,237,230,0.6)" }}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>

      <div className="absolute bottom-0 left-0 right-0 divider" />
    </section>
  );
}
