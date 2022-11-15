'use-strict';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import {
  createStackNavigator,
  StackHeaderProps,
} from '@react-navigation/stack';
import { StackTypeParamList } from './types';
import EventScreen from './screens/EventScreen';
import NewEventScreen from './screens/NewEventScreen';
import Header from './components/Header';
import { useFonts } from 'expo-font';

const Stack = createStackNavigator<StackTypeParamList>();

export default function App() {
  const header = (props: StackHeaderProps) => <Header {...props} />;

  const [loaded] = useFonts({
    'Kanit-Regular': require('./assets/fonts/Kanit/Kanit-Regular.ttf'),
    'Kanit-Bold': require('./assets/fonts/Kanit/Kanit-Bold.ttf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator>
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{
            header: header,
          }}
        />
        <Stack.Screen
          name="EventScreen"
          component={EventScreen}
          options={{
            header: header,
            headerTitle: 'Title',
          }}
        />
        <Stack.Screen
          name="NewEventScreen"
          component={NewEventScreen}
          options={{
            header: header,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
