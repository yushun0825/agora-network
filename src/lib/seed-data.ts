import type { SeedCommunity } from "./types";

// AGORA に最初に投入する代表的なコミュニティ群（50件）。
// これらは公開情報のみで構成されている。
export const SEED_COMMUNITIES: SeedCommunity[] = [
  // === デジタル都市国家 / Network States ===
  {
    id: "praxis-society",
    name: "PRAXIS Society",
    type: "digital_nation",
    description: "インターネット発祥のデジタル都市国家。Dryden Brown 創設（2020）。",
    memberEstimate: 151000,
    location: "Online (global)",
    foundedYear: 2020,
    homepage: "https://www.praxisnation.com/",
    tags: ["network-state", "digital-nation", "frontier"],
    relatedCommunities: ["cabin-dao", "edge-city"],
  },
  {
    id: "cabin-dao",
    name: "Cabin DAO",
    type: "digital_nation",
    description: "Web3ベースの分散物理コミュニティ。リモートワーカー向けの「ネイバーフッド」を世界各地に展開。",
    memberEstimate: 5000,
    location: "Global (USA HQ)",
    foundedYear: 2021,
    tags: ["network-state", "web3", "real-estate"],
    relatedCommunities: ["praxis-society", "edge-city"],
  },
  {
    id: "edge-city",
    name: "Edge City",
    type: "digital_nation",
    description: "高アジェンシー層の共同生活・実験コミュニティ。Devon Zuegel ら主導。",
    memberEstimate: 2000,
    location: "Pop-up cities globally",
    foundedYear: 2023,
    tags: ["network-state", "pop-up-city"],
    relatedCommunities: ["praxis-society", "cabin-dao"],
  },
  {
    id: "zuzalu",
    name: "Zuzalu",
    type: "digital_nation",
    description: "Vitalik Buterin 主導の Pop-up City 実験。2023年モンテネグロで初開催。",
    memberEstimate: 800,
    location: "Pop-up (Montenegro 2023)",
    foundedYear: 2023,
    tags: ["network-state", "ethereum", "longevity"],
    relatedCommunities: ["edge-city"],
  },
  {
    id: "prospera",
    name: "Próspera",
    type: "digital_nation",
    description: "ホンジュラスの特区都市プロジェクト。私的法制を実験。",
    memberEstimate: 200,
    location: "Roatán, Honduras",
    foundedYear: 2020,
    tags: ["network-state", "charter-city"],
  },

  // === 学術コミュニティ ===
  {
    id: "chiba-tech-nakayama-lab",
    name: "中山研究室",
    type: "academic",
    description: "千葉工業大学 中山研究室。超小型衛星の構造解析と振動試験を専門とする。",
    memberEstimate: 12,
    location: "Narashino, Japan",
    foundedYear: 2014,
    tags: ["aerospace", "cubesat", "structural-analysis"],
    relatedCommunities: ["chiba-tech-aerospace"],
  },
  {
    id: "chiba-tech-aerospace",
    name: "千葉工業大学 宇宙工学コース",
    type: "academic",
    description: "千葉工大の宇宙工学コース。CrestP-Sat 等のCubeSat開発を継続。",
    memberEstimate: 150,
    location: "Narashino, Japan",
    tags: ["aerospace", "education"],
    relatedCommunities: ["chiba-tech-nakayama-lab"],
  },
  {
    id: "mit-media-lab",
    name: "MIT Media Lab",
    type: "academic",
    description: "MIT の学際的研究機関。人間中心テクノロジーの研究で知られる。",
    memberEstimate: 250,
    location: "Cambridge, MA, USA",
    foundedYear: 1985,
    homepage: "https://www.media.mit.edu/",
    tags: ["academic", "research", "interdisciplinary"],
  },
  {
    id: "stanford-d-school",
    name: "Stanford d.school",
    type: "academic",
    description: "スタンフォード大学のデザイン思考研究所。",
    location: "Stanford, CA, USA",
    foundedYear: 2005,
    tags: ["design-thinking", "academic"],
  },

  // === スタートアップ / 企業 ===
  {
    id: "stark-technologies",
    name: "Stark Technologies",
    type: "corporate",
    description: "有人飛行スーツと JARVIS型AIの開発を志向する独立研究法人。AGORA の運営母体。",
    memberEstimate: 1,
    location: "Tokyo, Japan",
    foundedYear: 2026,
    tags: ["aerospace", "ai", "deep-tech"],
  },
  {
    id: "synspective",
    name: "Synspective",
    type: "corporate",
    description: "SAR衛星コンステレーションを開発する日本のスタートアップ。",
    memberEstimate: 200,
    location: "Tokyo, Japan",
    foundedYear: 2018,
    homepage: "https://synspective.com/",
    tags: ["aerospace", "sar", "earth-observation"],
  },
  {
    id: "spacex",
    name: "SpaceX",
    type: "corporate",
    description: "Elon Musk 創業の宇宙開発企業。再使用ロケットの先駆者。",
    memberEstimate: 13000,
    location: "Hawthorne, CA, USA",
    foundedYear: 2002,
    tags: ["aerospace", "rocketry"],
  },
  {
    id: "anthropic",
    name: "Anthropic",
    type: "corporate",
    description: "Claude を開発するAI安全研究企業。",
    memberEstimate: 500,
    location: "San Francisco, CA, USA",
    foundedYear: 2021,
    homepage: "https://www.anthropic.com/",
    tags: ["ai", "safety"],
  },

  // === オープンソース ===
  {
    id: "linux-foundation",
    name: "Linux Foundation",
    type: "professional",
    description: "Linux カーネルおよびオープンソース開発を支援する財団。",
    memberEstimate: 2000,
    foundedYear: 2000,
    tags: ["open-source", "infrastructure"],
  },
  {
    id: "ethereum-foundation",
    name: "Ethereum Foundation",
    type: "professional",
    description: "Ethereum エコシステムを支援する非営利組織。",
    foundedYear: 2014,
    tags: ["web3", "blockchain"],
    relatedCommunities: ["zuzalu"],
  },
  {
    id: "wikimedia-foundation",
    name: "Wikimedia Foundation",
    type: "professional",
    description: "Wikipedia をはじめとする自由な知識プロジェクトを運営する非営利組織。",
    memberEstimate: 700,
    foundedYear: 2003,
    homepage: "https://wikimediafoundation.org/",
    tags: ["open-knowledge", "non-profit"],
  },
  {
    id: "rust-foundation",
    name: "Rust Foundation",
    type: "professional",
    description: "Rust 言語の発展を支援する財団。",
    foundedYear: 2021,
    tags: ["open-source", "programming-language"],
  },

  // === コミュニティ・思想運動 ===
  {
    id: "effective-altruism",
    name: "Effective Altruism",
    type: "movement",
    description: "「最大の善を効率的に」を理念とする国際運動。",
    memberEstimate: 10000,
    foundedYear: 2009,
    tags: ["philosophy", "philanthropy"],
  },
  {
    id: "longevity-movement",
    name: "Longevity Movement",
    type: "movement",
    description: "老化解明と寿命延伸を目指す国際的研究・実践コミュニティ。",
    tags: ["health", "biotech"],
    relatedCommunities: ["zuzalu"],
  },
  {
    id: "indie-hackers",
    name: "Indie Hackers",
    type: "professional",
    description: "個人起業家・小規模SaaS運営者の国際コミュニティ。Stripe が運営。",
    memberEstimate: 100000,
    foundedYear: 2016,
    homepage: "https://www.indiehackers.com/",
    tags: ["entrepreneurship", "saas", "bootstrap"],
  },
  {
    id: "yc-network",
    name: "Y Combinator Alumni Network",
    type: "alumni",
    description: "Y Combinator 加速プログラム卒業生の同窓ネットワーク。",
    memberEstimate: 8000,
    foundedYear: 2005,
    tags: ["startup", "vc", "alumni"],
  },

  // === 日本国内コミュニティ ===
  {
    id: "ana-diamond",
    name: "ANA ダイヤモンドサービス会員",
    type: "professional",
    description: "ANA マイレージクラブ最上位ステータス。年間 100,000 PP 以上で取得。",
    memberEstimate: 50000,
    location: "Japan",
    tags: ["airline", "loyalty-program", "travel"],
  },
  {
    id: "note-creators",
    name: "note クリエイター",
    type: "professional",
    description: "note プラットフォーム上で発信する日本のクリエイター層。",
    memberEstimate: 1500000,
    location: "Japan",
    foundedYear: 2014,
    homepage: "https://note.com/",
    tags: ["writing", "japan", "creator-economy"],
  },
  {
    id: "japan-startups",
    name: "日本スタートアップ・コミュニティ",
    type: "professional",
    description: "東京を中心とした日本のスタートアップ生態系。ANRI、グロービス、サムライインキュベートら主導。",
    location: "Tokyo, Japan",
    tags: ["startup", "japan", "vc"],
  },
  {
    id: "samurai-incubate-portfolio",
    name: "Samurai Incubate 投資先",
    type: "alumni",
    description: "Samurai Incubate のポートフォリオ企業ネットワーク。",
    location: "Japan",
    foundedYear: 2008,
    tags: ["startup", "vc", "japan"],
  },

  // === ファンダム ===
  {
    id: "marvel-fans",
    name: "Marvel Cinematic Universe Fans",
    type: "fandom",
    description: "MCU 作品のグローバルファンダム。Iron Man 公開以降爆発的拡大。",
    memberEstimate: 100000000,
    foundedYear: 2008,
    tags: ["entertainment", "film"],
  },
  {
    id: "porsche-enthusiasts",
    name: "Porsche Enthusiasts",
    type: "fandom",
    description: "ポルシェ愛好家の国際コミュニティ。911 / Taycan 等のオーナー集団。",
    tags: ["automotive", "enthusiast"],
  },

  // === スポーツ ===
  {
    id: "lex-fridman-podcast-fans",
    name: "Lex Fridman Podcast Audience",
    type: "fandom",
    description: "Lex Fridman の長尺対談ポッドキャストを聴く知識層コミュニティ。",
    memberEstimate: 5000000,
    foundedYear: 2018,
    tags: ["podcast", "intellectual"],
  },
  {
    id: "tokyo-marathon-runners",
    name: "東京マラソン ランナー",
    type: "sports",
    description: "東京マラソン参加経験者のコミュニティ。",
    memberEstimate: 38000,
    location: "Tokyo, Japan",
    tags: ["marathon", "running"],
  },

  // === DAO ===
  {
    id: "friends-with-benefits",
    name: "Friends With Benefits (FWB)",
    type: "dao",
    description: "クリエイター・思想家のためのトークンゲート DAO。",
    foundedYear: 2020,
    tags: ["dao", "creative", "web3"],
  },
  {
    id: "gitcoin-dao",
    name: "Gitcoin DAO",
    type: "dao",
    description: "公共財向けクラウドファンディングの分散自律組織。",
    foundedYear: 2017,
    tags: ["dao", "public-goods", "web3"],
  },

  // === 宗教・伝統 ===
  {
    id: "zen-buddhism-soto",
    name: "曹洞宗",
    type: "religious",
    description: "日本仏教の禅宗の一派。13世紀道元が伝来。",
    foundedYear: 1227,
    location: "Japan",
    tags: ["buddhism", "zen", "tradition"],
  },
  {
    id: "vatican-catholic-church",
    name: "Vatican (Roman Catholic Church)",
    type: "religious",
    description: "ローマ・カトリック教会の中心機関。",
    memberEstimate: 1300000000,
    location: "Vatican City",
    tags: ["religion", "catholic"],
  },

  // === 政治 ===
  {
    id: "team-mirai-jp",
    name: "チームみらい",
    type: "political",
    description: "安野貴博 が主導する日本の政治コミュニティ。デジタル民主主義を提唱。",
    location: "Japan",
    foundedYear: 2024,
    tags: ["politics", "japan", "digital-democracy"],
  },
  {
    id: "democratic-network-japan",
    name: "日本デジタル民主主義者ネットワーク",
    type: "political",
    description: "デジタル技術による民主主義拡張を志向する日本の市民層。",
    location: "Japan",
    tags: ["politics", "digital-democracy"],
  },

  // === 相互扶助 ===
  {
    id: "ai-safety-researchers",
    name: "AI Safety Research Community",
    type: "mutual_aid",
    description: "AI 安全研究を行う研究者・実装者の国際的非公式コミュニティ。",
    tags: ["ai-safety", "alignment", "research"],
  },
  {
    id: "open-philanthropy-grantees",
    name: "Open Philanthropy Grantees",
    type: "alumni",
    description: "Open Philanthropy 助成を受けた研究者・組織のネットワーク。",
    tags: ["philanthropy", "longtermism"],
  },

  // === 創業者ネットワーク ===
  {
    id: "founders-fund-portfolio",
    name: "Founders Fund Portfolio",
    type: "alumni",
    description: "Peter Thiel らの Founders Fund 投資先企業ネットワーク。",
    foundedYear: 2005,
    tags: ["startup", "vc"],
  },
  {
    id: "a16z-portfolio",
    name: "Andreessen Horowitz Portfolio",
    type: "alumni",
    description: "a16z 投資先企業 800社以上のネットワーク。",
    foundedYear: 2009,
    tags: ["startup", "vc"],
  },

  // === 趣味・知識サークル ===
  {
    id: "japan-iron-man-cosplay",
    name: "アイアンマンコスプレイヤー（日本）",
    type: "hobby",
    description: "日本国内でアイアンマンスーツの再現を試みる愛好家コミュニティ。",
    location: "Japan",
    tags: ["cosplay", "marvel", "engineering"],
    relatedCommunities: ["marvel-fans"],
  },
  {
    id: "amateur-rocketry-jp",
    name: "アマチュアロケット愛好家（日本）",
    type: "hobby",
    description: "個人レベルでロケット製作を行う日本の愛好家コミュニティ。",
    location: "Japan",
    tags: ["aerospace", "hobby", "rocketry"],
  },

  // === デジタルクリエイター ===
  {
    id: "substack-writers",
    name: "Substack Writers",
    type: "professional",
    description: "Substack で有料ニュースレターを発行するライター層。",
    memberEstimate: 50000,
    foundedYear: 2017,
    tags: ["writing", "newsletter", "creator-economy"],
  },
  {
    id: "youtube-tech-creators",
    name: "Tech YouTubers",
    type: "fandom",
    description: "YouTube 上の技術解説クリエイター層。MKBHD らが代表。",
    tags: ["youtube", "tech", "content"],
  },

  // === 投資家コミュニティ ===
  {
    id: "individual-investors-jp",
    name: "日本の個人投資家",
    type: "professional",
    description: "新NISA以降急増した日本の個人投資家層。",
    memberEstimate: 20000000,
    location: "Japan",
    tags: ["investing", "japan"],
  },
  {
    id: "longevity-investors",
    name: "Longevity Investors",
    type: "professional",
    description: "寿命延伸技術に投資する投資家ネットワーク。Sam Altman、Yuri Milner ら。",
    tags: ["longevity", "biotech", "investing"],
  },

  // === 大学同窓 ===
  {
    id: "todai-alumni",
    name: "東京大学同窓会",
    type: "alumni",
    description: "東京大学卒業生のグローバル同窓ネットワーク。",
    memberEstimate: 300000,
    location: "Global (Japan HQ)",
    foundedYear: 1877,
    tags: ["alumni", "academic", "japan"],
  },
  {
    id: "harvard-alumni",
    name: "Harvard Alumni Association",
    type: "alumni",
    description: "ハーバード大学卒業生のグローバル同窓組織。",
    memberEstimate: 400000,
    foundedYear: 1636,
    tags: ["alumni", "ivy-league"],
  },

  // === 地縁 ===
  {
    id: "ichikawa-shi",
    name: "市川市民",
    type: "geographical",
    description: "千葉県市川市の住民コミュニティ。江戸川沿いに位置する。",
    memberEstimate: 490000,
    location: "Ichikawa, Chiba, Japan",
    tags: ["local", "japan", "chiba"],
  },
  {
    id: "shibuya-it-community",
    name: "渋谷 IT コミュニティ",
    type: "geographical",
    description: "渋谷を拠点とする日本IT企業・スタートアップ群。",
    location: "Shibuya, Tokyo, Japan",
    tags: ["tech", "japan", "tokyo"],
  },
];

export function getById(id: string): SeedCommunity | undefined {
  return SEED_COMMUNITIES.find((c) => c.id === id);
}

export function search(query: string): SeedCommunity[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return SEED_COMMUNITIES.filter((c) => {
    const haystack = [c.name, c.description, c.location ?? "", ...c.tags].join(" ").toLowerCase();
    return haystack.includes(q);
  }).slice(0, 12);
}
