// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCUAoeK2TW1qCY7wFTeaTFSJx0L0xnQ4ss",
  authDomain: "greenlife-3c86f.firebaseapp.com",
  projectId: "greenlife-3c86f",
  storageBucket: "greenlife-3c86f.appspot.com",
  messagingSenderId: "691212247782",
  appId: "1:691212247782:web:98093a459bff1e6cbe5127",
  measurementId: "G-HJRDLBGE4E"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);

