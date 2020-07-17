// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";

import "firebase/auth";
import "firebase/database";

// PUT YOUR OWN FIREBASE CONFIGURATION HERE
var firebaseConfig = {
    apiKey: "AIzaSyBPEONvdUjwxEeOdYPUulOIQwSIh7990NY",
    authDomain: "safechat-fa24b.firebaseapp.com",
    databaseURL: "https://safechat-fa24b.firebaseio.com",
    projectId: "safechat-fa24b",
    storageBucket: "safechat-fa24b.appspot.com",
    messagingSenderId: "497703609141",
    appId: "1:497703609141:web:f4190fc190ead61077627c",
    measurementId: "G-2380GVHCG6"
  };

// Initialize Firebase
let firebaseApp = firebase.initializeApp(firebaseConfig);
let firebaseAuth = firebaseApp.auth()
let firebaseDb = firebaseApp.database()

export { firebaseAuth, firebaseDb }