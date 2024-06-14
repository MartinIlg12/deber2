// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use

const firebaseConfig = {
    apiKey: "AIzaSyCgT41eZ_0HRNwNAPIg8tq-LHsAq2C7ab0",
    authDomain: "deber2-dc1d5.firebaseapp.com",
    databaseURL: "https://deber2-dc1d5-default-rtdb.firebaseio.com",
    projectId: "deber2-dc1d5",
    storageBucket: "deber2-dc1d5.appspot.com",
    messagingSenderId: "1089942167448",
    appId: "1:1089942167448:web:7b60617ef122b2747f55ed",
    dataBaseURL:"https://deber2-dc1d5-default-rtdb.firebaseio.com/"
  };

const firebase = initializeApp(firebaseConfig);
//export const auth = getAuth(firebase);
export const auth = initializeAuth(firebase, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export const dbRealTime = getDatabase(firebase);