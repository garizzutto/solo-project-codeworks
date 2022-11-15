import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { FontAwesome } from '@expo/vector-icons';

export type StackTypeParamList = {
  LoginScreen: {};
  HomeScreen: {
    user: User;
  };
  EventScreen: {
    user: User;
    event: Event;
  };
  NewEventScreen: {
    user: User;
  };
};

export type PropsLoginScreen = NativeStackScreenProps<
  StackTypeParamList,
  'LoginScreen'
>;
export type PropsHomeScreen = NativeStackScreenProps<
  StackTypeParamList,
  'HomeScreen'
>;
export type PropsEventScreen = NativeStackScreenProps<
  StackTypeParamList,
  'EventScreen'
>;
export type PropsNewEventScreen = NativeStackScreenProps<
  StackTypeParamList,
  'NewEventScreen'
>;

export type User = {
  email: string;
  uid: string;
  profileImageUrl?: string;
};

export type Event = {
  imageUrl: string;
  title: string;
  description?: string;
  attendees?: Array<string>;
  timestamp: string;
  location: string;
  creator: string;
  id: string;
};

export type IconName = React.ComponentProps<typeof FontAwesome>['name'];
