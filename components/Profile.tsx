import {
  Image,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { User } from '../types';

const Profile = ({ user }: { user: User }) => {
  const [name, setName] = useState('');

  useEffect(() => {
    // TODO: API call to get name
    setName('Idris Elba');
  }, []);

  const handleSave = () => {
    // TODO: Save new password and edit personal data
  };

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: 'https://assets1.cbsnewsstatic.com/hub/i/2018/11/06/0c1af1b8-155a-458e-b105-78f1e7344bf4/2018-11-06t054310z-1334124005-rc1be15a8050-rtrmadp-3-people-sexiest-man.jpg',
        }}
        style={styles.profileImage}
      />
      <View style={styles.personalData}>
        <View style={styles.infoContainer}>
          <TextInput
            style={[styles.info, styles.font]}
            placeholder="Name"
            value={name}
            onChangeText={(value) => setName(value)}
          />
        </View>
        <View style={styles.infoContainer}>
          <TextInput
            style={[styles.info, styles.font]}
            placeholder="Email"
            value={user.email}
            editable={false}
          />
        </View>
        <TouchableOpacity style={styles.personalData} onPress={handleSave}>
          <Text style={[styles.save, styles.font]}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 10,
  },
  profileImage: {
    height: 200,
    width: 200,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: '#fff',
    marginBottom: 10,
  },
  personalData: {
    width: '100%',
    alignItems: 'center',
  },
  infoContainer: {
    flexDirection: 'row',
    width: '60%',
    margin: 5,
  },
  label: {
    alignSelf: 'center',
    flex: 1,
    fontWeight: 'bold',
  },
  info: {
    padding: 10,
    borderWidth: 2,
    borderColor: '#0741AD',
    borderRadius: 5,
    marginRight: 0,
    flex: 1,
  },
  save: {
    width: '50%',
    backgroundColor: '#3590D5',
    color: '#fff',
    fontSize: 20,
    borderRadius: 5,
    marginTop: 10,
    textAlign: 'center',
    padding: 5,
  },
  font: {
    fontFamily: 'Kanit-Regular',
  },
});
