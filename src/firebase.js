// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC8PcqyfG-9J7l9bj2nCgIyZGkwZPArZAY",
  authDomain: "tampazakahfund.firebaseapp.com",
  databaseURL: "https://tampazakahfund-default-rtdb.firebaseio.com",
  projectId: "tampazakahfund",
  storageBucket: "tampazakahfund.appspot.com",
  messagingSenderId: "89886557365",
  appId: "1:89886557365:web:38c4c1c479dc7e3ff9eafc",
  measurementId: "G-T75CS3GT7J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { db };
