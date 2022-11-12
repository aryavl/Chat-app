// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import {getStorage} from 'firebase/storage'
import {getFunctions} from 'firebase/functions'
import { getDatabase, onValue, ref, serverTimestamp, set } from 'firebase/database';
const firebaseConfig = {
  apiKey: "AIzaSyApmKtd4ddO9CPf42BebOaEK7qGSCHVIBE",
  authDomain: "chat-app-aryavl.firebaseapp.com",
  databaseURL: "https://chat-app-aryavl-default-rtdb.firebaseio.com",
  projectId: "chat-app-aryavl",
  storageBucket: "chat-app-aryavl.appspot.com",
  messagingSenderId: "657283932728",
  appId: "1:657283932728:web:3c51dcdeadf2024311bccd",
  measurementId: "G-45N9C68FJ8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const writeUserData=async(userId,name)=>{
  const db=getDatabase();
  const reference= ref(db,"profile/"+ userId);

  await set(reference,{
    name:name,
    createdAt:serverTimestamp(),
  })
}

export const userReference=(obj)=>{
  const db=getDatabase();
  const reference = ref(db,"profile/"+ obj)
  onValue(reference,snap=>{
    
    console.log(snap.val())
  })
}
export const auth = getAuth(app);
export const database = getDatabase(app);
export const storage = getStorage(app);
export const functions = getFunctions(app, 'asia-south1');
