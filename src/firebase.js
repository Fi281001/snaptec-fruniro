// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REDIRECT_API_KEY,
  authDomain: "furino-2343b.firebaseapp.com",
  projectId: "furino-2343b",
  storageBucket: "furino-2343b.appspot.com",
  messagingSenderId: "457770215460",
  appId: "1:457770215460:web:d6cf35cf74cda30f0010b1",
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const database = getDatabase(firebase);
