import { initializeApp } from "firebase/app";

//add-data-firebase
import { getDatabase} from "firebase/database"

//upload-image
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: process.env.REDIRECT_API_KEY,
  authDomain: "furino-2343b.firebaseapp.com",
  projectId: "furino-2343b",
  storageBucket: "furino-2343b.appspot.com",
  messagingSenderId: "457770215460",
  appId: "1:457770215460:web:d6cf35cf74cda30f0010b1",
};

const app = initializeApp(firebaseConfig);

//add-data-firebase
export const db = getDatabase(app);

//upload-image
export const imageDB = getStorage(app);
