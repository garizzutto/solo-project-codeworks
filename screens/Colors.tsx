import React from 'react';
import { FlatList, NativeModules, StyleSheet, Text, View } from 'react-native';
const { StatusBarManager } = NativeModules;
import ColorBox from '../components/ColorBox';
import { StackTypeParamList } from '../types';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export default function Colors({ route }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{route.params.title}</Text>
      <FlatList
        data={route.params.colors}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <ColorBox
            hexCode={item.hexCode}
            colorName={item.colorName}
            isHorizontal={false}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    marginTop: StatusBarManager ? StatusBarManager.HEIGHT + 5 : 10,
  },
  title: {
    marginLeft: 15,
    fontWeight: 'bold',
    fontSize: 17,
  },
});

type Props = NativeStackScreenProps<StackTypeParamList, 'Colors'>;
