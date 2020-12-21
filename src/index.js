import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/auth';

// Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyBZdKFVY-wXni_NiBQHslTgqVhTYTX4peE",
    authDomain: "fir-project-id-37ffe.firebaseapp.com",
    databaseURL: "https://fir-project-id-37ffe-default-rtdb.firebaseio.com/",
    projectId: "fir-project-id-37ffe",
    storageBucket: "fir-project-id-37ffe.appspot.com",
    messagingSenderId: "200430254297",
    appId: "1:200430254297:web:f5f31086ed42bfe2f526c8",
    measurementId: "G-ZB2CW867TY"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
);
