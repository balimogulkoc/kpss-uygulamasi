import React, { useEffect, useRef, useState, useMemo } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  Alert, ActivityIndicator, Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from '../../store';
import {
  setTestSession, setAnswer, goToNext, goToPrev,
  completeSession, clearSession, toggleMark, tickTimer,
} from '../../store/slices/examSlice';
import { questionsApi } from '../../services/api';
import { FontSize, FontWeight, Spacing, BorderRadius, Shadow } from '../../constants/theme';
import { useTheme } from '../../contexts/ThemeContext';
import type { AppColors } from '../../contexts/ThemeContext';
import type { AnswerOption } from '../../types';

type RootStackParamList = {
  QuestionSolve: { topicId?: number; filter?: { topicId?: number; subjectId?: number } };
  ExamResult: { sessionId: string };
};
type RoutePropType = RouteProp<RootStackParamList, 'QuestionSolve'>;

const OPTION_LABELS: AnswerOption[] = ['A', 'B', 'C', 'D', 'E'];

const parseOptions = (raw: any): string[] => {
  if (Array.isArray(raw)) return raw;
  if (typeof raw === 'string') {
    try { return JSON.parse(raw); } catch { return raw.split('|'); }
  }
  return [];
};

const makeStyles = (colors: AppColors) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background },
    loading: { flex: 1, alignItems: 'center' as const, justifyContent: 'center' as const, gap: Spacing.md },
    loadingText: { fontSize: FontSize.base, color: colors.textSecondary, marginTop: Spacing.sm },
    emptyIcon: { fontSize: 48 },
    backBtn: {
      marginTop: Spacing.lg, backgroundColor: colors.primary,
      paddingHorizontal: Spacing.xl, paddingVertical: Spacing.md,
      borderRadius: BorderRadius.md,
    },
    backBtnText: { color: '#fff', fontWeight: FontWeight.semibold, fontSize: FontSize.base },

    topBar: {
      flexDirection: 'row' as const, alignItems: 'center' as const,
      paddingHorizontal: Spacing.lg, paddingVertical: Spacing.md,
      backgroundColor: colors.surface, borderBottomWidth: 1, borderBottomColor: colors.border,
      gap: Spacing.md,
    },
    closeBtn: { fontSize: 18, color: colors.textSecondary, padding: Spacing.xs },
    progressInfo: { flex: 1 },
    progressText: { fontSize: FontSize.xs, color: colors.textSecondary, marginBottom: 4, textAlign: 'center' as const },
    progressBarBg: { height: 6, backgroundColor: colors.border, borderRadius: BorderRadius.full, overflow: 'hidden' as const },
    progressBarFill: { height: '100%' as const, backgroundColor: colors.primary, borderRadius: BorderRadius.full },
    topRight: { flexDirection: 'row' as const, alignItems: 'center' as const, gap: Spacing.sm },
    timer: { fontSize: FontSize.sm, color: colors.textSecondary, fontWeight: FontWeight.medium },
    markBtn: { fontSize: 20 },

    scroll: { padding: Spacing.xl },

    questionCard: {
      backgroundColor: colors.surface, borderRadius: BorderRadius.lg,
      padding: Spacing.xl, marginBottom: Spacing.lg, ...Shadow.sm,
      borderWidth: 1, borderColor: colors.border,
    },
    questionMeta: { flexDirection: 'row' as const, gap: Spacing.sm, marginBottom: Spacing.md, flexWrap: 'wrap' as const },
    subjectBadge: {
      backgroundColor: colors.primary + '15', borderRadius: BorderRadius.sm,
      paddingHorizontal: Spacing.sm, paddingVertical: 2,
    },
    subjectBadgeText: { fontSize: FontSize.xs, color: colors.primary, fontWeight: FontWeight.semibold },
    diffBadge: { borderRadius: BorderRadius.sm, paddingHorizontal: Spacing.sm, paddingVertical: 2 },
    diffBadgeText: { fontSize: FontSize.xs, fontWeight: FontWeight.semibold },
    questionText: { fontSize: FontSize.base, color: colors.textPrimary, lineHeight: 26 },

    optionsContainer: { gap: Spacing.sm, marginBottom: Spacing.lg },
    option: {
      flexDirection: 'row' as const, alignItems: 'center' as const,
      borderRadius: BorderRadius.lg, padding: Spacing.md,
      borderWidth: 1.5, ...Shadow.sm,
    },
    optionLabel: {
      width: 32, height: 32, borderRadius: 16,
      alignItems: 'center' as const, justifyContent: 'center' as const, marginRight: Spacing.md,
      flexShrink: 0,
    },
    optionLabelText: { fontSize: FontSize.sm, fontWeight: FontWeight.bold },
    optionText: { flex: 1, fontSize: FontSize.sm, lineHeight: 20 },
    checkIcon: { fontSize: 18, color: colors.success, marginLeft: Spacing.sm },
    crossIcon: { fontSize: 18, color: colors.error, marginLeft: Spacing.sm },

    solutionBtn: {
      backgroundColor: colors.primary + '15', borderRadius: BorderRadius.md,
      padding: Spacing.md, alignItems: 'center' as const, marginBottom: Spacing.lg,
      borderWidth: 1, borderColor: colors.primary + '30',
    },
    solutionBtnText: { fontSize: FontSize.base, fontWeight: FontWeight.semibold, color: colors.primary },

    solutionCard: {
      backgroundColor: colors.surface, borderRadius: BorderRadius.lg,
      padding: Spacing.xl, borderLeftWidth: 4, borderLeftColor: colors.primary,
      ...Shadow.sm, borderWidth: 1, borderColor: colors.border,
    },
    solutionTitle: { fontSize: FontSize.base, fontWeight: FontWeight.bold, color: colors.textPrimary, marginBottom: Spacing.md },
    solutionText: { fontSize: FontSize.sm, color: colors.textSecondary, lineHeight: 22 },

    bottomNav: {
      flexDirection: 'row' as const, gap: Spacing.md,
      paddingHorizontal: Spacing.xl, paddingVertical: Spacing.md,
      backgroundColor: colors.surface, borderTopWidth: 1, borderTopColor: colors.border,
    },
    navBtn: {
      flex: 1, backgroundColor: colors.primary, borderRadius: BorderRadius.md,
      paddingVertical: Spacing.md, alignItems: 'center' as const,
    },
    navBtnSecondary: { backgroundColor: colors.surface, borderWidth: 1.5, borderColor: colors.border },
    navBtnDisabled: { backgroundColor: colors.border, borderColor: colors.border },
    navBtnText: { fontSize: FontSize.base, fontWeight: FontWeight.semibold, color: '#fff' },
    navBtnTextSecondary: { color: colors.textPrimary },
  });

const QuestionSolveScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<RoutePropType>();
  const dispatch = useAppDispatch();
  const testSession = useAppSelector((s) => s.exam.testSession);
  const { colors } = useTheme();
  const styles = useMemo(() => makeStyles(colors), [colors]);

  const [initLoading, setInitLoading] = useState(true);
  const [showSolution, setShowSolution] = useState(false);
  const [solution, setSolution] = useState<string | null>(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    loadQuestions();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  const loadQuestions = async () => {
    try {
      const { topicId, filter } = route.params || {};
      const effectiveTopicId = topicId ?? filter?.topicId;
      const result = await questionsApi.getQuestions({
        topicId: effectiveTopicId,
        subjectId: filter?.subjectId,
        limit: 20,
      });
      const questions = result.data || [];
      if (questions.length === 0) {
        Alert.alert('Bilgi', 'Bu konuya ait soru bulunamadı.', [
          { text: 'Geri', onPress: () => navigation.goBack() },
        ]);
        return;
      }
      dispatch(setTestSession({
        id: `practice_${Date.now()}`,
        type: 'practice',
        questions,
      }));
      timerRef.current = setInterval(() => dispatch(tickTimer()), 1000);
    } catch (e) {
      Alert.alert('Hata', 'Sorular yüklenemedi.', [
        { text: 'Geri', onPress: () => navigation.goBack() },
      ]);
    } finally {
      setInitLoading(false);
    }
  };

  const handleAnswer = (option: AnswerOption) => {
    if (!testSession || showSolution) return;
    const q = testSession.questions[testSession.currentIndex];
    dispatch(setAnswer({ questionId: q.id, answer: option }));

    setTimeout(() => {
      if (testSession.currentIndex < testSession.questions.length - 1) {
        dispatch(goToNext());
        setShowSolution(false);
        setSolution(null);
        fadeAnim.setValue(0);
      } else {
        dispatch(completeSession());
        navigation.replace('ExamResult', { sessionId: testSession.id });
      }
    }, 500);
  };

  const handleShowSolution = async () => {
    if (!testSession) return;
    const q = testSession.questions[testSession.currentIndex];
    try {
      const sol = await questionsApi.getSolution(q.id);
      setSolution(sol.explanation || q.explanation || 'Çözüm bulunamadı.');
      setShowSolution(true);
      Animated.timing(fadeAnim, { toValue: 1, duration: 300, useNativeDriver: true }).start();
    } catch {
      setSolution(q.explanation || 'Çözüm bulunamadı.');
      setShowSolution(true);
      Animated.timing(fadeAnim, { toValue: 1, duration: 300, useNativeDriver: true }).start();
    }
  };

  if (initLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loading}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.loadingText}>Sorular yükleniyor...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!testSession || testSession.questions.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loading}>
          <Text style={styles.emptyIcon}>📭</Text>
          <Text style={styles.loadingText}>Soru bulunamadı.</Text>
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
            <Text style={styles.backBtnText}>← Geri Dön</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const q = testSession.questions[testSession.currentIndex];
  const options = parseOptions(q.options);
  const selectedAnswer = testSession.answers[q.id];
  const isMarked = testSession.markedQuestions.includes(q.id);
  const progress = ((testSession.currentIndex + 1) / testSession.questions.length) * 100;
  const elapsed = testSession.timeElapsed;
  const timeStr = `${Math.floor(elapsed / 60).toString().padStart(2, '0')}:${(elapsed % 60).toString().padStart(2, '0')}`;

  const getDiffBadgeColors = (diff: string) => {
    if (diff === 'EASY') return { bg: colors.successBg, text: colors.success };
    if (diff === 'MEDIUM') return { bg: colors.warningBg, text: colors.warning };
    return { bg: colors.errorBg, text: colors.error };
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity
          onPress={() => {
            Alert.alert('Çıkış', 'Testi bırakmak istediğinize emin misiniz?', [
              { text: 'İptal', style: 'cancel' },
              {
                text: 'Çık', style: 'destructive',
                onPress: () => { dispatch(clearSession()); navigation.goBack(); },
              },
            ]);
          }}
        >
          <Text style={styles.closeBtn}>✕</Text>
        </TouchableOpacity>

        <View style={styles.progressInfo}>
          <Text style={styles.progressText}>
            {testSession.currentIndex + 1} / {testSession.questions.length}
          </Text>
          <View style={styles.progressBarBg}>
            <View style={[styles.progressBarFill, { width: `${progress}%` as any }]} />
          </View>
        </View>

        <View style={styles.topRight}>
          <Text style={styles.timer}>⏱ {timeStr}</Text>
          <TouchableOpacity onPress={() => dispatch(toggleMark(q.id))}>
            <Text style={styles.markBtn}>{isMarked ? '🔖' : '📌'}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Question Card */}
        <View style={styles.questionCard}>
          <View style={styles.questionMeta}>
            {q.subject?.name && (
              <View style={styles.subjectBadge}>
                <Text style={styles.subjectBadgeText}>{q.subject.name}</Text>
              </View>
            )}
            {q.difficulty && (() => {
              const dc = getDiffBadgeColors(q.difficulty);
              return (
                <View style={[styles.diffBadge, { backgroundColor: dc.bg }]}>
                  <Text style={[styles.diffBadgeText, { color: dc.text }]}>
                    {q.difficulty === 'EASY' ? 'Kolay' : q.difficulty === 'MEDIUM' ? 'Orta' : 'Zor'}
                  </Text>
                </View>
              );
            })()}
          </View>
          <Text style={styles.questionText}>{q.text}</Text>
        </View>

        {/* Options */}
        <View style={styles.optionsContainer}>
          {OPTION_LABELS.filter((_, i) => i < options.length).map((label, idx) => {
            const isSelected = selectedAnswer === label;
            const isCorrect = label === q.correctAnswer;

            let borderColor = colors.border;
            let bgColor = colors.surface;
            let labelBg = colors.surfaceSecondary;
            let labelTextColor = colors.textPrimary;
            let textColor = colors.textPrimary;

            if (selectedAnswer) {
              if (isCorrect) {
                borderColor = colors.success;
                bgColor = colors.successBg;
                labelBg = colors.success;
                labelTextColor = '#fff';
                textColor = colors.success;
              } else if (isSelected) {
                borderColor = colors.error;
                bgColor = colors.errorBg;
                labelBg = colors.error;
                labelTextColor = '#fff';
                textColor = colors.error;
              }
            } else if (isSelected) {
              borderColor = colors.primary;
              bgColor = colors.primary + '08';
              labelBg = colors.primary;
              labelTextColor = '#fff';
              textColor = colors.primary;
            }

            return (
              <TouchableOpacity
                key={label}
                style={[styles.option, { borderColor, backgroundColor: bgColor }]}
                onPress={() => handleAnswer(label)}
                disabled={!!selectedAnswer}
                activeOpacity={0.75}
              >
                <View style={[styles.optionLabel, { backgroundColor: labelBg }]}>
                  <Text style={[styles.optionLabelText, { color: labelTextColor }]}>{label}</Text>
                </View>
                <Text style={[styles.optionText, { color: textColor }]}>{options[idx]}</Text>
                {selectedAnswer && isCorrect && (
                  <Text style={styles.checkIcon}>✓</Text>
                )}
                {selectedAnswer && isSelected && !isCorrect && (
                  <Text style={styles.crossIcon}>✗</Text>
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Solution Button */}
        {selectedAnswer && !showSolution && (
          <TouchableOpacity style={styles.solutionBtn} onPress={handleShowSolution}>
            <Text style={styles.solutionBtnText}>💡 Çözümü Göster</Text>
          </TouchableOpacity>
        )}

        {/* Solution Card */}
        {showSolution && solution && (
          <Animated.View style={[styles.solutionCard, { opacity: fadeAnim }]}>
            <Text style={styles.solutionTitle}>📖 Çözüm</Text>
            <Text style={styles.solutionText}>{solution}</Text>
          </Animated.View>
        )}

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Bottom Nav */}
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={[styles.navBtn, styles.navBtnSecondary, testSession.currentIndex === 0 && styles.navBtnDisabled]}
          onPress={() => { dispatch(goToPrev()); setShowSolution(false); setSolution(null); fadeAnim.setValue(0); }}
          disabled={testSession.currentIndex === 0}
        >
          <Text style={[styles.navBtnText, styles.navBtnTextSecondary]}>← Önceki</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navBtn}
          onPress={() => {
            if (testSession.currentIndex < testSession.questions.length - 1) {
              dispatch(goToNext());
              setShowSolution(false);
              setSolution(null);
              fadeAnim.setValue(0);
            } else {
              dispatch(completeSession());
              navigation.replace('ExamResult', { sessionId: testSession.id });
            }
          }}
        >
          <Text style={styles.navBtnText}>
            {testSession.currentIndex < testSession.questions.length - 1 ? 'Sonraki →' : 'Bitir ✓'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default QuestionSolveScreen;