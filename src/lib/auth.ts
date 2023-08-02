import {
  ISession,
  ISignInResponse,
  ISignInValues,
  ISignUpResponse,
  ISignUpValues,
} from '@/types/auth';
import {
  createSession,
  destroySession,
  fetcher,
  refreshSession,
} from '@/utils/fetcher';
import { getErrorMessage } from '@/utils/getErrorMessage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

export const signIn = async (data: ISignInValues) => {
  try {
    const response = await fetcher<ISignInResponse>('/v1/auth/signin', {
      method: 'POST',
      data,
    });
    const { AccessToken, ExpiresIn, RefreshToken, user } = response;
    const { id, name, phone, username } = user;

    const session: ISession = {
      user: { id, name, phone, username },
      AccessToken,
      ExpiresAt: Date.now() + ExpiresIn * 1000,
      RefreshToken,
    };

    await createSession(session);
    return session;
  } catch (error) {
    Alert.alert('Error Signing in', getErrorMessage(error));
    throw error;
  }
};

export const signUp = async (data: ISignUpValues) => {
  try {
    await fetcher<ISignUpResponse>('/v1/auth/signup', { method: 'POST', data });
    const session = await signIn({
      identifier: data.phone,
      password: data.password,
    });
    return session;
  } catch (error) {
    Alert.alert('Error Signing up', getErrorMessage(error));
    throw error;
  }
};

export const signOut = async () => {
  try {
    await destroySession();
  } catch (error) {
    Alert.alert('Error Signing out', getErrorMessage(error));
    throw error;
  }
};

export const getSessionFromStorage = async () => {
  try {
    const storedSession = await AsyncStorage.getItem('session');
    if (!storedSession)
      throw { message: 'Access denied. Missing or invalid credentials' };
    const session = JSON.parse(storedSession) as ISession;
    if (Date.now() < session.ExpiresAt) return session;

    const refreshedSession = await refreshSession();

    await createSession(refreshedSession);
    return refreshedSession;
  } catch (error) {
    throw 'RefreshTokenError' as const;
  }
};
