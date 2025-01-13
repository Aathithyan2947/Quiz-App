import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDB3PCKwjIsi5WhoWFifjZZYUnlJUlSIoU",
  authDomain: "quiz-app-c13f7.firebaseapp.com",
  projectId: "quiz-app-c13f7",
  storageBucket: "quiz-app-c13f7.appspot.com",
  messagingSenderId: "273808376911",
  appId: "1:273808376911:web:173e5f461e80166e5e163a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const auth = getAuth(app)