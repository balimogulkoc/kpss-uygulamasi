import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UIState {
  isDarkMode: boolean;
  isOnline: boolean;
  activeTab: string;
  toastMessage: string | null;
  toastType: 'success' | 'error' | 'info' | 'warning' | null;
}

const initialState: UIState = {
  isDarkMode: false,
  isOnline: true,
  activeTab: 'Home',
  toastMessage: null,
  toastType: null,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.isDarkMode = !state.isDarkMode;
    },
    setDarkMode: (state, action: PayloadAction<boolean>) => {
      state.isDarkMode = action.payload;
    },
    setOnlineStatus: (state, action: PayloadAction<boolean>) => {
      state.isOnline = action.payload;
    },
    setActiveTab: (state, action: PayloadAction<string>) => {
      state.activeTab = action.payload;
    },
    showToast: (state, action: PayloadAction<{
      message: string;
      type: 'success' | 'error' | 'info' | 'warning';
    }>) => {
      state.toastMessage = action.payload.message;
      state.toastType = action.payload.type;
    },
    hideToast: (state) => {
      state.toastMessage = null;
      state.toastType = null;
    },
  },
});

export const {
  toggleDarkMode,
  setDarkMode,
  setOnlineStatus,
  setActiveTab,
  showToast,
  hideToast,
} = uiSlice.actions;

export default uiSlice.reducer;