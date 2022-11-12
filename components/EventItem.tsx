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
    <View style={styles.container}>
      <Image source={{ uri: event.imageUrl }} style={styles.image} />
      <View style={styles.eventInfo}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{event.title}</Text>
          <Text style={styles.location}>{event.location}</Text>
        </View>
        {/* <View style={styles.dateContainer}> */}
        <Text style={styles.date}>{getDateNthMonth(event.timestamp)}</Text>
        {/* </View> */}
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
    borderRightWidth: 1,
    padding: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  location: {
    fontSize: 12,
  },
  dateContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  date: {
    flex: 1,
    textAlign: 'center',
    alignSelf: 'center',
  },
});
