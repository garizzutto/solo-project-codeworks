import { FlatList, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import EventItem from './EventItem';
import { Event } from '../types';

const EventList = ({
  events,
  title,
  handleEventClick,
  horizontal,
  listHeaderComponent,
}: Props) => {
  return (
    <View style={styles.container}>
      {title ? <Text style={styles.title}>{title}</Text> : null}
      <FlatList
        horizontal={horizontal}
        data={events}
        stickyHeaderIndices={listHeaderComponent ? [0] : undefined}
        renderItem={({ item }) => (
          <EventItem
            event={item}
            handleEventClick={handleEventClick}
            horizontal={horizontal}
          />
        )}
        ListHeaderComponent={listHeaderComponent ? listHeaderComponent : null}
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
  container: {
    width: '100%',
    padding: 5,
  },
});

type Props = {
  events: Array<Event>;
  title?: string;
  handleEventClick: (eventClicked: Event) => void;
  horizontal: boolean;
  listHeaderComponent?: React.ComponentProps<
    typeof FlatList
  >['ListHeaderComponent'];
};
