// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-1f5ba.firebaseapp.com",
  projectId: "mern-auth-1f5ba",
  storageBucket: "mern-auth-1f5ba.appspot.com",
  messagingSenderId: "1055952024807",
  appId: "1:1055952024807:web:17b182a475d9f4a4169e42"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);