import { FontAwesome } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { auth, provider } from '../firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  UserCredential,
} from 'firebase/auth';
import * as WebBrowser from 'expo-web-browser';
import { PropsLoginScreen } from '../types';

WebBrowser.maybeCompleteAuthSession();

const LoginScreen = ({ navigation }: PropsLoginScreen) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  // const [result, setResult] = useState<null | UserCredential>(null);

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(loginSuccessful)
      .catch((error) => {
        console.log(error);
        setErrorMessage('Wrong email or password');
      });
  };

  const handleRegister = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(loginSuccessful)
      .catch((error) => {
        console.log('Error register: ', error);
        const message = error.message.split('Firebase: ')[1].split(' (')[0];
        if (message !== 'Error') {
          setErrorMessage(message);
        } else {
          setErrorMessage('Invalid email or user already created');
        }
      });
  };

  const handleGoogleLogin = () => {
    // TODO: Login with Google not working
    console.log('Google Signin');
    signInWithPopup(auth, provider)
      .then(loginSuccessful)
      .catch((error) => {
        console.log(error.code);
      });
  };

  const loginSuccessful = (userCredential: UserCredential) => {
    setErrorMessage('');
    userCredential.user.getIdToken().then((token) => {
      const user = {
        email: userCredential.user.email ? userCredential.user.email : '',
        uid: userCredential.user.uid,
        token,
      };
      navigation.replace('HomeScreen', { user });
    });
  };

  return (
    <View style={[styles.container, styles.flex1]}>
      <View style={styles.inputContainer}>
        <Image source={require('../assets/icon.png')} style={styles.logo} />
        <TextInput
          style={[
            styles.input,
            styles.font,
            errorMessage === '' ? null : styles.inputError,
          ]}
          placeholder="Email"
          keyboardType="email-address"
          value={email}
          onChangeText={(value) => setEmail(value)}
        />
        <TextInput
          style={[
            styles.input,
            styles.font,
            errorMessage === '' ? null : styles.inputError,
          ]}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={(value) => setPassword(value)}
        />
        {errorMessage === '' || (
          <Text style={[styles.validationEmail, styles.font]}>
            {password === '' || email === ''
              ? 'Email and password cannot be empty'
              : errorMessage}
          </Text>
        )}
        <TouchableOpacity onPress={handleLogin} style={styles.container}>
          <Text style={[styles.button, styles.login]}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleRegister} style={styles.container}>
          <Text style={[styles.button, styles.register]}>Register</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.line} />
      <TouchableOpacity
        onPress={handleGoogleLogin}
        style={[styles.providerButton, styles.shadow]}
      >
        <FontAwesome
          name="google"
          size={24}
          color="black"
          style={styles.providerLogo}
        />
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
  container: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e6f3fc',
  },
  inputContainer: {
    margin: 'auto',
    width: '70%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    margin: 'auto',
    width: 120,
    height: 120,
  },
  input: {
    width: '100%',
    padding: 15,
    marginTop: 5,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#3590D5',
  },
  inputError: {
    borderColor: 'red',
  },
  validationEmail: {
    fontSize: 12,
    color: 'red',
    alignSelf: 'flex-start',
  },
  button: {
    width: '70%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    fontFamily: 'Kanit-Bold',
    fontSize: 18,
    textAlign: 'center',
  },
  login: {
    backgroundColor: '#0741AD',
    color: 'white',
  },
  register: {
    borderWidth: 2,
    borderColor: '#0741AD',
    backgroundColor: 'white',
  },
  line: {
    width: '70%',
    height: 1,
    backgroundColor: '#8c8c8c',
    margin: 10,
  },
  providerButton: {
    width: 40,
    borderRadius: 20,
    height: 40,
    backgroundColor: '#fff',
    alignContent: 'center',
    justifyContent: 'center',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 5,
  },
  providerLogo: {
    marginauto: 'auto',
    alignSelf: 'center',
    justifyContent: 'center',
    color: '#00a1f1',
  },
  font: {
    fontFamily: 'Kanit-Regular',
  },
});
