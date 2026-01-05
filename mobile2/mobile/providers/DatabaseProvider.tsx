import React, { createContext, useContext, ReactNode } from 'react';
import { initDB } from '../lib/db';

type DBContextType = {};

const DBContext = createContext<DBContextType | null>(null);

export const DatabaseProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  initDB();

  return (
    <DBContext.Provider value={{}}>
      {children}
    </DBContext.Provider>
  );
};

export const useDB = () => {
  const context = useContext(DBContext);
  if (!context) {
    throw new Error('useDB must be used within a DatabaseProvider');
  }
  return context;
};
