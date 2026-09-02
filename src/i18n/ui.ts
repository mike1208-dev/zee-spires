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

    "servicesPage.title": "Services",
    "servicesPage.metaDescription":
      "AI Agent Development, Data Engineering, Full-Stack Development, and IT Consulting & Staffing — delivered by senior engineers, end to end.",
    "servicesPage.heroTitle":
      'What we build, <span class="accent-italic">end to end.</span>',
    "servicesPage.heroDescription":
      "Four core disciplines. Each is senior-led and delivered with tests, documentation, and a team that stays accountable after launch.",

    "serviceDetail.technologies": "Technologies",
    "serviceDetail.whatYouGet": "What you get",
    "serviceDetail.exploreOthers": "Explore other services",
    "serviceDetail.allServices": "All services",

    "engineersPage.title": "Engineers",
    "engineersPage.metaDescription":
      "Meet the senior engineers behind ZeeSpires — backgrounds at companies like Microsoft and IBM, with deep expertise across AI, data, and full-stack engineering.",
    "engineersPage.heroTitle":
      'The people are the <span class="accent-italic">difference.</span>',
    "engineersPage.heroDescription":
      "A tech services company is only as strong as its engineers. Ours have built and run systems at leading companies — and they're the ones you'll work with directly.",
    "engineersPage.consentNote":
      "Profiles shown are representative. Real engineer names, photos, and résumés are published only with each person's consent.",
    "engineersPage.ctaTitle":
      'Work with engineers who have <span class="accent-italic">been there.</span>',
    "engineersPage.ctaDescription":
      "Want senior people on your project — as an embedded team or advisors? Let's talk.",

    "contactPage.title": "Contact",
    "contactPage.metaDescription":
      "Start a project with ZeeSpires. Send us a note, email us directly, or book a call — you'll talk straight to senior engineers.",
    "contactPage.heroTitle":
      'Let\'s start a <span class="accent-italic">conversation.</span>',
    "contactPage.heroDescription":
      "Tell us what you're trying to build. We'll get back within one business day — and you'll talk directly to the people who'd do the work.",
    "contactPage.reachUsDirectly": "Reach us directly",
    "contactPage.emailLabel": "Email",
    "contactPage.phoneLabel": "Phone",
    "contactPage.officeLabel": "Office",
    "contactPage.bookCallTitle": "Rather book a call?",
    "contactPage.bookCallDescription":
      "Grab a 30-minute slot with a senior engineer. No sales script — just a real conversation about your project.",
    "contactPage.bookCallCta": "Book a call",
    "contactPage.form.nameLabel": "Name",
    "contactPage.form.emailLabel": "Email",
    "contactPage.form.companyLabel": "Company",
    "contactPage.form.serviceLabel": "What can we help with?",
    "contactPage.form.selectPlaceholder": "Select a service…",
    "contactPage.form.otherOption": "Something else",
    "contactPage.form.messageLabel": "Message",
    "contactPage.form.namePlaceholder": "Jane Doe",
    "contactPage.form.emailPlaceholder": "jane@company.com",
    "contactPage.form.companyPlaceholder": "Acme Inc.",
    "contactPage.form.messagePlaceholder":
      "A few lines about your project, timeline, and goals…",
    "contactPage.form.honeypotLabel": "Leave this field empty",
    "contactPage.form.submitLabel": "Send message",
    "contactPage.form.sendingLabel": "Sending…",
    "contactPage.form.sentLabel": "Message sent",
    "contactPage.form.preferEmail": "Prefer email?",
    "contactPage.form.successMessage":
      "Thanks — your message is on its way. We'll be in touch within one business day.",
    "contactPage.form.genericError":
      "Something went wrong. Please email us at admin@zeespires.com.",
    "contactPage.form.networkError":
      "Network error. Please email us directly at admin@zeespires.com.",
    "contactPage.outcomesTitle":
      'What working with us <span class="accent-italic">looks like.</span>',
    "contactPage.outcomesDescription":
      "Senior-led, direct, and accountable — here's what you can count on.",
    "contactPage.testimonialsTitle":
      'In our clients\' <span class="accent-italic">own words.</span>',
    "contactPage.testimonialsFootnote":
      "Representative testimonials shown for layout; real, attributed quotes added with client permission.",

    "notFound.title": "Page not found",
    "notFound.heading":
      'This page reached a little <span class="accent-italic text-accent">too high.</span>',
    "notFound.description":
      "The page you're looking for doesn't exist or has moved. Let's get you back on track.",
    "notFound.backHome": "Back home",
    "notFound.contactUs": "Contact us",
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

    "servicesPage.title": "サービス",
    "servicesPage.metaDescription":
      "AIエージェント開発、データエンジニアリング、フルスタック開発、ITコンサルティング・スタッフィング — シニアエンジニアが一貫して手がけます。",
    "servicesPage.heroTitle":
      '私たちが手がけるもの、<span class="accent-italic">はじめから終わりまで。</span>',
    "servicesPage.heroDescription":
      "4つの中核分野。それぞれをシニアエンジニアが主導し、テストとドキュメント、そしてローンチ後も責任を持つチームとともにお届けします。",

    "serviceDetail.technologies": "使用技術",
    "serviceDetail.whatYouGet": "提供内容",
    "serviceDetail.exploreOthers": "他のサービスを見る",
    "serviceDetail.allServices": "すべてのサービスを見る",

    "engineersPage.title": "エンジニア紹介",
    "engineersPage.metaDescription":
      "ZeeSpiresを支えるシニアエンジニアをご紹介します。Microsoft や IBM などでの経験を持ち、AI、データ、フルスタック開発にわたる深い専門性を備えています。",
    "engineersPage.heroTitle":
      '違いを生むのは、<span class="accent-italic">人。</span>',
    "engineersPage.heroDescription":
      "テクノロジー企業の強さは、そのエンジニアの強さそのものです。私たちのメンバーは、名だたる企業でシステムを構築・運用してきた経験を持ち、あなたと直接一緒に働きます。",
    "engineersPage.consentNote":
      "掲載しているプロフィールは代表例です。実在のエンジニアの氏名・写真・経歴は、本人の同意を得た上でのみ公開しています。",
    "engineersPage.ctaTitle":
      '<span class="accent-italic">経験豊富な</span>エンジニアと働きませんか。',
    "engineersPage.ctaDescription":
      "常駐チームとして、またはアドバイザーとして、シニア人材の力が必要ですか？お気軽にご相談ください。",

    "contactPage.title": "お問い合わせ",
    "contactPage.metaDescription":
      "ZeeSpiresとプロジェクトを始めましょう。メッセージの送信、メールでのご連絡、通話のご予約など — シニアエンジニアと直接お話しいただけます。",
    "contactPage.heroTitle":
      '<span class="accent-italic">対話を</span>始めましょう。',
    "contactPage.heroDescription":
      "実現したいことをお聞かせください。1営業日以内にご返信し、実際に手を動かす担当者と直接お話しいただけます。",
    "contactPage.reachUsDirectly": "直接のお問い合わせ",
    "contactPage.emailLabel": "メール",
    "contactPage.phoneLabel": "電話",
    "contactPage.officeLabel": "所在地",
    "contactPage.bookCallTitle": "通話でのご相談も可能です",
    "contactPage.bookCallDescription":
      "シニアエンジニアと30分の通話枠をご予約ください。営業トークではなく、プロジェクトについての率直な会話です。",
    "contactPage.bookCallCta": "通話を予約する",
    "contactPage.form.nameLabel": "お名前",
    "contactPage.form.emailLabel": "メールアドレス",
    "contactPage.form.companyLabel": "会社名",
    "contactPage.form.serviceLabel": "ご相談内容",
    "contactPage.form.selectPlaceholder": "サービスを選択してください…",
    "contactPage.form.otherOption": "その他",
    "contactPage.form.messageLabel": "メッセージ",
    "contactPage.form.namePlaceholder": "山田 太郎",
    "contactPage.form.emailPlaceholder": "taro@company.com",
    "contactPage.form.companyPlaceholder": "株式会社Acme",
    "contactPage.form.messagePlaceholder":
      "プロジェクトの概要、スケジュール、目標などについてお聞かせください…",
    "contactPage.form.honeypotLabel": "このフィールドは空のままにしてください",
    "contactPage.form.submitLabel": "送信する",
    "contactPage.form.sendingLabel": "送信中…",
    "contactPage.form.sentLabel": "送信しました",
    "contactPage.form.preferEmail": "メールでのご連絡をご希望ですか？",
    "contactPage.form.successMessage":
      "ありがとうございます — メッセージを受け付けました。1営業日以内にご連絡いたします。",
    "contactPage.form.genericError":
      "エラーが発生しました。admin@zeespires.com まで直接メールでご連絡ください。",
    "contactPage.form.networkError":
      "通信エラーが発生しました。admin@zeespires.com まで直接メールでご連絡ください。",
    "contactPage.outcomesTitle":
      '私たちと働くと、<span class="accent-italic">こうなります。</span>',
    "contactPage.outcomesDescription":
      "シニア主導・直接対話・説明責任 — お約束できることです。",
    "contactPage.testimonialsTitle":
      'お客様の<span class="accent-italic">声。</span>',
    "contactPage.testimonialsFootnote":
      "掲載中のお客様の声はレイアウト確認用の代表例です。実際のお客様の許可を得た上で、本物の声に差し替えます。",

    "notFound.title": "ページが見つかりません",
    "notFound.heading":
      'このページは少し<span class="accent-italic text-accent">高く登りすぎたようです。</span>',
    "notFound.description":
      "お探しのページは存在しないか、移動した可能性があります。ホームからやり直しましょう。",
    "notFound.backHome": "ホームに戻る",
    "notFound.contactUs": "お問い合わせ",
  },
} as const satisfies Record<Locale, Record<string, string>>;

export type UiKey = keyof (typeof ui)["en"];
