import React from 'react';
import { View, FlatList, Text, Alert, TouchableOpacity } from 'react-native';
import { HistoryItem } from '~/components/HistoryItem';
import { useHistory } from '~/lib/hooks/useHistory';
import { useTheme } from '~/providers/ThemeProvider';
import { Ionicons } from '@expo/vector-icons';

export default function History() {
  const { scans, remove, cloudSync } = useHistory();
  const theme = useTheme();

  const handleClearAll = () => Alert.alert('Clear History?', 'This deletes all local scans.', [
    { text: 'Cancel' },
    { text: 'Clear', onPress: () => { clearHistory(); refresh(); } },
  ]);

  if (scans.length === 0) return (
    <View style={styles.empty}>
      <Text style={{ color: theme.colors.secondary }}>No scans yet – start one!</Text>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.bg, padding: 20 }}>
      <FlatList
        data={scans}
        renderItem={({ item }) => <HistoryItem scan={item} onDelete={() => remove(item.id)} />}
        keyExtractor={(item) => item.id}
      />
      <View style={styles.actions}>
        <TouchableOpacity onPress={cloudSync} style={styles.btn}>
          <Ionicons name="cloud-upload" size={20} color={theme.colors.green} />
          <Text style={styles.btnText}>Sync to Cloud</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleClearAll} style={[styles.btn, { borderColor: theme.colors.red }]}>
          <Ionicons name="trash" size={20} color={theme.colors.red} />
          <Text style={[styles.btnText, { color: theme.colors.red }]}>Clear All</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = {
  empty: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  actions: { flexDirection: 'row', justifyContent: 'space-around', padding: 20 },
  btn: { flexDirection: 'row', alignItems: 'center', padding: 12, borderWidth: 1, borderRadius: 8 },
  btnText: { marginLeft: 8, fontWeight: '500' },
};