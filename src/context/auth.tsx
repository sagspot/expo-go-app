import { getSessionFromStorage, signIn, signOut, signUp } from '@/lib/auth';
import {
  IAuthContext,
  ISession,
  ISignInValues,
  ISignUpValues,
} from '@/types/auth';
import { router, useRootNavigation, useSegments } from 'expo-router';
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

const AuthContext = createContext<IAuthContext | null>(null);

interface ProtectedRouteProps {
  session: ISession | null;
  authInitialized: boolean;
}

const useProtectedRoute = (props: ProtectedRouteProps) => {
  const { session, authInitialized } = props;
  const segments = useSegments();
  // checking if navigation is ready
  const [isNavigationReady, setIsNavigationReady] = useState(false);
  const rootNavigation = useRootNavigation();

  useEffect(() => {
    const unsubscribe = rootNavigation?.addListener('state', (event) => {
      setIsNavigationReady(true);
    });
    return function cleanup() {
      if (unsubscribe) unsubscribe();
    };
  }, [rootNavigation]);

  useEffect(() => {
    // console.log('session changesd and the new value is: ', session);
    if (!isNavigationReady) return;

    const inAuthGroup = segments[0] === '(auth)';

    if (!authInitialized) return;

    if (!session && !inAuthGroup) router.replace('/landing');
    else if (!!session && inAuthGroup) router.replace('/');
  }, [session, segments, authInitialized, isNavigationReady]);
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<ISession | null>(null);
  const [authInitialized, setAuthInitialized] = useState(false);

  // This hook protects route access based on user authentication.
  useProtectedRoute({ session, authInitialized });

  const logout = async () => {
    try {
      await signOut();
    } catch (error) {
    } finally {
      setSession(null);
    }
  };

  const login = async (data: ISignInValues) => {
    try {
      const res = await signIn(data);
      setSession(res);
    } catch (error) {
      await logout();
    }
  };
  const register = async (data: ISignUpValues) => {
    try {
      const res = await signUp(data);
      setSession(res);
    } catch (error) {
      await logout();
    }
  };

  // Initialize session from AsyncStorage
  useEffect(() => {
    (async () => {
      try {
        const session = await getSessionFromStorage();
        setSession(session);
      } catch (error) {
        await logout();
      } finally {
        setAuthInitialized(true);
      }
    })();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signIn: login,
        signUp: register,
        signOut: logout,
        session,
        authInitialized,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// This hook can be used to access the user info.
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error('useAuth must be used within an AuthContextProvider');
  return context;
};
