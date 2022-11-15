import { StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Event } from '../types';
import EventList from './EventList';
import SearchBar from './SearchBar';
import { getEvents } from '../ApiService';
import { useIsFocused } from '@react-navigation/native';

const Search = ({ handleEventClick }: Props) => {
  const [events, setEvents] = useState<Array<Event>>([]);
  const [search, setSearch] = useState('');
  const isFocuses = useIsFocused();

  useEffect(() => {
    getEvents().then((eventsFetched) => {
      if (eventsFetched) {
        setEvents(eventsFetched);
      }
    });
  }, [isFocuses]);

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
            : events.filter((e) =>
                e.title.toLowerCase().includes(search.toLowerCase()),
              )
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
  handleEventClick: (eventClicked: Event) => void;
};
