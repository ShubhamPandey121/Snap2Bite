import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MotiView } from 'moti';
import { useTheme } from '../providers/ThemeProvider';

interface Props {
  note: string;
  delay?: number;
}

export const DoodleNote: React.FC<Props> = ({ note, delay = 200 }) => {
  const theme = useTheme();

  return (
    <MotiView
      from={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      delay={delay}
      style={[
        styles.bubble,
        { backgroundColor: theme.colors.green + '20' },
      ]}
    >
      <Text style={[styles.robot, { color: theme.colors.green }]}>🦾</Text>
      <Text style={[styles.text, { color: theme.colors.text }]}>
        {note}
      </Text>
    </MotiView>
  );
};

const styles = StyleSheet.create({
  bubble: {
    padding: 16,
    borderRadius: 20,
    marginVertical: 16,
    alignSelf: 'center', // ✅ now correctly typed
    maxWidth: '80%',
  },
  robot: {
    fontSize: 24,
    marginBottom: 8,
    textAlign: 'center', // ✅ correctly typed
  },
  text: {
    fontSize: 16,
    lineHeight: 22,
  },
});
