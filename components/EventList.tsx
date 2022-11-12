import { FlatList, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import EventItem from './EventItem';
import { Event } from '../types';

const EventList = ({ recommendedEvents, title, handleEventClick }: Props) => {
  return (
    <View>
      <Text style={styles.title}>{title}</Text>
      <FlatList
        horizontal={true}
        data={recommendedEvents}
        renderItem={({ item }) => (
          <EventItem event={item} handleEventClick={handleEventClick} />
        )}
      />
    </View>
  );
};

export default EventList;

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    color: '#223a66',
    marginTop: 10,
    marginLeft: 10,
  },
});

type Props = {
  recommendedEvents: Array<Event>;
  title: string;
  handleEventClick: (eventClicked: Event) => void;
};
