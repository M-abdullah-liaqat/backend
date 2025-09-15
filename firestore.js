// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import dotenv from 'dotenv'

dotenv.config({ path: './.env' })
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.DBKEY,
  authDomain: "our-personal-projects.firebaseapp.com",
  projectId: "our-personal-projects",
  storageBucket: "our-personal-projects.firebasestorage.app",
  messagingSenderId: "597652410653",
  appId: "1:597652410653:web:1c5c371ec59f9d47ef11f4",
  measurementId: "G-WSSBRM9C2W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const DB= getFirestore(app)
console.log(process.env.DBKEY)