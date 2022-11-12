import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Event } from '../types';
import moment from 'moment';

const EventItem = ({ event }: { event: Event }) => {
  const getDateNthMonth = (date: string) => {
    const parsed = moment(date).format('MMM Do');
    return parsed;
  };

  return (
    <View style={[styles.container, styles.shadow]}>
      <Image source={{ uri: event.imageUrl }} style={styles.image} />
      <View style={styles.eventInfo}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{event.title}</Text>
          <Text style={styles.location}>{event.location}</Text>
        </View>
        <Text style={styles.date}>{getDateNthMonth(event.timestamp)}</Text>
      </View>
    </View>
  );
};

export default EventItem;

const styles = StyleSheet.create({
  container: {
    height: 250,
    width: 300,
    marginLeft: 10,
  },
  image: {
    flex: 1,
  },
  eventInfo: {
    position: 'absolute',
    backgroundColor: '#e6f3fc',
    opacity: 0.8,
    width: '100%',
    bottom: 0,
    flexDirection: 'row',
  },
  textContainer: {
    flex: 2,
    padding: 5,
    paddingRight: 10,
    borderRightWidth: 1,
    borderRadius: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  location: {
    fontSize: 12,
  },
  date: {
    flex: 1,
    textAlign: 'center',
    alignSelf: 'center',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 10,
  },
});
