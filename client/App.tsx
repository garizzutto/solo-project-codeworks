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
import { StyleSheet } from 'react-native';
import NewEventScreen from './screens/NewEventScreen';
import Header from './components/Header';
import Icons from './components/Icons';
import { useFonts } from 'expo-font';

const Stack = createStackNavigator<StackTypeParamList>();

export default function App() {
  const headerBackImage = () => (
    <Icons icon="angle-left" color="white" size={30} />
  );

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
            // headerTransparent: true,
            headerTitle: 'Title',
            headerTitleStyle: styles.eventHeaderTitle,
            headerTitleAlign: 'center',
            headerBackImage: headerBackImage,
            headerStyle: styles.eventHeader,
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

const styles = StyleSheet.create({
  eventHeaderTitle: {
    fontSize: 30,
    fontFamily: 'Kanit-Regular',
    color: '#fff',
  },
  eventHeader: {
    backgroundColor: '#0741AD',
  },
});
