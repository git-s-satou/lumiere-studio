import type { Metadata } from "next";
import { VerticalLanding } from "@/components/vertical/VerticalLanding";
import { VERTICALS, verticalJsonLd } from "@/lib/verticals";

const URL_PATH = "https://ssatou.vercel.app/for-furniture";
const TITLE = "家具メーカー向け 3Dコンフィギュレーター開発";
const DESCRIPTION =
  "家具・インテリアメーカー向けの3Dプロダクトコンフィギュレーター開発。ブラウザ上でカラー・素材・オプションを切り替えられるWeb体験で、カタログ費用を削減し、ECの購入率と問い合わせの質を高めます。3Dモデル化から実装・EC連携まで一人で完結。";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "3Dコンフィギュレーター",
    "家具 3D",
    "プロダクトコンフィギュレーター",
    "家具メーカー EC",
    "Three.js",
    "React Three Fiber",
    "バーチャルショールーム",
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

const jsonLd = verticalJsonLd(VERTICALS.furniture, {
  url: URL_PATH,
  serviceName: "3Dプロダクトコンフィギュレーター開発（家具・インテリア）",
  description: DESCRIPTION,
});

export default function ForFurniturePage() {
  return (
    <>
      {jsonLd.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <VerticalLanding data={VERTICALS.furniture} />
    </>
  );
}
