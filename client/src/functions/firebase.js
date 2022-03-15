// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth'
import "firebase/compat/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDX8IFQkDuH7aw3lJ5V6FVGHbqyqO1VhzU",
  authDomain: "mydcm-dd29b.firebaseapp.com",
  projectId: "mydcm-dd29b",
  storageBucket: "mydcm-dd29b.appspot.com",
  messagingSenderId: "625460708070",
  appId: "1:625460708070:web:1acd2214c358bbd1feb127",
  measurementId: "G-73D2WQ4D3S"
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider()
export { auth, provider }
export default db