import {
  Image,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { User } from '../types';
import { getProfile, patchProfileImage, patchProfileName } from '../ApiService';
import Icons from './Icons';
import * as ImagePicker from 'expo-image-picker';
import { uuidv4 } from '@firebase/util';
import { storage } from '../firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

const Profile = ({ user, handleLogout }: Props) => {
  const [name, setName] = useState('');
  const [profileImage, setProfileImage] = useState(
    'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
  );
  const [newProfileImage, setNewProfileImage] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    setIsUploading(true);
    getProfile(user.uid).then((profile) => {
      if (profile && profile.profileImageUrl !== '') {
        setName(profile.name);
        setProfileImage(profile.profileImageUrl);
        setIsUploading(false);
      }
    });
  }, [user]);

  useEffect(() => {
    const uploadImage = async () => {
      try {
        const response = await fetch(newProfileImage);
        const blob = await response.blob();
        const uuid = uuidv4();
        const fileRef = ref(storage, 'profile/' + uuid);
        await uploadBytes(fileRef, blob);
        return { imageUuid: uuid, imageUrl: await getDownloadURL(fileRef) };
      } catch (error) {
        console.log('Error saving the image, please try again later');
        console.log(error);
      }
    };

    const handleAddProfileImage = async () => {
      setIsUploading(true);
      const imageInfo = await uploadImage();
      return imageInfo;
    };
    // TODO: API call to get name
    if (newProfileImage !== '') {
      handleAddProfileImage().then((imageInfo) => {
        if (imageInfo) {
          patchProfileImage(user, imageInfo.imageUrl);
          setIsUploading(false);
          setProfileImage(newProfileImage);
        }
      });
    }
  }, [user, newProfileImage]);

  const handleSave = async () => {
    await patchProfileName(user, name);
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    console.log('aqui');
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setNewProfileImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <View>
        {isUploading ? (
          <ActivityIndicator style={styles.profileImage} color="#0741AD" />
        ) : (
          <Image
            source={{
              uri: profileImage,
            }}
            style={styles.profileImage}
          />
        )}
        <TouchableOpacity
          onPressIn={async () => await pickImage()}
          disabled={isUploading}
        >
          <View style={styles.iconContainer}>
            <Icons icon="image" color="white" />
          </View>
        </TouchableOpacity>
      </View>
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
        <TouchableOpacity
          style={styles.personalData}
          onPress={async () => await handleSave()}
        >
          <Text style={[styles.save, styles.font]}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.personalData} onPress={handleLogout}>
          <Text style={[styles.save, styles.font]}>Logout</Text>
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
  iconContainer: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#0741AD',
    backgroundColor: '#0741AD',
    height: 50,
    width: 50,
    borderRadius: 25,
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

type Props = {
  user: User;
  handleLogout: () => void;
};
