import { ScrollView, StyleSheet, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import EventItem from './EventItem';
import { Event } from '../types';

const EVENTS: Array<Event> = [
  {
    imageUrl:
      'https://www.melhoresdestinos.com.br/wp-content/uploads/2019/02/passagens-aereas-sao-paulo-capa2019-04-820x430.jpg',
    attendees: [],
    title: 'Ibirapuera Park',
    location: 'Ibirapuera, São Paulo - SP',
    timestamp: '2022-11-15T11:30:00',
    descripion:
      'Com uma área verde de 1.584.000m², é um dos maiores circuitos culturais do mundo, com museus e auditórios de Oscar Niemeyer',
    id: '1',
  },
];

const Home = () => {
  const [recommendedEvents, setRecommendedEvents] = useState<Array<Event>>([]);
  const [nextEvents, setNextEvents] = useState<Array<Event>>([]);

  useEffect(() => {
    // TODO: API call to get closest events
    setRecommendedEvents(EVENTS);
    setNextEvents(EVENTS);
  }, []);

  return (
    <ScrollView>
      <Text style={styles.title}>Recomended events</Text>
      <FlatList
        data={recommendedEvents}
        renderItem={({ item }) => <EventItem event={item} />}
      />
      <Text style={styles.title}>Next events</Text>
      <FlatList
        data={nextEvents}
        renderItem={({ item }) => <EventItem event={item} />}
      />
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    color: '#223a66',
    marginTop: 10,
    marginLeft: 10,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 10,
  },
});
