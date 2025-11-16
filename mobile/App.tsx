import React from 'react';
import { NavigationContainer, DefaultTheme, Theme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

import AuthScreen from './src/screens/AuthScreen';
import HomeScreen from './src/screens/HomeScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import TeleconsultScreen from './src/screens/TeleconsultScreen';
import RecordsScreen from './src/screens/RecordsScreen';
import PharmacyScreen from './src/screens/PharmacyScreen';
import SymptomCheckerScreen from './src/screens/SymptomCheckerScreen';
import { COLORS } from './src/theme/colors';

export type RootStackParamList = {
  Auth: undefined;
  Home: undefined;
  Profile: undefined;
  Teleconsult: undefined;
  Records: undefined;
  Pharmacy: undefined;
  SymptomChecker: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: COLORS.primary,
    background: COLORS.background,
    card: COLORS.surface,
    text: COLORS.textPrimary,
    border: COLORS.border,
    notification: COLORS.primaryDark,
  },
};

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <NavigationContainer theme={AppTheme}>
        <Stack.Navigator
          initialRouteName="Auth"
          screenOptions={{
            headerStyle: { backgroundColor: COLORS.surface },
            headerTintColor: COLORS.textPrimary,
            headerTitleStyle: { color: COLORS.textPrimary },
            contentStyle: { backgroundColor: COLORS.background },
          }}
        >
          <Stack.Screen name="Auth" component={AuthScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen
            name="Teleconsult"
            component={TeleconsultScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Records" component={RecordsScreen} />
          <Stack.Screen name="Pharmacy" component={PharmacyScreen} />
          <Stack.Screen name="SymptomChecker" component={SymptomCheckerScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
