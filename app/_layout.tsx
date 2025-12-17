import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { router, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import Ionicons from '@react-native-vector-icons/ionicons';

import { useColorScheme } from '@/hooks/use-color-scheme';
import CategoryProvider from '@/store/CategoryProvider';
import QuestionsProvider from '@/store/QuestionsProvider';
import ResultProvider from '@/store/ResultProvider';
import { HeaderBackButton } from '@react-navigation/elements';
import { StyleSheet } from 'react-native';


const ReviewModalLight = () => {
  return (
    <HeaderBackButton
      backImage={() => <Ionicons name="close-outline" size={24} />} 
      onPress={() => router.dismiss()}
      style={{}}
    />
  );
}

const WelcomeScreenBackButton = () => {
  return (
    <HeaderBackButton
      backImage={() => <Ionicons name="chevron-back-outline" size={24} />} 
      onPress={() => router.back()}
      style={{ paddingLeft: 8 }}
    />
  );
}

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <CategoryProvider>
        <QuestionsProvider>
          <ResultProvider>
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="index" />
              <Stack.Screen 
                name="welcome" 
                options={{ 
                  headerShown: true, 
                  headerTitle: "",
                  headerLeft: () => <WelcomeScreenBackButton />
                }} 
              />
              <Stack.Screen name="question" />
              <Stack.Screen name="result" />
              <Stack.Screen 
                name="review" 
                options={{ 
                  presentation: 'modal',
                  headerShown: true,
                  title: 'Review',
                  headerLeft: () => <ReviewModalLight />
                }} 
              />
            </Stack>
            <StatusBar style="auto" />
          </ResultProvider>
        </QuestionsProvider>
      </CategoryProvider>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  icon: {
      color: "#000000",
      padding: 12,
  }
});