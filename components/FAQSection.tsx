"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FAQ_ITEMS } from "@/lib/faq";

gsap.registerPlugin(ScrollTrigger);

export function FAQSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      [headingRef, listRef].forEach((ref) => {
        if (ref.current) ref.current.style.opacity = "1";
      });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        [headingRef.current, listRef.current],
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 1.0, stagger: 0.15, ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="faq"
      className="section-py"
      aria-labelledby="faq-heading"
    >
      <div className="container-lumiere">
        <div ref={headingRef} className="mb-16 md:mb-24" style={{ opacity: 0 }}>
          <span className="label-mono block mb-4">FAQ</span>
          <h2 id="faq-heading" className="font-display text-display-lg pb-2">
            よくあるご質問
          </h2>
        </div>

        <div ref={listRef} className="max-w-3xl space-y-4" style={{ opacity: 0 }}>
          {FAQ_ITEMS.map((item) => (
            <details
              key={item.q}
              className="group border border-border rounded-card bg-bg-secondary"
            >
              <summary className="flex items-center justify-between gap-4 cursor-pointer list-none p-5 md:p-6">
                <span className="font-display text-base text-text-primary">
                  {item.q}
                </span>
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

      {/* ボトムセパレーター */}
      <div className="container-lumiere mt-section">
        <div className="divider" />
      </div>
    </section>
  );
}
