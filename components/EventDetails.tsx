import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Icons from './Icons';
import { IconName } from '../types';

const EventDetails = ({ icon, color, text }: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        <Icons icon={icon} color={color} />
        <Text style={styles.text}>{text}</Text>
      </View>
    </View>
  );
};

export default EventDetails;

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  rowContainer: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
  },
  text: {
    marginLeft: 5,
  },
});

type Props = {
  icon: IconName;
  color: string;
  text: string;
};
