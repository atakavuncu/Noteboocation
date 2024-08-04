// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD_xXarb5H6m0DWhjgLjFQwkj1ge_6JAe4",
  authDomain: "noteboocation.firebaseapp.com",
  projectId: "noteboocation",
  storageBucket: "noteboocation.appspot.com",
  messagingSenderId: "336931188330",
  appId: "1:336931188330:web:f1e9cbc3cb62e0f0aea413"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app