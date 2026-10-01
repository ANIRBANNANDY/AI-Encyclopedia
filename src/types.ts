export type Difficulty = 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';

export type ExplanationMode = 'analogy' | 'layman' | 'technical';

export interface AnalogyBreakdown {
  realWorld: string;
  aiConcept: string;
}

export interface CoreAnalogy {
  title: string;
  story: string;
  breakdown: AnalogyBreakdown[];
}

export interface Pitfall {
  misconception: string;
  reality: string;
}

export interface ProductionExample {
  companyOrCase: string;
  application: string;
}

export interface ProductionUse {
  summary: string;
  examples: ProductionExample[];
}

export interface TopicExplanation {
  topicTitle: string;
  mode: ExplanationMode;
  summary: string;
  whatIsIt: string;
  howItWorks: string;
  coreAnalogy: CoreAnalogy;
  pitfalls: Pitfall[];
  productionUse: ProductionUse;
  technicalSnippet?: string;
  keyTakeaways: string[];
}

export interface Topic {
  id: string;
  title: string;
  categoryId: string;
  difficulty: Difficulty;
  estimatedReadTime: string;
  tags: string[];
  quickSummary: string;
  suggestedQuestions: string[];
}

export interface Category {
  id: string;
  title: string;
  difficulty: Difficulty;
  description: string;
  iconName: string;
  color: string;
  topics: Topic[];
}

export interface FollowUpMessage {
  id: string;
  topicId: string;
  question: string;
  answer: string;
  mode: ExplanationMode;
  timestamp: string;
}
