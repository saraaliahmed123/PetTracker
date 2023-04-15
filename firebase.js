import { initializeApp } from "firebase/app";
import { getFirestore, collection, 
  addDoc, getDoc, setDoc, 
  doc, query, where, getDocs, orderBy, 
  limit, documentId, onSnapshot, updateDoc, Timestamp, deleteDoc   } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, onAuthStateChanged, signOut, updateProfile    } from "firebase/auth";
import {getStorage, ref, getDownloadURL  } from "firebase/storage"




// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA94xpEdPltETnNFkG6Z0pcx6NzqOJ_jPk",
  authDomain: "pettracker-7b7d9.firebaseapp.com",
  projectId: "pettracker-7b7d9",
  storageBucket: "pettracker-7b7d9.appspot.com",
  messagingSenderId: "327836947131",
  appId: "1:327836947131:web:fb5b5f3d55a76caa238f9e"
};


const app = initializeApp(firebaseConfig);

const db = getFirestore(app);


const auth = getAuth(app);


export {db,collection, onAuthStateChanged,
  addDoc, getDoc,getDocs, getAuth, createUserWithEmailAndPassword, 
  limit, signInWithEmailAndPassword, setDoc, doc, 
  orderBy, 
  where, query, onSnapshot ,
  documentId, updateDoc, getStorage, 
  ref, getDownloadURL, Timestamp, deleteDoc, signOut, updateProfile   };