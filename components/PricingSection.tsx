"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PLANS = [
  {
    number: "01",
    name: "LIGHT",
    price: "¥300,000〜",
    description: "SNS用ショート映像 / 簡易モーショングラフィックス",
    features: [
      "30秒以内のショート映像",
      "シンプルなモーショングラフィックス",
      "2回までの修正対応",
      "納品形式: MP4 / MOV",
    ],
    recommended: false,
    // Stripe Price ID — ダッシュボードで作成後に設定
    priceId: "price_light_placeholder",
  },
  {
    number: "02",
    name: "STANDARD",
    price: "¥800,000〜",
    description: "建築パース制作 / プロモーション映像（60秒以内）",
    features: [
      "60秒以内のプロモーション映像",
      "建築パース（静止画3点まで）",
      "フォトリアルレンダリング",
      "5回までの修正対応",
      "BGM・SE込み",
    ],
    recommended: true,
    priceId: "price_standard_placeholder",
  },
  {
    number: "03",
    name: "PREMIUM",
    price: "¥2,000,000〜",
    description: "ウォークスルー映像 / 大規模3DCGアニメーション / VR対応",
    features: [
      "ウォークスルー映像制作",
      "大規模3DCGアニメーション",
      "VR / インタラクティブ対応",
      "修正回数無制限",
      "専任ディレクター",
      "4K / 8K対応",
    ],
    recommended: false,
    priceId: "price_premium_placeholder",
  },
];

export default function PricingSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) {
      cardsRef.current.forEach((card) => {
        if (card) card.style.opacity = "1";
      });
      return;
    }

    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1.0,
            ease: "power3.out",
            delay: i * 0.1,
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

  const handleCheckout = async (plan: (typeof PLANS)[number]) => {
    setLoadingPlan(plan.name);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          priceId: plan.priceId,
          planName: plan.name,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Checkout failed");
      }

      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      console.error("[Checkout]", err);
      // Stripe未設定時のフォールバック: #contactへスクロール
      const contact = document.querySelector("#contact");
      if (contact) contact.scrollIntoView({ behavior: "smooth" });
    } finally {
      setLoadingPlan(null);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="pricing"
      className="section-py"
      aria-labelledby="pricing-heading"
    >
      <div className="container-lumiere">
        {/* Section heading */}
        <div className="mb-20 md:mb-32">
          <span className="label-mono block mb-4">Plans</span>
          <h2 id="pricing-heading" className="font-display text-display-lg pb-2">
            Pricing
          </h2>
        </div>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {PLANS.map((plan, i) => {
            const isLoading = loadingPlan === plan.name;

            return (
              <div
                key={plan.name}
                ref={(el) => {
                  cardsRef.current[i] = el;
                }}
                style={{ opacity: 0 }}
                className={`relative p-8 md:p-10 bg-bg-secondary rounded-card transition-colors duration-400 group
                  ${
                    plan.recommended
                      ? "border border-accent"
                      : "border border-border hover:border-accent"
                  }`}
              >
                {/* Recommended badge */}
                {plan.recommended && (
                  <div className="absolute -top-3 left-8">
                    <span className="font-mono text-[10px] uppercase tracking-widest bg-accent text-bg-primary px-3 py-1">
                      Recommended
                    </span>
                  </div>
                )}

                {/* Plan header */}
                <div className="mb-8">
                  <span className="label-mono block mb-3">
                    {plan.number}. {plan.name}
                  </span>
                  <div className="font-display text-2xl md:text-3xl text-text-primary mb-3">
                    {plan.price}
                  </div>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {plan.description}
                  </p>
                </div>

                {/* Divider */}
                <div className="divider mb-8" />

                {/* Features */}
                <ul className="space-y-3 mb-10">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-3 text-sm text-text-secondary"
                    >
                      <span className="text-accent mt-0.5 flex-shrink-0">
                        —
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <button
                  onClick={() => handleCheckout(plan)}
                  disabled={isLoading}
                  className={`w-full py-3 px-6 font-mono text-xs uppercase tracking-widest transition-all duration-400 flex items-center justify-center gap-2
                    ${
                      plan.recommended
                        ? "bg-accent text-bg-primary hover:bg-accent-hover"
                        : "border border-border text-text-primary hover:border-accent hover:text-accent"
                    }
                    disabled:opacity-60 disabled:cursor-wait`}
                  aria-label={`${plan.name}プランについて相談する`}
                >
                  {isLoading ? (
                    <>
                      <svg
                        className="animate-spin w-4 h-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        aria-hidden="true"
                      >
                        <circle
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeDasharray="60"
                          strokeDashoffset="15"
                          strokeLinecap="round"
                        />
                      </svg>
                      Processing...
                    </>
                  ) : (
                    "相談する"
                  )}
                </button>
              </div>
            );
          })}
        </div>

        {/* Note */}
        <p className="mt-10 text-center text-sm text-text-secondary">
          プロジェクト内容により変動します。まずはご相談ください。
        </p>
      </div>

      {/* Bottom separator */}
      <div className="container-lumiere mt-section">
        <div className="divider" />
      </div>
    </section>
  );
}
