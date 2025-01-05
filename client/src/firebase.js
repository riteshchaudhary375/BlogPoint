// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "blogpoint-8e12d.firebaseapp.com",
  projectId: "blogpoint-8e12d",
  storageBucket: "blogpoint-8e12d.firebasestorage.app",
  messagingSenderId: "800289214124",
  appId: "1:800289214124:web:5b462cda92ebbd1b09d909",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
