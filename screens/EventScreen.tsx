import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { PropsEventScreen, User } from '../types';
import Icons from '../components/Icons';
import EventDetails from '../components/EventDetails';
import moment from 'moment';
import AttendeeList from '../components/AttendeeList';

const EVENT_DETAILS: Array<{ description: string; attendees: Array<User> }> = [
  {
    description:
      'Com uma área verde de 1.584.000m², é um dos maiores circuitos culturais do mundo, com museus e auditórios de Oscar Niemeyer',
    attendees: [
      { email: 'g@a.com', uid: 'Q5dpG83Y9eYcbZgkUjXuzd1Sxzt2' },
      { email: 'g@a.com', uid: 'Q5dpG83Y9eYcbZgkUjXuzd1Sxzt2' },
      { email: 'g@a.com', uid: 'Q5dpG83Y9eYcbZgkUjXuzd1Sxzt2' },
      { email: 'g@a.com', uid: 'Q5dpG83Y9eYcbZgkUjXuzd1Sxzt2' },
      { email: 'g@a.com', uid: 'Q5dpG83Y9eYcbZgkUjXuzd1Sxzt2' },
      { email: 'g@a.com', uid: 'Q5dpG83Y9eYcbZgkUjXuzd1Sxzt2' },
    ],
  },
];

const EventScreen = ({ navigation, route }: PropsEventScreen) => {
  const { event, user } = route.params;

  const [description, setDescription] = useState('');
  const [attendees, setAttendees] = useState(EVENT_DETAILS[0].attendees);
  const [isAttending, setIsAttending] = useState(false);
  const [numberAttendees, setNumberAttendees] = useState(0);

  useLayoutEffect(() => {
    console.log('Rendering title:', event.title);
    navigation.setOptions({ headerTitle: event.title });
  }, [navigation, event.title]);

  useEffect(() => {
    // TODO: API call to get description
    console.log('Getting description');
    setDescription(EVENT_DETAILS[0].description);
  }, []);

  useEffect(() => {
    // TODO: API call to get atendees
    console.log('Getting atendees');
    setIsAttending(attendees.some((u) => u.uid === user.uid));
    setNumberAttendees(attendees.length);
  }, [attendees, user]);

  const getDescriptiveDate = (date: string) => {
    const parsed =
      moment(date).format('MMM DD YYYY') +
      ' | Starting at ' +
      moment(date).format('hh:mm');
    return parsed;
  };

  const toggleAttending = () => {
    // TODO: API call to set as attending or not
    if (isAttending) {
      setAttendees(attendees.filter((u) => u.uid !== user.uid));
    } else {
      setAttendees([...attendees, user]);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: route.params.event.imageUrl }}
        style={styles.image}
      />
      <View style={styles.bodyContainer}>
        <TouchableOpacity onPress={toggleAttending}>
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
      </View>
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
    fontWeight: 'bold',
  },
  description: {
    fontSize: 20,
    padding: 5,
    width: '100%',
  },
});
