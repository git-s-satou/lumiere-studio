import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "ご注文完了",
  robots: { index: false, follow: false },
};

export default function SuccessPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-bg-primary">
      <div className="container-lumiere text-center max-w-xl">
        {/* Check icon */}
        <div className="mx-auto mb-8 w-16 h-16 rounded-full border border-accent flex items-center justify-center">
          <svg
            className="w-8 h-8 text-accent"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="font-display text-display-lg text-text-primary mb-4">
          ご注文ありがとうございます
        </h1>
        <p className="text-body text-text-secondary mb-2">
          お支払いが正常に完了しました。
        </p>
        <p className="text-body text-text-secondary mb-12">
          担当者より2営業日以内にご連絡いたします。
        </p>

        <Link
          href="/"
          className="inline-block font-mono text-xs uppercase tracking-widest bg-accent text-bg-primary px-8 py-4 hover:bg-accent-hover transition-colors duration-400"
        >
          トップへ戻る
        </Link>
      </div>
    </main>
  );
}
