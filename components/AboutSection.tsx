"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const COLUMNS = [
  {
    number: "01",
    title: "What I create.",
    body: "3DCGアニメーション、インタラクティブWebサイト、モーショングラフィックス。テクノロジーとデザインの掛け合わせで、体験を生み出します。",
  },
  {
    number: "02",
    title: "How I create.",
    body: "ヒアリングからコンセプト策定、デザイン、実装、納品まで一貫対応。Blender・Next.js・Three.js・GSAPなどのツールを駆使し、高品質なアウトプットを実現します。",
  },
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const elementsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      elementsRef.current.forEach((el) => {
        if (el) el.style.opacity = "1";
      });
      return;
    }

    const ctx = gsap.context(() => {
      elementsRef.current.forEach((el) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1.0,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const setRef = (index: number) => (el: HTMLDivElement | null) => {
    elementsRef.current[index] = el;
  };

  return (
    <section
      ref={sectionRef}
      id="about"
      className="section-py"
      aria-labelledby="about-heading"
    >
      <div className="container-lumiere">
        {/* Small logo mark */}
        <div ref={setRef(0)} style={{ opacity: 0 }} className="mb-16 md:mb-24">
          <span className="font-display text-lg text-text-primary/20 font-bold">
            S.SATOU
          </span>
        </div>

        {/* Main description */}
        <div ref={setRef(1)} style={{ opacity: 0 }} className="max-w-3xl mb-20 md:mb-32">
          <p className="text-body text-text-primary leading-relaxed">
            3DCG・Web開発・映像制作を横断するクリエイティブデベロッパーです。
            <br className="hidden md:block" />
            Blenderによる3DCGアニメーション、Next.js・Three.jsを活用した
            <br className="hidden md:block" />
            インタラクティブWeb開発、モーショングラフィックスまで一貫して対応します。
          </p>
        </div>

        {/* Separator */}
        <div className="divider mb-16 md:mb-24" />

        {/* Two columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-20">
          {COLUMNS.map((col, i) => (
            <div key={col.number} ref={setRef(i + 2)} style={{ opacity: 0 }}>
              <span className="label-mono block mb-4">{col.number}</span>
              <h3 className="font-display text-xl md:text-2xl text-text-primary mb-6">
                {col.title}
              </h3>
              <p className="text-body text-text-secondary leading-relaxed">
                {col.body}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom separator */}
      <div className="container-lumiere mt-section">
        <div className="divider" />
      </div>
    </section>
  );
}
