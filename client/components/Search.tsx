import { StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { User, Event } from '../types';
import EventList from './EventList';
import SearchBar from './SearchBar';

const EVENTS: Array<Event> = [
  {
    imageUrl:
      'https://www.melhoresdestinos.com.br/wp-content/uploads/2019/02/passagens-aereas-sao-paulo-capa2019-04-820x430.jpg',
    title: 'Ibirapuera Park',
    location: 'Ibirapuera, São Paulo - SP',
    timestamp: '2022-11-15T11:30:00',
    creator: 'Q5dpG83Y9eYcbZgkUjXuzd1Sxzt2',
    id: '1',
  },
  {
    imageUrl:
      'https://www.melhoresdestinos.com.br/wp-content/uploads/2019/02/passagens-aereas-sao-paulo-capa2019-04-820x430.jpg',
    title: 'Ibirapuera Park',
    location: 'Ibirapuera, São Paulo - SP',
    timestamp: '2022-11-15T11:30:00',
    creator: 'Q5dpG83Y9eYcbZgkUjXuzd1Sxzt2',
    id: '2',
  },
  {
    imageUrl:
      'https://www.melhoresdestinos.com.br/wp-content/uploads/2019/02/passagens-aereas-sao-paulo-capa2019-04-820x430.jpg',
    title: 'Ibirapuera Park',
    location: 'Ibirapuera, São Paulo - SP',
    timestamp: '2022-11-15T11:30:00',
    creator: 'Q5dpG83Y9eYcbZgkUjXuzd1Sxzt2',
    id: '3',
  },
  {
    imageUrl:
      'https://www.melhoresdestinos.com.br/wp-content/uploads/2019/02/passagens-aereas-sao-paulo-capa2019-04-820x430.jpg',
    title: 'Ibirapuera Park',
    location: 'Ibirapuera, São Paulo - SP',
    timestamp: '2022-11-15T11:30:00',
    creator: 'Q5dpG83Y9eYcbZgkUjXuzd1Sxzt2',
    id: '4',
  },
];

const Search = ({ handleEventClick }: Props) => {
  const [events, setEvents] = useState<Array<Event>>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    // TODO: API call to get events
    setEvents(EVENTS);
  }, []);

  const handleSearch = (input: string) => {
    setSearch(input);
  };

  return (
    <View style={styles.container}>
      <EventList
        handleEventClick={handleEventClick}
        events={
          search === ''
            ? events
            : events.filter((e) => e.title.includes(search))
        }
        horizontal={false}
        listHeaderComponent={<SearchBar handleSearch={handleSearch} />}
      />
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e6f3fc',
    alignItems: 'center',
    flex: 1,
  },
});

type Props = {
  user: User;
  handleEventClick: (eventClicked: Event) => void;
};
