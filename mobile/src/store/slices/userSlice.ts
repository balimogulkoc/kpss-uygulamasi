import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { userApi, analyticsApi } from '../../services/api';
import { UserStats, Badge, StudyPlan, WeakTopic } from '../../types';

interface UserState {
  stats: UserStats | null;
  badges: Badge[];
  studyPlan: StudyPlan | null;
  weakTopics: WeakTopic[];
  isLoading: boolean;
  error: string | null;
}

const initialState: UserState = {
  stats: null,
  badges: [],
  studyPlan: null,
  weakTopics: [],
  isLoading: false,
  error: null,
};

export const fetchUserStats = createAsyncThunk('user/fetchStats', async () => {
  return await analyticsApi.getUserStats();
});

export const fetchBadges = createAsyncThunk('user/fetchBadges', async () => {
  return await userApi.getBadges();
});

export const fetchStudyPlan = createAsyncThunk('user/fetchStudyPlan', async () => {
  return await userApi.getStudyPlan();
});

export const fetchWeakTopics = createAsyncThunk('user/fetchWeakTopics', async () => {
  return await analyticsApi.getWeakTopics();
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    incrementXP: (state, action: PayloadAction<number>) => {
      if (state.stats) {
        state.stats.totalXP += action.payload;
      }
    },
    incrementStreak: (state) => {
      if (state.stats) {
        state.stats.currentStreak += 1;
        if (state.stats.currentStreak > state.stats.longestStreak) {
          state.stats.longestStreak = state.stats.currentStreak;
        }
      }
    },
    addSolvedQuestion: (state, action: PayloadAction<{ isCorrect: boolean }>) => {
      if (state.stats) {
        state.stats.totalQuestions += 1;
        if (action.payload.isCorrect) {
          state.stats.correctAnswers += 1;
        } else {
          state.stats.wrongAnswers += 1;
        }
        state.stats.accuracy =
          (state.stats.correctAnswers / state.stats.totalQuestions) * 100;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserStats.fulfilled, (state, action) => {
        state.stats = action.payload;
      })
      .addCase(fetchBadges.fulfilled, (state, action) => {
        state.badges = action.payload;
      })
      .addCase(fetchStudyPlan.fulfilled, (state, action) => {
        state.studyPlan = action.payload;
      })
      .addCase(fetchWeakTopics.fulfilled, (state, action) => {
        state.weakTopics = action.payload;
      });
  },
});

export const { incrementXP, incrementStreak, addSolvedQuestion } = userSlice.actions;
export default userSlice.reducer;