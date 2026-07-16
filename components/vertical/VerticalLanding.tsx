"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EMAIL, type DemoEmbed, type VerticalData } from "@/lib/verticals";

gsap.registerPlugin(ScrollTrigger);

/* ─── デモ埋め込み（クリックでロード） ─────────────────────── */
export function DemoFrame({
  embed,
  title,
  playLabel,
  openLabel,
}: {
  embed: DemoEmbed;
  title: string;
  playLabel: string;
  openLabel: string;
}) {
  const [active, setActive] = useState(false);

  const externalUrl =
    embed.kind === "site"
      ? embed.url
      : `https://www.youtube.com/watch?v=${embed.videoId}`;

  return (
    <div className="relative w-full overflow-hidden rounded-card bg-bg-secondary border border-border">
      <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
        {active ? (
          embed.kind === "site" ? (
            <iframe
              src={embed.url}
              title={title}
              className="absolute inset-0 w-full h-full border-0"
              sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
            />
          ) : (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${embed.videoId}?rel=0&modestbranding=1&color=white&autoplay=1`}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full border-0"
            />
          )
        ) : (
          <button
            type="button"
            onClick={() => setActive(true)}
            aria-label={playLabel}
            className="absolute inset-0 w-full h-full cursor-pointer group"
          >
            {embed.kind === "video" ? (
              <img
                src={`https://i.ytimg.com/vi/${embed.videoId}/maxresdefault.jpg`}
                alt={title}
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.src = `https://i.ytimg.com/vi/${embed.videoId}/hqdefault.jpg`;
                }}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-bg-secondary to-bg-elevated transition-transform duration-700 group-hover:scale-105">
                <span className="label-mono text-accent mb-3">Live Demo</span>
                <span className="font-display text-xl md:text-2xl text-text-primary px-6 text-center">
                  {title}
                </span>
              </div>
            )}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="flex items-center gap-3 bg-bg-primary/80 backdrop-blur-sm text-text-primary px-6 py-3 rounded-full group-hover:bg-accent group-hover:text-bg-primary transition-colors duration-400">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M8 5v14l11-7z" />
                </svg>
                <span className="font-mono text-xs uppercase tracking-widest">{playLabel}</span>
              </span>
            </div>
          </button>
        )}
      </div>

      {active && (
        <a
          href={externalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute top-3 right-3 z-10 bg-bg-primary/80 backdrop-blur-sm text-text-primary text-xs font-mono px-3 py-1.5 rounded-full hover:bg-accent hover:text-bg-primary transition-colors duration-300"
        >
          {openLabel}
        </a>
      )}
    </div>
  );
}

/* ─── 自己ホスト映像作例（クリックで再生） ───────────────────── */
export function VideoShowcase({
  src,
  poster,
  title,
  playLabel,
}: {
  src: string;
  poster: string;
  title: string;
  playLabel: string;
}) {
  const [active, setActive] = useState(false);

  return (
    <div className="relative w-full overflow-hidden rounded-card bg-bg-secondary border border-border">
      <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
        {active ? (
          <video
            src={src}
            poster={poster}
            controls
            autoPlay
            playsInline
            preload="metadata"
            className="absolute inset-0 w-full h-full bg-black"
          />
        ) : (
          <button
            type="button"
            onClick={() => setActive(true)}
            aria-label={playLabel}
            className="absolute inset-0 w-full h-full cursor-pointer group"
          >
            <img
              src={poster}
              alt={title}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="flex items-center gap-3 bg-bg-primary/80 backdrop-blur-sm text-text-primary px-6 py-3 rounded-full group-hover:bg-accent group-hover:text-bg-primary transition-colors duration-400">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M8 5v14l11-7z" />
                </svg>
                <span className="font-mono text-xs uppercase tracking-widest">{playLabel}</span>
              </span>
            </div>
          </button>
        )}
      </div>
    </div>
  );
}

/* ─── 業種別LP本体 ──────────────────────────────────────────── */
export function VerticalLanding({ data }: { data: VerticalData }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const mailHref = `mailto:${EMAIL}?subject=${encodeURIComponent(data.finalCta.mailSubject)}`;

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const elements = rootRef.current?.querySelectorAll<HTMLElement>("[data-reveal]");
    if (!elements) return;

    if (prefersReducedMotion) {
      elements.forEach((el) => (el.style.opacity = "1"));
      return;
    }

    const ctx = gsap.context(() => {
      elements.forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 36 },
          {
            opacity: 1,
            y: 0,
            duration: 1.0,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  const scrollToDemo = () => {
    document.querySelector("#demo")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div ref={rootRef}>
      {/* ── ナビゲーション（LP専用・トップへ戻る導線） ── */}
      <header className="fixed top-0 left-0 right-0 z-[100] bg-[rgba(255,255,255,0.85)] backdrop-blur-md shadow-[0_1px_0_rgba(0,0,0,0.06)]">
        <div className="container-lumiere flex items-center justify-between h-16 md:h-20">
          <a
            href="/"
            className="font-display text-text-primary text-sm md:text-base font-bold tracking-tight"
          >
            S.SATOU
          </a>
          <a
            href={mailHref}
            className="bg-accent text-bg-primary font-mono text-xs uppercase tracking-widest px-5 py-2.5 hover:bg-accent-hover transition-colors duration-400"
          >
            {data.hero.secondaryCta}
          </a>
        </div>
      </header>

      <main>
        {/* ── ヒーロー ── */}
        <section className="pt-40 md:pt-56 pb-20 md:pb-32" aria-label={data.industryLabel}>
          <div className="container-lumiere">
            <span
              className="inline-block font-mono uppercase tracking-widest border border-accent/40 text-accent px-4 py-1.5 mb-8 animate-fade-up"
              style={{ fontSize: "11px" }}
            >
              {data.industryLabel}
            </span>
            <h1
              className="font-display text-display-lg max-w-4xl mb-8 animate-fade-up"
              style={{ animationDelay: "0.1s", opacity: 0 }}
            >
              {data.hero.title}
            </h1>
            <p
              className="text-body text-text-secondary max-w-2xl leading-relaxed mb-10 animate-fade-up"
              style={{ animationDelay: "0.2s", opacity: 0 }}
            >
              {data.hero.sub}
            </p>
            <div
              className="flex flex-col sm:flex-row gap-4 animate-fade-up"
              style={{ animationDelay: "0.3s", opacity: 0 }}
            >
              <button
                onClick={scrollToDemo}
                className="bg-accent text-bg-primary font-mono text-xs uppercase tracking-widest px-8 py-3.5 hover:bg-accent-hover transition-colors duration-400"
              >
                {data.hero.primaryCta} ↓
              </button>
              <a
                href={mailHref}
                className="border border-border text-text-primary font-mono text-xs uppercase tracking-widest px-8 py-3.5 text-center hover:border-accent hover:text-accent transition-colors duration-400"
              >
                {data.hero.secondaryCta}
              </a>
            </div>
          </div>
        </section>

        {/* ── 課題 ── */}
        <section className="py-20 md:py-32 bg-bg-secondary" aria-label="Challenges">
          <div className="container-lumiere">
            <div data-reveal style={{ opacity: 0 }} className="mb-14 md:mb-20">
              <span className="label-mono block mb-4">Challenges</span>
              <div className="accent-line" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
              {data.pains.map((pain, i) => (
                <div key={pain.title} data-reveal style={{ opacity: 0 }}>
                  <span className="label-mono block mb-4 text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display text-lg md:text-xl text-text-primary mb-4">
                    {pain.title}
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed">{pain.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── ライブデモ ── */}
        <section id="demo" className="py-20 md:py-32" aria-label="Live demo">
          <div className="container-lumiere">
            <div data-reveal style={{ opacity: 0 }} className="mb-10 md:mb-14">
              <span className="label-mono block mb-4">Live Demo</span>
              <h2 className="font-display text-display-lg pb-2">{data.demo.title}</h2>
              <p className="text-sm text-text-secondary max-w-2xl mt-4 leading-relaxed">
                {data.demo.caption}
              </p>
            </div>
            <div data-reveal style={{ opacity: 0 }}>
              <DemoFrame
                embed={data.demo.embed}
                title={data.demo.title}
                playLabel={data.demo.playLabel}
                openLabel={data.demo.openLabel}
              />
            </div>
          </div>
        </section>

        {/* ── 映像作例（自己ホスト・任意） ── */}
        {data.videoShowcase && (
          <section className="pb-20 md:pb-32" aria-label="Video sample">
            <div className="container-lumiere">
              <div data-reveal style={{ opacity: 0 }} className="mb-10 md:mb-14">
                <span className="label-mono block mb-4">{data.videoShowcase.label}</span>
                <h2 className="font-display text-display-lg pb-2">{data.videoShowcase.title}</h2>
                <p className="text-sm text-text-secondary max-w-2xl mt-4 leading-relaxed">
                  {data.videoShowcase.caption}
                </p>
              </div>
              <div data-reveal style={{ opacity: 0 }}>
                <VideoShowcase
                  src={data.videoShowcase.src}
                  poster={data.videoShowcase.poster}
                  title={data.videoShowcase.title}
                  playLabel={data.demo.playLabel}
                />
              </div>
            </div>
          </section>
        )}

        {/* ── 提供価値 ── */}
        <section className="py-20 md:py-32 bg-bg-secondary" aria-label="What you get">
          <div className="container-lumiere">
            <div data-reveal style={{ opacity: 0 }} className="mb-14 md:mb-20">
              <span className="label-mono block mb-4">What You Get</span>
              <div className="accent-line" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              {data.benefits.map((benefit) => (
                <div
                  key={benefit.title}
                  data-reveal
                  style={{ opacity: 0 }}
                  className="p-6 md:p-8 bg-bg-primary rounded-card border border-border"
                >
                  <h3 className="font-display text-lg md:text-xl text-text-primary mb-4">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed">{benefit.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 導入フロー ── */}
        <section className="py-20 md:py-32" aria-label="Process">
          <div className="container-lumiere">
            <div data-reveal style={{ opacity: 0 }} className="mb-14 md:mb-20">
              <span className="label-mono block mb-4">Process</span>
              <div className="accent-line" />
            </div>
            <ol className="space-y-10 md:space-y-12 max-w-3xl">
              {data.process.map((step, i) => (
                <li key={step.title} data-reveal style={{ opacity: 0 }} className="flex gap-6">
                  <span className="label-mono text-accent flex-shrink-0 pt-1.5">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-display text-lg text-text-primary mb-2">{step.title}</h3>
                    <p className="text-sm text-text-secondary leading-relaxed">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ── 価格 ── */}
        <section className="py-20 md:py-32 bg-bg-secondary" aria-label="Pricing">
          <div className="container-lumiere">
            <div data-reveal style={{ opacity: 0 }} className="mb-14 md:mb-20">
              <span className="label-mono block mb-4">Pricing</span>
              <div className="accent-line" />
            </div>
            <div
              className={`grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 ${
                data.plans.length >= 3 ? "lg:grid-cols-3" : "max-w-4xl"
              }`}
            >
              {data.plans.map((plan) => (
                <div
                  key={plan.name}
                  data-reveal
                  style={{ opacity: 0 }}
                  className={`relative p-6 md:p-10 bg-bg-primary rounded-card ${
                    plan.recommended ? "border border-accent" : "border border-border"
                  }`}
                >
                  {plan.recommended && (
                    <div className="absolute -top-3 left-8">
                      <span className="font-mono text-[10px] uppercase tracking-widest bg-accent text-bg-primary px-3 py-1">
                        Recommended
                      </span>
                    </div>
                  )}
                  <span className="label-mono block mb-3">{plan.name}</span>
                  <div className="font-display text-2xl md:text-3xl text-text-primary mb-3">
                    {plan.price}
                  </div>
                  <p className="text-sm text-text-secondary mb-8">{plan.description}</p>
                  <div className="divider mb-8" />
                  <ul className="space-y-3 mb-10">
                    {plan.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-3 text-sm text-text-secondary"
                      >
                        <span className="text-accent mt-0.5 flex-shrink-0">—</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={mailHref}
                    className={`block w-full py-3 px-6 font-mono text-xs uppercase tracking-widest text-center transition-colors duration-400 ${
                      plan.recommended
                        ? "bg-accent text-bg-primary hover:bg-accent-hover"
                        : "border border-border text-text-primary hover:border-accent hover:text-accent"
                    }`}
                  >
                    {data.planCta}
                  </a>
                </div>
              ))}
            </div>
            <p data-reveal style={{ opacity: 0 }} className="mt-10 text-sm text-text-secondary max-w-2xl">
              {data.pricingNote}
            </p>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="py-20 md:py-32" aria-label="FAQ">
          <div className="container-lumiere">
            <div data-reveal style={{ opacity: 0 }} className="mb-14 md:mb-20">
              <span className="label-mono block mb-4">FAQ</span>
              <div className="accent-line" />
            </div>
            <div className="max-w-3xl space-y-4">
              {data.faq.map((item) => (
                <details
                  key={item.q}
                  data-reveal
                  style={{ opacity: 0 }}
                  className="group border border-border rounded-card bg-bg-primary"
                >
                  <summary className="flex items-center justify-between gap-4 cursor-pointer list-none p-5 md:p-6">
                    <span className="font-display text-base text-text-primary">{item.q}</span>
                    <span className="text-accent flex-shrink-0 transition-transform duration-400 group-open:rotate-45 text-xl leading-none">
                      +
                    </span>
                  </summary>
                  <p className="px-5 md:px-6 pb-5 md:pb-6 text-sm text-text-secondary leading-relaxed">
                    {item.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ── 最終CTA ── */}
        <section className="py-20 md:py-32 bg-bg-elevated" aria-label="Contact">
          <div className="container-lumiere text-center">
            <div data-reveal style={{ opacity: 0 }}>
              <span className="label-mono block mb-4">Get in Touch</span>
              <h2 className="font-display text-display-lg pb-2 mb-6">{data.finalCta.title}</h2>
              <p className="text-body text-text-secondary max-w-2xl mx-auto leading-relaxed mb-10">
                {data.finalCta.body}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
                <a
                  href={mailHref}
                  className="bg-accent text-bg-primary font-mono text-xs uppercase tracking-widest px-10 py-4 hover:bg-accent-hover transition-colors duration-400"
                >
                  {data.finalCta.mailLabel}
                </a>
                {data.finalCta.formLabel && (
                  <a
                    href="/#contact"
                    className="border border-border text-text-primary font-mono text-xs uppercase tracking-widest px-10 py-4 hover:border-accent hover:text-accent transition-colors duration-400"
                  >
                    {data.finalCta.formLabel}
                  </a>
                )}
              </div>
              <p className="mt-8 font-mono text-xs text-text-secondary">{EMAIL}</p>
            </div>
          </div>
        </section>
      </main>

      {/* ── フッター（LP専用・最小構成） ── */}
      <footer className="border-t border-border">
        <div className="container-lumiere py-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p className="font-mono text-xs text-text-secondary">
            S.SATOU &copy;{new Date().getFullYear()}
          </p>
          <a
            href="/"
            className="font-mono text-xs uppercase tracking-widest text-text-secondary hover:text-accent transition-colors duration-400"
          >
            {data.footerHome} →
          </a>
        </div>
      </footer>
    </div>
  );
}
