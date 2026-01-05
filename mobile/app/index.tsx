import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Alert,
  StyleSheet,
} from 'react-native';
import { Redirect, useFocusEffect } from 'expo-router';
import { Button } from '../components/ui/Button';
import { ScannerBlob } from '../components/ScannerBlob';
import { useScan } from '../lib/hooks/useScan';
import { useAuth } from '../providers/AuthProvider';
import { useTheme } from '../providers/ThemeProvider';

export default function Home() {
  const { auth } = useAuth();
  const theme = useTheme();

  if (!auth.userId) {
    return <Redirect href="/auth/login" />;
  }

  const { takePhoto, pickImage, processText, useSample, isScanning } =
    useScan(auth.userId);

  const showPasteModal = () => {
    Alert.prompt(
      'Paste Ingredients',
      'Enter list:',
      (text?: string) => {
        if (text) processText(text);
      }
    );
  };

  useFocusEffect(() => {
    // optional: reset animation / state
  });

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.bg }]}
    >
      <ScannerBlob />

      <View style={styles.bubble}>
        <Text style={[styles.bubbleText, { color: theme.colors.text }]}>
          Show me what{' '}
          <Text style={styles.bold}>you&apos;re eating</Text> 🍎
        </Text>
        <Text style={styles.subtext}>
          I can help you understand tricky ingredients!
        </Text>
      </View>

      <Button
        title="Snap ingredients label"
        onPress={takePhoto}
        variant="primary"
        disabled={isScanning}
      />

      <Button
        title="Paste ingredients text"
        onPress={showPasteModal}
        variant="secondary"
      />

      <Button
        title="Use a sample product"
        onPress={useSample}
        variant="tertiary"
      />

      <Text
        style={[
          styles.disclaimer,
          { color: theme.colors.secondary },
        ]}
      >
        This is guidance, not medical advice.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bubble: {
    backgroundColor: 'rgba(74, 222, 128, 0.1)',
    padding: 16,
    borderRadius: 20,
    marginHorizontal: 20,
    marginBottom: 32,
    alignItems: 'center',
  },
  bubbleText: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: '600',
  },
  bold: {
    fontWeight: '700',
  },
  subtext: {
    fontSize: 16,
    textAlign: 'center',
    color: 'gray',
    marginTop: 6,
  },
  disclaimer: {
    textAlign: 'center',
    marginTop: 20,
    paddingHorizontal: 20,
  },
});
