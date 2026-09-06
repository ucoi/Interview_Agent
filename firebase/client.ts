// Import the functions you need from the SDKs you need
import { initializeApp, getApp , getApps } from "firebase/app";
import  {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyDdVIyl2Ds7b_HIVA22sVJvxQUmhO07CSg",
  authDomain: "readyrole.firebaseapp.com",
  projectId: "readyrole",
  storageBucket: "readyrole.firebasestorage.app",
  messagingSenderId: "569089601047",
  appId: "1:569089601047:web:289225f3d861531f533652",
  measurementId: "G-CSQV24JSP9"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) :  getApp()


export const auth=getAuth(app)
export const db = getFirestore(app)