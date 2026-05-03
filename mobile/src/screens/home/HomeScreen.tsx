import React, { useEffect, useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from '../../store';
import { fetchUserStats, fetchWeakTopics } from '../../store/slices/userSlice';
import { FontSize, FontWeight, Spacing, BorderRadius, Shadow } from '../../constants/theme';
import { useTheme } from '../../contexts/ThemeContext';

const quickTests = [
  { label: 'Türkçe', icon: '📝', subjectId: 1 },
  { label: 'Matematik', icon: '🔢', subjectId: 2 },
  { label: 'Tarih', icon: '🏛️', subjectId: 3 },
  { label: 'Coğrafya', icon: '🗺️', subjectId: 4 },
];

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const dispatch = useAppDispatch();
  const { colors } = useTheme();
  const { user } = useAppSelector((s) => s.auth);
  const { stats, weakTopics, studyPlan } = useAppSelector((s) => s.user);
  const [refreshing, setRefreshing] = React.useState(false);

  const styles = useMemo(() => makeStyles(colors), [colors]);

  useEffect(() => {
    dispatch(fetchUserStats());
    dispatch(fetchWeakTopics());
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await Promise.all([dispatch(fetchUserStats()), dispatch(fetchWeakTopics())]);
    setRefreshing(false);
  };

  const daysToExam = user?.targetExamDate
    ? Math.max(0, Math.ceil((new Date(user.targetExamDate).getTime() - Date.now()) / 86400000))
    : null;

  const todayGoal = studyPlan?.dailyGoalMinutes || 60;
  const todayProgress = studyPlan?.todayProgress || 0;
  const progressPercent = Math.min(100, Math.round((todayProgress / todayGoal) * 100));

  const startQuickTest = (subjectId: number) => {
    navigation.navigate('QuestionsTab', {
      screen: 'QuestionSolve',
      params: { filter: { subjectId } },
    });
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.primary} />
        }
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>
              Merhaba, {user?.fullName?.split(' ')[0] || 'Aday'}! 👋
            </Text>
            {daysToExam !== null && (
              <Text style={styles.examCountdown}>
                Sınava <Text style={styles.countdownNumber}>{daysToExam}</Text> gün kaldı
              </Text>
            )}
          </View>
          <TouchableOpacity style={styles.notifButton}>
            <Text style={styles.notifIcon}>🔔</Text>
          </TouchableOpacity>
        </View>

        {/* Stats Row */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{stats?.totalQuestions || 0}</Text>
            <Text style={styles.statLabel}>Çözülen Soru</Text>
          </View>
          <View style={[styles.statCard, styles.statCardMiddle]}>
            <Text style={[styles.statValue, { color: colors.success }]}>
              {stats ? Math.round(stats.accuracy) : 0}%
            </Text>
            <Text style={styles.statLabel}>Doğruluk</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={[styles.statValue, { color: colors.streak }]}>
              🔥 {stats?.currentStreak || 0}
            </Text>
            <Text style={styles.statLabel}>Günlük Seri</Text>
          </View>
        </View>

        {/* Daily Goal */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>📊 Günlük Hedef</Text>
            <Text style={styles.sectionSub}>{todayProgress}/{todayGoal} dk</Text>
          </View>
          <View style={styles.progressBarBg}>
            <View style={[styles.progressBarFill, { width: `${progressPercent}%` }]} />
          </View>
          <Text style={styles.progressLabel}>{progressPercent}% tamamlandı</Text>
        </View>

        {/* Quick Test */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>⚡ Hızlı Test Başlat</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.quickTestRow}
          >
            {quickTests.map((qt) => (
              <TouchableOpacity
                key={qt.subjectId}
                style={styles.quickTestChip}
                onPress={() => startQuickTest(qt.subjectId)}
              >
                <Text style={styles.quickTestIcon}>{qt.icon}</Text>
                <Text style={styles.quickTestLabel}>{qt.label}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              style={[styles.quickTestChip, styles.quickTestMore]}
              onPress={() => navigation.navigate('QuestionsTab')}
            >
              <Text style={styles.quickTestIcon}>➕</Text>
              <Text style={styles.quickTestLabel}>Diğer</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* XP & Level */}
        <View style={styles.xpCard}>
          <View>
            <Text style={styles.xpLevel}>Seviye {user?.level || 1}</Text>
            <Text style={styles.xpValue}>⭐ {user?.xp || 0} XP</Text>
          </View>
          <TouchableOpacity style={styles.xpButton}>
            <Text style={styles.xpButtonText}>Rozetlerim →</Text>
          </TouchableOpacity>
        </View>

        {/* Weak Topics */}
        {weakTopics.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>⚠️ Çalışman Gereken Konular</Text>
            {weakTopics.slice(0, 3).map((topic) => (
              <TouchableOpacity key={topic.topicId} style={styles.weakTopicRow}>
                <View style={styles.weakTopicInfo}>
                  <Text style={styles.weakTopicName}>{topic.topicName}</Text>
                  <Text style={styles.weakTopicSubject}>{topic.subjectName}</Text>
                </View>
                <Text
                  style={[
                    styles.weakTopicPercent,
                    { color: topic.accuracy < 40 ? colors.error : colors.warning },
                  ]}
                >
                  %{Math.round(topic.accuracy)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Exam CTA */}
        <TouchableOpacity
          style={styles.examCTA}
          onPress={() => navigation.navigate('ExamsTab')}
        >
          <Text style={styles.examCTAIcon}>📋</Text>
          <View style={styles.examCTAText}>
            <Text style={styles.examCTATitle}>Deneme Sınavı Çöz</Text>
            <Text style={styles.examCTASub}>Gerçek sınav formatında pratik yap</Text>
          </View>
          <Text style={styles.examCTAArrow}>→</Text>
        </TouchableOpacity>

        <View style={{ height: Spacing.xxxl }} />
      </ScrollView>
    </SafeAreaView>
  );
};

// ─── Dynamic Styles ───────────────────────────────────────────────────────────

function makeStyles(c: ReturnType<typeof import('../../contexts/ThemeContext').useTheme>['colors']) {
  return StyleSheet.create({
    container: { flex: 1, backgroundColor: c.background },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      paddingHorizontal: Spacing.xl,
      paddingTop: Spacing.lg,
      paddingBottom: Spacing.md,
    },
    greeting: { fontSize: FontSize.xl, fontWeight: FontWeight.bold, color: c.textPrimary },
    examCountdown: { fontSize: FontSize.sm, color: c.textSecondary, marginTop: 2 },
    countdownNumber: { color: c.primary, fontWeight: FontWeight.bold },
    notifButton: {
      width: 44,
      height: 44,
      borderRadius: BorderRadius.full,
      backgroundColor: c.surface,
      alignItems: 'center',
      justifyContent: 'center',
      ...Shadow.sm,
    },
    notifIcon: { fontSize: 20 },

    statsRow: {
      flexDirection: 'row',
      paddingHorizontal: Spacing.xl,
      gap: Spacing.md,
      marginBottom: Spacing.xl,
    },
    statCard: {
      flex: 1,
      backgroundColor: c.surface,
      borderRadius: BorderRadius.lg,
      padding: Spacing.md,
      alignItems: 'center',
      ...Shadow.sm,
    },
    statCardMiddle: { borderWidth: 1.5, borderColor: c.primary + '30' },
    statValue: { fontSize: FontSize.xl, fontWeight: FontWeight.bold, color: c.textPrimary },
    statLabel: { fontSize: FontSize.xs, color: c.textSecondary, marginTop: 2 },

    section: { paddingHorizontal: Spacing.xl, marginBottom: Spacing.xl },
    sectionHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: Spacing.md,
    },
    sectionTitle: {
      fontSize: FontSize.base,
      fontWeight: FontWeight.semibold,
      color: c.textPrimary,
      marginBottom: Spacing.md,
    },
    sectionSub: { fontSize: FontSize.sm, color: c.textSecondary },

    progressBarBg: {
      height: 10,
      backgroundColor: c.border,
      borderRadius: BorderRadius.full,
      overflow: 'hidden',
    },
    progressBarFill: {
      height: '100%',
      backgroundColor: c.primary,
      borderRadius: BorderRadius.full,
    },
    progressLabel: { fontSize: FontSize.xs, color: c.textSecondary, marginTop: Spacing.sm },

    quickTestRow: { marginHorizontal: -Spacing.xl, paddingHorizontal: Spacing.xl },
    quickTestChip: {
      backgroundColor: c.surface,
      borderRadius: BorderRadius.lg,
      paddingHorizontal: Spacing.lg,
      paddingVertical: Spacing.md,
      alignItems: 'center',
      marginRight: Spacing.md,
      minWidth: 80,
      ...Shadow.sm,
    },
    quickTestMore: { borderWidth: 1.5, borderColor: c.border },
    quickTestIcon: { fontSize: 24, marginBottom: Spacing.xs },
    quickTestLabel: {
      fontSize: FontSize.xs,
      fontWeight: FontWeight.medium,
      color: c.textPrimary,
    },

    xpCard: {
      marginHorizontal: Spacing.xl,
      marginBottom: Spacing.xl,
      backgroundColor: c.primary,
      borderRadius: BorderRadius.lg,
      padding: Spacing.lg,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    xpLevel: {
      fontSize: FontSize.sm,
      color: 'rgba(255,255,255,0.8)',
      fontWeight: FontWeight.medium,
    },
    xpValue: { fontSize: FontSize.xl, fontWeight: FontWeight.bold, color: '#FFFFFF' },
    xpButton: {
      backgroundColor: 'rgba(255,255,255,0.2)',
      borderRadius: BorderRadius.md,
      paddingHorizontal: Spacing.md,
      paddingVertical: Spacing.sm,
    },
    xpButtonText: { color: '#FFFFFF', fontSize: FontSize.sm, fontWeight: FontWeight.semibold },

    weakTopicRow: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: c.surface,
      borderRadius: BorderRadius.md,
      padding: Spacing.md,
      marginBottom: Spacing.sm,
      ...Shadow.sm,
    },
    weakTopicInfo: { flex: 1 },
    weakTopicName: {
      fontSize: FontSize.sm,
      fontWeight: FontWeight.semibold,
      color: c.textPrimary,
    },
    weakTopicSubject: { fontSize: FontSize.xs, color: c.textSecondary, marginTop: 2 },
    weakTopicPercent: { fontSize: FontSize.base, fontWeight: FontWeight.bold },

    examCTA: {
      marginHorizontal: Spacing.xl,
      backgroundColor: c.surface,
      borderRadius: BorderRadius.lg,
      padding: Spacing.lg,
      flexDirection: 'row',
      alignItems: 'center',
      ...Shadow.md,
      borderLeftWidth: 4,
      borderLeftColor: c.primary,
    },
    examCTAIcon: { fontSize: 28, marginRight: Spacing.md },
    examCTAText: { flex: 1 },
    examCTATitle: {
      fontSize: FontSize.base,
      fontWeight: FontWeight.semibold,
      color: c.textPrimary,
    },
    examCTASub: { fontSize: FontSize.xs, color: c.textSecondary, marginTop: 2 },
    examCTAArrow: { fontSize: FontSize.xl, color: c.primary, fontWeight: FontWeight.bold },
  });
}

export default HomeScreen;