"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const COLUMNS = [
  {
    number: "01",
    title: "What we create.",
    body: "建築ビジュアライゼーション、モーショングラフィックス、3DCGアニメーション。設計段階の空間をリアルに可視化し、プロモーション映像で心を動かします。",
  },
  {
    number: "02",
    title: "How we create.",
    body: "クライアントとの密な対話から始まり、コンセプト策定 → 制作 → フィードバック → 納品まで。技術力と美的センスの両輪で、期待を超えるアウトプットを。",
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
            LUMIERE
          </span>
        </div>

        {/* Main description */}
        <div ref={setRef(1)} style={{ opacity: 0 }} className="max-w-3xl mb-20 md:mb-32">
          <p className="text-body text-text-primary leading-relaxed">
            私たちは、建築とアニメーションの境界を溶かす映像スタジオです。
            <br className="hidden md:block" />
            設計者のビジョンをフォトリアルな映像で具現化し、
            <br className="hidden md:block" />
            ブランドの世界観を動きのある物語に変換します。
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
