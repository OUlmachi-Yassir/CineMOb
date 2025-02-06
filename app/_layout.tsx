import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="index" options={{ headerShown:false }} />
      <Stack.Screen name="login" options={{ headerShown:false }} />
      <Stack.Screen name="signup" options={{ headerShown:false }} />
      <Stack.Screen name="FilmDetails" options={{ headerShown: true, title: 'Film Details' }} />

      {/* <Stack.Screen name="NotFound" /> */}
    </Stack>
  );
}