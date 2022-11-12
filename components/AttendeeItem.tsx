import { Image, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { User } from '../types';

const PROFILE_PICTURE =
  'https://www.biography.com/.image/t_share/MTQzMjgyNDgwNjIxODIzNTU5/jennifer-lawrence_gettyimages-626382596jpg.jpg';

const AttendeeItem = ({ user }: { user: User }) => {
  const [picture, setPicture] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    // TODO: API call to get picture and name
    console.log(user);
    setPicture(PROFILE_PICTURE);
    setName('Jennifer Lawrence');
  }, [user]);

  return (
    <View style={styles.container}>
      <Image
        source={picture !== '' ? { uri: picture } : {}}
        style={styles.image}
      />
      <Text numberOfLines={1}>{name}</Text>
    </View>
  );
};

export default AttendeeItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    backgroundColor: '#e6f3fc',
  },
  image: {
    height: 80,
    width: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: '#fff',
  },
});
