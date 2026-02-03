export enum ModuleType {
  INTRODUCTION = 'INTRODUCTION',
  ASSESSMENT = 'ASSESSMENT',
  STRATEGY = 'STRATEGY',
  PLANNING_TOOL = 'PLANNING_TOOL',
  AI_COACH = 'AI_COACH'
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: Date;
}

export interface DelegationPlan {
  taskName: string;
  purpose: string;
  deadline: string;
  goals: string;
  responsiblePerson: string;
  authorityLevel: 'All' | 'Some' | 'None' | '';
  checkpoints: string;
}

export interface ProTalkConfig {
  botToken: string;
  botId: number;
}