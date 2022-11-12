import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import Profile from '../components/Profile';
import Home from '../components/Home';
import { Event, PropsHomeScreen } from '../types';
import FooterIcon from '../components/FooterIcon';

const HomeScreen = ({ route, navigation }: PropsHomeScreen) => {
  const [tab, setTab] = useState('home');

  const handleEventClick = (eventClicked: Event) => {
    navigation.navigate('EventScreen', {
      event: eventClicked,
      user: route.params.user,
    });
  };

  const getSelectedTab = () => {
    if (tab === 'profile') {
      return <Profile user={route.params.user} />;
    } else {
      return <Home handleEventClick={handleEventClick} />;
    }
  };

  return (
    <View style={styles.flex1}>
      <View style={[styles.header, styles.shadow]}>
        <Text style={styles.title}>Where2GO</Text>
      </View>
      <View style={styles.flex1}>{getSelectedTab()}</View>
      <View style={[styles.footer, styles.shadow]}>
        <FooterIcon
          setTab={() => setTab('home')}
          icon={'home'}
          tabName={'home'}
          tab={tab}
        />
        <FooterIcon
          setTab={() => setTab('search')}
          icon={'search'}
          tabName={'search'}
          tab={tab}
        />
        <FooterIcon
          setTab={() => setTab('profile')}
          icon={'user'}
          tabName={'profile'}
          tab={tab}
        />
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
});
