import React, { createContext, useContext } from 'react';
import { ViewStyle, TextStyle } from 'react-native';

/* 1️⃣ Theme type (optional but recommended) */
type Theme = {
  colors: {
    teal: string;
    green: string;
    yellow: string;
    red: string;
    pink: string;
    mint: string;
    bg: string;
    text: string;
    secondary: string;
  };
  shadows: {
    soft: ViewStyle;
  };
  typography: {
    h1: TextStyle;
    body: TextStyle;
    verdict: TextStyle;
  };
};

/* 2️⃣ Theme object (PLAIN OBJECT ✅) */
const theme: Theme = {
  colors: {
    teal: '#0ea5e9',
    green: '#4ade80',
    yellow: '#fbbf24',
    red: '#f87171',
    pink: '#f9a8d4',
    mint: '#a7f3d0',
    bg: '#f9fafb',
    text: '#111827',
    secondary: '#6b7280',
  },
  shadows: {
    soft: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 4,
    },
  },
  typography: {
    h1: { fontSize: 28, fontWeight: 'bold' },
    body: { fontSize: 16, lineHeight: 24 },
    verdict: { fontSize: 24, fontWeight: '600' },
  },
};

/* 3️⃣ Context */
const ThemeContext = createContext<Theme>(theme);

/* 4️⃣ Provider */
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ThemeContext.Provider value={theme}>
    {children}
  </ThemeContext.Provider>
);

/* 5️⃣ Hook */
export const useTheme = () => useContext(ThemeContext);
