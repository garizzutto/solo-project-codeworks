import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Event } from '../types';
import moment from 'moment';
import { TouchableOpacity } from 'react-native-gesture-handler';

const EventItem = ({ event, handleEventClick, horizontal }: Props) => {
  const getDateNthMonth = (date: string) => {
    const parsed = moment(date).format('MMM Do');
    return parsed;
  };

  return (
    <TouchableOpacity onPress={() => handleEventClick(event)}>
      <View
        style={[
          horizontal ? styles.horizontalContainer : styles.verticalContainer,
          styles.shadow,
        ]}
      >
        <Image source={{ uri: event.imageUrl }} style={styles.image} />
        <View style={styles.eventInfo}>
          <View style={styles.textContainer}>
            <Text style={[styles.title, styles.fontBold]}>{event.title}</Text>
            <Text style={[styles.location, styles.font]}>{event.location}</Text>
          </View>
          <Text style={[styles.date, styles.font]}>
            {getDateNthMonth(event.timestamp)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default EventItem;

const styles = StyleSheet.create({
  horizontalContainer: {
    height: 250,
    width: 300,
    margin: 10,
    borderWidth: 0,
  },
  verticalContainer: {
    height: 350,
    width: '100%',
    marginVertical: 10,
    borderWidth: 0,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
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
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 5,
  },
  font: {
    fontFamily: 'Kanit-Regular',
  },
  fontBold: {
    fontFamily: 'Kanit-Bold',
  },
});

type Props = {
  event: Event;
  handleEventClick: (eventClicked: Event) => void;
  horizontal: boolean;
};
