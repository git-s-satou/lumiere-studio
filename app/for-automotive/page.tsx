import type { Metadata } from "next";
import { VerticalLanding } from "@/components/vertical/VerticalLanding";
import { VERTICALS, verticalJsonLd } from "@/lib/verticals";

const URL_PATH = "https://ssatou.vercel.app/for-automotive";
const TITLE = "自動車パーツメーカー・カスタムショップ向け CGI制作";
const DESCRIPTION =
  "自動車アフターパーツメーカー・カスタムショップ向けのフォトリアル3DCG制作。実車撮影なしでプロモーション映像・カラーバリエーション・装着シミュレーターを制作します。撮影コストを削減し、「自分の車に付けた姿」を見せて購入を後押しします。";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "自動車 CGI",
    "カーアニメーション",
    "自動車パーツ 3D",
    "フォトリアル CG",
    "パーツ コンフィギュレーター",
    "カスタムカー CG",
    "Unreal Engine 自動車",
  ],
  alternates: { canonical: URL_PATH },
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: URL_PATH,
    siteName: "S.SATOU",
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: TITLE }],
  },
};

const jsonLd = verticalJsonLd(VERTICALS.automotive, {
  url: URL_PATH,
  serviceName: "自動車CGI映像・パーツコンフィギュレーター制作",
  description: DESCRIPTION,
});

export default function ForAutomotivePage() {
  return (
    <>
      {jsonLd.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <VerticalLanding data={VERTICALS.automotive} />
    </>
  );
}
