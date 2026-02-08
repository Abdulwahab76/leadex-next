import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCsefKdtPRuqBUk80i_74Ad4vG0Xzcald4",
  authDomain: "bodenlink.firebaseapp.com",
  projectId: "bodenlink",
  storageBucket: "bodenlink.firebasestorage.app",
  messagingSenderId: "767383199218",
  appId: "1:767383199218:web:d5df68c364927ec7ac1f6b",
  measurementId: "G-B7QJGM9QBK"
};

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };
