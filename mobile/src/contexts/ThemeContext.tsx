import React, { createContext, useContext, useMemo } from 'react';
import { useAppSelector } from '../store';

// ─── Color Palettes ───────────────────────────────────────────────────────────

const lightColors = {
  primary: '#1E3A8A',
  primaryLight: '#3B5FC0',
  primaryDark: '#152A6E',
  accent: '#DC2626',
  accentLight: '#EF4444',
  success: '#16A34A',
  successLight: '#22C55E',
  successBg: '#F0FDF4',
  warning: '#CA8A04',
  warningLight: '#EAB308',
  warningBg: '#FEFCE8',
  error: '#DC2626',
  errorLight: '#EF4444',
  errorBg: '#FEF2F2',
  background: '#F8FAFC',
  surface: '#FFFFFF',
  surfaceSecondary: '#F1F5F9',
  border: '#E2E8F0',
  borderLight: '#F1F5F9',
  textPrimary: '#0F172A',
  textSecondary: '#64748B',
  textTertiary: '#94A3B8',
  textInverse: '#FFFFFF',
  xp: '#F59E0B',
  streak: '#F97316',
  badge: '#8B5CF6',
  easy: '#16A34A',
  medium: '#CA8A04',
  hard: '#DC2626',
  veryHard: '#7C3AED',
  overlay: 'rgba(0,0,0,0.5)',
  overlayLight: 'rgba(0,0,0,0.2)',
  statusBar: 'dark' as const,
};

const darkColors = {
  primary: '#3B82F6',
  primaryLight: '#60A5FA',
  primaryDark: '#1D4ED8',
  accent: '#F87171',
  accentLight: '#FCA5A5',
  success: '#22C55E',
  successLight: '#4ADE80',
  successBg: '#052E16',
  warning: '#EAB308',
  warningLight: '#FDE047',
  warningBg: '#1C1400',
  error: '#F87171',
  errorLight: '#FCA5A5',
  errorBg: '#2D0A0A',
  background: '#0F172A',
  surface: '#1E293B',
  surfaceSecondary: '#334155',
  border: '#334155',
  borderLight: '#1E293B',
  textPrimary: '#F1F5F9',
  textSecondary: '#94A3B8',
  textTertiary: '#64748B',
  textInverse: '#0F172A',
  xp: '#FCD34D',
  streak: '#FB923C',
  badge: '#A78BFA',
  easy: '#22C55E',
  medium: '#EAB308',
  hard: '#F87171',
  veryHard: '#A78BFA',
  overlay: 'rgba(0,0,0,0.7)',
  overlayLight: 'rgba(0,0,0,0.4)',
  statusBar: 'light' as const,
};

export type AppColors = Omit<typeof lightColors, 'statusBar'> & {
  statusBar: 'dark' | 'light';
};

// ─── Context ──────────────────────────────────────────────────────────────────

interface ThemeContextValue {
  colors: AppColors;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextValue>({
  colors: lightColors,
  isDark: false,
});

// ─── Provider ─────────────────────────────────────────────────────────────────

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const isDark = useAppSelector((s) => s.ui.isDarkMode);

  const value = useMemo<ThemeContextValue>(
    () => ({ colors: isDark ? darkColors : lightColors, isDark }),
    [isDark],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useTheme(): ThemeContextValue {
  return useContext(ThemeContext);
}

export { lightColors, darkColors };