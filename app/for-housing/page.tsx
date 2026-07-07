import type { Metadata } from "next";
import { VerticalLanding } from "@/components/vertical/VerticalLanding";
import { VERTICALS, verticalJsonLd } from "@/lib/verticals";

const URL_PATH = "https://ssatou.vercel.app/for-housing";
const TITLE = "工務店・ハウスメーカー向け 建築ウォークスルー制作";
const DESCRIPTION =
  "工務店・ハウスメーカー・不動産会社向けの建築ビジュアライゼーション。図面からブラウザで歩けるインタラクティブウォークスルーと3DCG映像を制作し、完成前の物件を「体験」として届けます。モデルルームのコストを掛けずに、竣工前の成約を後押しします。";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "建築ウォークスルー",
    "建築ビジュアライゼーション",
    "建築パース 3D",
    "工務店 VR",
    "バーチャルモデルルーム",
    "3DCG 建築",
    "不動産 3D",
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

const jsonLd = verticalJsonLd(VERTICALS.housing, {
  url: URL_PATH,
  serviceName: "建築ウォークスルー・3DCG映像制作（住宅・不動産）",
  description: DESCRIPTION,
});

export default function ForHousingPage() {
  return (
    <>
      {jsonLd.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <VerticalLanding data={VERTICALS.housing} />
    </>
  );
}
