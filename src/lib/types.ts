export type CommunityType =
  | "geographical"
  | "academic"
  | "professional"
  | "corporate"
  | "religious"
  | "political"
  | "hobby"
  | "sports"
  | "alumni"
  | "digital_nation"
  | "dao"
  | "family"
  | "movement"
  | "fandom"
  | "mutual_aid"
  | "other";

export interface SeedCommunity {
  id: string;
  name: string;
  type: CommunityType;
  description: string;
  memberEstimate?: number;
  location?: string;
  foundedYear?: number;
  homepage?: string;
  tags: string[];
}

export interface CommunityFilters {
  query: string;
  types: CommunityType[];
  tags: string[];
}
