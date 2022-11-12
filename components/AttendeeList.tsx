import { FlatList } from 'react-native';
import React from 'react';
import { User } from '../types';
import AtendeeItem from './AttendeeItem';

const AttendeeList = ({ attendeeList }: { attendeeList: Array<User> }) => {
  return (
    <FlatList
      data={attendeeList}
      horizontal={true}
      renderItem={({ item }) => <AtendeeItem user={item} />}
    />
  );
};

export default AttendeeList;
