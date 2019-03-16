// Initialize Firebase
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";
import * as FirebaseConfig from "./configs/firebase";
var config = {
    apiKey: FirebaseConfig.FIREBASE_KEY,
    authDomain: FirebaseConfig.FIREBASE_AUTH_DOMAIN,
    databaseURL: FirebaseConfig.FIREBASE_DATABASE_URL,
    projectId: FirebaseConfig.FIREBASE_PROJECT_ID,
    storageBucket: FirebaseConfig.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: FirebaseConfig.FIREBASE_MESSAGE_SENDER_ID
  };
firebase.initializeApp(config);
export default firebase;