import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import Icons from './Icons';
import { StackHeaderProps } from '@react-navigation/stack';

const Header = (props: StackHeaderProps) => {
  const { navigation } = props;
  return (
    <View style={[styles.header]}>
      {navigation.canGoBack() ? (
        <TouchableOpacity
          style={styles.backArrow}
          onPress={() => navigation.goBack()}
        >
          <Icons icon="angle-left" color="white" size={30} />
        </TouchableOpacity>
      ) : null}
      <View style={styles.imageContainer}>
        {props.options.headerTitle ? (
          <Text style={styles.eventHeaderTitle}>
            {props.options.headerTitle.toString()}
          </Text>
        ) : (
          <Image
            source={require('../assets/nameHeader.png')}
            style={styles.image}
          />
        )}
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    // height: '10%',
    backgroundColor: '#0741AD',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
    paddingBottom: 5,
  },
  image: {
    color: '#fff',
    fontWeight: 'bold',
    padding: 5,
    height: 30,
    width: 120,
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  backArrow: {
    color: '#fff',
    position: 'absolute',
    left: 10,
    bottom: 5,
  },
  eventHeaderTitle: {
    fontSize: 30,
    fontFamily: 'Kanit-Regular',
    color: '#fff',
    alignSelf: 'center',
  },
});
