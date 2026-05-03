import React, { useEffect, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppDispatch, useAppSelector } from '../../store';
import { fetchUserStats, fetchWeakTopics } from '../../store/slices/userSlice';
import { FontSize, FontWeight, Spacing, BorderRadius, Shadow } from '../../constants/theme';
import { useTheme } from '../../contexts/ThemeContext';
import type { AppColors } from '../../contexts/ThemeContext';

const SUBJECT_STATS = [
  { name: 'Türkçe', icon: '📝', correct: 142, total: 180 },
  { name: 'Matematik', icon: '🔢', correct: 98, total: 160 },
  { name: 'Tarih', icon: '🏛️', correct: 76, total: 120 },
  { name: 'Coğrafya', icon: '🗺️', correct: 54, total: 90 },
  { name: 'Vatandaşlık', icon: '⚖️', correct: 62, total: 80 },
];

const makeStyles = (colors: AppColors) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background },
    header: { paddingHorizontal: Spacing.xl, paddingVertical: Spacing.lg },
    title: { fontSize: FontSize.xl, fontWeight: FontWeight.bold, color: colors.textPrimary },

    overallCard: {
      marginHorizontal: Spacing.xl, marginBottom: Spacing.xl,
      backgroundColor: colors.surface, borderRadius: BorderRadius.xl,
      padding: Spacing.xl, ...Shadow.md,
      flexDirection: 'row' as const, alignItems: 'center' as const, gap: Spacing.xl,
    },
    accuracyCircle: {
      width: 90, height: 90, borderRadius: 45,
      borderWidth: 4, borderColor: colors.primary + '30',
      alignItems: 'center' as const, justifyContent: 'center' as const,
      backgroundColor: colors.background,
    },
    accuracyValue: { fontSize: FontSize.xl, fontWeight: FontWeight.extrabold },
    accuracyLabel: { fontSize: FontSize.xs, color: colors.textSecondary, textAlign: 'center' as const },
    overallStats: { flex: 1, gap: Spacing.md },
    overallStat: { alignItems: 'center' as const },
    overallStatValue: { fontSize: FontSize.xl, fontWeight: FontWeight.bold, color: colors.textPrimary },
    overallStatLabel: { fontSize: FontSize.xs, color: colors.textSecondary },

    streakRow: {
      flexDirection: 'row' as const, paddingHorizontal: Spacing.xl,
      marginBottom: Spacing.xl, gap: Spacing.md,
    },
    streakCard: {
      flex: 1, borderRadius: BorderRadius.lg, padding: Spacing.md,
      alignItems: 'center' as const, ...Shadow.sm,
    },
    streakIcon: { fontSize: 24, marginBottom: 4 },
    streakValue: { fontSize: FontSize.xl, fontWeight: FontWeight.bold, color: colors.textPrimary },
    streakLabel: { fontSize: FontSize.xs, color: colors.textSecondary, textAlign: 'center' as const },

    section: { paddingHorizontal: Spacing.xl, marginBottom: Spacing.xl },
    sectionTitle: { fontSize: FontSize.base, fontWeight: FontWeight.semibold, color: colors.textPrimary, marginBottom: Spacing.md },

    subjectRow: {
      flexDirection: 'row' as const, alignItems: 'center' as const,
      backgroundColor: colors.surface, borderRadius: BorderRadius.lg,
      padding: Spacing.md, marginBottom: Spacing.sm, ...Shadow.sm,
    },
    subjectIcon: { fontSize: 24, marginRight: Spacing.md },
    subjectInfo: { flex: 1 },
    subjectHeader: { flexDirection: 'row' as const, justifyContent: 'space-between' as const, marginBottom: 6 },
    subjectName: { fontSize: FontSize.sm, fontWeight: FontWeight.semibold, color: colors.textPrimary },
    subjectPct: { fontSize: FontSize.sm, fontWeight: FontWeight.bold },
    barBg: { height: 6, backgroundColor: colors.border, borderRadius: BorderRadius.full, overflow: 'hidden' as const, marginBottom: 4 },
    barFill: { height: '100%' as const, borderRadius: BorderRadius.full },
    subjectDetail: { fontSize: FontSize.xs, color: colors.textTertiary },

    weakRow: {
      flexDirection: 'row' as const, alignItems: 'center' as const,
      backgroundColor: colors.surface, borderRadius: BorderRadius.md,
      padding: Spacing.md, marginBottom: Spacing.sm, ...Shadow.sm,
    },
    weakInfo: { flex: 1 },
    weakName: { fontSize: FontSize.sm, fontWeight: FontWeight.semibold, color: colors.textPrimary },
    weakSubject: { fontSize: FontSize.xs, color: colors.textSecondary, marginTop: 2 },
    weakBadge: { borderRadius: BorderRadius.sm, paddingHorizontal: Spacing.sm, paddingVertical: 4 },
    weakPct: { fontSize: FontSize.sm, fontWeight: FontWeight.bold },

    timeCard: {
      backgroundColor: colors.surface, borderRadius: BorderRadius.lg,
      padding: Spacing.lg, flexDirection: 'row' as const, alignItems: 'center' as const, ...Shadow.sm,
    },
    timeStat: { flex: 1, alignItems: 'center' as const },
    timeValue: { fontSize: FontSize.xl, fontWeight: FontWeight.bold, color: colors.textPrimary },
    timeLabel: { fontSize: FontSize.xs, color: colors.textSecondary, marginTop: 2 },
    timeDivider: { width: 1, height: 40, backgroundColor: colors.border },
  });

const AnalyticsScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const { stats, weakTopics } = useAppSelector((s) => s.user);
  const { colors, isDark } = useTheme();
  const styles = useMemo(() => makeStyles(colors), [colors]);

  useEffect(() => {
    dispatch(fetchUserStats());
    dispatch(fetchWeakTopics());
  }, []);

  const accuracy = stats ? Math.round(stats.accuracy) : 0;
  const accuracyColor = accuracy >= 70 ? colors.success : accuracy >= 50 ? colors.warning : colors.error;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>📊 Performans Analizi</Text>
        </View>

        {/* Overall Stats */}
        <View style={styles.overallCard}>
          <View style={styles.accuracyCircle}>
            <Text style={[styles.accuracyValue, { color: accuracyColor }]}>{accuracy}%</Text>
            <Text style={styles.accuracyLabel}>Genel Doğruluk</Text>
          </View>
          <View style={styles.overallStats}>
            <View style={styles.overallStat}>
              <Text style={styles.overallStatValue}>{stats?.totalQuestions || 0}</Text>
              <Text style={styles.overallStatLabel}>Toplam Soru</Text>
            </View>
            <View style={styles.overallStat}>
              <Text style={[styles.overallStatValue, { color: colors.success }]}>{stats?.correctAnswers || 0}</Text>
              <Text style={styles.overallStatLabel}>Doğru</Text>
            </View>
            <View style={styles.overallStat}>
              <Text style={[styles.overallStatValue, { color: colors.error }]}>{stats?.wrongAnswers || 0}</Text>
              <Text style={styles.overallStatLabel}>Yanlış</Text>
            </View>
          </View>
        </View>

        {/* Streak & XP */}
        <View style={styles.streakRow}>
          <View style={[styles.streakCard, { backgroundColor: isDark ? '#3D2800' : '#FFF3E0' }]}>
            <Text style={styles.streakIcon}>🔥</Text>
            <Text style={styles.streakValue}>{stats?.currentStreak || 0}</Text>
            <Text style={styles.streakLabel}>Günlük Seri</Text>
          </View>
          <View style={[styles.streakCard, { backgroundColor: isDark ? '#003D1A' : '#E8F5E9' }]}>
            <Text style={styles.streakIcon}>⭐</Text>
            <Text style={styles.streakValue}>{stats?.totalXP || 0}</Text>
            <Text style={styles.streakLabel}>Toplam XP</Text>
          </View>
          <View style={[styles.streakCard, { backgroundColor: isDark ? '#00213D' : '#E3F2FD' }]}>
            <Text style={styles.streakIcon}>📅</Text>
            <Text style={styles.streakValue}>{stats?.examsTaken || 0}</Text>
            <Text style={styles.streakLabel}>Sınav Sayısı</Text>
          </View>
        </View>

        {/* Subject Breakdown */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📚 Ders Bazlı Performans</Text>
          {SUBJECT_STATS.map((sub) => {
            const pct = sub.total > 0 ? Math.round((sub.correct / sub.total) * 100) : 0;
            const barColor = pct >= 70 ? colors.success : pct >= 50 ? colors.warning : colors.error;
            return (
              <View key={sub.name} style={styles.subjectRow}>
                <Text style={styles.subjectIcon}>{sub.icon}</Text>
                <View style={styles.subjectInfo}>
                  <View style={styles.subjectHeader}>
                    <Text style={styles.subjectName}>{sub.name}</Text>
                    <Text style={[styles.subjectPct, { color: barColor }]}>{pct}%</Text>
                  </View>
                  <View style={styles.barBg}>
                    <View style={[styles.barFill, { width: `${pct}%` as any, backgroundColor: barColor }]} />
                  </View>
                  <Text style={styles.subjectDetail}>{sub.correct}/{sub.total} doğru</Text>
                </View>
              </View>
            );
          })}
        </View>

        {/* Weak Topics */}
        {weakTopics.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>⚠️ Zayıf Konular</Text>
            {weakTopics.map((topic) => (
              <View key={topic.topicId} style={styles.weakRow}>
                <View style={styles.weakInfo}>
                  <Text style={styles.weakName}>{topic.topicName}</Text>
                  <Text style={styles.weakSubject}>{topic.subjectName}</Text>
                </View>
                <View style={[
                  styles.weakBadge,
                  { backgroundColor: topic.accuracy < 40 ? colors.errorBg : colors.warningBg },
                ]}>
                  <Text style={[
                    styles.weakPct,
                    { color: topic.accuracy < 40 ? colors.error : colors.warning },
                  ]}>%{Math.round(topic.accuracy)}</Text>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Study Time */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>⏱ Çalışma Süresi</Text>
          <View style={styles.timeCard}>
            <View style={styles.timeStat}>
              <Text style={styles.timeValue}>{Math.round((stats?.totalStudyMinutes || 0) / 60)}s</Text>
              <Text style={styles.timeLabel}>Toplam Süre</Text>
            </View>
            <View style={styles.timeDivider} />
            <View style={styles.timeStat}>
              <Text style={styles.timeValue}>{stats ? Math.round(stats.totalStudyMinutes / Math.max(stats.longestStreak, 1)) : 0}dk</Text>
              <Text style={styles.timeLabel}>Günlük Ort.</Text>
            </View>
            <View style={styles.timeDivider} />
            <View style={styles.timeStat}>
              <Text style={styles.timeValue}>{stats?.longestStreak || 0}</Text>
              <Text style={styles.timeLabel}>En Uzun Seri</Text>
            </View>
          </View>
        </View>

        <View style={{ height: Spacing.xxxl }} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default AnalyticsScreen;