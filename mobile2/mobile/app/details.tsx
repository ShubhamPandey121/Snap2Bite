import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Insight } from '~/types';
import { useTheme } from '~/providers/ThemeProvider';

export default function Details() {
  const { insight: jsonInsight } =
    useLocalSearchParams<{ insight: string }>();

  const insight: Insight = JSON.parse(jsonInsight);
  const router = useRouter();
  const theme = useTheme();

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.bg }]}
    >
      <View style={styles.header}>
        <Text
          style={[
            theme.typography.h1,
            { color: theme.colors.text },
          ]}
        >
          Details
        </Text>
      </View>

      <Text style={styles.title}>{insight.text}</Text>

      <Text
        style={[
          styles.explanation,
          { color: theme.colors.secondary },
        ]}
      >
        {insight.explanation}
      </Text>

      {/* Full chemical breakdown, sources */}

      <TouchableOpacity
        onPress={() => router.back()}
        style={styles.backBtn}
      >
        <Text style={{ color: theme.colors.green }}>
          Back to Summary
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
  },
  explanation: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
  },
  backBtn: {
    padding: 16,
    alignItems: 'center',
  },
});
