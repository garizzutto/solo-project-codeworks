import { ScrollView, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Event } from '../types';
import EventList from './EventList';
import { getEvents } from '../ApiService';
import { useIsFocused } from '@react-navigation/native';

const Home = ({ handleEventClick, uid }: Props) => {
  const [recommendedEvents, setRecommendedEvents] = useState<Array<Event>>([]);
  const [nextEvents, setNextEvents] = useState<Array<Event>>([]);
  const isFocuses = useIsFocused();

  useEffect(() => {
    console.log('Getting events');
    getEvents().then((events) => {
      if (events) {
        setRecommendedEvents(events.filter((e) => !e.attendees?.includes(uid)));
        setNextEvents(events);
      }
    });
  }, [uid, isFocuses]);

  return (
    <ScrollView style={styles.container}>
      {recommendedEvents.length > 0 ? (
        <EventList
          events={recommendedEvents}
          title={'Recomended events'}
          handleEventClick={handleEventClick}
          horizontal={true}
        />
      ) : null}
      <EventList
        events={nextEvents}
        title={'Next events'}
        handleEventClick={handleEventClick}
        horizontal={true}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e6f3fc',
  },
});

export default Home;

type Props = {
  handleEventClick: (eventClicked: Event) => void;
  uid: string;
};
