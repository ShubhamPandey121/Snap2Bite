import * as SQLite from 'expo-sqlite';
import { Scan } from '../types';

type DBScan = Omit<Scan, 'humanInsights' | 'createdAt'> & {
  humanInsights: string;
  createdAt: string;
};

const db = SQLite.openDatabaseSync('copilot.db');

/* ✅ Runtime-safe MMKV loading */
let mmkv: any = null;

try {
  const { MMKV } = require('react-native-mmkv');
  mmkv = new MMKV({ id: 'ui-state' });
} catch {
  console.warn('MMKV not available');
}

/* Init DB */
export const initDB = () => {
  db.execSync(`
    PRAGMA foreign_keys = ON;
    CREATE TABLE IF NOT EXISTS scans (
      id TEXT PRIMARY KEY,
      userId TEXT NOT NULL,
      rawIngredients TEXT,
      summaryVerdict TEXT,
      humanInsights TEXT,
      uncertaintyLevel TEXT,
      imageUri TEXT,
      createdAt TEXT DEFAULT CURRENT_TIMESTAMP
    );
  `);
};

/* Insert scan */
export const insertScan = (scan: Omit<Scan, 'createdAt'>) => {
  db.runSync(
    `
    INSERT OR REPLACE INTO scans
    (id, userId, rawIngredients, summaryVerdict, humanInsights, uncertaintyLevel, imageUri)
    VALUES (?, ?, ?, ?, ?, ?, ?)
    `,
    [
      scan.id,
      scan.userId,
      scan.rawIngredients ?? null,
      scan.summaryVerdict ?? null,
      JSON.stringify(scan.humanInsights),
      scan.uncertaintyLevel ?? null,
      scan.imageUri ?? null,
    ]
  );

  mmkv?.set(`recent-${scan.id}`, JSON.stringify(scan));
};

/* Fetch scans */
export const getScans = (): Scan[] => {
  const rows = db.getAllSync<DBScan>(
    'SELECT * FROM scans ORDER BY createdAt DESC'
  );

  return rows.map(row => ({
    ...row,
    humanInsights: JSON.parse(row.humanInsights),
  }));
};

export const deleteScan = (id: string) => {
  db.runSync('DELETE FROM scans WHERE id = ?', [id]);
  mmkv?.delete?.(`recent-${id}`);
};

export const clearHistory = () => {
  db.runSync('DELETE FROM scans');
  mmkv?.clearAll?.();
};

export const getRecentScan = (id: string): Scan | null => {
  const stored = mmkv?.getString?.(`recent-${id}`);
  return stored ? JSON.parse(stored) : null;
};
