import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
//upload-image
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "furino-2343b.firebaseapp.com",
  projectId: "furino-2343b",
  storageBucket: "furino-2343b.appspot.com",
  messagingSenderId: "457770215460",
  appId: "1:457770215460:web:d6cf35cf74cda30f0010b1",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);
//upload-image
const imageDB = getStorage(app);

export {
  auth,
  signInWithEmailAndPassword,
  database,
  onAuthStateChanged,
  imageDB,
};
