import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "特定商取引法に基づく表記",
};

const ROWS = [
  { label: "販売業者", value: "LUMIERE STUDIO（ルミエールスタジオ）" },
  { label: "代表責任者", value: "（代表者名を記載）" },
  {
    label: "所在地",
    value: "〒150-0001 東京都渋谷区神宮前3-1-1（※仮住所）",
  },
  { label: "電話番号", value: "03-XXXX-XXXX（受付: 平日10:00〜19:00）" },
  { label: "メールアドレス", value: "hello@lumiere.studio" },
  {
    label: "販売価格",
    value:
      "各サービスページに記載の価格（税込）。プロジェクト内容に応じてお見積りいたします。",
  },
  {
    label: "支払い方法",
    value:
      "クレジットカード（Visa, Mastercard, American Express ／ Stripe経由）、銀行振込",
  },
  {
    label: "支払い時期",
    value:
      "クレジットカード: 注文確定時に決済。銀行振込: 請求書発行後14日以内。",
  },
  {
    label: "商品の引き渡し時期",
    value:
      "プロジェクト規模に応じて2週間〜3ヶ月。詳細はヒアリング時にお伝えします。",
  },
  {
    label: "返品・キャンセルについて",
    value:
      "制作着手前: 全額返金。制作着手後: 進捗に応じた精算。完成物の納品後の返品はお受けできません。",
  },
  {
    label: "動作環境",
    value:
      "納品ファイル形式: MP4, MOV, PNG, EXR 等。再生環境はクライアントの環境に依存します。",
  },
];

export default function TokushohoPage() {
  return (
    <main className="min-h-screen bg-bg-primary py-32">
      <div className="container-lumiere max-w-3xl">
        <Link
          href="/"
          className="label-mono inline-block mb-12 text-text-secondary hover:text-accent transition-colors duration-400"
        >
          &larr; Back to Top
        </Link>

        <h1 className="font-display text-display-lg text-text-primary mb-16">
          特定商取引法に基づく表記
        </h1>

        <div className="space-y-0">
          {ROWS.map((row) => (
            <div
              key={row.label}
              className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-2 md:gap-8 py-6 border-b border-border"
            >
              <dt className="label-mono text-text-secondary">{row.label}</dt>
              <dd className="text-body text-text-primary">{row.value}</dd>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
