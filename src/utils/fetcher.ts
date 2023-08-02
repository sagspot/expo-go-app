import { IRefreshToken, ISession } from '@/types/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AxiosError } from 'axios';
import { apiUrl } from './constants';
import { getErrorMessage } from './getErrorMessage';

interface Props {
  method?: 'GET' | 'POST' | 'PATCH' | 'DELETE';
  data?: Record<string, any>;
  type?: 'json' | 'form';
}

export const fetcher = async <T = any>(url: string, options?: Props) => {
  const method = options?.method ?? 'GET';
  const type =
    options?.type && options.type === 'form'
      ? 'multipart/form-data'
      : 'application/json';
  const data = options?.data ?? undefined;

  const headers = { 'Content-Type': type };

  try {
    const res = await apiUrl<T>({ method, url, data, headers });
    return res.data;
  } catch (error) {
    throw getErrorMessage(error);
  }
};

export const createSession = async (session: ISession) => {
  await AsyncStorage.setItem('session', JSON.stringify(session));
  apiUrl.defaults.headers.common[
    'Authorization'
  ] = `Bearer ${session.AccessToken}`;
};

export const destroySession = async () => {
  await AsyncStorage.removeItem('session');
  apiUrl.defaults.headers.common['Authorization'] = undefined;
};

export const refreshSession = async () => {
  try {
    const storedSession = await AsyncStorage.getItem('session');
    if (!storedSession)
      throw { message: 'Access denied. Missing or invalid credentials' };
    const session = JSON.parse(storedSession) as ISession;

    const { data } = await apiUrl.get<IRefreshToken>(
      `/v1/auth/refresh?username=${session.user.username}`,
      { headers: { Authorization: `Bearer ${session.RefreshToken}` } }
    );
    const newSession = {
      ...session,
      AccessToken: data.AccessToken,
      ExpiresAt: Date.now() + data.ExpiresIn * 1000,
    };
    return newSession;
  } catch (error) {
    throw getErrorMessage(error);
  }
};

apiUrl.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      try {
        const refreshedSession = await refreshSession();

        await createSession(refreshedSession);
        if (error.config) return apiUrl.request(error.config);
        throw error;
      } catch (error) {
        await destroySession();
        throw error;
      }
    } else {
      throw error;
    }
  }
);
