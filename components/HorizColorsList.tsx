import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Color } from '../types';
import ColorBox from './ColorBox';

export default function HorizColorsList({ title, colors }: Props) {
  return (
    <View style={styles.view}>
      <Text>{title}</Text>
      <FlatList
        style={styles.container}
        data={colors}
        keyExtractor={(item) => item.colorName}
        renderItem={({ item }) => (
          <ColorBox
            hexCode={item.hexCode}
            colorName={item.colorName}
            isHorizontal={true}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  view: {
    flex: 1,
  },
});

type Props = {
  title: string;
  colors: Array<Color>;
};
