import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type StackTypeParamList = {
  LoginScreen: {};
  HomeScreen: {
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

export type User = {
  email: string;
  uid: string;
};

export type Event = {
  imageUrl: string;
  title: string;
  descripion: string;
  attendees: Array<User>;
  timestamp: string; //parse to date later
  location: string;
  id: string;
};
