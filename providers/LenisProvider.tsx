"use client";

import { createContext, useContext, useEffect, useRef, useState, ReactNode } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ─── Context ──────────────────────────────────────────────── */
const LenisContext = createContext<Lenis | null>(null);

export function useLenis(): Lenis | null {
  return useContext(LenisContext);
}

/* ─── Provider ─────────────────────────────────────────────── */
interface LenisProviderProps {
  children: ReactNode;
}

export default function LenisProvider({ children }: LenisProviderProps) {
  const lenisRef = useRef<Lenis | null>(null);
  const rafRef   = useRef<number>(0);
  const [instance, setInstance] = useState<Lenis | null>(null);

  useEffect(() => {
    // Disable Lenis on touch devices (iOS inertia scroll conflict)
    const isTouchDevice =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;

    // Also respect reduced-motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (isTouchDevice || prefersReducedMotion) {
      // Even without Lenis, ensure ScrollTrigger is refreshed
      ScrollTrigger.refresh();
      return;
    }

    const lenis = new Lenis({
      duration:    1.2,
      easing:      (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      smoothWheel: true,
    });

    lenisRef.current = lenis;
    setInstance(lenis);

    // ─── GSAP ScrollTrigger ↔ Lenis sync ───────────────────
    // Lenis の scroll イベントで ScrollTrigger を更新
    lenis.on("scroll", ScrollTrigger.update);

    // GSAP ticker で Lenis の raf を駆動（rAF直呼びより正確）
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000); // GSAP ticker は秒、Lenis は ms
    });
    gsap.ticker.lagSmoothing(0); // Lenis と同期するためラグスムーシング無効化

    // 初回リフレッシュ
    ScrollTrigger.refresh();

    return () => {
      cancelAnimationFrame(rafRef.current);
      lenis.destroy();
      lenisRef.current = null;
      setInstance(null);
      gsap.ticker.remove((time) => {
        lenis.raf(time * 1000);
      });
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <LenisContext.Provider value={instance}>
      {children}
    </LenisContext.Provider>
  );
}
