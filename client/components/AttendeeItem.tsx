import { ActivityIndicator, Image, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { getProfile } from '../ApiService';

const AttendeeItem = ({ uid }: { uid: string }) => {
  const [picture, setPicture] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getProfile(uid).then((profile) => {
      if (profile) {
        setPicture(profile.profileImageUrl);
        setName(profile.name);
        setIsLoading(false);
      }
    });
  }, [uid]);

  return isLoading ? (
    <ActivityIndicator style={styles.image} color="#0741AD" />
  ) : (
    <View style={styles.container}>
      <Image
        source={picture !== '' ? { uri: picture } : {}}
        style={styles.image}
      />
      <Text numberOfLines={1} style={styles.font}>
        {name}
      </Text>
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
  font: {
    fontFamily: 'Kanit-Regular',
  },
});
