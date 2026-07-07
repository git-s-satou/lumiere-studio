/* ============================================================
   ケーススタディ定義 — /works/[slug]
   実案件が完了したらこの配列に追加するだけで公開できる。
   数値成果(results)・クライアントの声(testimonial)は
   実データが取れてから記入すること。虚偽の実績は書かない。
   ============================================================ */

import type { DemoEmbed } from "@/lib/verticals";

export type CaseStudy = {
  slug: string;
  title: string;
  category: string;
  industry: string;
  /** 自主制作デモの場合true — ページ上に明記される */
  isDemo: boolean;
  summary: string;
  challenge: string[];
  approach: string[];
  deliverables: string[];
  /** 導入前後の数値成果。実測値が取れてから記入 */
  results: { value: string; label: string }[];
  testimonial?: { quote: string; author: string };
  embed?: DemoEmbed;
  stack: string[];
  duration: string;
  /** 関連する業種別LPへの導線 */
  solutionHref: string;
  solutionLabel: string;
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "furniture-configurator",
    title: "Furniture Configurator",
    category: "3D CONFIGURATOR",
    industry: "家具・インテリア",
    isDemo: true,
    summary:
      "ブラウザ上で家具のカラー・素材をリアルタイムに切り替えられる3Dコンフィギュレーターの自主制作デモ。実際の導入イメージを体験できます。",
    challenge: [
      "家具のECサイトでは、写真だけでは素材感やカラーバリエーションが伝わらず、購入の最後のひと押しができないという構造的な課題があります。",
      "全バリエーションを撮影でカバーしようとするとコストが膨らみ、商品追加のたびに再撮影が発生します。",
    ],
    approach: [
      "Blenderで家具を3Dモデル化し、木目・ファブリックの質感をPBRマテリアルで再現。",
      "React Three Fiber (Three.js) でリアルタイム切替UIを実装。モバイルでも動作する軽量構成にしました。",
      "既存サイトに埋め込める形で設計し、コンポーネント単位で組み込み可能にしています。",
    ],
    deliverables: [
      "3Dモデル（カラー・素材バリエーション込み）",
      "リアルタイム切替UI（React Three Fiber）",
      "モバイル対応・軽量化済みのWebアプリ",
    ],
    results: [],
    embed: { kind: "site", url: "https://furniture-configurator-kappa.vercel.app/" },
    stack: ["Blender", "React Three Fiber", "Three.js", "Next.js", "Vercel"],
    duration: "自主制作",
    solutionHref: "/for-furniture",
    solutionLabel: "家具メーカー向けソリューション",
  },
  {
    slug: "architectural-walkthrough",
    title: "Architectural Walkthrough",
    category: "3D WEB EXPERIENCE",
    industry: "住宅・不動産",
    isDemo: true,
    summary:
      "ブラウザ上で建築空間を自由に歩き回れるインタラクティブウォークスルーの自主制作デモ。アプリ不要、URLひとつで体験できます。",
    challenge: [
      "完成前の物件は図面と静止画パースでしか見せられず、空間の広がりや動線といった「住んだときの感覚」が伝わりません。",
      "モデルルームは建築・維持に大きなコストがかかるうえ、見せられる仕様は1パターンに限られます。",
    ],
    approach: [
      "Blenderで空間を3Dモデル化し、自然光を意識したライティングで竣工写真のような質感に仕上げました。",
      "Three.jsベースのウォークスルーとして実装し、PC・スマホのブラウザでそのまま動作します。",
      "通信環境が悪い場所でも動くよう、テクスチャ・ジオメトリを軽量化しています。",
    ],
    deliverables: [
      "空間の3Dモデル・ライティング",
      "ブラウザで歩けるウォークスルーWebアプリ",
      "モバイル対応・軽量化済み",
    ],
    results: [],
    embed: { kind: "site", url: "https://loft-portfolio.vercel.app/" },
    stack: ["Blender", "Three.js", "Next.js", "Vercel"],
    duration: "自主制作",
    solutionHref: "/for-housing",
    solutionLabel: "工務店・ハウスメーカー向けソリューション",
  },
];

export function getCaseStudy(slug: string) {
  return CASE_STUDIES.find((cs) => cs.slug === slug);
}
