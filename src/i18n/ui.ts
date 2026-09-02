import type { Locale } from "./config";

/**
 * Shared UI copy dictionary. Add a key here (in both locales) whenever a page
 * or component needs a translated string that isn't already a `src/data/*`
 * field with its own localization (see `translations.ts` for those).
 */
export const ui = {
  en: {
    "a11y.skipToContent": "Skip to content",
    "a11y.backToTop": "Back to top",

    "nav.ariaPrimary": "Primary",
    "nav.ariaMobile": "Mobile",
    "nav.openMenu": "Open menu",
    "nav.closeMenu": "Close menu",
    "nav.services": "Services",
    "nav.servicesOverview": "Overview",
    "nav.serviceAi": "AI Agent Development",
    "nav.serviceData": "Data Engineering",
    "nav.serviceFullstack": "Full-Stack Development",
    "nav.serviceConsulting": "IT Consulting & Staffing",
    "nav.engineers": "Engineers",
    "nav.contact": "Contact",

    "lang.switchAria": "Switch language",

    "cta.startProject": "Start a project",
    "cta.emailUs": "Email us",

    "footer.company": "Company",
    "footer.services": "Services",
    "footer.getInTouch": "Get in touch",
    "footer.linkedin": "LinkedIn",
    "footer.github": "GitHub",
    "footer.x": "X",
    "footer.tagline": "Built to reach higher.",

    "meta.description":
      "ZeeSpires is a senior-led software team delivering AI agents, data platforms, full-stack products, and IT consulting for ambitious B2B companies.",
    "meta.tagline": "Software built to reach higher.",

    "service.learnMore": "Learn more",

    "home.hero.line1": "Software built to",
    "home.hero.line2": 'reach <span class="accent-italic">higher.</span>',
    "home.hero.subtitle":
      "A senior-led team building AI agents, data platforms, and full-stack products — from the first whiteboard sketch to a system running at scale.",
    "home.services.title":
      'Four disciplines, <span class="accent-italic">one team.</span>',
    "home.services.description":
      "From autonomous AI systems to the data and products they run on — plus the senior people to advise or embed with yours.",
    "home.engineers.title":
      'Built and run by <span class="accent-italic">senior engineers.</span>',
    "home.engineers.description":
      "Backgrounds at companies like Microsoft and IBM — and they're the people you'll work with directly.",
    "home.engineers.cta": "Meet the engineers",
    "home.engineers.exPrefix": "ex-",

    "ctaBand.title":
      'Let\'s build something <span class="accent-italic">higher.</span>',
    "ctaBand.description":
      "Tell us what you're trying to build. You'll talk directly to senior engineers — no account managers, no runaround.",
  },
  ja: {
    "a11y.skipToContent": "コンテンツへスキップ",
    "a11y.backToTop": "トップに戻る",

    "nav.ariaPrimary": "メインナビゲーション",
    "nav.ariaMobile": "モバイルナビゲーション",
    "nav.openMenu": "メニューを開く",
    "nav.closeMenu": "メニューを閉じる",
    "nav.services": "サービス",
    "nav.servicesOverview": "概要",
    "nav.serviceAi": "AIエージェント開発",
    "nav.serviceData": "データエンジニアリング",
    "nav.serviceFullstack": "フルスタック開発",
    "nav.serviceConsulting": "ITコンサルティング・スタッフィング",
    "nav.engineers": "エンジニア紹介",
    "nav.contact": "お問い合わせ",

    "lang.switchAria": "言語を切り替える",

    "cta.startProject": "プロジェクトを相談する",
    "cta.emailUs": "メールで問い合わせる",

    "footer.company": "会社情報",
    "footer.services": "サービス",
    "footer.getInTouch": "お問い合わせ",
    "footer.linkedin": "LinkedIn",
    "footer.github": "GitHub",
    "footer.x": "X",
    "footer.tagline": "より高みへ届くソフトウェアを。",

    "meta.description":
      "ZeeSpiresは、AIエージェント、データプラットフォーム、フルスタック製品、ITコンサルティングを手がける、シニアエンジニア主導のソフトウェアチームです。",
    "meta.tagline": "より高みへ届くソフトウェアを。",

    "service.learnMore": "詳しく見る",

    "home.hero.line1": "もっと高みへ届く",
    "home.hero.line2": '<span class="accent-italic">ソフトウェアを。</span>',
    "home.hero.subtitle":
      "AIエージェント、データプラットフォーム、フルスタック製品を手がけるシニアエンジニア主導のチーム — 最初のホワイトボードのスケッチから、実際に稼働するシステムまで。",
    "home.services.title":
      '4つの専門領域を、<span class="accent-italic">ひとつのチームで。</span>',
    "home.services.description":
      "自律的に動くAIシステムから、それを支えるデータや製品まで — さらに、あなたのチームに助言・参画できるシニア人材まで。",
    "home.engineers.title":
      '<span class="accent-italic">シニアエンジニア</span>が設計し、運用する。',
    "home.engineers.description":
      "Microsoft や IBM などでの経験を持つメンバーが、あなたと直接一緒に働きます。",
    "home.engineers.cta": "エンジニア紹介を見る",
    "home.engineers.exPrefix": "元",

    "ctaBand.title":
      '<span class="accent-italic">もっと高み</span>へ、一緒に創りましょう。',
    "ctaBand.description":
      "実現したいことをお聞かせください。営業担当者を介さず、実際に手を動かすシニアエンジニアと直接お話しいただけます。",
  },
} as const satisfies Record<Locale, Record<string, string>>;

export type UiKey = keyof (typeof ui)["en"];
