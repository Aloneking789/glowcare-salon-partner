import createContextHook from '@nkzw/create-context-hook';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { AuthUser } from '@/types';

const AUTH_KEY = '@auth_user';

export const [AuthProvider, useAuth] = createContextHook(() => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const stored = await AsyncStorage.getItem(AUTH_KEY);
      if (stored) {
        const userData = JSON.parse(stored);
        setUser(userData);
      }
    } catch (error) {
      console.error('Failed to load user:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (userData: AuthUser) => {
    try {
      await AsyncStorage.setItem(AUTH_KEY, JSON.stringify(userData));
      setUser(userData);
      
      if (userData.role === 'salon') {
        router.replace('/salon/(tabs)');
      } else {
        router.replace('/partner/(tabs)');
      }
    } catch (error) {
      console.error('Failed to save user:', error);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem(AUTH_KEY);
      setUser(null);
      router.replace('/');
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };

  return {
    user,
    isLoading,
    login,
    logout,
    isAuthenticated: !!user,
  };
});
