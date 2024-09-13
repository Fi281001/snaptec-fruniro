// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
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

onAuthStateChanged(auth, (user) => {
  if (user) {
    // User đã đăng nhập, có thể lấy user.uid
    console.log("User ID:", user.uid);
  } else {
    // Không có user nào đăng nhập
    console.log("No user is logged in.");
  }
});

export { auth, signInWithEmailAndPassword, database, onAuthStateChanged };
