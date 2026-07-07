"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SOLUTIONS = [
  {
    industry: "家具・インテリアメーカー",
    title: "3Dコンフィギュレーター",
    body: "カラー・素材・オプションをブラウザ上で切り替えられるWeb体験。カタログ費用を削減し、ECの購入率と問い合わせの質を高めます。",
    price: "¥1,800,000〜",
    href: "/for-furniture",
  },
  {
    industry: "工務店・ハウスメーカー",
    title: "建築ウォークスルー",
    body: "図面から、ブラウザで歩ける空間と3DCG映像を制作。モデルルームを建てる前に「体験」を届け、竣工前の成約を後押しします。",
    price: "¥600,000〜",
    href: "/for-housing",
  },
  {
    industry: "自動車パーツ・カスタムショップ",
    title: "フォトリアルCGI",
    body: "実車撮影なしでプロモーション映像・カラーバリエーション・装着シミュレーターを制作。撮影コストを削減します。",
    price: "¥500,000〜",
    href: "/for-automotive",
  },
];

export function SolutionsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      if (headingRef.current) headingRef.current.style.opacity = "1";
      cardsRef.current.forEach((card) => {
        if (card) card.style.opacity = "1";
      });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 1.0, ease: "power3.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0, duration: 1.0, ease: "power3.out", delay: i * 0.1,
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="solutions"
      className="section-py"
      aria-labelledby="solutions-heading"
    >
      <div className="container-lumiere">
        {/* セクション見出し */}
        <div ref={headingRef} className="mb-16 md:mb-24" style={{ opacity: 0 }}>
          <span className="label-mono block mb-4">Solutions</span>
          <h2 id="solutions-heading" className="font-display text-display-lg pb-2">
            業界別ソリューション
          </h2>
          <p className="text-body text-text-secondary max-w-2xl mt-6 leading-relaxed">
            御社の業界に合わせた、成果につながる3D・Web体験。
            触れるデモと価格を、業界別ページでご覧いただけます。
          </p>
        </div>

        {/* ソリューションカード */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {SOLUTIONS.map((solution, i) => (
            <a
              key={solution.href}
              href={solution.href}
              ref={(el) => {
                cardsRef.current[i] = el;
              }}
              style={{ opacity: 0 }}
              className="group relative p-6 md:p-8 bg-bg-secondary rounded-card border border-border hover:border-accent transition-colors duration-400 flex flex-col"
            >
              <span className="label-mono block mb-6 text-accent">
                {solution.industry}
              </span>
              <h3 className="font-display text-xl md:text-2xl text-text-primary mb-4">
                {solution.title}
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed mb-8 flex-grow">
                {solution.body}
              </p>
              <div className="flex items-center justify-between pt-6 border-t border-border">
                <span className="font-display text-lg text-text-primary">
                  {solution.price}
                </span>
                <span className="font-mono text-xs uppercase tracking-widest text-text-secondary group-hover:text-accent transition-colors duration-400">
                  詳しく見る →
                </span>
              </div>
            </a>
          ))}
        </div>

        {/* 海外向け導線 */}
        <p className="mt-10 text-sm text-text-secondary">
          For overseas brands:{" "}
          <a
            href="/en/for-furniture"
            className="text-accent hover:text-accent-hover transition-colors duration-400 underline underline-offset-4"
          >
            3D Product Configurator Development (English) →
          </a>
        </p>
      </div>

      {/* ボトムセパレーター */}
      <div className="container-lumiere mt-section">
        <div className="divider" />
      </div>
    </section>
  );
}
