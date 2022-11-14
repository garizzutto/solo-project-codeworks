import { StyleSheet, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import React from 'react';

const Icons = ({ icon, color, size }: Props) => {
  return (
    <View style={styles.icons}>
      <FontAwesome
        name={icon}
        size={size ? size : 24}
        color={color ? color : 'white'}
      />
    </View>
  );
};

export default Icons;

const styles = StyleSheet.create({
  icons: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
  },
});

type Props = {
  icon: React.ComponentProps<typeof FontAwesome>['name'];
  color?: string;
  size?: number;
};
