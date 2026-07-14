"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type SolutionLink = {
  label: string;
  href: string;
};

type VideoWork = {
  id: string;
  type: "video";
  videoId: string;
  title: string;
  category: string;
  description: string;
  solution?: SolutionLink;
  caseStudyHref?: string;
};

type WebWork = {
  id: string;
  type: "web";
  url: string;
  title: string;
  category: string;
  description: string;
  solution?: SolutionLink;
  caseStudyHref?: string;
};

type LocalVideoWork = {
  id: string;
  type: "localVideo";
  src: string;
  poster: string;
  title: string;
  category: string;
  description: string;
  solution?: SolutionLink;
  caseStudyHref?: string;
};

type Work = VideoWork | WebWork | LocalVideoWork;

const WORKS: Work[] = [
  {
    id: "w0",
    type: "web",
    url: "https://loft-portfolio.vercel.app/",
    title: "Architectural Walkthrough",
    category: "3D WEB EXPERIENCE",
    description: "ブラウザ上で建築空間を自由に歩き回れるインタラクティブなウォークスルーデモ。",
    solution: { label: "住宅・不動産向け", href: "/for-housing" },
    caseStudyHref: "/works/architectural-walkthrough",
  },
  {
    id: "w0a",
    type: "localVideo",
    src: "/works/arch-walk.mp4",
    poster: "/works/arch-walk-poster.jpg",
    title: "Real-Time Walkthrough (UE5)",
    category: "UNREAL ENGINE / REAL-TIME",
    description:
      "Unreal Engine 5 でリアルタイムレンダリングした建築ウォークスルー。実写に迫る質感とライティングを、映像だけでなく Pixel Streaming でブラウザ操作型のインタラクティブ体験にも展開できます。",
    solution: { label: "住宅・不動産向け", href: "/for-housing" },
  },
  {
    id: "w0b",
    type: "video",
    videoId: "rNbv9olL058",
    title: "3D Animation",
    category: "3DCG ANIMATION",
    description: "空間とプロダクトを3DCGで描いたアニメーション映像。",
  },
  {
    id: "w1",
    type: "video",
    videoId: "0YZwdNcOdRE",
    title: "3D Animation",
    category: "3DCG ANIMATION",
    description: "建築空間・プロダクトを3DCGで立体的に表現するアニメーション映像。",
    solution: { label: "住宅・不動産向け", href: "/for-housing" },
  },
  {
    id: "w1b",
    type: "video",
    videoId: "kPsgrPOvyy0",
    title: "Car Animation",
    category: "3DCG ANIMATION",
    description: "自動車を主役にした3DCGアニメーション。質感とライティングにこだわった映像表現。",
    solution: { label: "自動車パーツ向け", href: "/for-automotive" },
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
    url: "https://aura-website-eta.vercel.app/",
    title: "AURA Series X",
    category: "WEB DESIGN",
    description: "架空のスマートフォンブランド「AURA」のプロモーションサイト。ミニマルなデザインと日英バイリンガル対応。",
  },
  {
    id: "w5",
    type: "web",
    url: "https://furniture-configurator-kappa.vercel.app/",
    title: "Furniture Configurator",
    category: "WEB APPLICATION",
    description: "3Dで家具をカスタマイズできるインタラクティブなWebアプリケーション。",
    solution: { label: "家具メーカー向け", href: "/for-furniture" },
    caseStudyHref: "/works/furniture-configurator",
  },
  {
    id: "w6",
    type: "web",
    url: "https://room-table-demo.vercel.app/",
    title: "Furniture Size Simulator",
    category: "WEB APPLICATION / 3D",
    description:
      "サイズオーダー家具を1cm単位で操作し、寸法線と一緒に部屋での見え方を確認できる3Dシミュレーター。パラメトリック生成なので、どの製品・サイズ展開にも対応できます。",
    solution: { label: "家具メーカー向け", href: "/for-furniture" },
  },
];

const youtubeThumb = (videoId: string) =>
  `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`;

const youtubeThumbFallback = (videoId: string) =>
  `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;

function WorkCard({ work }: { work: Work }) {
  const [active, setActive] = useState(false);

  return (
    <div className="group">
      <div className="relative w-full overflow-hidden rounded-card bg-bg-secondary">
        {/* 16:9 アスペクト比コンテナ */}
        <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
          {active ? (
            work.type === "video" ? (
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${work.videoId}?rel=0&modestbranding=1&color=white&autoplay=1`}
                title={work.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full border-0"
              />
            ) : work.type === "localVideo" ? (
              <video
                src={work.src}
                poster={work.poster}
                controls
                autoPlay
                playsInline
                className="absolute inset-0 w-full h-full border-0 object-cover bg-black"
              />
            ) : (
              <iframe
                src={work.url}
                title={work.title}
                className="absolute inset-0 w-full h-full border-0"
                sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
              />
            )
          ) : (
            /* サムネイル（クリックで iframe をロード） */
            <button
              type="button"
              onClick={() => setActive(true)}
              aria-label={`${work.title} を再生`}
              className="absolute inset-0 w-full h-full cursor-pointer"
            >
              {work.type === "video" ? (
                <img
                  src={youtubeThumb(work.videoId)}
                  alt={work.title}
                  loading="lazy"
                  onLoad={(e) => {
                    // maxresdefault が無い動画は 120px のグレー画像が返るため hqdefault に差し替え
                    const img = e.currentTarget;
                    if (img.naturalWidth <= 120) {
                      img.src = youtubeThumbFallback(work.videoId);
                    }
                  }}
                  onError={(e) => {
                    e.currentTarget.src = youtubeThumbFallback(work.videoId);
                  }}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              ) : work.type === "localVideo" ? (
                <img
                  src={work.poster}
                  alt={work.title}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-bg-secondary to-bg-primary transition-transform duration-700 group-hover:scale-105">
                  <span className="label-mono text-accent mb-2">{work.category}</span>
                  <span className="font-display text-lg text-text-primary px-4 text-center">
                    {work.title}
                  </span>
                </div>
              )}

              {/* オーバーレイ + 再生アイコン */}
              <div className="absolute inset-0 bg-bg-primary/20 group-hover:bg-bg-primary/10 transition-colors duration-400" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="flex items-center justify-center w-14 h-14 rounded-full bg-bg-primary/70 backdrop-blur-sm text-text-primary group-hover:bg-accent group-hover:text-bg-primary transition-colors duration-400">
                  {work.type !== "web" ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                      <path d="M7 17 17 7M9 7h8v8" />
                    </svg>
                  )}
                </span>
              </div>
            </button>
          )}
        </div>

        {/* ホバー時のゴールドボーダー演出 */}
        <div className="absolute inset-0 border border-transparent group-hover:border-accent/30 transition-colors duration-600 pointer-events-none rounded-card" />

        {/* Webサイトの場合: 別タブで開くリンク（iframe 表示中のみ） */}
        {work.type === "web" && active && (
          <a
            href={work.url}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute top-3 right-3 z-10 bg-bg-primary/80 backdrop-blur-sm text-text-primary text-xs font-mono px-3 py-1.5 rounded-full hover:bg-accent hover:text-bg-primary transition-colors duration-300"
          >
            Open Site &rarr;
          </a>
        )}
      </div>

      {/* プロジェクト情報 */}
      <div className="mt-4">
        <span className="label-mono block mb-1.5 text-accent">{work.category}</span>
        <h3 className="font-display text-lg md:text-xl text-text-primary">{work.title}</h3>
        <p className="mt-2 text-sm text-text-secondary leading-relaxed">
          {work.description}
        </p>
        {(work.solution || work.caseStudyHref) && (
          <div className="flex flex-wrap gap-2 mt-3">
            {work.solution && (
              <a
                href={work.solution.href}
                className="inline-flex items-center gap-2 font-mono text-xs text-text-secondary border border-border rounded-full px-3 py-1.5 hover:border-accent hover:text-accent transition-colors duration-400"
              >
                {work.solution.label}ソリューション →
              </a>
            )}
            {work.caseStudyHref && (
              <a
                href={work.caseStudyHref}
                className="inline-flex items-center gap-2 font-mono text-xs text-text-secondary border border-border rounded-full px-3 py-1.5 hover:border-accent hover:text-accent transition-colors duration-400"
              >
                ケーススタディ →
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function WorksSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

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

      cardsRef.current.forEach((card) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0, duration: 1.0, ease: "power3.out",
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
      id="works"
      className="section-py"
      aria-labelledby="works-heading"
    >
      <div className="container-lumiere">

        {/* セクション見出し */}
        <div ref={headingRef} className="mb-16 md:mb-24" style={{ opacity: 0 }}>
          <span className="label-mono block mb-4">Portfolio</span>
          <h2 id="works-heading" className="font-display text-display-lg pb-2">
            Selected Works
          </h2>
        </div>

        {/* 作品グリッド */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-12 md:gap-y-16">
          {WORKS.map((work, i) => (
            <div
              key={work.id}
              ref={(el) => { cardsRef.current[i] = el; }}
              style={{ opacity: 0 }}
            >
              <WorkCard work={work} />
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
