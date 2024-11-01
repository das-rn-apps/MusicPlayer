import { ColorSchemeProvider } from '@/hooks/ColorSchemeContext';
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <ColorSchemeProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="profile" options={{ headerShown: false }} />
      </Stack>
    </ColorSchemeProvider>
  );
}
