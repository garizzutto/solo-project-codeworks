import { StyleSheet, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { FontAwesome } from '@expo/vector-icons';
import Icons from './Icons';

const FooterIcon = ({ tabName, tab, icon, setTab }: Props) => {
  return (
    <TouchableOpacity style={styles.flex1} onPress={setTab}>
      <View
        style={[styles.line, tab === tabName ? styles.selectedLine : null]}
      />
      <View style={[styles.flex1, styles.iconContainer]}>
        <Icons icon={icon} />
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
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

type Props = {
  tabName: string;
  tab: string;
  icon: React.ComponentProps<typeof FontAwesome>['name'];
  setTab: () => void;
};
