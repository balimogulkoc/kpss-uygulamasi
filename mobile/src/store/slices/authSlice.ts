import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { authApi, tokenStorage } from '../../services/api';
import { User, LoginPayload, RegisterPayload } from '../../types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  isInitialized: boolean;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  isInitialized: false,
};

export const loginThunk = createAsyncThunk(
  'auth/login',
  async (payload: LoginPayload, { rejectWithValue }) => {
    try {
      const result = await authApi.login(payload);
      await tokenStorage.save(result.tokens);
      return result.user;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || 'Giriş yapılamadı. Lütfen tekrar deneyin.',
      );
    }
  },
);

export const registerThunk = createAsyncThunk(
  'auth/register',
  async (payload: RegisterPayload, { rejectWithValue }) => {
    try {
      const result = await authApi.register(payload);
      await tokenStorage.save(result.tokens);
      return result.user;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || 'Kayıt olunamadı. Lütfen tekrar deneyin.',
      );
    }
  },
);

export const initializeAuthThunk = createAsyncThunk(
  'auth/initialize',
  async (_, { rejectWithValue }) => {
    try {
      const token = await tokenStorage.getAccessToken();
      if (!token) return null;
      const user = await authApi.getMe();
      return user;
    } catch {
      await tokenStorage.clear();
      return null;
    }
  },
);

export const logoutThunk = createAsyncThunk('auth/logout', async () => {
  try {
    await authApi.logout();
  } catch {
    await tokenStorage.clear();
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
  },
  extraReducers: (builder) => {
    // Login
    builder
      .addCase(loginThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Register
    builder
      .addCase(registerThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(registerThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Initialize
    builder
      .addCase(initializeAuthThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(initializeAuthThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isInitialized = true;
        if (action.payload) {
          state.user = action.payload;
          state.isAuthenticated = true;
        }
      })
      .addCase(initializeAuthThunk.rejected, (state) => {
        state.isLoading = false;
        state.isInitialized = true;
      });

    // Logout
    builder.addCase(logoutThunk.fulfilled, (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
    });
  },
});

export const { clearError, updateUser } = authSlice.actions;
export default authSlice.reducer;