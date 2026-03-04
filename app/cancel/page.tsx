import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "お支払いキャンセル",
  robots: { index: false, follow: false },
};

export default function CancelPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-bg-primary">
      <div className="container-lumiere text-center max-w-xl">
        {/* X icon */}
        <div className="mx-auto mb-8 w-16 h-16 rounded-full border border-text-secondary flex items-center justify-center">
          <svg
            className="w-8 h-8 text-text-secondary"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>

        <h1 className="font-display text-display-lg text-text-primary mb-4">
          お支払いがキャンセルされました
        </h1>
        <p className="text-body text-text-secondary mb-12">
          ご不明な点がございましたら、お気軽にお問い合わせください。
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-block font-mono text-xs uppercase tracking-widest bg-accent text-bg-primary px-8 py-4 hover:bg-accent-hover transition-colors duration-400"
          >
            トップへ戻る
          </Link>
          <Link
            href="/#contact"
            className="inline-block font-mono text-xs uppercase tracking-widest border border-border text-text-primary px-8 py-4 hover:border-accent hover:text-accent transition-colors duration-400"
          >
            お問い合わせ
          </Link>
        </div>
      </div>
    </main>
  );
}
