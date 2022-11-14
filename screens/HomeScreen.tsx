import { StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import Profile from '../components/Profile';
import Home from '../components/Home';
import { Event, PropsHomeScreen } from '../types';
import FooterIcon from '../components/FooterIcon';
import Search from '../components/Search';
import Icons from '../components/Icons';
import { TouchableOpacity } from 'react-native-gesture-handler';

const HomeScreen = ({ route, navigation }: PropsHomeScreen) => {
  const [tab, setTab] = useState('home');

  const handleEventClick = (eventClicked: Event) => {
    navigation.navigate('EventScreen', {
      event: eventClicked,
      user: route.params.user,
    });
  };

  const handleNewEventClick = () => {
    navigation.navigate('NewEventScreen', {
      user: route.params.user,
    });
  };

  const getSelectedTab = () => {
    if (tab === 'profile') {
      return <Profile user={route.params.user} />;
    }
    if (tab === 'search') {
      return (
        <Search handleEventClick={handleEventClick} user={route.params.user} />
      );
    } else {
      return <Home handleEventClick={handleEventClick} />;
    }
  };

  return (
    <View style={styles.flex1}>
      <View style={styles.flex1}>{getSelectedTab()}</View>
      {tab !== 'profile' ? (
        <View style={styles.addEvent}>
          <TouchableOpacity onPress={handleNewEventClick}>
            <Icons icon="calendar-plus-o" />
          </TouchableOpacity>
        </View>
      ) : null}
      <View style={[styles.footer, styles.shadow]}>
        <FooterIcon
          setTab={() => setTab('home')}
          icon={'home'}
          tabName={'home'}
          tab={tab}
        />
        <FooterIcon
          setTab={() => setTab('search')}
          icon={'calendar'}
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
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 10,
  },
  addEvent: {
    backgroundColor: '#0741AD',
    width: 60,
    height: 60,
    borderRadius: 40,
    position: 'absolute',
    bottom: '7%',
    right: 0,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: {
    height: '7%',
    backgroundColor: '#0741AD',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});
