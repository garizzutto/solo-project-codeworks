import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import {
  AndroidNativeProps,
  DateTimePickerAndroid,
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import moment from 'moment';
import Icons from '../components/Icons';
import * as ImagePicker from 'expo-image-picker';
import { storage } from '../firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { uuidv4 } from '@firebase/util';
import { NewEvent, PropsNewEventScreen } from '../types';
import { postNewEvent } from '../ApiService';

const NewEventScreen = ({ route, navigation }: PropsNewEventScreen) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [timestamp, setTimestamp] = useState<Date | undefined>(new Date());
  const [location, setLocation] = useState('');
  const [image, setImage] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const onChangeDate = (
    event: DateTimePickerEvent,
    selectedDate: Date | undefined,
  ) => {
    const currentDate = selectedDate;
    if (currentDate) {
      setTimestamp(new Date(currentDate.setHours(0, 0, 0, 0)));
    }
  };

  const onChangeTime = (
    event: DateTimePickerEvent,
    selectedDate: Date | undefined,
  ) => {
    const currentDate = selectedDate;
    setTimestamp(currentDate);
  };

  const showMode = (currentMode: AndroidNativeProps['mode']) => {
    const fun = currentMode === 'date' ? onChangeDate : onChangeTime;
    DateTimePickerAndroid.open({
      value: timestamp ? timestamp : new Date(),
      onChange: fun,
      mode: currentMode,
      is24Hour: false,
    });
  };

  const getDescriptiveDate = (dateToParse: string | undefined) => {
    const parsed = moment(dateToParse).format('MMM DD YYYY');
    return parsed;
  };

  const getDescriptiveTime = (dateToParse: string | undefined) => {
    const parsed = moment(dateToParse).format('hh:mm');
    return parsed;
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const uploadImage = async () => {
    try {
      const response = await fetch(image);
      const blob = await response.blob();
      const uuid = uuidv4();
      const fileRef = ref(storage, 'event/' + uuid);
      await uploadBytes(fileRef, blob);
      return { imageUuid: uuid, imageUrl: await getDownloadURL(fileRef) };
    } catch (error) {
      console.log('Error saving the image, please try again later');
      console.log(error);
    }
  };

  const validateForm: () => string = () => {
    if (title === '') {
      return 'Please add a title';
    }
    if (description === '') {
      return 'Please add a description';
    }
    if (location === '') {
      return 'Please add a location';
    }
    if (image === '') {
      return 'Please update a image';
    }
    return '';
  };

  const handleSubmit = async () => {
    setIsUploading(true);
    const error = validateForm();
    if (error !== '') {
      setIsUploading(false);
      // eslint-disable-next-line no-alert
      return alert(error);
    }
    const imageInfo = await uploadImage();
    if (imageInfo && timestamp) {
      const newEvent: NewEvent = {
        imageUrl: imageInfo?.imageUrl,
        title,
        description,
        timestamp: timestamp?.toISOString(),
        location,
        creator: route.params.user.uid,
      };
      await postNewEvent(newEvent);
      navigation.goBack();
    }
  };

  return (
    <View style={styles.flex1}>
      <View style={[styles.flex1, styles.formContainer]}>
        <Text style={styles.title}>Create new event</Text>
        <TextInput
          placeholder="Title*"
          style={styles.inputBox}
          value={title}
          onChangeText={(value) => setTitle(value)}
        />
        <TextInput
          placeholder="Description*"
          style={styles.inputBox}
          multiline={true}
          value={description}
          onChangeText={(value) => setDescription(value)}
        />
        <TouchableOpacity
          style={styles.container}
          onPress={() => {
            showMode('date');
          }}
        >
          <Text style={styles.inputBox}>
            {getDescriptiveDate(timestamp?.toISOString())}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.container}
          onPress={() => {
            showMode('time');
          }}
        >
          <Text style={styles.inputBox}>
            {getDescriptiveTime(timestamp?.toISOString())}
          </Text>
        </TouchableOpacity>
        <TextInput
          placeholder="Location*"
          style={styles.inputBox}
          value={location}
          onChangeText={(value) => setLocation(value)}
        />
        {image !== '' ? (
          <Image source={{ uri: image }} style={styles.image} />
        ) : null}
        <TouchableOpacity
          style={styles.container}
          onPress={async () => await pickImage()}
        >
          <View style={[styles.button, styles.row]}>
            <Icons icon="image" size={18} />
            <Text style={styles.white}>
              {image !== '' ? 'Change image' : 'Add Image*'}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.container}
          disabled={isUploading}
          onPress={async () => await handleSubmit()}
        >
          {isUploading ? (
            <ActivityIndicator style={styles.button} color="#ffffff" />
          ) : (
            <Text style={styles.button}>Create</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default NewEventScreen;

const styles = StyleSheet.create({
  flex1: {
    flex: 1,
    height: '100%',
  },
  title: {
    fontSize: 20,
    fontFamily: 'Kanit-Regular',
  },
  formContainer: {
    backgroundColor: '#e6f3fc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputBox: {
    padding: 5,
    fontSize: 20,
    backgroundColor: '#fff',
    width: '80%',
    marginTop: 10,
    borderRadius: 10,
    fontFamily: 'Kanit-Regular',
  },
  button: {
    width: '70%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    fontSize: 18,
    textAlign: 'center',
    backgroundColor: '#0741AD',
    color: 'white',
    height: 50,
    fontFamily: 'Kanit-Bold',
  },
  container: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e6f3fc',
  },
  row: {
    flexDirection: 'row',
  },
  white: {
    color: '#fff',
    fontFamily: 'Kanit-Bold',
    fontSize: 18,
  },
  image: {
    height: '40%',
    width: '90%',
    marginVertical: 10,
  },
});
