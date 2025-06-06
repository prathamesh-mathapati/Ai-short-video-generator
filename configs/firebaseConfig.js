// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDH-l2FE3KVx5q6YceWafb3FodF81P_rHo",
  authDomain: "ai-short--video-generato-1502a.firebaseapp.com",
  projectId: "ai-short--video-generato-1502a",
  storageBucket: "ai-short--video-generato-1502a.firebasestorage.app",
  messagingSenderId: "885351279280",
  appId: "1:885351279280:web:b3b96ea3c02374ddcb6975",
  measurementId: "G-97YVWFD31K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);