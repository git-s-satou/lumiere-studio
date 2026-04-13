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
const SITE_URL = "https://lumiere-studio.jp";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default:  "S.SATOU | 建築ビジュアライゼーション & アニメーション映像制作",
    template: "%s | S.SATOU",
  },
  description:
    "建築パース、ウォークスルー映像、3DCGアニメーション、モーショングラフィックスの映像制作スタジオ。設計段階の空間をフォトリアルに可視化します。",

  keywords: [
    "建築ビジュアライゼーション",
    "建築パース",
    "ウォークスルー映像",
    "3DCGアニメーション",
    "モーショングラフィックス",
    "映像制作",
    "映像制作会社",
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
    title:       "S.SATOU | 建築ビジュアライゼーション & アニメーション映像制作",
    description: "建築パース、ウォークスルー映像、3DCGアニメーション、モーショングラフィックスの映像制作スタジオ。設計段階の空間をフォトリアルに可視化します。",
    images: [
      {
        url:    "/og-image.jpg",
        width:  1200,
        height: 630,
        alt:    "S.SATOU - 建築ビジュアライゼーション & アニメーション映像制作",
      },
    ],
  },

  twitter: {
    card:        "summary_large_image",
    title:       "S.SATOU | 建築ビジュアライゼーション & アニメーション映像制作",
    description: "建築パース、ウォークスルー映像、3DCGアニメーション、モーショングラフィックスの映像制作スタジオ。設計段階の空間をフォトリアルに可視化します。",
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
const jsonLdOrganization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "S.SATOU",
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  email: "hello@lumiere.studio",
  sameAs: [
    "https://instagram.com/lumiere.studio",
    "https://youtube.com/@lumierestudio",
    "https://vimeo.com/lumierestudio",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    email: "hello@lumiere.studio",
    contactType: "customer service",
    availableLanguage: ["Japanese", "English"],
  },
};

const jsonLdLocalBusiness = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "S.SATOU",
  image: `${SITE_URL}/og-image.jpg`,
  url: SITE_URL,
  email: "hello@lumiere.studio",
  address: {
    "@type": "PostalAddress",
    streetAddress: "神宮前3-1-1",
    addressLocality: "渋谷区",
    addressRegion: "東京都",
    postalCode: "150-0001",
    addressCountry: "JP",
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "10:00",
    closes: "19:00",
  },
  priceRange: "¥¥¥",
};

const jsonLdServices = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: [
    {
      "@type": "Service",
      position: 1,
      name: "建築ビジュアライゼーション",
      description: "建築パース・ウォークスルー映像。設計段階の空間をフォトリアルに可視化します。",
      provider: { "@type": "Organization", name: "S.SATOU" },
    },
    {
      "@type": "Service",
      position: 2,
      name: "アニメーション映像制作",
      description: "モーショングラフィックス・3DCGアニメーション。ブランドの世界観を映像で表現します。",
      provider: { "@type": "Organization", name: "S.SATOU" },
    },
    {
      "@type": "Service",
      position: 3,
      name: "映像コンサルティング",
      description: "映像戦略の立案から制作ディレクションまで、クライアントのビジョンを実現するためのコンサルティング。",
      provider: { "@type": "Organization", name: "S.SATOU" },
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
            __html: JSON.stringify(jsonLdOrganization),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLdLocalBusiness),
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
