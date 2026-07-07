import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DemoFrame } from "@/components/vertical/VerticalLanding";
import { CASE_STUDIES, getCaseStudy } from "@/lib/case-studies";
import { EMAIL } from "@/lib/verticals";

export function generateStaticParams() {
  return CASE_STUDIES.map((cs) => ({ slug: cs.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const cs = getCaseStudy(params.slug);
  if (!cs) return {};

  const url = `https://ssatou.vercel.app/works/${cs.slug}`;
  return {
    title: `${cs.title} — ケーススタディ`,
    description: cs.summary,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      locale: "ja_JP",
      url,
      siteName: "S.SATOU",
      title: `${cs.title} — ケーススタディ`,
      description: cs.summary,
      images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: cs.title }],
    },
  };
}

export default function CaseStudyPage({
  params,
}: {
  params: { slug: string };
}) {
  const cs = getCaseStudy(params.slug);
  if (!cs) notFound();

  const mailHref = `mailto:${EMAIL}?subject=${encodeURIComponent(`【${cs.title}を見て相談】`)}`;

  return (
    <div>
      {/* ── ナビゲーション ── */}
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
            相談する
          </a>
        </div>
      </header>

      <main>
        {/* ── ヒーロー ── */}
        <section className="pt-40 md:pt-56 pb-16 md:pb-24">
          <div className="container-lumiere">
            <div className="flex flex-wrap items-center gap-3 mb-8">
              <span
                className="inline-block font-mono uppercase tracking-widest border border-accent/40 text-accent px-4 py-1.5"
                style={{ fontSize: "11px" }}
              >
                {cs.category}
              </span>
              {cs.isDemo && (
                <span
                  className="inline-block font-mono uppercase tracking-widest border border-border text-text-secondary px-4 py-1.5"
                  style={{ fontSize: "11px" }}
                >
                  自主制作デモ
                </span>
              )}
            </div>
            <h1 className="font-display text-display-lg max-w-4xl mb-6">{cs.title}</h1>
            <p className="text-body text-text-secondary max-w-2xl leading-relaxed">
              {cs.summary}
            </p>

            {/* メタ情報 */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 pt-8 border-t border-border max-w-3xl">
              <div>
                <span className="label-mono block mb-2">Industry</span>
                <span className="text-sm text-text-primary">{cs.industry}</span>
              </div>
              <div>
                <span className="label-mono block mb-2">Duration</span>
                <span className="text-sm text-text-primary">{cs.duration}</span>
              </div>
              <div className="col-span-2">
                <span className="label-mono block mb-2">Stack</span>
                <span className="text-sm text-text-primary">{cs.stack.join(" / ")}</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── デモ ── */}
        {cs.embed && (
          <section className="pb-16 md:pb-24">
            <div className="container-lumiere">
              <DemoFrame
                embed={cs.embed}
                title={cs.title}
                playLabel="デモを起動する"
                openLabel="別タブで開く →"
              />
            </div>
          </section>
        )}

        {/* ── 課題 ── */}
        <section className="py-16 md:py-24 bg-bg-secondary">
          <div className="container-lumiere">
            <span className="label-mono block mb-4">Challenge</span>
            <div className="accent-line mb-10" />
            <div className="max-w-3xl space-y-5">
              {cs.challenge.map((paragraph) => (
                <p key={paragraph} className="text-body text-text-secondary leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </section>

        {/* ── アプローチ ── */}
        <section className="py-16 md:py-24">
          <div className="container-lumiere">
            <span className="label-mono block mb-4">Approach</span>
            <div className="accent-line mb-10" />
            <ol className="max-w-3xl space-y-8">
              {cs.approach.map((paragraph, i) => (
                <li key={paragraph} className="flex gap-6">
                  <span className="label-mono text-accent flex-shrink-0 pt-1">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-body text-text-secondary leading-relaxed">{paragraph}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ── 納品物 ── */}
        <section className="py-16 md:py-24 bg-bg-secondary">
          <div className="container-lumiere">
            <span className="label-mono block mb-4">Deliverables</span>
            <div className="accent-line mb-10" />
            <ul className="max-w-3xl space-y-3">
              {cs.deliverables.map((item) => (
                <li key={item} className="flex items-start gap-3 text-body text-text-secondary">
                  <span className="text-accent mt-0.5 flex-shrink-0">—</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── 数値成果（実測値がある場合のみ） ── */}
        {cs.results.length > 0 && (
          <section className="py-16 md:py-24">
            <div className="container-lumiere">
              <span className="label-mono block mb-4">Results</span>
              <div className="accent-line mb-10" />
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl">
                {cs.results.map((result) => (
                  <div key={result.label}>
                    <div className="font-display text-3xl md:text-4xl text-accent mb-2">
                      {result.value}
                    </div>
                    <div className="text-sm text-text-secondary">{result.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── クライアントの声（ある場合のみ） ── */}
        {cs.testimonial && (
          <section className="py-16 md:py-24 bg-bg-secondary">
            <div className="container-lumiere">
              <span className="label-mono block mb-4">Client Voice</span>
              <div className="accent-line mb-10" />
              <blockquote className="max-w-3xl">
                <p className="font-display text-xl md:text-2xl text-text-primary leading-relaxed mb-6">
                  “{cs.testimonial.quote}”
                </p>
                <cite className="text-sm text-text-secondary not-italic">
                  — {cs.testimonial.author}
                </cite>
              </blockquote>
            </div>
          </section>
        )}

        {/* ── CTA ── */}
        <section className="py-16 md:py-24 bg-bg-elevated">
          <div className="container-lumiere text-center">
            <span className="label-mono block mb-4">Get in Touch</span>
            <h2 className="font-display text-display-lg pb-2 mb-6">
              同じ仕組みを、御社の製品で。
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mt-8">
              <a
                href={mailHref}
                className="bg-accent text-bg-primary font-mono text-xs uppercase tracking-widest px-10 py-4 hover:bg-accent-hover transition-colors duration-400"
              >
                メールで相談する
              </a>
              <a
                href={cs.solutionHref}
                className="border border-border text-text-primary font-mono text-xs uppercase tracking-widest px-10 py-4 hover:border-accent hover:text-accent transition-colors duration-400"
              >
                {cs.solutionLabel} →
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* ── フッター ── */}
      <footer className="border-t border-border">
        <div className="container-lumiere py-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p className="font-mono text-xs text-text-secondary">
            S.SATOU &copy;{new Date().getFullYear()}
          </p>
          <a
            href="/"
            className="font-mono text-xs uppercase tracking-widest text-text-secondary hover:text-accent transition-colors duration-400"
          >
            ポートフォリオトップへ →
          </a>
        </div>
      </footer>
    </div>
  );
}
