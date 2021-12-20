import firebase from 'firebase/app'
import 'firebase/storage';
import 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyAdHRD1CizYsWb9RWG3kk-DYPf0RPvzDrg",
  authDomain: "shoponline-fd329.firebaseapp.com",
  projectId: "shoponline-fd329",
  storageBucket: "shoponline-fd329.appspot.com",
  messagingSenderId: "101598190960",
  appId: "1:101598190960:web:50560415eab000d8e443b5",
  measurementId: "G-BP816K62PC"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//analytics is optional for this tutoral 
firebase.analytics();

const storage = firebase.storage()

export {
  storage, firebase as default
}
