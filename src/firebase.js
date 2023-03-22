// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBIlASK2b9HeZytR9hO5H14buYsQIGo5O0",
  authDomain: "ceylon-models.firebaseapp.com",
  projectId: "ceylon-models",
  storageBucket: "ceylon-models.appspot.com",
  messagingSenderId: "323418349786",
  appId: "1:323418349786:web:07f06cc72eca258487c5e3",
  measurementId: "G-2BKX476PHH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
