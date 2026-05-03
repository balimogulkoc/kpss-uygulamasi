import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { store } from './src/store';
import { initializeAuthThunk } from './src/store/slices/authSlice';
import AppNavigator from './src/navigation';
import { ThemeProvider, useTheme } from './src/contexts/ThemeContext';

function AppContent() {
  const { colors } = useTheme();

  useEffect(() => {
    store.dispatch(initializeAuthThunk());
  }, []);

  return (
    <>
      <StatusBar style={colors.statusBar} />
      <AppNavigator />
    </>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <ThemeProvider>
          <AppContent />
        </ThemeProvider>
      </SafeAreaProvider>
    </Provider>
  );
}