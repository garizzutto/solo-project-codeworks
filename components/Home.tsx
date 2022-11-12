import { ScrollView, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Event } from '../types';
import EventList from './EventList';

const EVENTS: Array<Event> = [
  {
    imageUrl:
      'https://www.melhoresdestinos.com.br/wp-content/uploads/2019/02/passagens-aereas-sao-paulo-capa2019-04-820x430.jpg',
    title: 'Ibirapuera Park',
    location: 'Ibirapuera, São Paulo - SP',
    timestamp: '2022-11-15T11:30:00',
    id: '1',
  },
  {
    imageUrl:
      'https://www.melhoresdestinos.com.br/wp-content/uploads/2019/02/passagens-aereas-sao-paulo-capa2019-04-820x430.jpg',
    title: 'Ibirapuera Park',
    location: 'Ibirapuera, São Paulo - SP',
    timestamp: '2022-11-15T11:30:00',
    id: '2',
  },
];

const Home = ({ handleEventClick }: Props) => {
  const [recommendedEvents, setRecommendedEvents] = useState<Array<Event>>([]);
  const [nextEvents, setNextEvents] = useState<Array<Event>>([]);

  useEffect(() => {
    // TODO: API call to get closest events
    setRecommendedEvents(EVENTS);
    setNextEvents(EVENTS);
  }, []);

  return (
    <ScrollView style={styles.container}>
      <EventList
        recommendedEvents={recommendedEvents}
        title={'Recomended events'}
        handleEventClick={handleEventClick}
      />
      <EventList
        recommendedEvents={nextEvents}
        title={'Next events'}
        handleEventClick={handleEventClick}
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
};
