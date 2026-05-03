import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Question, AnswerOption, TestType } from '../../types';

interface TestSessionState {
  id: string;
  type: TestType;
  questions: Question[];
  currentIndex: number;
  answers: Record<string, AnswerOption | null>;
  markedQuestions: string[];
  startedAt: string;
  timeLimit?: number;
  isCompleted: boolean;
  timeElapsed: number;
}

interface ExamState {
  testSession: TestSessionState | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: ExamState = {
  testSession: null,
  isLoading: false,
  error: null,
};

const examSlice = createSlice({
  name: 'exam',
  initialState,
  reducers: {
    setTestSession: (state, action: PayloadAction<{
      id: string;
      type: TestType;
      questions: Question[];
      timeLimit?: number;
    }>) => {
      state.testSession = {
        id: action.payload.id,
        type: action.payload.type,
        questions: action.payload.questions,
        currentIndex: 0,
        answers: {},
        markedQuestions: [],
        startedAt: new Date().toISOString(),
        timeLimit: action.payload.timeLimit,
        isCompleted: false,
        timeElapsed: 0,
      };
    },

    setAnswer: (state, action: PayloadAction<{
      questionId: string;
      answer: AnswerOption | null;
    }>) => {
      if (state.testSession) {
        state.testSession.answers[action.payload.questionId] = action.payload.answer;
      }
    },

    goToQuestion: (state, action: PayloadAction<number>) => {
      if (state.testSession) {
        const idx = action.payload;
        if (idx >= 0 && idx < state.testSession.questions.length) {
          state.testSession.currentIndex = idx;
        }
      }
    },

    goToNext: (state) => {
      if (state.testSession) {
        const next = state.testSession.currentIndex + 1;
        if (next < state.testSession.questions.length) {
          state.testSession.currentIndex = next;
        }
      }
    },

    goToPrev: (state) => {
      if (state.testSession) {
        const prev = state.testSession.currentIndex - 1;
        if (prev >= 0) {
          state.testSession.currentIndex = prev;
        }
      }
    },

    toggleMark: (state, action: PayloadAction<string>) => {
      if (state.testSession) {
        const qId = action.payload;
        const idx = state.testSession.markedQuestions.indexOf(qId);
        if (idx === -1) {
          state.testSession.markedQuestions.push(qId);
        } else {
          state.testSession.markedQuestions.splice(idx, 1);
        }
      }
    },

    tickTimer: (state) => {
      if (state.testSession && !state.testSession.isCompleted) {
        state.testSession.timeElapsed += 1;
      }
    },

    completeSession: (state) => {
      if (state.testSession) {
        state.testSession.isCompleted = true;
      }
    },

    clearSession: (state) => {
      state.testSession = null;
      state.error = null;
    },

    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },

    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setTestSession,
  setAnswer,
  goToQuestion,
  goToNext,
  goToPrev,
  toggleMark,
  tickTimer,
  completeSession,
  clearSession,
  setLoading,
  setError,
} = examSlice.actions;

export default examSlice.reducer;