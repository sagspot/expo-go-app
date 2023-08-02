import { Stack } from 'expo-router';

export default function AuthStackLayout() {
  return (
    <Stack>
      <Stack.Screen name="landing" options={{ headerShown: false }} />
      <Stack.Screen name="signin" options={{ title: 'Sign In' }} />
      <Stack.Screen name="signup" options={{ title: 'Create Account' }} />
    </Stack>
  );
}
