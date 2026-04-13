import type { Metadata, Viewport } from "next";
import { Inter, Noto_Sans_JP, Space_Mono } from "next/font/google";
import LenisProvider from "@/providers/LenisProvider";
import "./globals.css";

/* ─── Font loading (Next.js font optimization) ──────────────── */
const inter = Inter({
  subsets:  ["latin"],
  weight:   ["700", "800", "900"],
  variable: "--font-syne",
  display:  "swap",
});

const notoSansJP = Noto_Sans_JP({
  subsets:  ["latin"],
  weight:   ["400", "700"],
  variable: "--font-noto-sans-jp",
  display:  "swap",
});

const spaceMono = Space_Mono({
  subsets:  ["latin"],
  weight:   ["400", "700"],
  variable: "--font-space-mono",
  display:  "swap",
});

/* ─── SEO Metadata ─────────────────────────────────────────── */
const SITE_URL = "https://claude0227-r8l04wkx3-sss2t18-gmailcoms-projects.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default:  "S.SATOU | クリエイティブデベロッパー — 3DCG・Web開発・映像制作",
    template: "%s | S.SATOU",
  },
  description:
    "S.SATOUのポートフォリオ。3DCGアニメーション、インタラクティブWeb開発、モーショングラフィックスを手がけるクリエイティブデベロッパー。Next.js・Three.js・Blenderを活用し、企画から実装まで一貫して対応します。",

  keywords: [
    "クリエイティブデベロッパー",
    "フリーランス",
    "3DCGアニメーション",
    "Web開発",
    "Next.js",
    "Three.js",
    "Blender",
    "モーショングラフィックス",
    "インタラクティブWeb",
    "フロントエンドエンジニア",
    "映像制作",
    "ポートフォリオ",
    "S.SATOU",
  ],

  authors: [{ name: "S.SATOU" }],

  alternates: {
    canonical: SITE_URL,
  },

  openGraph: {
    type:        "website",
    locale:      "ja_JP",
    url:         SITE_URL,
    siteName:    "S.SATOU",
    title:       "S.SATOU | クリエイティブデベロッパー — 3DCG・Web開発・映像制作",
    description: "3DCGアニメーション、インタラクティブWeb開発、モーショングラフィックスを手がけるクリエイティブデベロッパー。企画から実装まで一貫して対応。",
    images: [
      {
        url:    "/og-image.jpg",
        width:  1200,
        height: 630,
        alt:    "S.SATOU - クリエイティブデベロッパー ポートフォリオ",
      },
    ],
  },

  twitter: {
    card:        "summary_large_image",
    title:       "S.SATOU | クリエイティブデベロッパー — 3DCG・Web開発・映像制作",
    description: "3DCGアニメーション、インタラクティブWeb開発、モーショングラフィックスを手がけるクリエイティブデベロッパー。企画から実装まで一貫して対応。",
    images:      ["/og-image.jpg"],
  },

  robots: {
    index:  true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor:   "#050505",
  colorScheme:  "dark",
  width:        "device-width",
  initialScale: 1,
};

/* ─── JSON-LD Structured Data ──────────────────────────────── */
const jsonLdPerson = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "S.SATOU",
  url: SITE_URL,
  jobTitle: "クリエイティブデベロッパー",
  description: "3DCG・Web開発・映像制作を手がけるクリエイティブデベロッパー",
  knowsAbout: [
    "3DCG Animation",
    "Web Development",
    "Next.js",
    "Three.js",
    "Blender",
    "Motion Graphics",
    "Interactive Web",
  ],
  sameAs: [
    "https://github.com/git-s-satou",
  ],
};

const jsonLdServices = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: [
    {
      "@type": "Service",
      position: 1,
      name: "3DCGアニメーション制作",
      description: "Blenderを使った3DCGアニメーション・建築ビジュアライゼーション。空間やプロダクトをリアルに可視化します。",
      provider: { "@type": "Person", name: "S.SATOU" },
    },
    {
      "@type": "Service",
      position: 2,
      name: "Web開発・インタラクティブサイト制作",
      description: "Next.js・Three.js・React等を活用したモダンなWebサイト・Webアプリケーションの設計・開発。",
      provider: { "@type": "Person", name: "S.SATOU" },
    },
    {
      "@type": "Service",
      position: 3,
      name: "モーショングラフィックス",
      description: "ブランドの世界観を伝える2Dモーショングラフィックス・映像制作。",
      provider: { "@type": "Person", name: "S.SATOU" },
    },
  ],
};

const jsonLdFaq = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "納期はどれくらいですか？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "プロジェクト規模により2週間〜3ヶ月。詳細はヒアリング時にお伝えします。",
      },
    },
    {
      "@type": "Question",
      name: "修正回数に制限はありますか？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "基本プランでは2回まで。追加修正は別途ご相談ください。",
      },
    },
    {
      "@type": "Question",
      name: "素材（CADデータ等）の提供は必要ですか？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "建築VIZの場合、CADや3Dデータをご提供いただけると精度が上がります。",
      },
    },
    {
      "@type": "Question",
      name: "リモートでの打ち合わせは可能ですか？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "はい、Zoom/Google Meetでの打ち合わせに対応しています。",
      },
    },
    {
      "@type": "Question",
      name: "支払い方法は？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "クレジットカード（Stripe経由）または銀行振込に対応しています。",
      },
    },
  ],
};

/* ─── Root Layout ───────────────────────────────────────────── */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ja"
      className={`${inter.variable} ${notoSansJP.variable} ${spaceMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLdPerson),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLdServices),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLdFaq),
          }}
        />
      </head>
      <body>
        <LenisProvider>
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
