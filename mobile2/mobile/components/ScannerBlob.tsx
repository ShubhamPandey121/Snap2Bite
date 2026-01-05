import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { MotiView } from 'moti';
import { usePulse } from '../lib/hooks/usePulse';
import { useTheme } from '../providers/ThemeProvider';

export const ScannerBlob = () => {
  const { startPulse, animatedStyle } = usePulse();
  const theme = useTheme();

  useEffect(() => {
    startPulse();
  }, [startPulse]);

  return (
    <View style={styles.container}>
      <MotiView
        style={[
          styles.blob,
          { backgroundColor: theme.colors.teal },
          animatedStyle,
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  blob: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 20,
  },
});
