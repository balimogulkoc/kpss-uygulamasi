import React, { useState, useEffect, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { questionsApi } from '../../services/api';
import { FontSize, FontWeight, Spacing, BorderRadius, Shadow } from '../../constants/theme';
import { useTheme } from '../../contexts/ThemeContext';
import type { AppColors } from '../../contexts/ThemeContext';

const SUBJECTS = [
  { id: 0, label: 'Tümü', icon: '📋' },
  { id: 1, label: 'Türkçe', icon: '📚' },
  { id: 2, label: 'Matematik', icon: '🔢' },
  { id: 3, label: 'Tarih', icon: '🏛️' },
  { id: 4, label: 'Coğrafya', icon: '🌍' },
  { id: 5, label: 'Vatandaşlık', icon: '⚖️' },
  { id: 6, label: 'Genel Kültür', icon: '🌟' },
];

const makeStyles = (colors: AppColors) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background },

    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: Spacing.xl,
      paddingTop: Spacing.md,
      paddingBottom: Spacing.sm,
    },
    title: {
      fontSize: FontSize.xl,
      fontWeight: FontWeight.bold,
      color: colors.textPrimary,
    },
    randomBtn: {
      backgroundColor: colors.primary + '18',
      borderRadius: BorderRadius.full,
      paddingHorizontal: Spacing.md,
      paddingVertical: Spacing.xs,
    },
    randomBtnText: {
      fontSize: FontSize.sm,
      fontWeight: FontWeight.semibold,
      color: colors.primary,
    },

    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.surface,
      borderRadius: BorderRadius.md,
      marginHorizontal: Spacing.xl,
      marginBottom: Spacing.sm,
      paddingHorizontal: Spacing.md,
      borderWidth: 1,
      borderColor: colors.border,
      height: 44,
    },
    searchIcon: { fontSize: 16, marginRight: Spacing.sm },
    searchInput: {
      flex: 1,
      fontSize: FontSize.base,
      color: colors.textPrimary,
    },

    filterScroll: { maxHeight: 52, marginBottom: Spacing.sm },
    filterRow: {
      paddingHorizontal: Spacing.xl,
      paddingVertical: Spacing.xs,
      gap: Spacing.sm,
      alignItems: 'center' as const,
    },
    filterChip: {
      flexDirection: 'row' as const,
      alignItems: 'center' as const,
      paddingHorizontal: Spacing.md,
      paddingVertical: 6,
      borderRadius: BorderRadius.full,
      borderWidth: 1.5,
      borderColor: colors.border,
      backgroundColor: colors.surface,
      gap: 4,
    },
    filterChipActive: {
      borderColor: colors.primary,
      backgroundColor: colors.primary,
    },
    filterChipIcon: { fontSize: 14 },
    filterChipText: {
      fontSize: FontSize.sm,
      fontWeight: FontWeight.medium,
      color: colors.textSecondary,
    },
    filterChipTextActive: { color: '#FFFFFF' },

    loaderContainer: {
      flex: 1,
      alignItems: 'center' as const,
      justifyContent: 'center' as const,
      gap: Spacing.md,
    },
    loaderText: {
      fontSize: FontSize.sm,
      color: colors.textSecondary,
    },

    listContent: {
      paddingHorizontal: Spacing.xl,
      paddingTop: Spacing.sm,
      paddingBottom: 100,
    },
    empty: { alignItems: 'center' as const, paddingTop: 60 },
    emptyIcon: { fontSize: 52, marginBottom: Spacing.md },
    emptyText: {
      fontSize: FontSize.lg,
      fontWeight: FontWeight.semibold,
      color: colors.textPrimary,
      marginBottom: Spacing.xs,
    },
    emptySubText: {
      fontSize: FontSize.sm,
      color: colors.textSecondary,
      textAlign: 'center' as const,
    },

    topicCard: {
      flexDirection: 'row' as const,
      alignItems: 'center' as const,
      backgroundColor: colors.surface,
      borderRadius: BorderRadius.lg,
      padding: Spacing.md,
      marginBottom: Spacing.sm,
      ...Shadow.sm,
      borderWidth: 1,
      borderColor: colors.border,
    },
    topicIconContainer: {
      width: 40,
      height: 40,
      borderRadius: BorderRadius.md,
      backgroundColor: colors.primary + '15',
      alignItems: 'center' as const,
      justifyContent: 'center' as const,
      marginRight: Spacing.md,
    },
    topicIcon: { fontSize: 20 },
    topicLeft: { flex: 1 },
    topicName: {
      fontSize: FontSize.base,
      fontWeight: FontWeight.semibold,
      color: colors.textPrimary,
      marginBottom: 2,
    },
    topicMeta: {
      fontSize: FontSize.xs,
      color: colors.textSecondary,
    },
    topicRight: {
      flexDirection: 'row' as const,
      alignItems: 'center' as const,
      gap: Spacing.sm,
    },
    accuracyBadge: {
      borderRadius: BorderRadius.sm,
      paddingHorizontal: Spacing.sm,
      paddingVertical: 2,
    },
    accuracyText: {
      fontSize: FontSize.xs,
      fontWeight: FontWeight.bold,
    },
    arrowContainer: {
      width: 24,
      alignItems: 'center' as const,
      justifyContent: 'center' as const,
    },
    arrow: {
      fontSize: 22,
      color: colors.textTertiary,
      lineHeight: 26,
    },
  });

const QuestionBankScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const { colors } = useTheme();
  const styles = useMemo(() => makeStyles(colors), [colors]);

  const [topics, setTopics] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSubject, setSelectedSubject] = useState(0);
  const [search, setSearch] = useState('');

  useEffect(() => {
    loadTopics();
  }, [selectedSubject]);

  const loadTopics = async () => {
    setLoading(true);
    try {
      const data = await questionsApi.getTopics(selectedSubject || undefined);
      setTopics(Array.isArray(data) ? data : []);
    } catch (e) {
      setTopics([]);
    } finally {
      setLoading(false);
    }
  };

  const filtered = topics.filter((t) =>
    t.name?.toLowerCase().includes(search.toLowerCase()),
  );

  const openTopicDetail = (item: any) => {
    const subjectName = SUBJECTS.find((s) => s.id === item.subjectId)?.label ?? 'Konu';
    navigation.navigate('TopicDetail', {
      topicId: item.id,
      topicName: item.name,
      subjectName,
    });
  };

  const startQuickTest = (topicId?: number) => {
    navigation.navigate('QuestionSolve', {
      filter: { topicId, subjectId: selectedSubject || undefined },
    });
  };

  const getQuestionCount = (item: any) => {
    if (item._count?.questions != null) return item._count.questions;
    if (item.questionCount != null) return item.questionCount;
    return 0;
  };

  const getAccuracyColors = (accuracy: number) => {
    if (accuracy >= 70) return { bg: colors.successBg, text: colors.success };
    if (accuracy >= 40) return { bg: colors.warningBg, text: colors.warning };
    return { bg: colors.errorBg, text: colors.error };
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>📚 Soru Bankası</Text>
        <TouchableOpacity style={styles.randomBtn} onPress={() => startQuickTest()}>
          <Text style={styles.randomBtnText}>🎲 Rastgele</Text>
        </TouchableOpacity>
      </View>

      {/* Search */}
      <View style={styles.searchContainer}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Konu ara..."
          placeholderTextColor={colors.textTertiary}
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {/* Subject Filter */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filterRow}
        style={styles.filterScroll}
      >
        {SUBJECTS.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={[
              styles.filterChip,
              selectedSubject === item.id && styles.filterChipActive,
            ]}
            onPress={() => setSelectedSubject(item.id)}
          >
            <Text style={styles.filterChipIcon}>{item.icon}</Text>
            <Text
              style={[
                styles.filterChipText,
                selectedSubject === item.id && styles.filterChipTextActive,
              ]}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Topics List */}
      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator color={colors.primary} size="large" />
          <Text style={styles.loaderText}>Konular yükleniyor...</Text>
        </View>
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={(item) => String(item.id)}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.empty}>
              <Text style={styles.emptyIcon}>📭</Text>
              <Text style={styles.emptyText}>Konu bulunamadı</Text>
              <Text style={styles.emptySubText}>
                {selectedSubject === 0
                  ? 'Henüz konu eklenmemiş.'
                  : 'Bu derse ait konu bulunamadı.'}
              </Text>
            </View>
          }
          renderItem={({ item }) => {
            const count = getQuestionCount(item);
            const accColors = item.userAccuracy != null
              ? getAccuracyColors(item.userAccuracy)
              : null;
            return (
              <TouchableOpacity
                style={styles.topicCard}
                onPress={() => openTopicDetail(item)}
                onLongPress={() => startQuickTest(item.id)}
                activeOpacity={0.7}
              >
                <View style={styles.topicIconContainer}>
                  <Text style={styles.topicIcon}>📖</Text>
                </View>
                <View style={styles.topicLeft}>
                  <Text style={styles.topicName}>{item.name}</Text>
                  <Text style={styles.topicMeta}>
                    {count} soru
                    {item.userAccuracy != null
                      ? ` • %${Math.round(item.userAccuracy)} doğru`
                      : ''}
                  </Text>
                </View>
                <View style={styles.topicRight}>
                  {accColors && (
                    <View style={[styles.accuracyBadge, { backgroundColor: accColors.bg }]}>
                      <Text style={[styles.accuracyText, { color: accColors.text }]}>
                        %{Math.round(item.userAccuracy)}
                      </Text>
                    </View>
                  )}
                  <View style={styles.arrowContainer}>
                    <Text style={styles.arrow}>›</Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      )}
    </SafeAreaView>
  );
};

export default QuestionBankScreen;