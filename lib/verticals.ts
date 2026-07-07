/* ============================================================
   業種別ランディングページのコンテンツ定義
   /for-furniture, /for-housing, /for-automotive, /en/for-furniture
   ============================================================ */

export type DemoEmbed =
  | { kind: "site"; url: string }
  | { kind: "video"; videoId: string };

export type VerticalPlan = {
  name: string;
  price: string;
  description: string;
  features: string[];
  recommended?: boolean;
};

export type VerticalData = {
  slug: string;
  locale: "ja" | "en";
  /** ヒーロー上部のチップに出す業界ラベル */
  industryLabel: string;
  hero: {
    title: string;
    sub: string;
    primaryCta: string;
    secondaryCta: string;
  };
  pains: { title: string; body: string }[];
  demo: {
    title: string;
    caption: string;
    embed: DemoEmbed;
    playLabel: string;
    openLabel: string;
  };
  benefits: { title: string; body: string }[];
  process: { title: string; body: string }[];
  plans: VerticalPlan[];
  planCta: string;
  pricingNote: string;
  faq: { q: string; a: string }[];
  finalCta: {
    title: string;
    body: string;
    mailSubject: string;
    mailLabel: string;
    formLabel?: string;
  };
  footerHome: string;
};

export const EMAIL = "s.s.s.2t18@gmail.com";

const furnitureJa: VerticalData = {
  slug: "for-furniture",
  locale: "ja",
  industryLabel: "For Furniture & Interior Makers — 家具・インテリアメーカー向け",
  hero: {
    title: "その家具、Webで「触れる」ようにしませんか。",
    sub: "カタログでもショールームでもなく、ブラウザ上でカラー・素材・オプションを切り替えられる3Dコンフィギュレーター。問い合わせの質と購入率を変えるWeb体験を、企画から実装まで一人で作ります。",
    primaryCta: "デモを触ってみる",
    secondaryCta: "相談する（無料）",
  },
  pains: [
    {
      title: "カタログ制作費が膨らみ続ける",
      body: "全カラー×全素材の組み合わせを撮影・印刷するコストは商品が増えるほど重くなり、改版のたびに費用が発生します。",
    },
    {
      title: "ショールームには限界がある",
      body: "展示できる組み合わせはごく一部。来場できるお客様も商圏内に限られ、維持コストは売上に関係なくかかり続けます。",
    },
    {
      title: "ECでは質感が伝わらない",
      body: "写真だけでは素材感・サイズ感が伝わらず、購入への最後のひと押しができません。イメージ違いによる返品・問い合わせ対応のコストも無視できません。",
    },
  ],
  demo: {
    title: "実際に動くコンフィギュレーターを、いま試せます",
    caption:
      "自主制作のデモです。カラーや素材をリアルタイムに切り替えられます。御社の製品でこれを作るイメージでご覧ください。",
    embed: { kind: "site", url: "https://furniture-configurator-kappa.vercel.app/" },
    playLabel: "デモを起動する",
    openLabel: "別タブで開く →",
  },
  benefits: [
    {
      title: "全バリエーションを、1つの3Dモデルで",
      body: "撮影は不要。カラー・素材・オプションの全組み合わせをブラウザ上で表現します。商品追加はデータ更新だけです。",
    },
    {
      title: "3DコンテンツはCVRを高める",
      body: "Shopifyの調査では、3D/ARコンテンツを導入した商品ページでコンバージョン率が最大94%向上したと報告されています。",
    },
    {
      title: "問い合わせの「質」が変わる",
      body: "お客様が構成を決めてから問い合わせるため、商談は短く、確度は高くなります。選んだ構成はそのまま見積もりに連携できます。",
    },
    {
      title: "24時間営業のショールーム",
      body: "商圏の制約なく、深夜でも海外からでも製品を検討してもらえます。URLひとつで営業・展示会・SNSにも展開できます。",
    },
  ],
  process: [
    {
      title: "ヒアリング・対象製品の選定",
      body: "主力製品・バリエーション構成・組み込み先（EC/コーポレートサイト）を確認し、費用対効果の高い範囲を設計します。",
    },
    {
      title: "3Dモデル化・質感再現",
      body: "CADデータまたは実物・写真から3Dモデルを制作。木目・ファブリック・金属の質感まで忠実に再現します。",
    },
    {
      title: "コンフィギュレーターUI実装",
      body: "React Three Fiberによる軽量・モバイル対応の切替UIを実装。スマホでもストレスなく動作します。",
    },
    {
      title: "サイト組み込み・計測設定",
      body: "既存サイト・ECへの埋め込みと、利用状況を把握するための計測設定まで対応します。",
    },
    {
      title: "保守・商品追加（月額）",
      body: "新商品の追加、素材・価格の更新、季節キャンペーン対応を月額契約で継続サポートします。",
    },
  ],
  plans: [
    {
      name: "PILOT",
      price: "¥800,000〜",
      description: "1製品でのお試し導入",
      features: [
        "主力1製品を3Dモデル化",
        "カラー・素材の切替UI",
        "既存サイトへの埋め込み",
        "効果検証後の本導入に差額適用",
      ],
    },
    {
      name: "CONFIGURATOR",
      price: "¥1,800,000〜",
      description: "コンフィギュレーター開発一式",
      features: [
        "複数製品・全バリエーション対応",
        "見積もり・問い合わせフォーム連携",
        "EC（Shopify等）連携",
        "管理しやすいデータ構成で納品",
        "保守・商品追加 月額¥100,000〜",
      ],
      recommended: true,
    },
  ],
  planCta: "この内容で相談する",
  pricingNote:
    "製品数・バリエーション数により変動します。まずは製品カタログを拝見しながらの無料相談（30分）をご利用ください。",
  faq: [
    {
      q: "3DデータやCADがなくても依頼できますか？",
      a: "はい。製品写真と寸法から3Dモデルを制作できます。CAD（STEP/IGES等）や既存の3Dデータがあれば、精度とスピードがさらに上がります。",
    },
    {
      q: "自社のECサイトに組み込めますか？",
      a: "Shopify・自社構築のサイトいずれにも対応します。埋め込みタグを設置するだけで動作する形で納品します。",
    },
    {
      q: "商品が増えたときはどうなりますか？",
      a: "月額保守契約（¥100,000〜/月）の範囲で商品追加・素材更新・キャンペーン対応を行います。都度見積もりも可能です。",
    },
    {
      q: "スマートフォンでも動きますか？",
      a: "はい。モバイル最適化を前提に実装し、実機での動作確認まで含めて納品します。",
    },
  ],
  finalCta: {
    title: "まずは、御社の製品で試算してみませんか",
    body: "製品カタログやECサイトを拝見し、「どの製品を3D化すると効果が出やすいか」「概算費用」を無料相談（30分）でお伝えします。",
    mailSubject: "【3Dコンフィギュレーター相談】",
    mailLabel: "メールで相談する",
    formLabel: "フォームから相談する",
  },
  footerHome: "ポートフォリオトップへ",
};

const housingJa: VerticalData = {
  slug: "for-housing",
  locale: "ja",
  industryLabel: "For Housing & Real Estate — 工務店・ハウスメーカー・不動産向け",
  hero: {
    title: "完成前の住まいを、歩いて体験してもらう。",
    sub: "図面とパースだけでは、空間の広がりは伝わりません。ブラウザで歩けるウォークスルーと3DCG映像で、モデルルームを建てる前に「体験」を届けます。",
    primaryCta: "ウォークスルーを体験",
    secondaryCta: "相談する（無料）",
  },
  pains: [
    {
      title: "モデルルーム・完成見学会のコスト",
      body: "1棟あたりの建築・維持・撤去コストは数百万円規模。見せられる仕様も1パターンに限られます。",
    },
    {
      title: "図面とパースでは伝わらない",
      body: "静止画のパースでは天井の高さ・動線・光の入り方といった「住んだときの感覚」まで伝えるのは困難です。",
    },
    {
      title: "竣工前に決めてもらえない",
      body: "完成前に契約を取りたいのに、お客様が生活をイメージできず「完成したらまた来ます」で商談が止まってしまいます。",
    },
  ],
  demo: {
    title: "ブラウザで歩ける空間を、いま体験できます",
    caption:
      "自主制作のデモです。アプリのインストール不要、URLを送るだけでお客様のスマホ・PCでこのまま動きます。",
    embed: { kind: "site", url: "https://loft-portfolio.vercel.app/" },
    playLabel: "ウォークスルーを起動する",
    openLabel: "別タブで開く →",
  },
  benefits: [
    {
      title: "URLを送るだけ、アプリ不要",
      body: "お客様のスマホ・PCのブラウザでそのまま動きます。商談前に送っておけば、来店時には検討が進んだ状態から始められます。",
    },
    {
      title: "図面から「体験」をつくる",
      body: "CAD・図面データから空間を3D化し、実際の光・素材感でライティング。竣工写真のようなクオリティで完成前に見せられます。",
    },
    {
      title: "映像としても使い回せる",
      body: "同じ3DデータからプロモーションムービーやSNS用のショート動画も制作。広告・Web・商談で何度でも活用できます。",
    },
  ],
  process: [
    {
      title: "図面・データの受領",
      body: "CAD（DWG/JWW等）・図面PDF・仕様書をお預かりします。手描き図面からでも制作可能です。",
    },
    {
      title: "3Dモデル化・ライティング",
      body: "Blender/Unreal Engineで空間を構築し、実際の方位・時間帯に合わせた自然光で仕上げます。",
    },
    {
      title: "ウォークスルー実装 / 映像制作",
      body: "ブラウザで動くインタラクティブ版と、広告・SNS向けの映像版をご要望に応じて制作します。",
    },
    {
      title: "納品・サイト組み込み",
      body: "自社サイト・物件ページへの埋め込みまで対応。営業担当がURLを送るだけで使える状態にします。",
    },
  ],
  plans: [
    {
      name: "WALKTHROUGH MOVIE",
      price: "¥600,000〜",
      description: "3DCGウォークスルー映像（60〜90秒）",
      features: [
        "図面から空間を3DCG化",
        "フォトリアルなライティング",
        "広告・SNS用の縦型カットも納品",
        "納期: 3〜5週間",
      ],
    },
    {
      name: "INTERACTIVE",
      price: "¥1,200,000〜",
      description: "ブラウザで歩けるウォークスルー",
      features: [
        "ブラウザ/スマホで動作、アプリ不要",
        "自由に歩ける・見回せる操作",
        "昼/夜・仕様切替オプション",
        "自社サイトへの埋め込み込み",
        "納期: 1.5〜2.5ヶ月",
      ],
      recommended: true,
    },
  ],
  planCta: "この内容で相談する",
  pricingNote:
    "延床面積・部屋数・仕様切替の有無により変動します。図面を拝見しての概算見積もりは無料です。",
  faq: [
    {
      q: "どんな図面データがあれば依頼できますか？",
      a: "CAD（DWG/JWW）、PDF図面、仕様書のいずれでも制作可能です。データの精度が高いほど納期が短くなります。",
    },
    {
      q: "1物件だけでも依頼できますか？",
      a: "はい。1物件からお受けします。継続的にご依頼いただく場合は月額契約で1物件あたりの単価を下げられます。",
    },
    {
      q: "お客様のスマホでも動きますか？",
      a: "はい。モバイル最適化を前提に実装し、実機確認まで含めて納品します。通信環境が悪い場合に備えた軽量化も行います。",
    },
    {
      q: "家具や内装の変更には対応できますか？",
      a: "仕様切替（床材・壁紙・家具の有無など）はオプションで追加できます。打ち合わせ時にご相談ください。",
    },
  ],
  finalCta: {
    title: "図面を1枚、お送りください",
    body: "実際の物件図面をもとに「どこまで表現できるか」「概算費用」を無料相談（30分）でお伝えします。守秘義務契約にも対応します。",
    mailSubject: "【建築ウォークスルー相談】",
    mailLabel: "メールで相談する",
    formLabel: "フォームから相談する",
  },
  footerHome: "ポートフォリオトップへ",
};

const automotiveJa: VerticalData = {
  slug: "for-automotive",
  locale: "ja",
  industryLabel: "For Automotive Aftermarket — パーツメーカー・カスタムショップ向け",
  hero: {
    title: "実車を持ち込まずに、最高の一台を見せる。",
    sub: "撮影スタジオも、車両手配も、天候待ちも不要。フォトリアルな3DCGで、パーツの装着イメージやカラーバリエーションを自在に表現します。",
    primaryCta: "CGI映像を見る",
    secondaryCta: "相談する（無料）",
  },
  pains: [
    {
      title: "撮影コストが高すぎる",
      body: "車両手配・スタジオ・ロケ・天候待ち。1回の撮影に数十万円かかるうえ、カットの追加や修正はやり直しになります。",
    },
    {
      title: "装着イメージを見せられない",
      body: "お客様が本当に知りたいのは「自分の車に付けたらどう見えるか」。現物合わせでしか見せられないと、購入までの心理的ハードルが残ります。",
    },
    {
      title: "カラバリ・適合展開の物撮り地獄",
      body: "カラー×車種×グレードの組み合わせをすべて撮影するのは現実的ではなく、ECの商品ページが「代表画像1枚」になりがちです。",
    },
  ],
  demo: {
    title: "3DCGでここまで表現できます",
    caption: "自主制作のカーアニメーションです。質感・ライティングはすべて3DCG。実車の撮影は行っていません。",
    embed: { kind: "video", videoId: "kPsgrPOvyy0" },
    playLabel: "映像を再生する",
    openLabel: "YouTubeで開く →",
  },
  benefits: [
    {
      title: "1モデルで無限のバリエーション",
      body: "一度3D化すれば、カラー・ホイール・エアロの組み合わせを何パターンでも生成できます。追加撮影は発生しません。",
    },
    {
      title: "実写では不可能なカットを",
      body: "走行シーンのスローモーション、パーツの分解表現、X線ビュー。実写撮影では費用的に不可能な演出が可能です。",
    },
    {
      title: "コンフィギュレーターで「自分の一台」を",
      body: "お客様がブラウザ上で自分の車にパーツを装着してシミュレーションできれば、それ自体が最強の営業ツールになります。",
    },
  ],
  process: [
    {
      title: "データ・資料の受領",
      body: "パーツのCADデータ、または現物・写真をお預かりします。車両モデルはこちらで用意可能です。",
    },
    {
      title: "3Dモデル化・質感再現",
      body: "カーボン・アルマイト・塗装の質感まで、実物と見分けがつかないレベルで再現します。",
    },
    {
      title: "映像制作 / コンフィギュレーター実装",
      body: "プロモーション映像、EC用の360°ビュー、装着シミュレーターなど、用途に合わせて制作します。",
    },
    {
      title: "納品・展開サポート",
      body: "Web・SNS・展示会サイネージなど、媒体ごとの最適フォーマットで納品します。",
    },
  ],
  plans: [
    {
      name: "CGI MOVIE",
      price: "¥500,000〜",
      description: "フォトリアルCGIプロモーション映像",
      features: [
        "パーツ・車両の3Dモデル化",
        "30〜60秒のプロモーション映像",
        "SNS用の縦型・ショート版も納品",
        "納期: 3〜5週間",
      ],
    },
    {
      name: "PARTS CONFIGURATOR",
      price: "¥1,800,000〜",
      description: "パーツ装着シミュレーター開発一式",
      features: [
        "車種×パーツの装着シミュレーション",
        "カラー・オプションのリアルタイム切替",
        "ECサイト・商品ページへの組み込み",
        "保守・パーツ追加 月額¥100,000〜",
      ],
      recommended: true,
    },
  ],
  planCta: "この内容で相談する",
  pricingNote: "対象車種数・パーツ点数により変動します。まずは商品ページを拝見しての無料相談（30分）をご利用ください。",
  faq: [
    {
      q: "パーツのCADデータがなくても依頼できますか？",
      a: "はい。現物をお借りするか、多角度の写真と採寸から3Dモデルを制作できます。CAD（STEP等）があれば精度が上がります。",
    },
    {
      q: "車両側の3Dモデルはどうなりますか？",
      a: "主要車種の高品質モデルを調達・制作して対応します。特殊車種の場合は事前にご相談ください。",
    },
    {
      q: "完成車メーカーの案件も対応できますか？",
      a: "はい、映像・CGI制作として対応可能です。まずは制作実績をご覧のうえご相談ください。",
    },
    {
      q: "納品データの権利はどうなりますか？",
      a: "納品物の利用権はお客様に帰属します。3Dモデルデータ自体の買い取りもオプションで可能です。",
    },
  ],
  finalCta: {
    title: "商品ページのURLを、1つお送りください",
    body: "主力商品を拝見し、「CGI化でどんな見せ方ができるか」「概算費用」を無料相談（30分）でお伝えします。",
    mailSubject: "【自動車CGI相談】",
    mailLabel: "メールで相談する",
    formLabel: "フォームから相談する",
  },
  footerHome: "ポートフォリオトップへ",
};

const furnitureEn: VerticalData = {
  slug: "en/for-furniture",
  locale: "en",
  industryLabel: "For Furniture & D2C Brands",
  hero: {
    title: "Let customers configure your furniture in 3D — right in the browser.",
    sub: "I design and build product configurators end to end: 3D modeling, React Three Fiber development, and e-commerce integration. One developer, no agency overhead.",
    primaryCta: "Try the live demo",
    secondaryCta: "Get a quote",
  },
  pains: [
    {
      title: "Catalog photography doesn't scale",
      body: "Shooting every color × material × option combination gets more expensive with every SKU, and every product update means a reshoot.",
    },
    {
      title: "Showrooms have a ceiling",
      body: "You can only display a fraction of your variants, and only to customers who can physically visit.",
    },
    {
      title: "Flat photos don't sell texture",
      body: "Static images can't convey material, scale, or build quality — so customers hesitate, return items, or flood support with questions.",
    },
  ],
  demo: {
    title: "Try a working configurator right now",
    caption:
      "A self-initiated demo. Switch colors and materials in real time — imagine this built for your product line.",
    embed: { kind: "site", url: "https://furniture-configurator-kappa.vercel.app/" },
    playLabel: "Launch the demo",
    openLabel: "Open in new tab →",
  },
  benefits: [
    {
      title: "Every variant from one 3D model",
      body: "No photography. Every color, material, and option combination rendered in the browser. Adding products is a data update, not a photo shoot.",
    },
    {
      title: "3D content converts",
      body: "Shopify reports up to a 94% conversion lift on product pages with 3D/AR content.",
    },
    {
      title: "Qualified leads, shorter sales cycles",
      body: "Customers configure before they contact you, so every inquiry arrives with a concrete spec that flows straight into your quoting process.",
    },
    {
      title: "Works with your stack",
      body: "Shopify, headless commerce, or a custom site — the configurator ships as an embeddable component with analytics included.",
    },
  ],
  process: [
    {
      title: "Discovery",
      body: "We pick the products and variant structure where a configurator pays off fastest, and define the integration target.",
    },
    {
      title: "3D modeling",
      body: "From CAD files or reference photos, with faithful wood, fabric, and metal materials.",
    },
    {
      title: "Configurator build",
      body: "A lightweight React Three Fiber app, optimized for mobile and tested on real devices.",
    },
    {
      title: "Integration & analytics",
      body: "Embedded into your store or site, with event tracking so you can measure engagement and conversion.",
    },
    {
      title: "Ongoing support",
      body: "New SKUs, material updates, and seasonal campaigns handled on a monthly retainer.",
    },
  ],
  plans: [
    {
      name: "PILOT",
      price: "$6,000+",
      description: "Single-product pilot",
      features: [
        "One hero product modeled in 3D",
        "Color & material switching UI",
        "Embedded on your existing site",
        "Pilot fee credited toward a full build",
      ],
    },
    {
      name: "FULL CONFIGURATOR",
      price: "$15,000+",
      description: "Complete configurator build",
      features: [
        "Multiple products, full variant tree",
        "Quote / inquiry form integration",
        "E-commerce (Shopify etc.) integration",
        "Clean data structure for easy updates",
        "Retainer support from $800/mo",
      ],
      recommended: true,
    },
  ],
  planCta: "Discuss this plan",
  pricingNote:
    "Final pricing depends on product count and variant complexity. Send me your catalog or store URL for a free estimate.",
  faq: [
    {
      q: "We don't have CAD or 3D data. Is that a problem?",
      a: "No — I can model from product photos and dimensions. CAD files (STEP/IGES) or existing 3D assets speed things up and improve accuracy.",
    },
    {
      q: "Can it be embedded in our Shopify store?",
      a: "Yes. It ships as an embeddable component that works with Shopify, headless setups, and custom sites alike.",
    },
    {
      q: "How long does it take?",
      a: "A pilot typically ships in 3–5 weeks; a full configurator in 6–10 weeks depending on scope.",
    },
    {
      q: "Where are you based? How do we communicate?",
      a: "I'm based in Japan and work remotely with overseas clients in English, with scheduled overlap for US and EU time zones.",
    },
  ],
  finalCta: {
    title: "Send me one product URL",
    body: "I'll review your catalog and reply with what a configurator could look like for your products, plus a ballpark estimate — free.",
    mailSubject: "[3D Configurator Inquiry]",
    mailLabel: "Email me",
  },
  footerHome: "Back to portfolio",
};

export const VERTICALS = {
  furniture: furnitureJa,
  housing: housingJa,
  automotive: automotiveJa,
  furnitureEn,
} as const;

/* ─── ページ用JSON-LD（Service + FAQPage + パンくず） ────────── */
export function verticalJsonLd(
  data: VerticalData,
  opts: { url: string; serviceName: string; description: string }
) {
  return [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: opts.serviceName,
      description: opts.description,
      url: opts.url,
      provider: { "@type": "Person", name: "S.SATOU" },
      areaServed: data.locale === "ja" ? "JP" : "Worldwide",
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: data.faq.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "S.SATOU",
          item: "https://ssatou.vercel.app",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: opts.serviceName,
          item: opts.url,
        },
      ],
    },
  ];
}
