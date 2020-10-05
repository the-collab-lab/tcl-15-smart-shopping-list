import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './App';
import { FirestoreProvider } from 'react-firestore';
import { firebase } from './lib/firebase';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <FirestoreProvider firebase={firebase}>
    <App />
  </FirestoreProvider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
