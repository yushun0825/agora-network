import type { CommunityType } from "./types";

export const TYPE_LABEL: Record<CommunityType, string> = {
  geographical: "地縁",
  academic: "学術",
  professional: "業界・職能",
  corporate: "企業",
  religious: "宗教",
  political: "政治",
  hobby: "趣味",
  sports: "スポーツ",
  alumni: "同窓",
  digital_nation: "デジタル国家",
  dao: "DAO",
  family: "家族",
  movement: "思想運動",
  fandom: "ファンダム",
  mutual_aid: "相互扶助",
  other: "その他",
};

export const TYPE_COLOR: Record<CommunityType, string> = {
  geographical: "#7AA37A",
  academic: "#9AB5D6",
  professional: "#B89870",
  corporate: "#C9A66B",
  religious: "#B493C9",
  political: "#D69A8A",
  hobby: "#A5C9B0",
  sports: "#E0C674",
  alumni: "#A8B6D6",
  digital_nation: "#2A3F6F",
  dao: "#7E97D4",
  family: "#D4A89A",
  movement: "#C97A7A",
  fandom: "#E08FB4",
  mutual_aid: "#86C5B6",
  other: "#9A9A9A",
};

export const TYPE_LIST: { value: CommunityType; label: string }[] = (
  Object.keys(TYPE_LABEL) as CommunityType[]
).map((value) => ({ value, label: TYPE_LABEL[value] }));
