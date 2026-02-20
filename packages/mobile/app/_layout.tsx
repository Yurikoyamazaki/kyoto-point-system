import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';

// スプラッシュスクリーンを表示し続ける
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useEffect(() => {
    // アプリの準備ができたらスプラッシュスクリーンを非表示
    SplashScreen.hideAsync();
  }, []);

  return (
    <>
      <StatusBar style="auto" />
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: '#6366F1',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen 
          name="(tabs)" 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="auth/login" 
          options={{ title: 'ログイン' }} 
        />
        <Stack.Screen 
          name="auth/register" 
          options={{ title: '新規登録' }} 
        />
        <Stack.Screen 
          name="payment/scan" 
          options={{ title: 'QRコードスキャン' }} 
        />
        <Stack.Screen 
          name="payment/confirm" 
          options={{ title: '決済確認' }} 
        />
      </Stack>
    </>
  );
}
