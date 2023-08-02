import { ExpandRecursively } from './common';

export type ISignUpValues = ExpandRecursively<{
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
}>;

export type ISignUpResponse = ExpandRecursively<{
  message: string;
}>;

export type ISignInValues = ExpandRecursively<{
  identifier: string;
  password: string;
}>;

export type IUser = ExpandRecursively<{
  id: number;
  name: string;
  phone: string;
  email: string;
  phoneConfirmed: boolean;
  emailConfirmed: boolean;
  username: string;
}>;

export type ISignInResponse = ExpandRecursively<{
  user: IUser;
  AccessToken: string;
  ExpiresIn: number;
  IdToken: string;
  RefreshToken: string;
  TokenType: 'Bearer';
}>;

export interface IAuthContext {
  signIn: (data: ISignInValues) => Promise<void>;
  signUp: (data: ISignUpValues) => Promise<void>;
  signOut: () => Promise<void>;
  session: ISession | null;
  authInitialized: boolean;
}

export type ISession = ExpandRecursively<{
  user: {
    id: number;
    name: string;
    phone: string;
    username: string;
    image?: string;
  };
  AccessToken: string;
  ExpiresAt: number;
  RefreshToken: string;
}>;

export interface IRefreshToken {
  AccessToken: string;
  ExpiresIn: number;
  IdToken: string;
  TokenType: 'Bearer';
}
