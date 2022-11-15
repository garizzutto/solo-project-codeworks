import { FlatList } from 'react-native';
import React from 'react';
import AtendeeItem from './AttendeeItem';

const AttendeeList = ({ attendeeList }: { attendeeList: Array<string> }) => {
  return (
    <FlatList
      data={attendeeList}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => <AtendeeItem uid={item} />}
    />
  );
};

export default AttendeeList;
