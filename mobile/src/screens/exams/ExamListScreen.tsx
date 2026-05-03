import React, { useState, useEffect, useMemo } from 'react';
import {
  View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { examsApi } from '../../services/api';
import { FontSize, FontWeight, Spacing, BorderRadius, Shadow } from '../../constants/theme';
import { useTheme } from '../../contexts/ThemeContext';
import type { AppColors } from '../../contexts/ThemeContext';

const TABS = ['Tümü', 'Deneme', 'Konu', 'Yıllık'];

const makeStyles = (colors: AppColors) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background },
    header: { paddingHorizontal: Spacing.xl, paddingVertical: Spacing.lg },
    title: { fontSize: FontSize.xl, fontWeight: FontWeight.bold, color: colors.textPrimary },
    tabRow: { flexDirection: 'row', paddingHorizontal: Spacing.xl, marginBottom: Spacing.md, gap: Spacing.sm },
    tab: {
      paddingHorizontal: Spacing.md, paddingVertical: Spacing.sm,
      borderRadius: BorderRadius.full, borderWidth: 1.5, borderColor: colors.border,
      backgroundColor: colors.surface,
    },
    tabActive: { backgroundColor: colors.primary, borderColor: colors.primary },
    tabText: { fontSize: FontSize.sm, fontWeight: FontWeight.medium, color: colors.textSecondary },
    tabTextActive: { color: '#FFFFFF' },
    loader: { flex: 1, marginTop: Spacing.huge },
    listContent: { paddingHorizontal: Spacing.xl, paddingBottom: 100 },
    empty: { alignItems: 'center' as const, paddingTop: 60 },
    emptyIcon: { fontSize: 48, marginBottom: Spacing.md },
    emptyText: { fontSize: FontSize.base, color: colors.textSecondary },
    examCard: {
      backgroundColor: colors.surface, borderRadius: BorderRadius.lg,
      padding: Spacing.lg, marginBottom: Spacing.md, ...Shadow.sm,
      borderWidth: 1, borderColor: colors.border,
    },
    examTop: { flexDirection: 'row' as const, alignItems: 'flex-start' as const, marginBottom: Spacing.md },
    examInfo: { flex: 1 },
    examTitle: { fontSize: FontSize.base, fontWeight: FontWeight.semibold, color: colors.textPrimary, marginBottom: 4 },
    examMeta: { fontSize: FontSize.xs, color: colors.textSecondary },
    premiumBadge: {
      backgroundColor: colors.warningBg, borderRadius: BorderRadius.sm,
      paddingHorizontal: Spacing.sm, paddingVertical: 2,
    },
    premiumText: { fontSize: FontSize.xs, fontWeight: FontWeight.semibold, color: colors.warning },
    examBottom: { flexDirection: 'row' as const, alignItems: 'center' as const, gap: Spacing.md },
    diffBadge: { borderRadius: BorderRadius.sm, paddingHorizontal: Spacing.sm, paddingVertical: 2 },
    diffText: { fontSize: FontSize.xs, fontWeight: FontWeight.semibold },
    attemptText: { flex: 1, fontSize: FontSize.xs, color: colors.textSecondary },
    startBtn: { fontSize: FontSize.sm, fontWeight: FontWeight.semibold, color: colors.primary },
  });

const ExamListScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const { colors } = useTheme();
  const styles = useMemo(() => makeStyles(colors), [colors]);

  const [exams, setExams] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => { loadExams(); }, [activeTab]);

  const loadExams = async () => {
    setLoading(true);
    try {
      const data = await examsApi.getMockExams();
      setExams(Array.isArray(data) ? data : []);
    } catch {
      setExams([]);
    } finally {
      setLoading(false);
    }
  };

  const getDiffColor = (d: string) =>
    d === 'easy' ? colors.success : d === 'medium' ? colors.warning : colors.error;
  const getDiffLabel = (d: string) =>
    d === 'easy' ? 'Kolay' : d === 'medium' ? 'Orta' : 'Zor';

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>📋 Sınavlar</Text>
      </View>
      <View style={styles.tabRow}>
        {TABS.map((tab, idx) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === idx && styles.tabActive]}
            onPress={() => setActiveTab(idx)}
          >
            <Text style={[styles.tabText, activeTab === idx && styles.tabTextActive]}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {loading ? (
        <ActivityIndicator style={styles.loader} color={colors.primary} size="large" />
      ) : (
        <FlatList
          data={exams}
          keyExtractor={(item) => String(item.id)}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.empty}>
              <Text style={styles.emptyIcon}>📭</Text>
              <Text style={styles.emptyText}>Sınav bulunamadı</Text>
            </View>
          }
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.examCard}
              onPress={() => navigation.navigate('ExamDetail', { examId: item.id })}
            >
              <View style={styles.examTop}>
                <View style={styles.examInfo}>
                  <Text style={styles.examTitle}>{item.title}</Text>
                  <Text style={styles.examMeta}>{item.questionCount} soru • {item.durationMinutes} dk</Text>
                </View>
                {item.isPremium && (
                  <View style={styles.premiumBadge}>
                    <Text style={styles.premiumText}>👑 Premium</Text>
                  </View>
                )}
              </View>
              <View style={styles.examBottom}>
                <View style={[styles.diffBadge, { backgroundColor: getDiffColor(item.difficulty) + '20' }]}>
                  <Text style={[styles.diffText, { color: getDiffColor(item.difficulty) }]}>
                    {getDiffLabel(item.difficulty)}
                  </Text>
                </View>
                {item.userAttempts > 0 && (
                  <Text style={styles.attemptText}>Son: %{Math.round(item.lastScore || 0)} • {item.userAttempts} deneme</Text>
                )}
                <Text style={styles.startBtn}>Başla →</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </SafeAreaView>
  );
};

export default ExamListScreen;