import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCqEdmqWdNZo95cfoe7i1IcekKDFSAMRbo",
  authDomain: "upi-scam-alert.firebaseapp.com",
  projectId: "upi-scam-alert",
  storageBucket: "upi-scam-alert.firebasestorage.app",
  messagingSenderId: "86877247828",
  appId: "1:86877247828:web:dc7c637480469c079c50c1",
  measurementId: "G-GZ1ELGEGCV"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);