// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA5s0lgH1SY_hgwaQ5kC6hOd0ZSIUqaCMc",
  authDomain: "oval-method-401006.firebaseapp.com",
  projectId: "oval-method-401006",
  storageBucket: "oval-method-401006.appspot.com",
  messagingSenderId: "847275586106",
  appId: "1:847275586106:web:8dbec3598a042181a03b03",
  measurementId: "G-TK599WEKH7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const gauth =  getAuth(app);
export const googleProvider = new GoogleAuthProvider();