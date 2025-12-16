import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';
import CategoryProvider from '@/store/CategoryProvider';
import QuestionsProvider from '@/store/QuestionsProvider';
import ResultProvider from '@/store/ResultProvider';

// const InitialLayout = () => {

// }

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <CategoryProvider>
        <QuestionsProvider>
          <ResultProvider>
            <Stack>
              <Stack.Screen name="index" options={{ headerShown: false }} />
              <Stack.Screen name="welcome" />
              <Stack.Screen name="question" options={{ headerTitle: "" }}/>
              <Stack.Screen name="result" options={{ headerTitle: "" }}/>
              {/* <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} /> */}
            </Stack>
            <StatusBar style="auto" />
          </ResultProvider>
        </QuestionsProvider>
      </CategoryProvider>
    </ThemeProvider>
  );
}
