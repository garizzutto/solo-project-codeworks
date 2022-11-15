import { StyleSheet, TextInput, View } from 'react-native';
import React from 'react';
import Icons from './Icons';

const SearchBar = ({ handleSearch }: Props) => {
  return (
    <View style={styles.searchbar}>
      <View style={[styles.container, styles.shadow]}>
        <TextInput onChangeText={handleSearch} style={styles.textInput} />
        <View style={styles.iconContainer}>
          <Icons icon="search" color="black" />
        </View>
      </View>
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  searchbar: {
    padding: 15,
  },
  container: {
    width: '100%',
    backgroundColor: '#fff',
    borderColor: '#0741AD',
    borderWidth: 1,
    flexDirection: 'row',
    borderRadius: 10,
  },
  textInput: {
    padding: 10,
    fontSize: 20,
    flex: 1,
    fontFamily: 'Kanit-Regular',
  },
  iconContainer: {
    alignSelf: 'flex-end',
    marginLeft: 'auto',
    padding: 10,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 10,
  },
});

type Props = {
  handleSearch: (input: string) => void;
};
