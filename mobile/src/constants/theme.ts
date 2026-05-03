export const Colors = {
  // Primary
  primary: '#1E3A8A',
  primaryLight: '#3B5FC0',
  primaryDark: '#152A6E',

  // Accent
  accent: '#DC2626',
  accentLight: '#EF4444',

  // Semantic
  success: '#16A34A',
  successLight: '#22C55E',
  successBg: '#F0FDF4',

  warning: '#CA8A04',
  warningLight: '#EAB308',
  warningBg: '#FEFCE8',

  error: '#DC2626',
  errorLight: '#EF4444',
  errorBg: '#FEF2F2',

  // Neutral - Light Mode
  background: '#F8FAFC',
  surface: '#FFFFFF',
  surfaceSecondary: '#F1F5F9',
  border: '#E2E8F0',
  borderLight: '#F1F5F9',

  // Text - Light Mode
  textPrimary: '#0F172A',
  textSecondary: '#64748B',
  textTertiary: '#94A3B8',
  textInverse: '#FFFFFF',

  // Dark Mode
  dark: {
    background: '#0F172A',
    surface: '#1E293B',
    surfaceSecondary: '#334155',
    border: '#334155',
    textPrimary: '#F1F5F9',
    textSecondary: '#94A3B8',
    textTertiary: '#64748B',
  },

  // Gamification
  xp: '#F59E0B',
  streak: '#F97316',
  badge: '#8B5CF6',

  // Difficulty
  easy: '#16A34A',
  medium: '#CA8A04',
  hard: '#DC2626',
  veryHard: '#7C3AED',

  // Transparent
  overlay: 'rgba(0,0,0,0.5)',
  overlayLight: 'rgba(0,0,0,0.2)',
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  huge: 48,
  giant: 64,
};

export const BorderRadius = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  full: 9999,
};

export const FontSize = {
  xs: 11,
  sm: 13,
  md: 15,
  base: 16,
  lg: 18,
  xl: 20,
  xxl: 22,
  xxxl: 26,
  huge: 30,
  giant: 36,
};

export const FontWeight = {
  regular: '400' as const,
  medium: '500' as const,
  semibold: '600' as const,
  bold: '700' as const,
  extrabold: '800' as const,
};

export const Shadow = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 6,
  },
  xl: {
    shadowColor: '#1E3A8A',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 24,
    elevation: 10,
  },
};

export const SCREEN_PADDING = Spacing.lg;

export const DIFFICULTY_COLORS: Record<string, string> = {
  easy: Colors.easy,
  medium: Colors.medium,
  hard: Colors.hard,
  very_hard: Colors.veryHard,
};

export const DIFFICULTY_LABELS: Record<string, string> = {
  easy: 'Kolay',
  medium: 'Orta',
  hard: 'Zor',
  very_hard: 'Çok Zor',
};

export const EXAM_CATEGORY_COLORS: Record<string, string> = {
  lisans: '#1E3A8A',
  onlisans: '#0891B2',
  ortaogretim: '#059669',
  oabt: '#7C3AED',
  egitim_bilimleri: '#DB2777',
};

export const EXAM_CATEGORY_LABELS: Record<string, string> = {
  lisans: 'KPSS Lisans',
  onlisans: 'KPSS Önlisans',
  ortaogretim: 'KPSS Ortaöğretim',
  oabt: 'ÖABT',
  egitim_bilimleri: 'Eğitim Bilimleri',
};