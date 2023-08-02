import { Stack } from 'expo-router';

export default function SettingStackLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Settings' }} />
    </Stack>
  );
}
