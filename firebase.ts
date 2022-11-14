// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { GoogleAuthProvider, initializeAuth } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getReactNativePersistence } from 'firebase/auth/react-native';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAnVyZRUmR8y5y0dHXGTXbBK8A3-GDBK4s',
  authDomain: 'solo-project-codeworks-ga.firebaseapp.com',
  projectId: 'solo-project-codeworks-ga',
  storageBucket: 'solo-project-codeworks-ga.appspot.com',
  messagingSenderId: '201814641545',
  appId: '1:201814641545:web:f8bc112ff7dda264d3ef58',
  measurementId: 'G-VH816NLZSG',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
const provider = new GoogleAuthProvider();

export { auth, provider };
