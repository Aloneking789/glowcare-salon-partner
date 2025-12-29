// template
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AuthProvider } from "@/contexts/AuthContext";
import { PopupHost, PopupProvider } from "@/components/popup";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

function RootLayoutNav() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="role-select" />
      <Stack.Screen name="salon-login" />
      <Stack.Screen name="salon-register" />
      <Stack.Screen name="partner-login" />
      <Stack.Screen name="partner-register" />
      <Stack.Screen name="salon/(tabs)" />
      <Stack.Screen name="partner/(tabs)" />
    </Stack>
  );
}

export default function RootLayout() {
  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <PopupProvider>
          <GestureHandlerRootView>
            <RootLayoutNav />
            <PopupHost />
          </GestureHandlerRootView>
        </PopupProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
