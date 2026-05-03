import React from 'react';
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View, Platform } from 'react-native';
import { useAppSelector } from '../store';
import { useTheme } from '../contexts/ThemeContext';

// Auth Screens
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';

// Main Screens
import HomeScreen from '../screens/home/HomeScreen';
import QuestionBankScreen from '../screens/questions/QuestionBankScreen';
import QuestionSolveScreen from '../screens/questions/QuestionSolveScreen';
import TopicDetailScreen from '../screens/topics/TopicDetailScreen';
import ExamListScreen from '../screens/exams/ExamListScreen';
import AnalyticsScreen from '../screens/analytics/AnalyticsScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';

const AuthStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const RootStack = createNativeStackNavigator();
const QuestionsStack = createNativeStackNavigator();
const ExamsStack = createNativeStackNavigator();

// ─── Tab Icon Component ───────────────────────────────────────────────────────

const TAB_CONFIG: Record<string, { icon: string; label: string }> = {
  HomeTab: { icon: '🏠', label: 'Ana Sayfa' },
  QuestionsTab: { icon: '📚', label: 'Sorular' },
  ExamsTab: { icon: '📋', label: 'Sınavlar' },
  AnalyticsTab: { icon: '📊', label: 'Analiz' },
  ProfileTab: { icon: '👤', label: 'Profil' },
};

function TabBarIcon({ name, focused }: { name: string; focused: boolean }) {
  const { colors } = useTheme();
  const config = TAB_CONFIG[name] || { icon: '●', label: name };
  return (
    <View style={[
      tabItemInnerBase,
      focused && { backgroundColor: colors.primary + '12' },
    ]}>
      <Text style={tabIconBase}>{config.icon}</Text>
      <Text style={[tabLabelBase, { color: focused ? colors.primary : colors.textTertiary }, focused && { fontWeight: '600' }]}>
        {config.label}
      </Text>
    </View>
  );
}

// ─── Questions Stack ──────────────────────────────────────────────────────────

function QuestionsNavigator() {
  return (
    <QuestionsStack.Navigator screenOptions={{ headerShown: false }}>
      <QuestionsStack.Screen name="QuestionBank" component={QuestionBankScreen} />
      <QuestionsStack.Screen name="TopicDetail" component={TopicDetailScreen} />
      <QuestionsStack.Screen name="QuestionSolve" component={QuestionSolveScreen} />
    </QuestionsStack.Navigator>
  );
}

// ─── Exams Stack ──────────────────────────────────────────────────────────────

function ExamsNavigator() {
  return (
    <ExamsStack.Navigator screenOptions={{ headerShown: false }}>
      <ExamsStack.Screen name="ExamList" component={ExamListScreen} />
    </ExamsStack.Navigator>
  );
}

// ─── Main Tabs ────────────────────────────────────────────────────────────────

function MainTabs() {
  const { colors, isDark } = useTheme();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarIcon: ({ focused }) => <TabBarIcon name={route.name} focused={focused} />,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopWidth: 1,
          borderTopColor: colors.border,
          height: Platform.OS === 'ios' ? 80 : 64,
          paddingBottom: 0,
          paddingTop: 0,
        },
        tabBarItemStyle: {
          height: Platform.OS === 'ios' ? 80 : 64,
          paddingTop: 0,
          paddingBottom: 0,
        },
      })}
    >
      <Tab.Screen name="HomeTab" component={HomeScreen} />
      <Tab.Screen name="QuestionsTab" component={QuestionsNavigator} />
      <Tab.Screen name="ExamsTab" component={ExamsNavigator} />
      <Tab.Screen name="AnalyticsTab" component={AnalyticsScreen} />
      <Tab.Screen name="ProfileTab" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

// ─── Auth Navigator ───────────────────────────────────────────────────────────

function AuthNavigator() {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="Register" component={RegisterScreen} />
    </AuthStack.Navigator>
  );
}

// ─── Root Navigator ───────────────────────────────────────────────────────────

export default function AppNavigator() {
  const { isAuthenticated, isInitialized } = useAppSelector((s) => s.auth);
  const { isDark } = useTheme();

  if (!isInitialized) return null;

  return (
    <NavigationContainer theme={isDark ? DarkTheme : DefaultTheme}>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        {isAuthenticated ? (
          <RootStack.Screen name="Main" component={MainTabs} />
        ) : (
          <RootStack.Screen name="Auth" component={AuthNavigator} />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

// ─── Static Tab Icon Styles (colors applied dynamically) ─────────────────────

const tabItemInnerBase: object = {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
  paddingVertical: 6,
  borderRadius: 10,
  minWidth: 56,
};

const tabIconBase: object = {
  fontSize: 22,
  lineHeight: 26,
  textAlign: 'center',
};

const tabLabelBase: object = {
  fontSize: 10,
  marginTop: 2,
  textAlign: 'center',
  lineHeight: 13,
};
