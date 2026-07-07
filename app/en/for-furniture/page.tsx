import type { Metadata } from "next";
import { VerticalLanding } from "@/components/vertical/VerticalLanding";
import { VERTICALS, verticalJsonLd } from "@/lib/verticals";

const URL_PATH = "https://ssatou.vercel.app/en/for-furniture";
const TITLE = "3D Product Configurator Development for Furniture Brands";
const DESCRIPTION =
  "End-to-end 3D product configurator development for furniture and D2C brands: 3D modeling, React Three Fiber development, and e-commerce integration by one developer. Let customers switch colors, materials, and options right in the browser.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "3D product configurator",
    "furniture configurator",
    "React Three Fiber developer",
    "Three.js configurator",
    "3D e-commerce",
    "product visualization",
    "WebGL developer",
  ],
  alternates: { canonical: URL_PATH },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: URL_PATH,
    siteName: "S.SATOU",
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: TITLE }],
  },
};

const jsonLd = verticalJsonLd(VERTICALS.furnitureEn, {
  url: URL_PATH,
  serviceName: "3D Product Configurator Development",
  description: DESCRIPTION,
});

export default function ForFurnitureEnPage() {
  return (
    <>
      {jsonLd.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <VerticalLanding data={VERTICALS.furnitureEn} />
    </>
  );
}
