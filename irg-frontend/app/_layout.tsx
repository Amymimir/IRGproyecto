import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Slot, SplashScreen } from 'expo-router';
import { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { Stack } from 'expo-router';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/useColorScheme';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  PlayfairDisplay_700Bold,
} from '@expo-google-fonts/playfair-display';
import {
  Inter_400Regular,
  Inter_600SemiBold,
} from '@expo-google-fonts/inter';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [fontsLoaded] = useFonts({
    PlayfairDisplay_700Bold,
    Inter_400Regular,
    Inter_600SemiBold,
    Playfair: require('../assets/fonts/PlayfairDisplay-Regular.ttf'),
    Inter: require('../assets/fonts/Inter-Regular.ttf'),
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (!fontsLoaded) SplashScreen.preventAutoHideAsync();
    else SplashScreen.hideAsync();
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <>
      <StatusBar backgroundColor="#2b2b2b" barStyle="light-content" translucent={false} />
      <SafeAreaView style={{ flex: 1, backgroundColor: '#2b2b2b' }}>
        <Slot />
      </SafeAreaView>
    </>
  );

}