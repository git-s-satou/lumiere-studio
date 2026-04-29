"use client";

import { useEffect, useRef, useState, FormEvent } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const INQUIRY_TYPES = [
  { value: "", label: "相談内容を選択してください" },
  { value: "web-development", label: "Webサイト・LP制作" },
  { value: "interactive-web", label: "インタラクティブWeb / 3D Webアプリ" },
  { value: "3dcg", label: "3DCGアニメーション" },
  { value: "motion-graphics", label: "モーショングラフィックス" },
  { value: "configurator", label: "3Dコンフィギュレーター開発" },
  { value: "consultation", label: "無料相談（30分）を希望" },
  { value: "other", label: "その他" },
];

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const emailRef = useRef<HTMLDivElement>(null);
  const formWrapRef = useRef<HTMLDivElement>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      [headingRef, emailRef, formWrapRef].forEach((ref) => {
        if (ref.current) ref.current.style.opacity = "1";
      });
      return;
    }

    const ctx = gsap.context(() => {
      const elements = [headingRef.current, emailRef.current, formWrapRef.current].filter(Boolean);

      gsap.fromTo(
        elements,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.0,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    console.log("[Contact] Form submitted:", data);
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const inputClasses =
    "w-full bg-transparent border-0 border-b border-border py-3 text-text-primary text-body placeholder:text-text-secondary/50 focus:outline-none focus:border-accent transition-colors duration-400";

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="section-py"
      aria-labelledby="contact-heading"
    >
      <div className="container-lumiere">
        {/* Heading */}
        <div ref={headingRef} className="mb-8" style={{ opacity: 0 }}>
          <span className="label-mono block mb-4">Contact</span>
          <h2
            id="contact-heading"
            className="font-display text-display-lg pb-2 mb-6"
          >
            Get in Touch
          </h2>
          <p className="text-body text-text-secondary max-w-2xl leading-relaxed">
            プロジェクトのご相談、お見積り依頼、まずはお気軽にお問い合わせください。
            <br />
            <span className="text-accent">初回30分の無料オンライン相談</span>を承っております。
          </p>
        </div>

        {/* Quick contact options */}
        <div ref={emailRef} className="mb-16 md:mb-24 grid grid-cols-1 md:grid-cols-2 gap-6" style={{ opacity: 0 }}>
          {/* Email card */}
          <a
            href="mailto:s.s.s.2t18@gmail.com?subject=【お問い合わせ】S.SATOUポートフォリオより"
            className="group p-6 md:p-8 bg-bg-secondary rounded-card border border-border hover:border-accent transition-colors duration-400"
          >
            <span className="label-mono block mb-3 text-text-secondary group-hover:text-accent transition-colors duration-400">
              Email
            </span>
            <span className="font-display text-base md:text-lg text-text-primary block mb-2 break-all">
              s.s.s.2t18@gmail.com
            </span>
            <span className="font-mono text-xs text-text-secondary">
              24時間以内にご返信 →
            </span>
          </a>

          {/* Free consultation card */}
          <a
            href="mailto:s.s.s.2t18@gmail.com?subject=【無料相談希望】30分オンライン相談&body=以下の内容でご相談を希望します。%0A%0A・ご希望日時の候補:%0A・プロジェクト概要:%0A・ご予算（任意）:"
            className="group p-6 md:p-8 bg-accent text-bg-primary rounded-card hover:bg-accent-hover transition-colors duration-400"
          >
            <span className="label-mono block mb-3 opacity-70">
              Free Consultation
            </span>
            <span className="font-display text-base md:text-lg block mb-2">
              30分の無料オンライン相談
            </span>
            <span className="font-mono text-xs opacity-80">
              気軽にご相談ください →
            </span>
          </a>
        </div>

        {/* Form */}
        <div ref={formWrapRef} style={{ opacity: 0 }}>
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="max-w-2xl space-y-8"
            noValidate
          >
            {/* Name */}
            <div>
              <label htmlFor="name" className="label-mono block mb-2">
                Name *
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                placeholder="お名前"
                className={inputClasses}
                autoComplete="name"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="label-mono block mb-2">
                Email *
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="your@email.com"
                className={inputClasses}
                autoComplete="email"
              />
            </div>

            {/* Company */}
            <div>
              <label htmlFor="company" className="label-mono block mb-2">
                Company
              </label>
              <input
                id="company"
                name="company"
                type="text"
                placeholder="会社名（任意）"
                className={inputClasses}
                autoComplete="organization"
              />
            </div>

            {/* Inquiry type */}
            <div>
              <label htmlFor="inquiry" className="label-mono block mb-2">
                Inquiry Type *
              </label>
              <select
                id="inquiry"
                name="inquiry"
                required
                className={`${inputClasses} bg-bg-primary`}
                defaultValue=""
              >
                {INQUIRY_TYPES.map((type) => (
                  <option
                    key={type.value}
                    value={type.value}
                    disabled={type.value === ""}
                  >
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="label-mono block mb-2">
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                placeholder="プロジェクトの概要をお聞かせください"
                className={`${inputClasses} resize-none`}
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitted}
              className="bg-accent text-bg-primary font-mono text-xs uppercase tracking-widest px-10 py-4 hover:bg-accent-hover transition-colors duration-400 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitted ? "Sent!" : "Send Message"}
            </button>

            {isSubmitted && (
              <p className="text-accent text-sm mt-4" role="status">
                お問い合わせを受け付けました。3営業日以内にご返信いたします。
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
