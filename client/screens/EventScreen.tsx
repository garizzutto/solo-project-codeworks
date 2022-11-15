import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { PropsEventScreen } from '../types';
import Icons from '../components/Icons';
import EventDetails from '../components/EventDetails';
import moment from 'moment';
import AttendeeList from '../components/AttendeeList';
import { getEvent, patchEventAttendees } from '../ApiService';

const EventScreen = ({ navigation, route }: PropsEventScreen) => {
  const { event, user } = route.params;

  const [description, setDescription] = useState('');
  const [attendees, setAttendees] = useState<Array<string>>([]);
  const [isAttending, setIsAttending] = useState(false);
  const [numberAttendees, setNumberAttendees] = useState(0);

  useLayoutEffect(() => {
    console.log('Rendering title:', event.title);
    navigation.setOptions({ headerTitle: event.title });
  }, [navigation, event.title]);

  useEffect(() => {
    console.log('Getting description');
    if (event.id) {
      getEvent(event.id).then((eventFetched) => {
        if (
          eventFetched &&
          eventFetched.description &&
          eventFetched.attendees
        ) {
          setDescription(eventFetched.description);
          setAttendees(eventFetched.attendees);
          setIsAttending(attendees.some((uid) => uid === user.uid));
          setNumberAttendees(attendees.length);
        }
      });
    }
  }, [event.id, attendees, user]);

  const getDescriptiveDate = (date: string) => {
    const parsed =
      moment(date).format('MMM DD YYYY') +
      ' | Starting at ' +
      moment(date).format('hh:mm A');
    return parsed;
  };

  const toggleAttending = async () => {
    if (isAttending) {
      const newAttendeesList = attendees.filter((uid) => uid !== user.uid);
      await patchEventAttendees(event.id, newAttendeesList);
      setAttendees(newAttendeesList);
    } else {
      const newAttendeesList = [...attendees, user.uid];
      await patchEventAttendees(event.id, newAttendeesList);
      setAttendees(newAttendeesList);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: route.params.event.imageUrl }}
        style={styles.image}
      />
      <ScrollView style={styles.bodyContainer}>
        <TouchableOpacity onPress={async () => await toggleAttending()}>
          <View style={styles.attendContainer}>
            <View style={[styles.attendButton]}>
              <Text style={[styles.attendText, styles.bold]}>Going</Text>
              {isAttending ? (
                <Icons icon="check-circle" />
              ) : (
                <Icons icon="question-circle" />
              )}
            </View>
          </View>
        </TouchableOpacity>
        <View style={styles.eventDetailsContainer}>
          <EventDetails
            icon="calendar"
            color="black"
            text={getDescriptiveDate(event.timestamp)}
          />
          <EventDetails
            icon="location-arrow"
            color="black"
            text={event.location}
          />
          <EventDetails
            icon="calendar-check-o"
            color="black"
            text={'Participating: ' + numberAttendees.toString()}
          />
        </View>
        <Text style={[styles.description, styles.bold]}>What to expect?</Text>
        <Text style={styles.description}>{description}</Text>
        <Text style={[styles.description, styles.bold]}>Who's attending?</Text>
        <AttendeeList attendeeList={attendees.slice(0, 5)} />
      </ScrollView>
    </View>
  );
};

export default EventScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e6f3fc',
  },
  image: {
    width: '100%',
    height: '30%',
    resizeMode: 'cover',
  },
  bodyContainer: {
    padding: 10,
  },
  eventDetailsContainer: {
    borderColor: '#727273',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    // width: '90%',
    // alignSelf: 'center',
    margin: 10,
  },
  attendContainer: {
    alignSelf: 'center',
    width: '30%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  attendButton: {
    marginTop: 5,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#0741AD',
    flexDirection: 'row',
  },
  attendText: {
    fontSize: 24,
    color: '#fff',
  },
  bold: {
    fontFamily: 'Kanit-Bold',
  },
  description: {
    fontSize: 20,
    padding: 5,
    width: '100%',
    fontFamily: 'Kanit-Regular',
  },
});
