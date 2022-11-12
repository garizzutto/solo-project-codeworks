import { StyleSheet, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { FontAwesome } from '@expo/vector-icons';

const FooterIcon = ({ tabName, tab, icon, setTab }: Props) => {
  return (
    <TouchableOpacity style={styles.flex1} onPress={setTab}>
      <View
        style={[styles.line, tab === tabName ? styles.selectedLine : null]}
      />
      <View style={styles.icons}>
        <FontAwesome name={icon} size={24} color="white" />
      </View>
    </TouchableOpacity>
  );
};

export default FooterIcon;

const styles = StyleSheet.create({
  flex1: {
    flex: 1,
    height: '100%',
  },
  icons: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  line: {
    width: '100%',
    height: 3,
    backgroundColor: '#727273',
    marginTop: 0,
  },
  selectedLine: {
    backgroundColor: '#fff',
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
  },
});

type Props = {
  tabName: string;
  tab: string;
  icon: React.ComponentProps<typeof FontAwesome>['name'];
  setTab: () => void;
};
