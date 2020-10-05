// NOTE: import only the Firebase modules that you need in your app... except
// for the second line, which makes both the linter and react-firebase happy
import firebase from 'firebase/app';
import 'firebase/firestore';

// Initalize Firebase.
var firebaseConfig = {
  apiKey: 'AIzaSyDhxP3R-9sojgJEO8MO7RyWx2mnMlfMKfA',
  authDomain: 'tcl-15-smart-shopping-list.firebaseapp.com',
  databaseURL: 'https://tcl-15-smart-shopping-list.firebaseio.com',
  projectId: 'tcl-15-smart-shopping-list',
  storageBucket: 'tcl-15-smart-shopping-list.appspot.com',
  messagingSenderId: '1084110216384',
  appId: '1:1084110216384:web:1282dfa7744f7df182a125',
};

let fb = firebase.initializeApp(firebaseConfig);
let db = fb.firestore();

export { fb, db, firebase };
