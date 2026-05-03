import React, { useMemo } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Switch,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppDispatch, useAppSelector } from '../../store';
import { logoutThunk } from '../../store/slices/authSlice';
import { toggleDarkMode } from '../../store/slices/uiSlice';
import { FontSize, FontWeight, Spacing, BorderRadius, Shadow } from '../../constants/theme';
import { useTheme } from '../../contexts/ThemeContext';

const ProfileScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const { colors, isDark } = useTheme();
  const { user } = useAppSelector((s) => s.auth);
  const { stats, badges } = useAppSelector((s) => s.user);

  const styles = useMemo(() => makeStyles(colors), [colors]);

  const handleLogout = () => {
    Alert.alert('Çıkış Yap', 'Hesabından çıkmak istediğine emin misin?', [
      { text: 'İptal', style: 'cancel' },
      { text: 'Çıkış Yap', style: 'destructive', onPress: () => dispatch(logoutThunk()) },
    ]);
  };

  const isPremium = (user as any)?.subscriptionStatus === 'active';
  const handleDarkModeToggle = () => { dispatch(toggleDarkMode()); };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>👤 Profil</Text>
        </View>

        {/* User Card */}
        <View style={styles.userCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {user?.fullName?.charAt(0)?.toUpperCase() || 'K'}
            </Text>
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{user?.fullName || 'KPSS Adayı'}</Text>
            <Text style={styles.userEmail}>{user?.email || ''}</Text>
            {isPremium ? (
              <View style={styles.premiumBadge}>
                <Text style={styles.premiumText}>👑 Premium Üye</Text>
              </View>
            ) : (
              <View style={styles.upgradeBadge}>
                <Text style={styles.upgradeText}>✨ Premium'a Geç</Text>
              </View>
            )}
          </View>
        </View>

        {/* Stats Row */}
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{stats?.totalQuestions || 0}</Text>
            <Text style={styles.statLabel}>Soru</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: colors.success }]}>
              {stats ? Math.round(stats.accuracy) : 0}%
            </Text>
            <Text style={styles.statLabel}>Doğruluk</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: colors.streak }]}>
              🔥{stats?.currentStreak || 0}
            </Text>
            <Text style={styles.statLabel}>Seri</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: colors.primary }]}>
              Lv.{user?.level || 1}
            </Text>
            <Text style={styles.statLabel}>Seviye</Text>
          </View>
        </View>

        {/* Badges */}
        {badges.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>🏆 Rozetler</Text>
              <TouchableOpacity>
                <Text style={styles.seeAll}>Tümü →</Text>
              </TouchableOpacity>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {badges.slice(0, 6).map((badge: any) => (
                <View key={badge.id} style={styles.badgeItem}>
                  <Text style={styles.badgeIcon}>{badge.icon}</Text>
                  <Text style={styles.badgeName}>{badge.name}</Text>
                </View>
              ))}
            </ScrollView>
          </View>
        )}

        {/* Settings Section */}
        <View style={styles.menuSection}>
          {/* Dark Mode Toggle */}
          <View style={styles.menuItemRow}>
            <Text style={styles.menuIcon}>🌙</Text>
            <Text style={styles.menuLabel}>Karanlık Mod</Text>
            <Switch
              value={isDark}
              onValueChange={handleDarkModeToggle}
              trackColor={{ false: colors.border, true: colors.primary + '80' }}
              thumbColor={isDark ? colors.primary : colors.textTertiary}
            />
          </View>

          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuIcon}>👤</Text>
            <Text style={styles.menuLabel}>Profil Bilgileri</Text>
            <Text style={styles.menuArrow}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuIcon}>🎯</Text>
            <Text style={styles.menuLabel}>Hedef Sınav Tarihi</Text>
            <Text style={styles.menuArrow}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuIcon}>🔔</Text>
            <Text style={styles.menuLabel}>Bildirim Ayarları</Text>
            <Text style={styles.menuArrow}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuIcon}>📥</Text>
            <Text style={styles.menuLabel}>Çevrimdışı İçerik</Text>
            <Text style={styles.menuArrow}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuIcon}>❓</Text>
            <Text style={styles.menuLabel}>Yardım & Destek</Text>
            <Text style={styles.menuArrow}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuIcon}>⭐</Text>
            <Text style={styles.menuLabel}>Uygulamayı Değerlendir</Text>
            <Text style={styles.menuArrow}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.menuItem, styles.menuItemLast]}>
            <Text style={styles.menuIcon}>📄</Text>
            <Text style={styles.menuLabel}>Gizlilik Politikası</Text>
            <Text style={styles.menuArrow}>›</Text>
          </TouchableOpacity>
        </View>

        {/* Logout */}
        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <Text style={styles.logoutText}>🚪 Çıkış Yap</Text>
        </TouchableOpacity>

        <Text style={styles.version}>KPSS Hazırlık v1.0.0</Text>
        <View style={{ height: Spacing.xxxl }} />
      </ScrollView>
    </SafeAreaView>
  );
};

// ─── Dynamic Styles ───────────────────────────────────────────────────────────

function makeStyles(c: ReturnType<typeof import('../../contexts/ThemeContext').useTheme>['colors']) {
  return StyleSheet.create({
    container: { flex: 1, backgroundColor: c.background },
    header: { paddingHorizontal: Spacing.xl, paddingVertical: Spacing.lg },
    title: { fontSize: FontSize.xl, fontWeight: FontWeight.bold, color: c.textPrimary },

    userCard: {
      flexDirection: 'row',
      alignItems: 'center',
      marginHorizontal: Spacing.xl,
      marginBottom: Spacing.xl,
      backgroundColor: c.surface,
      borderRadius: BorderRadius.xl,
      padding: Spacing.xl,
      ...Shadow.md,
      gap: Spacing.lg,
    },
    avatar: {
      width: 64,
      height: 64,
      borderRadius: 32,
      backgroundColor: c.primary,
      alignItems: 'center',
      justifyContent: 'center',
    },
    avatarText: { fontSize: FontSize.xxl, fontWeight: FontWeight.bold, color: '#FFFFFF' },
    userInfo: { flex: 1 },
    userName: { fontSize: FontSize.lg, fontWeight: FontWeight.bold, color: c.textPrimary },
    userEmail: { fontSize: FontSize.sm, color: c.textSecondary, marginBottom: Spacing.sm },
    premiumBadge: {
      backgroundColor: '#FFF3CD',
      borderRadius: BorderRadius.full,
      paddingHorizontal: Spacing.md,
      paddingVertical: 4,
      alignSelf: 'flex-start',
    },
    premiumText: { fontSize: FontSize.xs, fontWeight: FontWeight.semibold, color: '#856404' },
    upgradeBadge: {
      backgroundColor: c.primary + '15',
      borderRadius: BorderRadius.full,
      paddingHorizontal: Spacing.md,
      paddingVertical: 4,
      alignSelf: 'flex-start',
    },
    upgradeText: { fontSize: FontSize.xs, fontWeight: FontWeight.semibold, color: c.primary },

    statsRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginHorizontal: Spacing.xl,
      marginBottom: Spacing.xl,
      backgroundColor: c.surface,
      borderRadius: BorderRadius.lg,
      padding: Spacing.lg,
      ...Shadow.sm,
    },
    statItem: { flex: 1, alignItems: 'center' },
    statValue: { fontSize: FontSize.lg, fontWeight: FontWeight.bold, color: c.textPrimary },
    statLabel: { fontSize: FontSize.xs, color: c.textSecondary, marginTop: 2 },
    statDivider: { width: 1, height: 36, backgroundColor: c.border },

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
    },
    seeAll: { fontSize: FontSize.sm, color: c.primary, fontWeight: FontWeight.medium },
    badgeItem: { alignItems: 'center', marginRight: Spacing.lg, width: 64 },
    badgeIcon: { fontSize: 36, marginBottom: 4 },
    badgeName: { fontSize: FontSize.xs, color: c.textSecondary, textAlign: 'center' },

    menuSection: {
      marginHorizontal: Spacing.xl,
      marginBottom: Spacing.xl,
      backgroundColor: c.surface,
      borderRadius: BorderRadius.lg,
      ...Shadow.sm,
      overflow: 'hidden',
    },
    menuItemRow: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: Spacing.lg,
      paddingVertical: Spacing.md,
      borderBottomWidth: 1,
      borderBottomColor: c.border,
      gap: Spacing.md,
    },
    menuItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: Spacing.lg,
      paddingVertical: Spacing.md,
      borderBottomWidth: 1,
      borderBottomColor: c.border,
      gap: Spacing.md,
    },
    menuItemLast: { borderBottomWidth: 0 },
    menuIcon: { fontSize: 20, width: 28 },
    menuLabel: { flex: 1, fontSize: FontSize.base, color: c.textPrimary },
    menuArrow: { fontSize: FontSize.xl, color: c.textTertiary },

    logoutBtn: {
      marginHorizontal: Spacing.xl,
      marginBottom: Spacing.lg,
      backgroundColor: c.errorBg,
      borderRadius: BorderRadius.lg,
      padding: Spacing.lg,
      alignItems: 'center',
    },
    logoutText: { fontSize: FontSize.base, fontWeight: FontWeight.semibold, color: c.error },
    version: {
      textAlign: 'center',
      fontSize: FontSize.xs,
      color: c.textTertiary,
      marginBottom: Spacing.md,
    },
  });
}

export default ProfileScreen;