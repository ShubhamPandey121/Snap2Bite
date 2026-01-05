import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  Alert,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { InsightCard } from '../components/ui/Card';
import { DoodleNote } from '../components/DoodleNote';
import { useTheme } from '../providers/ThemeProvider';
import { generateDoodle, translate } from '../lib/utils/translator';
import { getUncertainty } from '../lib/api';
import { AnalyzeResponse, Insight } from '../types';
import { Button } from '../components/ui/Button';

type UncertaintyRegime = 'Stable' | 'Critical' | 'Drifting';

export default function Summary() {
  const { data: jsonData, scanId } =
    useLocalSearchParams<{ data: string; scanId: string }>();

  const [data] = useState<AnalyzeResponse>(
    JSON.parse(jsonData)
  );

  const [uncertainty, setUncertainty] = useState<{
    regime: UncertaintyRegime;
    confidence: number;
  }>({ regime: 'Stable', confidence: 1 });

  const router = useRouter();
  const theme = useTheme();

  useEffect(() => {
    if (!scanId) return;

    getUncertainty(scanId)
      .then(setUncertainty)
      .catch(() =>
        setUncertainty({ regime: 'Drifting', confidence: 0.7 })
      );
  }, [scanId]);

  const renderCards = () =>
    data.insights.map((insight: Insight, i: number) => (
      <InsightCard
        key={i}
        type={insight.type}
        title={insight.text}
        content={translate(insight.text).explanation}
        icon={
          insight.type === 'WATCH_OUT'
            ? 'warning'
            : 'checkmark-circle'
        }
        delay={300 + i * 150}
      />
    ));

  const handleRescan = () =>
    Alert.alert(
      'Rescan',
      'Flatten label and try again.',
      [{ text: 'OK', onPress: () => router.back() }]
    );

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.bg }]}
      contentContainerStyle={styles.content}
    >
      {/* Header */}
      <View style={styles.header}>
        <Ionicons
          name="chevron-back"
          size={24}
          color={theme.colors.text}
          onPress={() => router.back()}
        />
        <Text style={[theme.typography.h1, styles.title]}>
          SUMMARY
        </Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Verdict */}
      <View style={styles.verdictContainer}>
        <Ionicons
          name="leaf"
          size={32}
          color={theme.colors.green}
        />
        <Text
          style={[
            theme.typography.verdict,
            { color: theme.colors.text },
          ]}
        >
          {data.verdict}
        </Text>
        <Text style={styles.subVerdict}>
          Verdict based on 12 ingredients found in your scan.
        </Text>
      </View>

      <DoodleNote note={generateDoodle(data.insights)} />

      {renderCards()}

      {/* Footer */}
      <View style={styles.footer}>
        <Text
          style={[
            styles.uncertainty,
            {
              color:
                uncertainty.regime === 'Critical'
                  ? theme.colors.red
                  : theme.colors.green,
            },
          ]}
        >
          Confidence: {uncertainty.regime} (
          {Math.round(uncertainty.confidence * 100)}%)
        </Text>

        <TouchableOpacity
          onPress={handleRescan}
          style={styles.rescanBtn}
        >
          <Text
            style={[
              styles.rescanText,
              { color: theme.colors.green },
            ]}
          >
            Rescan for Clarity
          </Text>
        </TouchableOpacity>

        <Button
          title="Scan Next Item"
          onPress={() => router.push('/')}
          variant="primary"
        />

        <Text
          style={[
            styles.disclaimer,
            { color: theme.colors.secondary },
          ]}
        >
          This is guidance, not medical advice.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    flex: 1,
    textAlign: 'center',
  },
  verdictContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  subVerdict: {
    textAlign: 'center',
    color: 'gray',
    marginTop: 8,
  },
  footer: {
    alignItems: 'center',
    marginTop: 20,
  },
  uncertainty: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 10,
  },
  rescanBtn: {
    padding: 8,
  },
  rescanText: {
    fontSize: 14,
  },
  disclaimer: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 12,
  },
});
