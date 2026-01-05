import * as SecureStore from 'expo-secure-store';
import { login } from './api';

export interface AuthState {
  token: string | null;
  userId: string | null;
  isLoading: boolean;
}

export const signIn = async (email: string, password: string): Promise<AuthState> => {
  const { token, userId } = await login({ email, password });
  await SecureStore.setItemAsync('userToken', token);
  await SecureStore.setItemAsync('userId', userId);
  return { token, userId, isLoading: false };
};

export const signOut = async () => {
  await SecureStore.deleteItemAsync('userToken');
  await SecureStore.deleteItemAsync('userId');
};

export const getAuthState = async (): Promise<AuthState> => {
  const token = await SecureStore.getItemAsync('userToken');
  const userId = await SecureStore.getItemAsync('userId');
  return { token, userId, isLoading: false };
};