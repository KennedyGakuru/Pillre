import React, { createContext, useState, useEffect, useContext } from 'react';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';
import { supabase } from 'lib/supabase';

// --- Define types ---
export type User = {
  id: string;
  name: string;
  email: string;
  phoneNumber?: string;
};

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  isSignedIn: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateUserProfile: (userData: Partial<User>) => Promise<void>;
};

// --- Create context ---
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// --- Provider ---
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      //console.log('Auth event:', event);

      if (event === 'SIGNED_OUT') {
        await clearStoredUser();
        setUser(null);
      }

      if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        const { session: newSession, error } = await supabase.auth.setSession({
          refresh_token: session?.refresh_token || '',
          access_token: session?.access_token || '',
        }) as { session: { user: any; refresh_token: string; access_token: string } | null; error: any };
        const supabaseUser = session?.user;
        if (!error && supabaseUser) {
          const updatedUser: User = {
            id: supabaseUser.id,
            name: supabaseUser.user_metadata?.name || '',
            email: supabaseUser.email || '',
          };
          setUser(updatedUser);
          await storeUser(updatedUser);
        }
      }
    });

    return () => {
      authListener?.unsubscribe(); // Unsubscribe directly from the authListener
    };
  }, []);

  const storeUser = async (userData: User) => {
    const userString = JSON.stringify(userData);
    if (Platform.OS === 'web') {
      localStorage.setItem('user', userString);
    } else {
      await SecureStore.setItemAsync('user', userString);
    }
  };

  const clearStoredUser = async () => {
    if (Platform.OS === 'web') {
      localStorage.removeItem('user');
    } else {
      await SecureStore.deleteItemAsync('user');
    }
  };

  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const { user: supabaseUser, error } = await supabase.auth.signIn({ email, password });

      if (error || !supabaseUser) throw error || new Error('User signIn failed');

      const user: User = {
        id: supabaseUser.id,
        name: supabaseUser.user_metadata?.name || '',
        email: supabaseUser.email || '',
      };

      setUser(user);
      await storeUser(user);
    } catch (e) {
      throw e;
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      const { user: supabaseUser, error } = await supabase.auth.signUp(
        { email, password },
        { data: { name } } // user_metadata
      );

      if (error || !supabaseUser) throw error || new Error('User signUp failed');

      const user: User = {
        id: supabaseUser.id,
        name,
        email: supabaseUser.email || '',
      };

      setUser(user);
      await storeUser(user);
    } catch (e) {
      throw e;
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    setIsLoading(true);
    try {
      await supabase.auth.signOut();
      await clearStoredUser();
      setUser(null);
    } catch (e) {
      throw e;
    } finally {
      setIsLoading(false);
    }
  };

  const updateUserProfile = async (userData: Partial<User>) => {
    setIsLoading(true);
    try {
      if (!user) throw new Error('Not signed in');
      const updated = { ...user, ...userData };
      setUser(updated);
      await storeUser(updated);
    } catch (e) {
      throw e;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, isSignedIn: !!user, signIn, signUp, signOut, updateUserProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

// --- Hook ---
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
