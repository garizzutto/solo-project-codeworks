import React from 'react';
import { View, Text, StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { Color } from '../types';

export default function ColorBox({ colorName, hexCode, isHorizontal }: Props) {
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

  const styleClass = isHorizontal ? styles.boxHoriz : styles.box;

  return (
    <View style={[styleClass, backgoroundColor]}>
      {!isHorizontal ? (
        <Text style={boxText}>
          {colorName}: {hexCode}
        </Text>
      ) : null}
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
  boxHoriz: {
    flex: 1,
    marginLeft: 10,
  },
});

type Props = Color & {
  isHorizontal: boolean;
};
