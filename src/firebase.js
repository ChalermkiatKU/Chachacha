
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD0yiBEWtqykaKl8A8A8V3iq2Ga4CzLhmA",
  authDomain: "login-app-e74ea.firebaseapp.com",
  projectId: "login-app-e74ea",
  storageBucket: "login-app-e74ea.appspot.com",
  messagingSenderId: "1047840916807",
  appId: "1:1047840916807:web:6bba6b66af64ffd61bb862",
  measurementId: "G-7DGS0JJXW0"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)

export const db = getFirestore(app);

export default app;

