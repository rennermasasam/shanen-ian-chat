// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD4gbgHoL6c3LB_fL5j2k3R2AVcy3N8I4o",
  authDomain: "superchat-5b4f0.firebaseapp.com",
  projectId: "superchat-5b4f0",
  storageBucket: "superchat-5b4f0.appspot.com",
  messagingSenderId: "753427940697",
  appId: "1:753427940697:web:0e943349d5dc2dbe56f848",
  measurementId: "G-SZLKVF3344"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);