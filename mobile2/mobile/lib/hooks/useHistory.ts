import { useState, useEffect } from 'react';
import { Alert } from 'react-native';

import { getScans, deleteScan } from '../db';
import { syncHistory } from '../api';

import { Scan } from '../../types';
import { useAuth } from '../../providers/AuthProvider';

export const useHistory = () => {
  const [scans, setScans] = useState<Scan[]>([]);
  const { auth } = useAuth();
  const userId = auth?.userId;

  const refresh = () => {
    if (!userId) return;
    setScans(getScans().filter(s => s.userId === userId));
  };

  useEffect(() => {
    refresh();
  }, [userId]);

  const remove = (id: string) => {
    deleteScan(id);
    refresh();
  };

  const cloudSync = async () => {
    if (!userId) return;

    const synced = await syncHistory(scans, userId);
    Alert.alert('Synced', `${synced.synced} items backed up.`);
  };

  return {
    scans,
    refresh,
    remove,
    cloudSync,
  };
};
