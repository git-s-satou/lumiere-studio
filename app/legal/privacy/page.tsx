import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "プライバシーポリシー",
};

const SECTIONS = [
  {
    title: "1. 個人情報の定義",
    body: "個人情報とは、氏名、メールアドレス、電話番号、会社名など、特定の個人を識別できる情報を指します。",
  },
  {
    title: "2. 個人情報の収集方法",
    body: "当社は、お問い合わせフォーム、メール、お電話でのやり取りを通じて個人情報を収集いたします。また、Stripeを通じた決済時にクレジットカード情報を収集しますが、当社サーバーにカード情報が保存されることはありません。",
  },
  {
    title: "3. 個人情報の利用目的",
    body: "収集した個人情報は、以下の目的で利用いたします。\n・お問い合わせへの回答\n・サービスの提供・改善\n・請求書の発行・決済処理\n・新サービスやキャンペーンのご案内（同意をいただいた場合のみ）",
  },
  {
    title: "4. 個人情報の第三者提供",
    body: "当社は、法令に基づく場合を除き、お客様の同意なく個人情報を第三者に提供することはありません。ただし、以下の場合を除きます。\n・決済処理のためのStripe Inc.への情報提供\n・法令に基づく開示請求があった場合",
  },
  {
    title: "5. 個人情報の安全管理",
    body: "当社は、個人情報の漏洩、滅失、毀損を防止するため、適切なセキュリティ対策を講じます。SSL/TLS暗号化通信を使用し、アクセス制御を実施しています。",
  },
  {
    title: "6. Cookieの使用",
    body: "当社ウェブサイトでは、ユーザー体験の向上およびアクセス解析のためにCookieを使用する場合があります。ブラウザの設定によりCookieの受け取りを拒否することが可能です。",
  },
  {
    title: "7. アクセス解析ツール",
    body: "当社ウェブサイトでは、Google Analyticsを使用してアクセス情報を収集する場合があります。収集されるデータは匿名であり、個人を特定するものではありません。",
  },
  {
    title: "8. 個人情報の開示・訂正・削除",
    body: "お客様は、当社が保有する個人情報の開示・訂正・削除を請求することができます。ご希望の場合は、下記のお問い合わせ先までご連絡ください。",
  },
  {
    title: "9. ポリシーの変更",
    body: "当社は、法令の改正や事業内容の変更に伴い、本ポリシーを変更することがあります。変更後のポリシーは、ウェブサイト上に掲載した時点で効力を生じます。",
  },
  {
    title: "10. お問い合わせ窓口",
    body: "S.SATOU\nメール: hello@lumiere.studio\n所在地: 〒150-0001 東京都渋谷区神宮前3-1-1（※仮住所）\n受付時間: 平日 10:00〜19:00",
  },
];

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-bg-primary py-32">
      <div className="container-lumiere max-w-3xl">
        <Link
          href="/"
          className="label-mono inline-block mb-12 text-text-secondary hover:text-accent transition-colors duration-400"
        >
          &larr; Back to Top
        </Link>

        <h1 className="font-display text-display-lg text-text-primary mb-6">
          プライバシーポリシー
        </h1>
        <p className="text-sm text-text-secondary mb-16">
          最終更新日: 2025年1月1日
        </p>

        <p className="text-body text-text-secondary mb-16">
          S.SATOU（以下「当社」）は、お客様の個人情報を適切に保護することが社会的責務であると考え、以下のプライバシーポリシーを定めます。
        </p>

        <div className="space-y-12">
          {SECTIONS.map((section) => (
            <div key={section.title}>
              <h2 className="font-display text-lg text-text-primary mb-4">
                {section.title}
              </h2>
              <p className="text-body text-text-secondary whitespace-pre-line leading-relaxed">
                {section.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
