export interface VCAnalysisResult {
  market_opportunity: {
    score: number;
    feedback: string;
  };
  product_solution: {
    score: number;
    feedback: string;
  };
  business_model: {
    score: number;
    feedback: string;
  };
  competition_differentiation: {
    score: number;
    feedback: string;
  };
  team_execution: {
    score: number;
    feedback: string;
  };
  investment_potential: {
    score: number;
    feedback: string;
  };
  total_score: number;
  summary: string;
}

export interface AnalysisInput {
  idea: {
    content: string;
    provided: "true" | "false" | "partial";
  };
  target_customer: {
    content: string;
    provided: "true" | "false" | "partial";
  };
  value_proposition: {
    content: string;
    provided: "true" | "false" | "partial";
  };
} 