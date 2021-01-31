import _firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

_firebase.initializeApp({
  apiKey: 'AIzaSyA27uOIdu5J6s8qZwdCRNhHyHa2LGjpqTE',
  authDomain: 'chat-a6259.firebaseapp.com',
  databaseURL: 'https://chat-a6259-default-rtdb.firebaseio.com',
  projectId: 'chat-a6259',
  storageBucket: 'chat-a6259.appspot.com',
  messagingSenderId: '740988935887',
  appId: '1:740988935887:web:0b1d3a4b114fa608b2e1ba',
  measurementId: 'G-PEQZH62G57',
});

export const firebase = _firebase;
