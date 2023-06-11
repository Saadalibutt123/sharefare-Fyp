// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDHaE-AagwzkIHWXSXYgebifUwUipR4X3k",
  authDomain: "fypsharefare-59926.firebaseapp.com",
  projectId: "fypsharefare-59926",
  storageBucket: "fypsharefare-59926.appspot.com",
  messagingSenderId: "221947499009",
  appId: "1:221947499009:web:6e541e58f711939c7de600"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);