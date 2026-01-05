import axios, {
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
} from 'axios';
import Constants from 'expo-constants';
import * as SecureStore from 'expo-secure-store';
import { AnalyzeResponse, Scan } from '../types';

const API_URL =
  Constants.expoConfig?.extra?.API_URL ??
  'https://ingredient-copilot-api.onrender.com/api/v1';

const api = axios.create({
  baseURL: API_URL,
  timeout: 15000,
});

/* ✅ Request interceptor (FIXED) */
api.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const token = await SecureStore.getItemAsync('userToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  }
);

/* Response interceptor */
api.interceptors.response.use(
  (res: AxiosResponse) => res,
  async (err: AxiosError) => {
    if (err.response?.status === 401) {
      await SecureStore.deleteItemAsync('userToken');
    }
    return Promise.reject(err);
  }
);

/* API calls */
export const analyzeIngredients = async (
  payload: { text?: string; imageBase64?: string; userId: string }
): Promise<AnalyzeResponse> => {
  const endpoint = payload.imageBase64
    ? '/analyze/image'
    : '/analyze';

  const { data } = await api.post(endpoint, payload);
  return data;
};

export const login = async (credentials: {
  email: string;
  password: string;
}) => {
  const { data } = await api.post('/auth/login', credentials);
  return data;
};

export const getUncertainty = async (scanId: string) => {
  const { data } = await api.get(
    `/analyze/uncertainty?scanId=${scanId}`
  );
  return data;
};

export const syncHistory = async (
  history: Scan[],
  userId: string
) => {
  const { data } = await api.post('/history/sync', {
    history,
    userId,
  });
  return data;
};

export default api;
