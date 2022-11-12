import { ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Event } from '../types';
import EventList from './EventList';

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
  {
    imageUrl:
      'https://www.melhoresdestinos.com.br/wp-content/uploads/2019/02/passagens-aereas-sao-paulo-capa2019-04-820x430.jpg',
    attendees: [],
    title: 'Ibirapuera Park',
    location: 'Ibirapuera, São Paulo - SP',
    timestamp: '2022-11-15T11:30:00',
    descripion:
      'Com uma área verde de 1.584.000m², é um dos maiores circuitos culturais do mundo, com museus e auditórios de Oscar Niemeyer',
    id: '2',
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
      <EventList
        recommendedEvents={recommendedEvents}
        title={'Recomended events'}
      />
      <EventList recommendedEvents={nextEvents} title={'Next events'} />
    </ScrollView>
  );
};

export default Home;
