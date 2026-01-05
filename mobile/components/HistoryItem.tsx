import React from 'react';
import { Pressable, Text, StyleSheet, ViewStyle } from 'react-native';
import { MotiView } from 'moti';
import { useTheme } from '../providers/ThemeProvider';

interface Props {
  title: string;
  onPress?: () => void;
}

export const HistoryItem: React.FC<Props> = ({ title, onPress }) => {
  const theme = useTheme();

  return (
    <Pressable onPress={onPress}>
      <MotiView
        from={{ opacity: 0, translateY: 10 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'timing', duration: 300 }}
        style={[
          styles.container,
          { backgroundColor: theme.colors.bg },
        ]}
      >
        <Text style={[styles.title, { color: theme.colors.text }]}>
          {title}
        </Text>
      </MotiView>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 14,
    marginVertical: 8,
  } as ViewStyle,

  title: {
    fontSize: 16,
    fontWeight: '600', // ✅ correct union type
  },
});
