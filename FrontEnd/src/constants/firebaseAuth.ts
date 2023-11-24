// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth"
const firebaseConfig = {
  apiKey: "AIzaSyBgOk_gj5zacdhamKghtjVjuZ4zkwvU9Ig",
  authDomain: "nexus-697d2.firebaseapp.com",
  projectId: "nexus-697d2",
  storageBucket: "nexus-697d2.appspot.com",
  messagingSenderId: "804528990357",
  appId: "1:804528990357:web:2dc3df46b29db85a1ad39c",
  measurementId: "G-EVYRDFHX30"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider()
export {auth,provider}