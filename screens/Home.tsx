import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import HorizColorsList from '../components/HorizColorsList';
import { StackTypeParamList } from '../types';

export default function Home({ route, navigation }: Props) {
  return (
    <FlatList
      style={styles.container2}
      data={route.params.titles}
      keyExtractor={(item) => item}
      renderItem={({ item, index }) => (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Colors', {
              colors: route.params.colors[index],
              title: item,
            })
          }
        >
          <HorizColorsList title={item} colors={route.params.colors[index]} />
        </TouchableOpacity>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container2: {
    flex: 1,
  },
});

type Props = NativeStackScreenProps<StackTypeParamList, 'Home'>;
