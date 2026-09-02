import type { Locale } from "./config";
import type { Service } from "@/data/services";
import type { Engineer } from "@/data/engineers";
import type { outcomes as OutcomesList, testimonials as TestimonialsList } from "@/data/content";

/**
 * Japanese overrides for copy that lives in `src/data/*.ts`, keyed by that
 * record's stable id (slug / name / English label). The canonical data files
 * stay English-only; this keeps translations colocated with the rest of the
 * i18n layer instead of restructuring every data field into `{ en, ja }`
 * pairs. Extend these maps as more pages/records get translated.
 */

type ServiceL10n = Partial<
  Pick<Service, "title" | "tagline" | "summary" | "description" | "capabilities">
>;

const serviceJa: Record<string, ServiceL10n> = {
  "ai-agent-development": {
    title: "AIエージェント開発",
    tagline: "実務をこなす自律型システム。",
    summary:
      "推論し、ツールを使い、あなたのワークフローの中で実際に行動する本番稼働レベルのLLMエージェント。デモではなく、信頼して任せられるシステムを構築します。",
    description:
      "私たちは、チャットの枠を超えたAIエージェントを設計・開発します。自社データに対する検索拡張生成（RAG）、ツールやAPIの呼び出し、そして必要な箇所ではガードレールと人間による確認を組み込んだ複数ステップのワークフローです。評価、可観測性、コスト管理に重点を置き、実際のユーザーが依存するシステムとして耐えられる品質を確保します。",
    capabilities: [
      "自社データを活用した検索拡張生成（RAG）",
      "ツールを活用する複数ステップのエージェントワークフロー",
      "評価基盤、ガードレール、人間による確認プロセス",
      "可観測性、トレーシング、コスト・レイテンシの最適化",
      "モデル選定、プロンプトエンジニアリング、ファインチューニング",
    ],
  },
  "data-engineering": {
    title: "データエンジニアリング",
    tagline: "共に成長するパイプラインとプラットフォーム。",
    summary:
      "取り込みから変換、ウェアハウジング、オーケストレーションまで — 散在したデータを、事業の土台となるプラットフォームへと変える、信頼性の高いデータ基盤を構築します。",
    description:
      "アナリティクス、ML、AIが依存するデータの基盤を構築します。バッチ・ストリーミングの取り込み、整理されたウェアハウス、テスト済みの変換処理、そして信頼できるオーケストレーションです。すべてバージョン管理・文書化・監視されており、データ品質の問題がステークホルダーに気づかれる前に検知できます。",
    capabilities: [
      "バッチ・ストリーミングの取り込みパイプライン",
      "ディメンショナルモデリングとウェアハウス設計",
      "テストとリネージを備えたdbtによる変換処理",
      "オーケストレーション、アラート、データ品質モニタリング",
      "アナリティクスおよびML/AI活用のための基盤整備",
    ],
  },
  "full-stack-development": {
    title: "フルスタック開発",
    tagline: "最初のスケッチから、スケールするシステムへ。",
    summary:
      "スケールするフレームワーク上に構築された、高速で堅牢なWeb・モバイル製品。設計からエンジニアリング、リリースまで一貫して手がけます。",
    description:
      "野心的なアイデアをホワイトボードから本番稼働まで導きます。丁寧なプロダクト・UX設計、モダンな型付きコードベース、堅牢なAPI、そしてそれを支えるクラウドインフラです。小さくレビュー可能な単位でリリースし、テスト・ドキュメント、そして応答してくれるチームを残します。",
    capabilities: [
      "Webアプリケーション開発（React / Next.js / Astro）",
      "API、システム連携、バックエンドサービス",
      "クラウドインフラ、CI/CD、モニタリング",
      "プロダクト・UXデザイン",
      "QA自動化と継続的なサポート",
    ],
  },
  "it-consulting-staffing": {
    title: "ITコンサルティング & ITスタッフィング",
    tagline: "シニア人材の知見を、あなたのチームへ。",
    summary:
      "戦略的な技術アドバイスと、経験豊富なシニアエンジニア — アドバイザーとして、またはあなたのやり方に合わせて働く常駐チームとして提供します。",
    description:
      "経験豊富な判断力、あるいは追加の人手が必要なとき、その両方を提供します。アーキテクチャおよび技術戦略コンサルティングと、あなたのチームに直接常駐するシニアエンジニアです。すべてのエンゲージメントはシニア主導で、実際に手を動かす担当者と直接やり取りできます — 間に営業担当者を挟みません。",
    capabilities: [
      "技術戦略およびアーキテクチャレビュー",
      "クラウド・セキュリティ・デリバリーに関するコンサルティング",
      "常駐型シニアエンジニア（スタッフオーグメンテーション）",
      "非常勤の技術リーダーシップ",
      "固定スコープまたは常駐チームでのご契約",
    ],
  },
};

export function localizeService(service: Service, lang: Locale): Service {
  if (lang === "en") return service;
  const l10n = serviceJa[service.slug];
  return l10n ? { ...service, ...l10n } : service;
}

const statsLabelJa: Record<string, string> = {
  "Years average engineer experience": "エンジニアの平均経験年数",
  "Core disciplines, one accountable team": "つの専門領域を、ひとつの責任あるチームで",
  "Continents of time-zone coverage": "つの大陸にまたがるタイムゾーン対応",
  "Senior-led engagements": "シニア主導のプロジェクト",
};

export function localizeStats(
  stats: { value: string; label: string }[],
  lang: Locale
) {
  if (lang === "en") return stats;
  return stats.map((s) => ({ ...s, label: statsLabelJa[s.label] ?? s.label }));
}

const clientJa: Record<string, string> = {
  Fintech: "フィンテック",
  "AI Agent": "AIエージェント",
  Healthcare: "ヘルスケア",
  Insurance: "保険",
  "SaaS & Platforms": "SaaS・プラットフォーム",
  "E-commerce & Retail": "Eコマース・小売",
  Logistics: "物流",
  "IT Consulting": "ITコンサルティング",
  "Professional Services": "プロフェッショナルサービス",
};

export function localizeClients(clients: string[], lang: Locale) {
  if (lang === "en") return clients;
  return clients.map((c) => clientJa[c] ?? c);
}

type EngineerL10n = Partial<
  Pick<Engineer, "role" | "bio" | "specialties" | "location">
>;

const engineerJa: Record<string, EngineerL10n> = {
  "Aarav Mehta": {
    role: "プリンシパルエンジニア — AI・エージェント担当",
    bio: "Aaravは10年以上にわたり大規模なMLおよび推論システムの構築に携わってきました。現在はAIエージェント部門を率い、検索拡張生成や評価、そして本番環境で信頼できる水準までLLMシステムを仕上げることに注力しています。",
    specialties: ["LLMエージェント", "RAG（検索拡張生成）システム", "ML基盤"],
    location: "アメリカ・シアトル",
  },
  "Priya Raman": {
    role: "スタッフデータエンジニア",
    bio: "Priyaは実際の負荷に耐えるデータプラットフォームを設計します。金融・ヘルスケア業界向けに取り込み・ウェアハウジングシステムを構築してきた経験を持ち、テスト済みで整理され、可観測性のあるパイプラインを重視しています。",
    specialties: ["データプラットフォーム", "ディメンショナルモデリング", "ストリーミング処理"],
    location: "アメリカ・オースティン",
  },
  "Sofia Alvarez": {
    role: "リードプロダクト・UXデザイナー",
    bio: "Sofiaは人々の実際の働き方に基づいてインターフェースを設計します。エンジニアリングと密に連携し、設計がそのままリリースされる体制を作り、これまで数百万人に使われる製品を形にしてきました。",
    specialties: ["プロダクトデザイン", "デザインシステム", "UXリサーチ"],
    location: "スペイン・バルセロナ",
  },
  "Daniel Okafor": {
    role: "プリンシパルフルスタックエンジニア",
    bio: "Danielはホワイトボードのアイデアをスケールするプロダクトへと形にします。整理された型付きコードベース、高速なインターフェース、小さな単位でのリリースを重視し、これまでトラフィックの多いコンシューマー・B2Bプラットフォームのデリバリーを率いてきました。",
    specialties: ["Webプラットフォーム", "API設計", "クラウドアーキテクチャ"],
    location: "リモート勤務（米国東部標準時）",
  },
  "Hassan Ali": {
    role: "スタッフDevOps / プラットフォームエンジニア",
    bio: "Hassanはインフラ、CI/CD、モニタリングを最初から正しく整備します。規制の厳しい高可用性環境において、稼働率に責任を持つプラットフォームチームを率いてきました。",
    specialties: ["クラウドインフラ", "CI/CD", "可観測性（オブザーバビリティ）"],
    location: "スリランカ・コロンボ",
  },
  "Elena Novak": {
    role: "プリンシパルコンサルタント — テクノロジー戦略",
    bio: "Elenaは経営層に対しアーキテクチャとテクノロジー戦略について助言します。ビジネス上の目標を実行可能なデリバリー計画に落とし込み、チームに参画してその実現を支えます。",
    specialties: ["アーキテクチャ", "技術戦略", "デリバリーリーダーシップ"],
    location: "リモート勤務（中央ヨーロッパ標準時）",
  },
};

export function localizeEngineer(engineer: Engineer, lang: Locale): Engineer {
  if (lang === "en") return engineer;
  const l10n = engineerJa[engineer.name];
  return l10n ? { ...engineer, ...l10n } : engineer;
}

type Outcome = (typeof OutcomesList)[number];

const outcomeTextJa: Record<string, string> = {
  "Ship production AI systems, not demos": "デモではなく、本番稼働するAIシステムを届ける",
  "Talk directly to the engineers building it": "実際に開発するエンジニアと直接話せる",
  "U.S.-registered, senior-led, accountable": "米国登録法人・シニア主導・説明責任を持つ体制",
  "Fixed-scope or embedded — your call": "固定スコープでも常駐チームでも、ご要望に合わせて",
  "Honest trade-offs, never buzzword hype": "誇張なく、正直なトレードオフをお伝えする",
  "Tests, docs & support after launch": "テスト・ドキュメント・リリース後のサポートまで",
};

export function localizeOutcomes(outcomes: Outcome[], lang: Locale) {
  if (lang === "en") return outcomes;
  return outcomes.map((o) => ({ ...o, text: outcomeTextJa[o.text] ?? o.text }));
}

type Testimonial = (typeof TestimonialsList)[number];
type TestimonialL10n = Partial<Pick<Testimonial, "quote" | "role">>;

const testimonialJa: Record<string, TestimonialL10n> = {
  "Sarah Chen": {
    quote:
      "数週間で実際に動くAIエージェントを完成させてくれました。最初から最後まで、実際に開発するエンジニアと直接やり取りできました — 営業担当者を介した伝言ゲームは一切ありません。",
    role: "VPエンジニアリング、フィンテックSaaS企業",
  },
  "Marcus Reid": {
    quote:
      "彼らが構築したデータプラットフォームは、まさに『動く』ものでした。しっかりモデル化され、テストされ、ドキュメント化されており、アナリストたちがようやく数字を信頼できるようになりました。",
    role: "データ責任者、小売グループ",
  },
  "Aisha Khan": {
    quote:
      "シニアなメンバー、正直なトレードオフの提示、そしてローンチ後も責任を持ち続けてくれる姿勢。これまで組んだパートナーの中で、間違いなく最も信頼できる存在です。",
    role: "CTO、物流プラットフォーム企業",
  },
};

export function localizeTestimonials(testimonials: Testimonial[], lang: Locale) {
  if (lang === "en") return testimonials;
  return testimonials.map((t) => ({ ...t, ...(testimonialJa[t.name] ?? {}) }));
}
