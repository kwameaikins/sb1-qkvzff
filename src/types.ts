import { User } from 'firebase/auth';

export interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
  category: string;
}

export interface QuizState {
  currentQuestionIndex: number;
  score: number;
  showResult: boolean;
  category: string;
}

export interface LeaderboardEntry {
  userId: string;
  username: string;
  score: number;
  category: string;
}

export interface AppState {
  user: User | null;
  isLoading: boolean;
}