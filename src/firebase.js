import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAALvjhBoCGNuCbz697ORQbPIUX5FSknis",
  authDomain: "chatapp-cloudscape.firebaseapp.com",
  projectId: "chatapp-cloudscape",
  storageBucket: "chatapp-cloudscape.appspot.com",
  messagingSenderId: "290857100401",
  appId: "1:290857100401:web:ed814120367ba69ebde7d0"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore()
