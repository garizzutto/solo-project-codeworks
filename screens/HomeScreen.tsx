import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
import { FontAwesome } from '@expo/vector-icons';
import Profile from '../components/Profile';
import Home from '../components/Home';
import { PropsHomeScreen } from '../types';

// const Stack = createStackNavigator();

const HomeScreen = ({ route }: PropsHomeScreen) => {
  const [tab, setTab] = useState('home');

  const getSelectedTab = () => {
    if (tab === 'profile') {
      return <Profile user={route.params.user} />;
    } else {
      return <Home />;
    }
  };

  return (
    <View style={styles.flex1}>
      <View style={[styles.header, styles.shadow]}>
        <Text style={styles.title}>Where2GO</Text>
      </View>
      <View style={styles.flex1}>{getSelectedTab()}</View>
      <View style={[styles.footer, styles.shadow]}>
        <TouchableOpacity style={styles.flex1} onPress={() => setTab('home')}>
          <View
            style={[styles.line, tab === 'home' ? styles.selectedLine : null]}
          />
          <View style={styles.icons}>
            <FontAwesome name="home" size={24} color="white" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.flex1} onPress={() => setTab('search')}>
          <View
            style={[styles.line, tab === 'search' ? styles.selectedLine : null]}
          />
          <View style={styles.icons}>
            <FontAwesome name="search" size={24} color="white" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.flex1}
          onPress={() => setTab('profile')}
        >
          <View
            style={[
              styles.line,
              tab === 'profile' ? styles.selectedLine : null,
            ]}
          />
          <View style={styles.icons}>
            <FontAwesome name="user" size={24} color="white" />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  flex1: {
    flex: 1,
    height: '100%',
  },
  header: {
    height: '10%',
    backgroundColor: '#0741AD',
    alignItems: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 20,
    marginTop: 'auto',
    marginBottom: 15,
    fontWeight: 'bold',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 10,
  },
  footer: {
    height: '7%',
    backgroundColor: '#0741AD',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  icons: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  line: {
    width: '100%',
    height: 3,
    backgroundColor: '#727273',
    marginTop: 0,
  },
  selectedLine: {
    backgroundColor: '#fff',
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
  },
});
