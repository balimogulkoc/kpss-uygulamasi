import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAppDispatch, useAppSelector } from '../../store';
import { registerThunk, clearError } from '../../store/slices/authSlice';
import { AuthStackParamList, ExamCategory } from '../../types';
import Button from '../../components/common/Button';
import { Colors, FontSize, FontWeight, Spacing, BorderRadius, EXAM_CATEGORY_LABELS } from '../../constants/theme';

type RegisterNavProp = NativeStackNavigationProp<AuthStackParamList, 'Register'>;

const CATEGORIES: { code: ExamCategory; label: string }[] = [
  { code: 'lisans', label: 'KPSS Lisans' },
  { code: 'onlisans', label: 'KPSS Önlisans' },
  { code: 'ortaogretim', label: 'KPSS Ortaöğretim' },
  { code: 'oabt', label: 'ÖABT' },
  { code: 'egitim_bilimleri', label: 'Eğitim Bilimleri' },
];

const RegisterScreen: React.FC = () => {
  const navigation = useNavigation<RegisterNavProp>();
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector((s) => s.auth);

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ExamCategory | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [validationError, setValidationError] = useState('');

  const validate = () => {
    if (!fullName.trim()) return 'Ad Soyad alanı zorunludur.';
    if (!email.trim() || !email.includes('@')) return 'Geçerli bir e-posta girin.';
    if (password.length < 8) return 'Şifre en az 8 karakter olmalıdır.';
    return '';
  };

  const handleRegister = () => {
    const err = validate();
    if (err) { setValidationError(err); return; }
    setValidationError('');
    dispatch(clearError());
    dispatch(registerThunk({
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      password,
      examCategory: selectedCategory || undefined,
    }));
  };

  const displayError = validationError || error;

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Hesap Oluştur</Text>
          <Text style={styles.subtitle}>
            7 günlük ücretsiz deneme — kredi kartı gerekmez.
          </Text>
        </View>

        {displayError ? (
          <View style={styles.errorBanner}>
            <Text style={styles.errorText}>{displayError}</Text>
          </View>
        ) : null}

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Ad Soyad</Text>
          <TextInput
            style={styles.input}
            placeholder="Adınız Soyadınız"
            placeholderTextColor={Colors.textTertiary}
            value={fullName}
            onChangeText={setFullName}
            autoCapitalize="words"
            returnKeyType="next"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>E-posta</Text>
          <TextInput
            style={styles.input}
            placeholder="ornek@email.com"
            placeholderTextColor={Colors.textTertiary}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            returnKeyType="next"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Şifre</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={[styles.input, styles.passwordInput]}
              placeholder="En az 8 karakter"
              placeholderTextColor={Colors.textTertiary}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              returnKeyType="done"
            />
            <TouchableOpacity
              style={styles.eyeButton}
              onPress={() => setShowPassword(!showPassword)}
            >
              <Text style={styles.eyeIcon}>{showPassword ? '🙈' : '👁️'}</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Sınav Kategorisi (Opsiyonel)</Text>
          <View style={styles.categoryGrid}>
            {CATEGORIES.map((cat) => (
              <TouchableOpacity
                key={cat.code}
                style={[
                  styles.categoryChip,
                  selectedCategory === cat.code && styles.categoryChipSelected,
                ]}
                onPress={() =>
                  setSelectedCategory(selectedCategory === cat.code ? null : cat.code)
                }
              >
                <Text
                  style={[
                    styles.categoryChipText,
                    selectedCategory === cat.code && styles.categoryChipTextSelected,
                  ]}
                >
                  {cat.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <Button
          title="Kayıt Ol"
          onPress={handleRegister}
          isLoading={isLoading}
          fullWidth
          size="lg"
          style={styles.registerButton}
        />

        <Text style={styles.terms}>
          Kayıt olarak{' '}
          <Text style={styles.termsLink}>Kullanım Şartları</Text>
          {' '}ve{' '}
          <Text style={styles.termsLink}>Gizlilik Politikası</Text>
          'nı kabul etmiş olursunuz.
        </Text>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Zaten hesabın var mı? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.footerLink}>Giriş Yap</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  scroll: {
    flexGrow: 1,
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.xxxl,
    paddingBottom: Spacing.xxxl,
  },
  header: { marginBottom: Spacing.xxl },
  title: {
    fontSize: FontSize.xxxl,
    fontWeight: FontWeight.bold,
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
  },
  subtitle: { fontSize: FontSize.base, color: Colors.textSecondary },
  errorBanner: {
    backgroundColor: Colors.errorBg,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    marginBottom: Spacing.lg,
    borderLeftWidth: 3,
    borderLeftColor: Colors.error,
  },
  errorText: { color: Colors.error, fontSize: FontSize.sm, fontWeight: FontWeight.medium },
  inputGroup: { marginBottom: Spacing.lg },
  label: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.semibold,
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
  },
  input: {
    backgroundColor: Colors.surface,
    borderWidth: 1.5,
    borderColor: Colors.border,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    fontSize: FontSize.base,
    color: Colors.textPrimary,
    minHeight: 52,
  },
  passwordContainer: { position: 'relative' },
  passwordInput: { paddingRight: 52 },
  eyeButton: {
    position: 'absolute',
    right: Spacing.md,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    paddingHorizontal: Spacing.sm,
  },
  eyeIcon: { fontSize: 18 },
  categoryGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm },
  categoryChip: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
    borderWidth: 1.5,
    borderColor: Colors.border,
    backgroundColor: Colors.surface,
    marginBottom: Spacing.sm,
  },
  categoryChipSelected: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primary,
  },
  categoryChipText: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.medium,
    color: Colors.textSecondary,
  },
  categoryChipTextSelected: { color: Colors.textInverse },
  registerButton: { marginTop: Spacing.md, marginBottom: Spacing.lg },
  terms: {
    fontSize: FontSize.xs,
    color: Colors.textTertiary,
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: Spacing.xl,
  },
  termsLink: { color: Colors.primary, fontWeight: FontWeight.medium },
  footer: { flexDirection: 'row', justifyContent: 'center' },
  footerText: { fontSize: FontSize.base, color: Colors.textSecondary },
  footerLink: { fontSize: FontSize.base, color: Colors.primary, fontWeight: FontWeight.semibold },
});

export default RegisterScreen;