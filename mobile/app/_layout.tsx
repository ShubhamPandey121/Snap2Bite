import { Stack } from 'expo-router';
import { AuthProvider } from '../providers/AuthProvider';
import { DatabaseProvider } from '../providers/DatabaseProvider';
import { ThemeProvider } from '../providers/ThemeProvider';

export default function RootLayout() {
  return (
    <AuthProvider>
      <DatabaseProvider>
        <ThemeProvider>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="summary" />
            <Stack.Screen name="details" />
            <Stack.Screen name="history" options={{ presentation: 'modal' }} />
            <Stack.Screen name="settings" options={{ presentation: 'modal' }} />
            <Stack.Screen name="auth/login" />
          </Stack>
        </ThemeProvider>
      </DatabaseProvider>
    </AuthProvider>
  );
}
