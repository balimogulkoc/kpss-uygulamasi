import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { Colors, BorderRadius, Shadow, Spacing } from '../../constants/theme';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  variant?: 'default' | 'elevated' | 'outlined' | 'flat';
  padding?: keyof typeof Spacing | number;
}

const Card: React.FC<CardProps> = ({
  children,
  style,
  variant = 'default',
  padding = 'lg',
}) => {
  const paddingValue = typeof padding === 'number' ? padding : Spacing[padding];

  return (
    <View
      style={[
        styles.base,
        styles[variant],
        { padding: paddingValue },
        style,
      ]}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  base: {
    borderRadius: BorderRadius.lg,
    backgroundColor: Colors.surface,
  },
  default: {
    ...Shadow.md,
  },
  elevated: {
    ...Shadow.lg,
  },
  outlined: {
    borderWidth: 1,
    borderColor: Colors.border,
  },
  flat: {
    backgroundColor: Colors.surfaceSecondary,
  },
});

export default Card;