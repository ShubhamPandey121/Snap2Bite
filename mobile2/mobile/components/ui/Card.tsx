import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MotiView } from 'moti';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../providers/ThemeProvider';
import { Insight } from '../../types';

interface Props {
  type: Insight['type'];
  title: string;
  content: string;
  icon?: string;
  delay?: number;
}

export const InsightCard: React.FC<Props> = ({
  type,
  title,
  content,
  icon,
  delay = 0,
}) => {
  const theme = useTheme();

  const bgColor =
    type === 'WATCH_OUT'
      ? theme.colors.pink
      : type === 'GOOD_NEWS'
      ? theme.colors.mint
      : theme.colors.bg;

  const titleColor =
    type === 'WATCH_OUT'
      ? theme.colors.red
      : theme.colors.green;

  return (
    <MotiView
      from={{ opacity: 0, translateY: 50 }}
      animate={{ opacity: 1, translateY: 0 }}
      delay={delay}
      transition={{ type: 'spring', damping: 12 }}
      style={[
        styles.card,
        { backgroundColor: bgColor },
        theme.shadows.soft,
      ]}
    >
      <View style={styles.header}>
        <Text style={[styles.title, { color: titleColor }]}>
          {type.replace('_', ' ')}
        </Text>
        {icon && (
          <Ionicons
            name={icon as any}
            size={20}
            color={theme.colors.secondary}
          />
        )}
      </View>

      <Text style={styles.content}>{title}</Text>
      <Text
        style={[
          styles.explanation,
          { color: theme.colors.secondary },
        ]}
      >
        {content}
      </Text>
    </MotiView>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  explanation: {
    fontSize: 14,
  },
});
