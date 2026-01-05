import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../providers/ThemeProvider';
import { Ionicons } from '@expo/vector-icons';

interface Props {
  title: string;
  onPress: () => void;
  icon?: string;
  variant?: 'primary' | 'secondary' | 'tertiary';
  disabled?: boolean;
}

export const Button: React.FC<Props> = ({ title, onPress, icon, variant = 'primary', disabled }) => {
  const theme = useTheme();
  const colors = {
    primary: theme.colors.green,
    secondary: theme.colors.yellow,
    tertiary: theme.colors.red,
  };

  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: colors[variant], opacity: disabled ? 0.5 : 1 }, theme.shadows.soft]}
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel={title}
    >
      {icon && <Ionicons name={icon as any} size={20} color="white" style={styles.icon} />}
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginVertical: 4,
    minWidth: 250,
  },
  icon: { marginRight: 8 },
  text: { color: 'white', fontSize: 16, fontWeight: '600' },
});