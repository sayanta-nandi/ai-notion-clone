import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCPY0-AL3hLI2psnYRCS8GD3xxNFdnkTfs",
  authDomain: "ai-notion-clone-bf7c4.firebaseapp.com",
  projectId: "ai-notion-clone-bf7c4",
  storageBucket: "ai-notion-clone-bf7c4.firebasestorage.app",
  messagingSenderId: "971065463371",
  appId: "1:971065463371:web:c7a24db5213bb7b8d933ce"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export { db };