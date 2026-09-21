import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import { getAuth, Auth, browserSessionPersistence, setPersistence } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

let app: FirebaseApp;
let auth: Auth;
let db: Firestore;

function getApp() {
  if (!app) {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
  }
  return app;
}

let persistenceSet = false;

function getFirebaseAuth() {
  if (!auth) {
    auth = getAuth(getApp());
    if (!persistenceSet) {
      persistenceSet = true;
      setPersistence(auth, browserSessionPersistence);
    }
  }
  return auth;
}

function getFirebaseDb() {
  if (!db) {
    db = getFirestore(getApp());
  }
  return db;
}

export { getApp, getFirebaseAuth, getFirebaseDb };
