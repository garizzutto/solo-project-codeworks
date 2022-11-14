import {
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

const NewEventScreen = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [time, setTime] = useState<Date | undefined>(new Date());

  const onChangeDate = (
    event: DateTimePickerEvent,
    selectedDate: Date | undefined,
  ) => {
    const currentDate = selectedDate;
    setDate(currentDate);
  };

  const onChangeTime = (
    event: DateTimePickerEvent,
    selectedDate: Date | undefined,
  ) => {
    const currentDate = selectedDate;
    setTime(currentDate);
  };

  const showMode = (currentMode: AndroidNativeProps['mode']) => {
    const fun = currentMode === 'date' ? onChangeDate : onChangeTime;
    DateTimePickerAndroid.open({
      value: date ? date : new Date(),
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

  return (
    <View style={styles.flex1}>
      <View style={[styles.flex1, styles.formContainer]}>
        <Text style={styles.title}>Create New Event</Text>
        <TextInput placeholder="Title" style={styles.inputBox} />
        <TextInput
          placeholder="Description"
          style={styles.inputBox}
          multiline={true}
        />
        <TouchableOpacity
          style={styles.container}
          onPress={() => {
            showMode('date');
          }}
        >
          <Text style={styles.inputBox}>
            {getDescriptiveDate(date?.toISOString())}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.container}
          onPress={() => {
            showMode('time');
          }}
        >
          <Text style={styles.inputBox}>
            {getDescriptiveTime(time?.toISOString())}
          </Text>
        </TouchableOpacity>
        <TextInput placeholder="Location" style={styles.inputBox} />
        <TouchableOpacity
          style={styles.container}
          onPress={() => console.log(date, time)}
        >
          <Text style={styles.button}>Create</Text>
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
    fontWeight: 'bold',
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
  },
  button: {
    width: '70%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
    backgroundColor: '#0741AD',
    color: 'white',
  },
  container: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e6f3fc',
  },
});
