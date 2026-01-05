export interface Scan {
  id: string;
  userId: string;
  rawIngredients: string;
  summaryVerdict: string;
  humanInsights: Insight[];
  uncertaintyLevel: 'Stable' | 'Drifting' | 'Critical';
  imageUri?: string;
  createdAt: string;
}

export interface Insight {
  type: 'WATCH_OUT' | 'GOOD_NEWS' | 'INSIGHT';
  text: string;
  explanation: string;
}

export interface AnalyzeResponse {
  verdict: string;
  insights: Insight[];
  uncertainty: number;
  doodleNote: string;
}

export type RootStackParamList = {
  index: undefined;
  summary: { data: AnalyzeResponse; scanId: string };
  details: { insight: Insight };
  history: undefined;
  settings: undefined;
  login: undefined;
};