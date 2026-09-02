import type { Locale } from "./config";
import type { Service } from "@/data/services";
import type { Engineer } from "@/data/engineers";

/**
 * Japanese overrides for copy that lives in `src/data/*.ts`, keyed by that
 * record's stable id (slug / name / English label). The canonical data files
 * stay English-only; this keeps translations colocated with the rest of the
 * i18n layer instead of restructuring every data field into `{ en, ja }`
 * pairs. Extend these maps as more pages/records get translated.
 */

type ServiceL10n = Partial<Pick<Service, "title" | "tagline" | "summary">>;

const serviceJa: Record<string, ServiceL10n> = {
  "ai-agent-development": {
    title: "AIエージェント開発",
    tagline: "実務をこなす自律型システム。",
    summary:
      "推論し、ツールを使い、あなたのワークフローの中で実際に行動する本番稼働レベルのLLMエージェント。デモではなく、信頼して任せられるシステムを構築します。",
  },
  "data-engineering": {
    title: "データエンジニアリング",
    tagline: "共に成長するパイプラインとプラットフォーム。",
    summary:
      "取り込みから変換、ウェアハウジング、オーケストレーションまで — 散在したデータを、事業の土台となるプラットフォームへと変える、信頼性の高いデータ基盤を構築します。",
  },
  "full-stack-development": {
    title: "フルスタック開発",
    tagline: "最初のスケッチから、スケールするシステムへ。",
    summary:
      "スケールするフレームワーク上に構築された、高速で堅牢なWeb・モバイル製品。設計からエンジニアリング、リリースまで一貫して手がけます。",
  },
  "it-consulting-staffing": {
    title: "ITコンサルティング & ITスタッフィング",
    tagline: "シニア人材の知見を、あなたのチームへ。",
    summary:
      "戦略的な技術アドバイスと、経験豊富なシニアエンジニア — アドバイザーとして、またはあなたのやり方に合わせて働く常駐チームとして提供します。",
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

type EngineerL10n = Partial<Pick<Engineer, "role" | "bio">>;

// Only the three engineers shown in the Home page preview are translated so far.
const engineerJa: Record<string, EngineerL10n> = {
  "Aarav Mehta": {
    role: "プリンシパルエンジニア — AI・エージェント担当",
    bio: "Aaravは10年以上にわたり大規模なMLおよび推論システムの構築に携わってきました。現在はAIエージェント部門を率い、検索拡張生成や評価、そして本番環境で信頼できる水準までLLMシステムを仕上げることに注力しています。",
  },
  "Priya Raman": {
    role: "スタッフデータエンジニア",
    bio: "Priyaは実際の負荷に耐えるデータプラットフォームを設計します。金融・ヘルスケア業界向けに取り込み・ウェアハウジングシステムを構築してきた経験を持ち、テスト済みで整理され、可観測性のあるパイプラインを重視しています。",
  },
  "Sofia Alvarez": {
    role: "リードプロダクト・UXデザイナー",
    bio: "Sofiaは人々の実際の働き方に基づいてインターフェースを設計します。エンジニアリングと密に連携し、設計がそのままリリースされる体制を作り、これまで数百万人に使われる製品を形にしてきました。",
  },
};

export function localizeEngineer(engineer: Engineer, lang: Locale): Engineer {
  if (lang === "en") return engineer;
  const l10n = engineerJa[engineer.name];
  return l10n ? { ...engineer, ...l10n } : engineer;
}
