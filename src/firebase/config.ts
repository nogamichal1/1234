
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ?? "AIzaSyBp53ZGr1C0WZldw7XghfxZics2fOcushs",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ?? "hogs-crm.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ?? "hogs-crm",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ?? "hogs-crm.appspot.com",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ?? "313138877652",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID ?? "1:313138877652:web:dummydummy",
};

// Check missing env, but we fallback so no blocking error
if (typeof window !== 'undefined') {
  console.info('Firebase config loaded:', firebaseConfig);
}

const app =
  typeof window !== "undefined"
    ? !getApps().length
      ? initializeApp(firebaseConfig)
      : getApp()
    : undefined;

export const auth =
  typeof window !== "undefined" && app ? getAuth(app) : undefined;
