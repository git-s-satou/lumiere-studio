"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type VideoWork = {
  id: string;
  type: "video";
  videoId: string;
  title: string;
  category: string;
  description: string;
};

type WebWork = {
  id: string;
  type: "web";
  url: string;
  title: string;
  category: string;
  description: string;
};

type Work = VideoWork | WebWork;

const WORKS: Work[] = [
  {
    id: "w1",
    type: "video",
    videoId: "0YZwdNcOdRE",
    title: "3D Animation",
    category: "3DCG ANIMATION",
    description: "建築空間・プロダクトを3DCGで立体的に表現するアニメーション映像。",
  },
  {
    id: "w2",
    type: "video",
    videoId: "9Q59u4lflGU",
    title: "2D Animation",
    category: "2D MOTION GRAPHICS",
    description: "ブランドの世界観をフラットデザインとモーションで伝えるアニメーション。",
  },
  {
    id: "w3",
    type: "video",
    videoId: "E8v2axtDVNs",
    title: "Show Reel",
    category: "SHOW REEL",
    description: "S.SATOU の制作実績を凝縮したショーリール。",
  },
  {
    id: "w4",
    type: "web",
    url: "https://furniture-configurator-kappa.vercel.app/",
    title: "Furniture Configurator",
    category: "WEB APPLICATION",
    description: "3Dで家具をカスタマイズできるインタラクティブなWebアプリケーション。",
  },
];

export default function WorksSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef   = useRef<(HTMLDivElement | null)[]>([]);

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
      // 見出し
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

      // 各カード
      cardsRef.current.forEach((card) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { opacity: 0, y: 60 },
          {
            opacity: 1, y: 0, duration: 1.2, ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
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
      id="works"
      className="section-py"
      aria-labelledby="works-heading"
    >
      <div className="container-lumiere">

        {/* セクション見出し */}
        <div ref={headingRef} className="mb-20 md:mb-32" style={{ opacity: 0 }}>
          <span className="label-mono block mb-4">Portfolio</span>
          <h2 id="works-heading" className="font-display text-display-lg pb-2">
            Selected Works
          </h2>
        </div>

        {/* 動画リスト */}
        <div className="flex flex-col gap-24 md:gap-32">
          {WORKS.map((work, i) => (
            <div
              key={work.id}
              ref={(el) => { cardsRef.current[i] = el; }}
              style={{ opacity: 0 }}
            >
              {/* メディア表示エリア */}
              <div className="relative w-full overflow-hidden rounded-card group">
                {/* 16:9 アスペクト比コンテナ */}
                <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                  {work.type === "video" ? (
                    <iframe
                      src={`https://www.youtube-nocookie.com/embed/${work.videoId}?rel=0&modestbranding=1&color=white`}
                      title={work.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      loading="lazy"
                      className="absolute inset-0 w-full h-full border-0"
                    />
                  ) : (
                    <iframe
                      src={work.url}
                      title={work.title}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full border-0"
                      sandbox="allow-scripts allow-same-origin"
                    />
                  )}
                </div>

                {/* ホバー時のゴールドボーダー演出 */}
                <div className="absolute inset-0 border border-transparent group-hover:border-accent/30 transition-colors duration-600 pointer-events-none rounded-card" />

                {/* Webサイトの場合: 別タブで開くリンク */}
                {work.type === "web" && (
                  <a
                    href={work.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute top-4 right-4 z-10 bg-bg-primary/80 backdrop-blur-sm text-text-primary text-xs font-mono px-3 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-400 hover:bg-accent hover:text-bg-primary"
                  >
                    Open Site &rarr;
                  </a>
                )}
              </div>

              {/* プロジェクト情報 */}
              <div className="mt-6 flex flex-col md:flex-row md:items-end md:justify-between gap-3">
                <div>
                  <span className="label-mono block mb-2 text-accent">
                    {work.category}
                  </span>
                  <h3 className="font-display text-xl md:text-2xl text-text-primary">
                    {work.title}
                  </h3>
                </div>
                <p className="text-sm text-text-secondary max-w-xs text-left md:text-right leading-relaxed">
                  {work.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ボトムセパレーター */}
      <div className="container-lumiere mt-section">
        <div className="divider" />
      </div>
    </section>
  );
}
