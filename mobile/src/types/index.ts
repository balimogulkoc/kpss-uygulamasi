// ─── Auth Types ───────────────────────────────────────────────────────────────

export interface User {
  id: string;
  email: string;
  phone?: string;
  fullName: string;
  avatarUrl?: string;
  examCategory?: ExamCategory;
  targetExamDate?: string;
  subscriptionTier: SubscriptionTier;
  isVerified: boolean;
  xp: number;
  level: number;
  streakDays: number;
  createdAt: string;
}

export type SubscriptionTier = 'free' | 'monthly' | 'quarterly' | 'annual';

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  email: string;
  password: string;
  fullName: string;
  examCategory?: ExamCategory;
}

// ─── Exam Category Types ──────────────────────────────────────────────────────

export type ExamCategory =
  | 'lisans'
  | 'onlisans'
  | 'ortaogretim'
  | 'oabt'
  | 'egitim_bilimleri';

export interface ExamCategoryInfo {
  id: number;
  code: ExamCategory;
  name: string;
  description: string;
  icon: string;
  color: string;
  isActive: boolean;
}

// ─── Subject & Topic Types ────────────────────────────────────────────────────

export interface Subject {
  id: number;
  categoryId: number;
  name: string;
  code: string;
  iconUrl?: string;
  displayOrder: number;
  topicCount?: number;
  questionCount?: number;
  userAccuracy?: number;
}

export interface Topic {
  id: number;
  subjectId: number;
  parentId?: number;
  name: string;
  description?: string;
  displayOrder: number;
  isActive: boolean;
  children?: Topic[];
  questionCount?: number;
  userAccuracy?: number;
}

// ─── Question Types ───────────────────────────────────────────────────────────

export type Difficulty = 'easy' | 'medium' | 'hard' | 'very_hard' | 'EASY' | 'MEDIUM' | 'HARD' | 'VERY_HARD';
export type AnswerOption = 'A' | 'B' | 'C' | 'D' | 'E';

export interface Question {
  id: string;
  topicId: number;
  subjectId?: number;
  topicName?: string;
  subjectName?: string;
  // Frontend-style fields
  questionText?: string;
  optionA?: string;
  optionB?: string;
  optionC?: string;
  optionD?: string;
  optionE?: string;
  // Backend-style fields
  text?: string;
  options?: string | string[];
  explanation?: string;
  subject?: { id: number; name: string; code: string; icon?: string };
  topic?: { id: number; name: string };
  year?: number;
  source?: string;
  correctAnswer: AnswerOption | string;
  difficulty: Difficulty;
  sourceYear?: number;
  sourceExam?: string;
  imageUrl?: string;
  estimatedTime?: number;
  solution?: Solution;
  userAnswer?: AnswerOption | null;
  isBookmarked?: boolean;
  isActive?: boolean;
}

export interface Solution {
  id: number;
  questionId: string;
  solutionText: string;
  solutionVideoUrl?: string;
  keyConcept?: string;
  commonMistakes?: string;
}

export interface QuestionFilter {
  categoryCode?: ExamCategory;
  subjectId?: number;
  topicId?: number;
  difficulty?: Difficulty;
  yearFrom?: number;
  yearTo?: number;
  status?: 'all' | 'solved' | 'unsolved' | 'wrong' | 'bookmarked';
  page?: number;
  limit?: number;
}

// ─── Test / Exam Types ────────────────────────────────────────────────────────

export type TestType =
  | 'topic'
  | 'mixed'
  | 'weak_topics'
  | 'wrong_answers'
  | 'quick'
  | 'practice';

export interface TestSession {
  id: string;
  type: TestType;
  questions: Question[];
  currentIndex: number;
  answers: Record<string, AnswerOption | null>;
  markedQuestions: string[];
  startedAt: Date | string;
  timeLimit?: number; // seconds
  timeElapsed: number;
  isCompleted: boolean;
}

export interface MockExam {
  id: string;
  categoryId: number;
  title: string;
  description?: string;
  durationMinutes: number;
  totalQuestions: number;
  isPremium: boolean;
  publishDate: string;
  isActive: boolean;
  userAttempts?: number;
  lastScore?: number;
}

export interface ExamSession {
  id: string;
  userId: string;
  examId: string;
  exam?: MockExam;
  startedAt: string;
  completedAt?: string;
  rawScore?: number;
  weightedScore?: number;
  percentile?: number;
  status: 'in_progress' | 'completed' | 'abandoned';
  answers?: UserAnswer[];
}

export interface UserAnswer {
  id: string;
  userId: string;
  questionId: string;
  sessionId: string;
  givenAnswer?: AnswerOption;
  isCorrect?: boolean;
  timeSpent: number;
  answeredAt: string;
}

// ─── Analytics Types ──────────────────────────────────────────────────────────

export interface UserStats {
  totalQuestions: number;
  correctAnswers: number;
  wrongAnswers: number;
  accuracy: number;
  totalStudyMinutes: number;
  currentStreak: number;
  longestStreak: number;
  totalXP: number;
  level: number;
  examsTaken: number;
  lastExamScore?: number;
  lastExamPercentile?: number;
}

export interface SubjectPerformance {
  subjectId: number;
  subjectName: string;
  totalQuestions: number;
  correctAnswers: number;
  accuracy: number;
  avgTimePerQuestion: number;
  trend: 'up' | 'down' | 'stable';
}

export interface DailyStudyLog {
  date: string;
  totalMinutes: number;
  questionsSolved: number;
  correctAnswers: number;
}

export interface WeakTopic {
  topicId: number;
  topicName: string;
  subjectName: string;
  accuracy: number;
  questionCount: number;
  priority: 'high' | 'medium' | 'low';
}

// ─── Study Plan Types ─────────────────────────────────────────────────────────

export interface StudyPlan {
  id: string;
  userId: string;
  examDate: string;
  dailyGoalMinutes: number;
  daysRemaining: number;
  todayProgress: number;
  weeklySchedule: DaySchedule[];
}

export interface DaySchedule {
  dayOfWeek: number;
  subjects: ScheduledSubject[];
  totalMinutes: number;
}

export interface ScheduledSubject {
  subjectId: number;
  subjectName: string;
  minutes: number;
  isCompleted: boolean;
}

// ─── Gamification Types ───────────────────────────────────────────────────────

export interface Badge {
  id: string;
  type: string;
  name: string;
  description: string;
  iconUrl: string;
  earnedAt?: string;
  isEarned: boolean;
}

export interface LeaderboardEntry {
  rank: number;
  userId: string;
  fullName: string;
  avatarUrl?: string;
  xp: number;
  level: number;
  examCategory: ExamCategory;
  isCurrentUser: boolean;
}

// ─── Subscription Types ───────────────────────────────────────────────────────

export interface SubscriptionPlan {
  id: string;
  type: SubscriptionTier;
  name: string;
  price: number;
  originalPrice?: number;
  period: string;
  features: string[];
  isPopular?: boolean;
  savingsPercent?: number;
}

export interface Subscription {
  id: string;
  userId: string;
  planType: SubscriptionTier;
  startDate: string;
  endDate: string;
  amount: number;
  currency: string;
  paymentProvider: string;
  status: 'active' | 'cancelled' | 'expired';
}

// ─── Notification Types ───────────────────────────────────────────────────────

export interface NotificationSettings {
  morningReminder: boolean;
  morningTime: string;
  eveningReminder: boolean;
  eveningTime: string;
  streakAlert: boolean;
  newContent: boolean;
  examCountdown: boolean;
  achievements: boolean;
}

// ─── API Response Types ───────────────────────────────────────────────────────

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ApiError {
  message: string;
  statusCode: number;
  error?: string;
}

// ─── Navigation Types ─────────────────────────────────────────────────────────

export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
  Onboarding: undefined;
};

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
  OTPVerification: { email: string };
};

export type MainTabParamList = {
  Home: undefined;
  Questions: undefined;
  Exams: undefined;
  Analytics: undefined;
  Profile: undefined;
};

export type HomeStackParamList = {
  HomeScreen: undefined;
  StudyPlan: undefined;
  Notifications: undefined;
};

export type QuestionStackParamList = {
  QuestionBank: undefined;
  QuestionSolve: { sessionId: string; filter?: QuestionFilter };
  QuestionResult: { sessionId: string };
  TopicList: { subjectId: number; subjectName: string };
  SubjectList: { categoryCode: ExamCategory };
};

export type ExamStackParamList = {
  ExamList: undefined;
  ExamDetail: { examId: string };
  ExamSolve: { examId: string; sessionId: string };
  ExamResult: { sessionId: string };
};

export type AnalyticsStackParamList = {
  AnalyticsDashboard: undefined;
  SubjectDetail: { subjectId: number };
  Leaderboard: undefined;
};

export type ProfileStackParamList = {
  ProfileMain: undefined;
  Settings: undefined;
  Premium: undefined;
  Badges: undefined;
  StudyHistory: undefined;
};