"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef      = useRef<HTMLDivElement>(null);
  const overlayRef   = useRef<HTMLDivElement>(null);
  const lineRef      = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // アニメーション開始時にトップへ固定
    window.scrollTo(0, 0);

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      setIsVisible(false);
      onComplete();
      return;
    }

    // ロード中はスクロール禁止
    document.body.style.overflow = "hidden";

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = "";
        // アニメーション完了後もトップを確保
        window.scrollTo(0, 0);
        setIsVisible(false);
        onComplete();
      },
    });

    // Phase 1: ゴールドラインがスイープイン
    tl.fromTo(
      lineRef.current,
      { scaleX: 0, opacity: 1 },
      { scaleX: 1, duration: 0.7, ease: "power3.inOut" }
    );

    // Phase 2: ロゴが下からライズアップ
    tl.fromTo(
      logoRef.current,
      { opacity: 0, y: 40, scale: 0.88 },
      { opacity: 1, y: 0, scale: 1, duration: 0.9, ease: "power3.out" },
      "-=0.2"
    );

    // Phase 3: ドラマティックなポーズ
    tl.to(logoRef.current, { duration: 0.8 });

    // Phase 4: ロゴがスケールアウト
    tl.to(logoRef.current, {
      scale: 2.2,
      opacity: 0,
      duration: 0.9,
      ease: "power3.in",
    });

    // Phase 5: ラインフェードアウト
    tl.to(
      lineRef.current,
      { opacity: 0, duration: 0.35, ease: "power2.out" },
      "-=0.6"
    );

    // Phase 6: オーバーレイが上にスライドアウト → コンテンツが現れる
    tl.to(
      overlayRef.current,
      {
        yPercent: -100,
        duration: 0.9,
        ease: "power4.inOut",
      },
      "-=0.2"
    );

    return () => {
      tl.kill();
      document.body.style.overflow = "";
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!isVisible) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999]"
      aria-hidden="true"
    >
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-black flex flex-col items-center justify-center gap-8"
      >
        {/* ゴールドライン */}
        <div
          ref={lineRef}
          className="w-16 h-px bg-accent origin-left"
          style={{ transform: "scaleX(0)" }}
        />

        {/* ロゴ */}
        <div
          ref={logoRef}
          className="font-display"
          style={{
            opacity: 0,
            fontSize: "clamp(2.5rem, 8vw, 6rem)",
            fontWeight: 800,
            letterSpacing: "-0.02em",
            color: "#f0ede6",
          }}
        >
          LUMIERE
        </div>
      </div>
    </div>
  );
}
