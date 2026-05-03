import React, { useEffect, useState, useRef, useMemo } from 'react';
import {
  View, Text, ScrollView, StyleSheet, TouchableOpacity,
  ActivityIndicator, Animated,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import api from '../../services/api';
import { FontSize, FontWeight, Spacing, BorderRadius, Shadow } from '../../constants/theme';
import { useTheme } from '../../contexts/ThemeContext';
import type { AppColors } from '../../contexts/ThemeContext';

type RootStackParamList = {
  TopicDetail: { topicId: number; topicName: string; subjectName: string };
  QuestionSolve: { topicId: number; topicName: string };
};

type TopicDetailRouteProp = RouteProp<RootStackParamList, 'TopicDetail'>;
type NavProp = NativeStackNavigationProp<RootStackParamList>;

interface Topic {
  id: number;
  name: string;
  description: string;
  subjectId: number;
  _count?: { questions: number };
}

const makeStyles = (colors: AppColors) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background },
    loadingContainer: {
      flex: 1, justifyContent: 'center' as const, alignItems: 'center' as const,
      backgroundColor: colors.background,
    },
    loadingText: { marginTop: 12, color: colors.textSecondary, fontSize: FontSize.base },

    header: {
      flexDirection: 'row' as const, alignItems: 'center' as const,
      paddingHorizontal: Spacing.lg, paddingTop: 52, paddingBottom: Spacing.md,
      backgroundColor: colors.surface, borderBottomWidth: 1, borderBottomColor: colors.border,
    },
    backBtn: { width: 40, height: 40, justifyContent: 'center' as const, alignItems: 'center' as const },
    headerTitles: { flex: 1, alignItems: 'center' as const },
    headerSubject: { fontSize: FontSize.xs, color: colors.textSecondary, fontWeight: FontWeight.medium },
    headerTopic: { fontSize: FontSize.base, fontWeight: FontWeight.bold, color: colors.textPrimary, marginTop: 2 },

    tabBar: {
      flexDirection: 'row' as const, backgroundColor: colors.surface,
      borderBottomWidth: 1, borderBottomColor: colors.border,
    },
    tab: {
      flex: 1, flexDirection: 'row' as const, alignItems: 'center' as const,
      justifyContent: 'center' as const, paddingVertical: Spacing.md, gap: 6,
      borderBottomWidth: 2, borderBottomColor: 'transparent',
    },
    tabActive: { borderBottomColor: colors.primary },
    tabText: { fontSize: FontSize.sm, color: colors.textSecondary, fontWeight: FontWeight.medium },
    tabTextActive: { color: colors.primary, fontWeight: FontWeight.bold },

    scrollView: { flex: 1 },
    scrollContent: { padding: Spacing.lg },

    infoCard: {
      backgroundColor: colors.surface, borderRadius: BorderRadius.lg,
      padding: Spacing.md, marginBottom: Spacing.md,
      borderWidth: 1, borderColor: colors.border, ...Shadow.sm,
    },
    infoRow: { flexDirection: 'row' as const, gap: Spacing.sm, flexWrap: 'wrap' as const },
    infoBadge: {
      flexDirection: 'row' as const, alignItems: 'center' as const,
      gap: 4, paddingHorizontal: Spacing.md, paddingVertical: 5, borderRadius: BorderRadius.full,
    },
    infoBadgeText: { fontSize: FontSize.sm, fontWeight: FontWeight.semibold },

    contentCard: {
      backgroundColor: colors.surface, borderRadius: BorderRadius.lg,
      padding: Spacing.lg, marginBottom: Spacing.lg,
      borderWidth: 1, borderColor: colors.border, ...Shadow.sm,
    },
    contentHeader: { flexDirection: 'row' as const, alignItems: 'center' as const, gap: Spacing.sm, marginBottom: Spacing.md },
    contentHeaderText: { fontSize: FontSize.base, fontWeight: FontWeight.bold, color: colors.textPrimary },
    divider: { height: 1, backgroundColor: colors.border, marginBottom: Spacing.lg },

    sectionHeader: {
      backgroundColor: colors.primary + '15', borderRadius: BorderRadius.sm,
      padding: Spacing.md, marginTop: Spacing.md, marginBottom: Spacing.sm,
    },
    sectionHeaderText: { fontSize: FontSize.sm, fontWeight: FontWeight.bold, color: colors.primary },

    bulletRow: { flexDirection: 'row' as const, alignItems: 'flex-start' as const, marginBottom: 4, paddingLeft: 4 },
    bullet: {
      width: 6, height: 6, borderRadius: 3, backgroundColor: colors.primary,
      marginTop: 7, marginRight: 8,
    },
    bulletText: { flex: 1, fontSize: FontSize.sm, color: colors.textPrimary, lineHeight: 22 },
    bodyText: { fontSize: FontSize.sm, color: colors.textPrimary, lineHeight: 22, marginBottom: 2 },
    noContent: {
      fontSize: FontSize.sm, color: colors.textSecondary,
      fontStyle: 'italic' as const, textAlign: 'center' as const, padding: Spacing.xl,
    },

    practiceBtn: {
      flexDirection: 'row' as const, alignItems: 'center' as const, justifyContent: 'center' as const,
      backgroundColor: colors.primary, borderRadius: BorderRadius.lg,
      paddingVertical: Spacing.lg, gap: Spacing.sm,
      shadowColor: colors.primary, shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3, shadowRadius: 8, elevation: 4,
    },
    practiceBtnText: { color: '#fff', fontSize: FontSize.base, fontWeight: FontWeight.bold },

    questionsTab: { flex: 1, padding: Spacing.lg },
    questionsInfo: {
      flexDirection: 'row' as const, alignItems: 'center' as const, gap: Spacing.sm,
      backgroundColor: colors.primary + '15', borderRadius: BorderRadius.md,
      padding: Spacing.md, marginBottom: Spacing.lg,
    },
    questionsInfoText: { flex: 1, fontSize: FontSize.sm, color: colors.primary, fontWeight: FontWeight.medium },

    startQuizBtn: {
      flexDirection: 'row' as const, alignItems: 'center' as const, justifyContent: 'center' as const,
      backgroundColor: colors.primary, borderRadius: BorderRadius.lg,
      paddingVertical: Spacing.lg, gap: Spacing.sm, marginBottom: Spacing.xl,
      shadowColor: colors.primary, shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3, shadowRadius: 8, elevation: 4,
    },
    startQuizBtnText: { color: '#fff', fontSize: FontSize.base, fontWeight: FontWeight.bold },

    statsGrid: { flexDirection: 'row' as const, gap: Spacing.md },
    statCard: {
      flex: 1, backgroundColor: colors.surface, borderRadius: BorderRadius.lg,
      padding: Spacing.lg, alignItems: 'center' as const,
      borderWidth: 1, borderColor: colors.border, ...Shadow.sm,
    },
    statValue: { fontSize: FontSize.xl, fontWeight: FontWeight.extrabold, color: colors.textPrimary, marginTop: Spacing.sm },
    statLabel: { fontSize: FontSize.xs, color: colors.textSecondary, marginTop: 4, textAlign: 'center' as const },
  });

export default function TopicDetailScreen() {
  const navigation = useNavigation<NavProp>();
  const route = useRoute<TopicDetailRouteProp>();
  const { topicId, topicName, subjectName } = route.params;
  const { colors } = useTheme();
  const styles = useMemo(() => makeStyles(colors), [colors]);

  const [topic, setTopic] = useState<Topic | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'content' | 'questions'>('content');

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => { fetchTopic(); }, [topicId]);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 400, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 400, useNativeDriver: true }),
    ]).start();
  }, [topic]);

  const fetchTopic = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/questions/topics/${topicId}`);
      setTopic(res.data);
    } catch (err) {
      console.error('Topic fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const renderDescription = (text: string) => {
    if (!text) return null;
    return text.split('\n').map((line, idx) => {
      if (line.startsWith('📌')) {
        return (
          <View key={idx} style={styles.sectionHeader}>
            <Text style={styles.sectionHeaderText}>{line}</Text>
          </View>
        );
      }
      if (line.startsWith('•')) {
        return (
          <View key={idx} style={styles.bulletRow}>
            <View style={styles.bullet} />
            <Text style={styles.bulletText}>{line.substring(1).trim()}</Text>
          </View>
        );
      }
      if (line.trim() === '') return <View key={idx} style={{ height: 8 }} />;
      return <Text key={idx} style={styles.bodyText}>{line}</Text>;
    });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Konu yükleniyor...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
        <View style={styles.headerTitles}>
          <Text style={styles.headerSubject}>{subjectName}</Text>
          <Text style={styles.headerTopic} numberOfLines={1}>{topicName}</Text>
        </View>
        <View style={{ width: 40 }} />
      </View>

      {/* Tab Bar */}
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'content' && styles.tabActive]}
          onPress={() => setActiveTab('content')}
        >
          <Ionicons
            name="book-outline" size={18}
            color={activeTab === 'content' ? colors.primary : colors.textSecondary}
          />
          <Text style={[styles.tabText, activeTab === 'content' && styles.tabTextActive]}>
            Konu Anlatımı
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'questions' && styles.tabActive]}
          onPress={() => setActiveTab('questions')}
        >
          <Ionicons
            name="help-circle-outline" size={18}
            color={activeTab === 'questions' ? colors.primary : colors.textSecondary}
          />
          <Text style={[styles.tabText, activeTab === 'questions' && styles.tabTextActive]}>
            Sorular {topic?._count?.questions ? `(${topic._count.questions})` : ''}
          </Text>
        </TouchableOpacity>
      </View>

      {activeTab === 'content' ? (
        <Animated.ScrollView
          style={[styles.scrollView, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Info Card */}
          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <View style={[styles.infoBadge, { backgroundColor: colors.primary + '15' }]}>
                <Ionicons name="layers-outline" size={16} color={colors.primary} />
                <Text style={[styles.infoBadgeText, { color: colors.primary }]}>{subjectName}</Text>
              </View>
              {topic?._count?.questions !== undefined && (
                <View style={[styles.infoBadge, { backgroundColor: colors.successBg }]}>
                  <Ionicons name="help-circle-outline" size={16} color={colors.success} />
                  <Text style={[styles.infoBadgeText, { color: colors.success }]}>
                    {topic._count.questions} Soru
                  </Text>
                </View>
              )}
            </View>
          </View>

          {/* Content */}
          <View style={styles.contentCard}>
            <View style={styles.contentHeader}>
              <Ionicons name="document-text-outline" size={20} color={colors.primary} />
              <Text style={styles.contentHeaderText}>Konu Anlatımı</Text>
            </View>
            <View style={styles.divider} />
            {topic?.description
              ? renderDescription(topic.description)
              : <Text style={styles.noContent}>Bu konu için henüz içerik eklenmemiştir.</Text>
            }
          </View>

          {/* Practice Button */}
          <TouchableOpacity
            style={styles.practiceBtn}
            onPress={() => navigation.navigate('QuestionSolve', { topicId, topicName })}
          >
            <Ionicons name="play-circle-outline" size={22} color="#fff" />
            <Text style={styles.practiceBtnText}>Bu Konudan Soru Çöz</Text>
          </TouchableOpacity>

          <View style={{ height: 32 }} />
        </Animated.ScrollView>
      ) : (
        <View style={styles.questionsTab}>
          <View style={styles.questionsInfo}>
            <Ionicons name="information-circle-outline" size={20} color={colors.primary} />
            <Text style={styles.questionsInfoText}>
              Bu konuya ait {topic?._count?.questions ?? 0} soru bulunmaktadır.
            </Text>
          </View>
          <TouchableOpacity
            style={styles.startQuizBtn}
            onPress={() => navigation.navigate('QuestionSolve', { topicId, topicName })}
          >
            <Ionicons name="play-circle" size={24} color="#fff" />
            <Text style={styles.startQuizBtnText}>Soruları Çözmeye Başla</Text>
          </TouchableOpacity>

          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Ionicons name="help-circle" size={28} color={colors.primary} />
              <Text style={styles.statValue}>{topic?._count?.questions ?? 0}</Text>
              <Text style={styles.statLabel}>Toplam Soru</Text>
            </View>
            <View style={styles.statCard}>
              <Ionicons name="time-outline" size={28} color={colors.warning} />
              <Text style={styles.statValue}>~{Math.ceil((topic?._count?.questions ?? 0) * 1.5)} dk</Text>
              <Text style={styles.statLabel}>Tahmini Süre</Text>
            </View>
            <View style={styles.statCard}>
              <Ionicons name="trophy-outline" size={28} color={colors.success} />
              <Text style={styles.statValue}>0%</Text>
              <Text style={styles.statLabel}>Başarı Oranı</Text>
            </View>
          </View>
        </View>
      )}
    </View>
  );
}