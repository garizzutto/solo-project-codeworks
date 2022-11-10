import React from 'react';
import { View, Text, StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { Color } from '../types';

export default function ColorBox({ colorName, hexCode }: Color) {
  let textColor: string;
  // Black or white text
  if (parseInt(hexCode.split('#')[1], 16) > 0xffffff / 1.1) {
    textColor = '#000000';
  } else {
    textColor = '#ffffff';
  }
  const boxText: TextStyle = {
    color: textColor,
    fontWeight: 'bold',
  };

  const backgoroundColor: ViewStyle = {
    backgroundColor: hexCode,
  };

  return (
    <View style={[styles.box, backgoroundColor]}>
      <Text style={boxText}>
        {colorName}: {hexCode}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    alignSelf: 'stretch',
    marginHorizontal: 15,
    marginVertical: 5,
    alignItems: 'center',
    paddingVertical: 10,
  },
});
