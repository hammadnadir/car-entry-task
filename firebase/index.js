// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAyS6L_bpGzYR1LAwv1zBGWeKae_GlHuNo",
  authDomain: "car-service-5f9e2.firebaseapp.com",
  projectId: "car-service-5f9e2",
  storageBucket: "car-service-5f9e2.appspot.com",
  messagingSenderId: "797173264619",
  appId: "1:797173264619:web:30621dcd0e5d0f23b14eae",
  measurementId: "G-6K5ZGC3XJM"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
