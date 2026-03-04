"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ImpactText() {
  const sectionRef = useRef<HTMLElement>(null);
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      if (line1Ref.current) line1Ref.current.style.opacity = "1";
      if (line2Ref.current) line2Ref.current.style.opacity = "1";
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        line1Ref.current,
        { x: -120, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            end: "top 25%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        line2Ref.current,
        { x: 120, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 65%",
            end: "top 15%",
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
      id="impact"
      className="section-py flex flex-col items-center justify-center min-h-[60vh]"
      aria-label="インパクトテキスト"
    >
      <div className="container-lumiere">
        <div
          ref={line1Ref}
          className="font-display text-text-primary"
          style={{
            opacity: 0,
            fontSize: "clamp(3rem, 10vw, 8rem)",
            fontWeight: 800,
            letterSpacing: "-0.02em",
            lineHeight: 1.05,
          }}
        >
          想像を、
        </div>
        <div className="h-4 md:h-8" />
        <div
          ref={line2Ref}
          className="font-display text-text-primary text-right"
          style={{
            opacity: 0,
            fontSize: "clamp(3rem, 10vw, 8rem)",
            fontWeight: 800,
            letterSpacing: "-0.02em",
            lineHeight: 1.05,
          }}
        >
          現実にする。
        </div>
      </div>
      <div className="w-full mt-auto">
        <div className="divider" />
      </div>
    </section>
  );
}
