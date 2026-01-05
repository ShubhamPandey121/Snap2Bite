import React, { useState } from 'react';
import {
  View,
  Text,
  Switch,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { useTheme } from '../providers/ThemeProvider';
import { Button } from '../components/ui/Button';
import { useAuth } from '../providers/AuthProvider';

export default function Settings() {
  const [syncEnabled, setSyncEnabled] = useState(false);
  const { signOut } = useAuth();
  const theme = useTheme();

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.bg }]}
    >
      <Text style={[styles.title, { color: theme.colors.text }]}>
        Settings
      </Text>

      <View style={styles.row}>
        <Text style={styles.label}>Cloud Sync</Text>
        <Switch
          value={syncEnabled}
          onValueChange={setSyncEnabled}
          trackColor={{ true: theme.colors.green }}
        />
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Privacy Mode</Text>
        <Switch value={true} trackColor={{ true: theme.colors.green }} />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>
        <Text style={[styles.text, { color: theme.colors.secondary }]}>
          Version 1.0.0 · Built with Expo
        </Text>
      </View>

      <Button title="Sign Out" onPress={signOut} variant="tertiary" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderColor: 'lightgray',
  },
  label: {
    fontSize: 16,
  },
  section: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  text: {
    fontSize: 14,
  },
});
