"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PRINCIPLES = [
  {
    number: "01",
    title: "Cinematic Quality.",
    description: "すべてのフレームに、映画品質のクオリティを。",
    quote:
      "\u201CArchitecture is frozen music.\u201D \u2014 Johann Wolfgang von Goethe",
  },
  {
    number: "02",
    title: "Technical Mastery.",
    description: "最先端のCG技術で、不可能を可能にする。",
    quote:
      "\u201CTechnology is best when it brings people together.\u201D \u2014 Matt Mullenweg",
  },
  {
    number: "03",
    title: "Client Partnership.",
    description: "クライアントのビジョンを、私たちのビジョンとして。",
    quote:
      "\u201CGreat things in business are never done by one person.\u201D \u2014 Steve Jobs",
  },
];

export default function PrinciplesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      itemsRef.current.forEach((item) => {
        if (!item) return;
        item.querySelectorAll<HTMLElement>("[data-title],[data-desc],[data-quote]").forEach((el) => {
          el.style.opacity = "1";
        });
      });
      return;
    }

    const ctx = gsap.context(() => {
      itemsRef.current.forEach((item) => {
        if (!item) return;

        const title = item.querySelector("[data-title]");
        const desc = item.querySelector("[data-desc]");
        const quote = item.querySelector("[data-quote]");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        });

        if (title) {
          tl.fromTo(
            title,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 1.0, ease: "power3.out" }
          );
        }
        if (desc) {
          tl.fromTo(
            desc,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
            "-=0.6"
          );
        }
        if (quote) {
          tl.fromTo(
            quote,
            { opacity: 0, y: 15 },
            { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
            "-=0.4"
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="principles"
      className="section-py"
      aria-labelledby="principles-heading"
    >
      <div className="container-lumiere">
        {/* Section heading */}
        <div className="mb-20 md:mb-32">
          <span className="label-mono block mb-4">Values</span>
          <h2 id="principles-heading" className="font-display text-display-lg pb-2">
            Our Principles
          </h2>
        </div>

        {/* Principles list */}
        <div>
          {PRINCIPLES.map((principle, i) => (
            <div
              key={principle.number}
              ref={(el) => {
                itemsRef.current[i] = el;
              }}
              className="py-12 md:py-20 border-b border-border first:border-t"
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10">
                {/* Number */}
                <div className="md:col-span-1">
                  <span className="label-mono">{principle.number}</span>
                </div>

                {/* Title + Description */}
                <div className="md:col-span-5">
                  <h3
                    data-title
                    className="font-display text-2xl md:text-3xl text-text-primary mb-4"
                    style={{ opacity: 0 }}
                  >
                    {principle.title}
                  </h3>
                  <p
                    data-desc
                    className="text-body text-text-secondary"
                    style={{ opacity: 0 }}
                  >
                    {principle.description}
                  </p>
                </div>

                {/* Quote */}
                <div className="md:col-span-6 flex items-end">
                  <blockquote
                    data-quote
                    className="font-mono text-sm text-text-secondary italic leading-relaxed"
                    style={{ opacity: 0 }}
                  >
                    {principle.quote}
                  </blockquote>
                </div>
              </div>
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
