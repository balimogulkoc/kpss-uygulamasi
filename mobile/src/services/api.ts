import axios, { AxiosInstance, AxiosRequestConfig, AxiosError } from 'axios';
import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import {
  ApiResponse,
  PaginatedResponse,
  LoginPayload,
  RegisterPayload,
  AuthTokens,
  User,
  Question,
  QuestionFilter,
  MockExam,
  ExamSession,
  UserStats,
  SubjectPerformance,
  DailyStudyLog,
  WeakTopic,
  Subject,
  Topic,
  ExamCategoryInfo,
  LeaderboardEntry,
  Badge,
  StudyPlan,
  NotificationSettings,
} from '../types';

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000/api/v1';

const STORAGE_KEYS = {
  ACCESS_TOKEN: 'kpss_access_token',
  REFRESH_TOKEN: 'kpss_refresh_token',
};

// ─── Platform-aware Storage ───────────────────────────────────────────────────

const storage = {
  getItem: async (key: string): Promise<string | null> => {
    if (Platform.OS === 'web') {
      return localStorage.getItem(key);
    }
    return SecureStore.getItemAsync(key);
  },
  setItem: async (key: string, value: string): Promise<void> => {
    if (Platform.OS === 'web') {
      localStorage.setItem(key, value);
    } else {
      await SecureStore.setItemAsync(key, value);
    }
  },
  deleteItem: async (key: string): Promise<void> => {
    if (Platform.OS === 'web') {
      localStorage.removeItem(key);
    } else {
      await SecureStore.deleteItemAsync(key);
    }
  },
};

// ─── Axios Instance ───────────────────────────────────────────────────────────

const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// ─── Request Interceptor ──────────────────────────────────────────────────────

apiClient.interceptors.request.use(
  async (config) => {
    const token = await storage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// ─── Response Interceptor (Token Refresh) ─────────────────────────────────────

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value: string) => void;
  reject: (reason: unknown) => void;
}> = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token!);
    }
  });
  failedQueue = [];
};

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${token}`;
          }
          return apiClient(originalRequest);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = await storage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
        if (!refreshToken) throw new Error('No refresh token');

        const response = await axios.post(`${API_BASE_URL}/auth/refresh`, {
          refreshToken,
        });

        const { accessToken, refreshToken: newRefreshToken } = response.data;
        await storage.setItem(STORAGE_KEYS.ACCESS_TOKEN, accessToken);
        await storage.setItem(STORAGE_KEYS.REFRESH_TOKEN, newRefreshToken);

        processQueue(null, accessToken);
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        }
        return apiClient(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        await storage.deleteItem(STORAGE_KEYS.ACCESS_TOKEN);
        await storage.deleteItem(STORAGE_KEYS.REFRESH_TOKEN);
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);

// ─── Token Helpers ────────────────────────────────────────────────────────────

export const tokenStorage = {
  save: async (tokens: AuthTokens) => {
    await storage.setItem(STORAGE_KEYS.ACCESS_TOKEN, tokens.accessToken);
    await storage.setItem(STORAGE_KEYS.REFRESH_TOKEN, tokens.refreshToken);
  },
  clear: async () => {
    await storage.deleteItem(STORAGE_KEYS.ACCESS_TOKEN);
    await storage.deleteItem(STORAGE_KEYS.REFRESH_TOKEN);
  },
  getAccessToken: () => storage.getItem(STORAGE_KEYS.ACCESS_TOKEN),
};

// ─── Auth API ─────────────────────────────────────────────────────────────────

export const authApi = {
  login: async (payload: LoginPayload): Promise<{ user: User; tokens: AuthTokens }> => {
    const res = await apiClient.post('/auth/login', payload);
    const { token, user } = res.data;
    return { user, tokens: { accessToken: token, refreshToken: token } };
  },

  register: async (payload: RegisterPayload): Promise<{ user: User; tokens: AuthTokens }> => {
    const res = await apiClient.post('/auth/register', payload);
    const { token, user } = res.data;
    return { user, tokens: { accessToken: token, refreshToken: token } };
  },

  logout: async (): Promise<void> => {
    await tokenStorage.clear();
  },

  getMe: async (): Promise<User> => {
    const res = await apiClient.get('/auth/me');
    return res.data;
  },

  forgotPassword: async (email: string): Promise<void> => {
    await apiClient.post('/auth/forgot-password', { email });
  },

  resetPassword: async (token: string, password: string): Promise<void> => {
    await apiClient.post('/auth/reset-password', { token, password });
  },

  verifyEmail: async (otp: string, email: string): Promise<void> => {
    await apiClient.post('/auth/verify-email', { otp, email });
  },
};

// ─── Categories API ───────────────────────────────────────────────────────────

export const categoriesApi = {
  getAll: async (): Promise<ExamCategoryInfo[]> => {
    const res = await apiClient.get<ApiResponse<ExamCategoryInfo[]>>('/categories');
    return res.data.data;
  },

  getSubjects: async (categoryCode: string): Promise<Subject[]> => {
    const res = await apiClient.get<ApiResponse<Subject[]>>(
      `/categories/${categoryCode}/subjects`,
    );
    return res.data.data;
  },

  getTopics: async (subjectId: number): Promise<Topic[]> => {
    const res = await apiClient.get<ApiResponse<Topic[]>>(
      `/subjects/${subjectId}/topics`,
    );
    return res.data.data;
  },
};

// ─── Questions API ────────────────────────────────────────────────────────────

export const questionsApi = {
  getQuestions: async (
    filter: QuestionFilter,
  ): Promise<PaginatedResponse<Question>> => {
    const res = await apiClient.get<PaginatedResponse<Question>>('/questions', {
      params: filter,
    });
    return res.data;
  },

  getSubjects: async () => {
    const res = await apiClient.get('/questions/subjects');
    return res.data;
  },

  getTopics: async (subjectId?: number) => {
    const res = await apiClient.get('/questions/topics', {
      params: subjectId ? { subjectId } : {},
    });
    return res.data;
  },

  getQuestion: async (id: string): Promise<Question> => {
    const res = await apiClient.get<ApiResponse<Question>>(`/questions/${id}`);
    return res.data.data;
  },

  startTestSession: async (filter: QuestionFilter): Promise<{ sessionId: string; questions: Question[] }> => {
    const res = await apiClient.post<ApiResponse<{ sessionId: string; questions: Question[] }>>(
      '/questions/session/start',
      filter,
    );
    return res.data.data;
  },

  submitAnswer: async (
    sessionId: string,
    questionId: string,
    answer: string | null,
    timeSpent: number,
  ): Promise<{ isCorrect: boolean; correctAnswer: string }> => {
    const res = await apiClient.post<ApiResponse<{ isCorrect: boolean; correctAnswer: string }>>(
      `/questions/session/${sessionId}/answer`,
      { questionId, answer, timeSpent },
    );
    return res.data.data;
  },

  finishSession: async (sessionId: string): Promise<{
    totalQuestions: number;
    correct: number;
    wrong: number;
    empty: number;
    accuracy: number;
    xpEarned: number;
  }> => {
    const res = await apiClient.post(`/questions/session/${sessionId}/finish`);
    return res.data.data;
  },

  toggleBookmark: async (questionId: string): Promise<{ isBookmarked: boolean }> => {
    const res = await apiClient.post<ApiResponse<{ isBookmarked: boolean }>>(
      `/questions/${questionId}/bookmark`,
    );
    return res.data.data;
  },

  getSolution: async (questionId: string) => {
    const res = await apiClient.get(`/questions/${questionId}/solution`);
    return res.data;
  },
};

// ─── Exams API ────────────────────────────────────────────────────────────────

export const examsApi = {
  getMockExams: async (categoryCode?: string): Promise<MockExam[]> => {
    const res = await apiClient.get<ApiResponse<MockExam[]>>('/exams', {
      params: { categoryCode },
    });
    return res.data.data;
  },

  getExam: async (examId: string): Promise<MockExam> => {
    const res = await apiClient.get<ApiResponse<MockExam>>(`/exams/${examId}`);
    return res.data.data;
  },

  startExam: async (examId: string): Promise<{ sessionId: string; questions: Question[] }> => {
    const res = await apiClient.post<ApiResponse<{ sessionId: string; questions: Question[] }>>(
      `/exams/${examId}/start`,
    );
    return res.data.data;
  },

  submitExamAnswer: async (
    sessionId: string,
    questionId: string,
    answer: string | null,
    timeSpent: number,
  ): Promise<void> => {
    await apiClient.post(`/exams/session/${sessionId}/answer`, {
      questionId,
      answer,
      timeSpent,
    });
  },

  finishExam: async (sessionId: string): Promise<ExamSession> => {
    const res = await apiClient.post<ApiResponse<ExamSession>>(
      `/exams/session/${sessionId}/finish`,
    );
    return res.data.data;
  },

  getExamResult: async (sessionId: string): Promise<ExamSession> => {
    const res = await apiClient.get<ApiResponse<ExamSession>>(
      `/exams/session/${sessionId}/result`,
    );
    return res.data.data;
  },

  getUserSessions: async (): Promise<ExamSession[]> => {
    const res = await apiClient.get<ApiResponse<ExamSession[]>>('/exams/sessions/me');
    return res.data.data;
  },
};

// ─── Analytics API ────────────────────────────────────────────────────────────

export const analyticsApi = {
  getUserStats: async (): Promise<UserStats> => {
    const res = await apiClient.get<ApiResponse<UserStats>>('/analytics/stats');
    return res.data.data;
  },

  getSubjectPerformance: async (): Promise<SubjectPerformance[]> => {
    const res = await apiClient.get<ApiResponse<SubjectPerformance[]>>(
      '/analytics/subjects',
    );
    return res.data.data;
  },

  getDailyLogs: async (days: number = 30): Promise<DailyStudyLog[]> => {
    const res = await apiClient.get<ApiResponse<DailyStudyLog[]>>(
      '/analytics/daily-logs',
      { params: { days } },
    );
    return res.data.data;
  },

  getWeakTopics: async (): Promise<WeakTopic[]> => {
    const res = await apiClient.get<ApiResponse<WeakTopic[]>>(
      '/analytics/weak-topics',
    );
    return res.data.data;
  },

  getLeaderboard: async (
    type: 'global' | 'category' | 'friends' = 'global',
  ): Promise<LeaderboardEntry[]> => {
    const res = await apiClient.get<ApiResponse<LeaderboardEntry[]>>(
      '/analytics/leaderboard',
      { params: { type } },
    );
    return res.data.data;
  },
};

// ─── User API ─────────────────────────────────────────────────────────────────

export const userApi = {
  updateProfile: async (data: Partial<User>): Promise<User> => {
    const res = await apiClient.patch<ApiResponse<User>>('/users/me', data);
    return res.data.data;
  },

  getBadges: async (): Promise<Badge[]> => {
    const res = await apiClient.get<ApiResponse<Badge[]>>('/users/me/badges');
    return res.data.data;
  },

  getStudyPlan: async (): Promise<StudyPlan> => {
    const res = await apiClient.get<ApiResponse<StudyPlan>>('/users/me/study-plan');
    return res.data.data;
  },

  updateStudyPlan: async (data: Partial<StudyPlan>): Promise<StudyPlan> => {
    const res = await apiClient.put<ApiResponse<StudyPlan>>(
      '/users/me/study-plan',
      data,
    );
    return res.data.data;
  },

  getNotificationSettings: async (): Promise<NotificationSettings> => {
    const res = await apiClient.get<ApiResponse<NotificationSettings>>(
      '/users/me/notification-settings',
    );
    return res.data.data;
  },

  updateNotificationSettings: async (
    settings: Partial<NotificationSettings>,
  ): Promise<NotificationSettings> => {
    const res = await apiClient.put<ApiResponse<NotificationSettings>>(
      '/users/me/notification-settings',
      settings,
    );
    return res.data.data;
  },

  registerPushToken: async (token: string): Promise<void> => {
    await apiClient.post('/users/me/push-token', { token });
  },
};

// ─── Subscriptions API ────────────────────────────────────────────────────────

export const subscriptionsApi = {
  getPlans: async () => {
    const res = await apiClient.get('/subscriptions/plans');
    return res.data.data;
  },

  createSubscription: async (planType: string, paymentToken: string) => {
    const res = await apiClient.post('/subscriptions', { planType, paymentToken });
    return res.data.data;
  },

  cancelSubscription: async () => {
    await apiClient.delete('/subscriptions/me');
  },

  getActiveSubscription: async () => {
    const res = await apiClient.get('/subscriptions/me');
    return res.data.data;
  },
};

export default apiClient;