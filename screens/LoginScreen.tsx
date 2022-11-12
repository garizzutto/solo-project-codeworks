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
import { auth } from '../firebase';
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
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
  const [result, setResult] = useState<null | UserCredential>(null);

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setErrorMessage('');
        const user = {
          email: userCredential.user.email ? userCredential.user.email : '',
          uid: userCredential.user.uid,
        };
        navigation.replace('HomeScreen', { user });
      })
      .catch(() => {
        setErrorMessage('Wrong email or password');
      });
  };

  const handleRegister = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setErrorMessage('');
        const user = {
          email: userCredential.user.email ? userCredential.user.email : '',
          uid: userCredential.user.uid,
        };
        navigation.replace('HomeScreen', { user });
      })
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
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then((userCredential) => {
      setResult(userCredential);
      console.log(result);
    });
    // .then((result) => {
    //   // This gives you a Google Access Token. You can use it to access the Google API.
    //   const credential = GoogleAuthProvider.credentialFromResult(result);
    //   const token = credential?.accessToken;
    //   // The signed-in user info.
    //   const user = result.user;
    //   // ...
    // })
    // .catch((error) => {
    //   // The AuthCredential type that was used.
    //   const credential = GoogleAuthProvider.credentialFromError(error);
    //   // ...
    // });
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Image source={require('../assets/icon.png')} style={styles.logo} />
        <TextInput
          style={[styles.input, errorMessage === '' ? null : styles.inputError]}
          placeholder="Email"
          keyboardType="email-address"
          value={email}
          onChangeText={(value) => setEmail(value)}
        />
        <TextInput
          style={[styles.input, errorMessage === '' ? null : styles.inputError]}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={(value) => setPassword(value)}
        />
        {errorMessage === '' || (
          <Text style={styles.validationEmail}>
            {password === '' || email === ''
              ? 'Email and password cannot be empty'
              : errorMessage}
          </Text>
        )}
        <TouchableOpacity
          onPress={handleLogin}
          style={[styles.button, styles.login]}
        >
          <Text style={[styles.buttonText, styles.login]}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleRegister}
          style={[styles.button, styles.register]}
        >
          <Text style={[styles.buttonText, styles.registerColor]}>
            Register
          </Text>
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
  container: {
    width: '100%',
    flex: 1,
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
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 18,
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
  registerColor: { color: '#0741AD' },
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
});
