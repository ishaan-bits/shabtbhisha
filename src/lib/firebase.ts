import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

let _app: FirebaseApp | undefined;
let _auth: Auth | undefined;
let _db: Firestore | undefined;

function getApp(): FirebaseApp {
  if (!_app) {
    _app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
  }
  return _app;
}

export function getFirebaseAuth(): Auth {
  if (!_auth) _auth = getAuth(getApp());
  return _auth;
}

export function getFirebaseDb(): Firestore {
  if (!_db) _db = getFirestore(getApp());
  return _db;
}

// Lazy proxies — properties are only resolved when accessed, not at import time
export const auth: Auth = new Proxy({} as Auth, {
  get: (_, prop) => Reflect.get(getFirebaseAuth(), prop),
  set: (_, prop, val) => Reflect.set(getFirebaseAuth(), prop, val),
  has: (_, prop) => prop in getFirebaseAuth(),
});

export const db: Firestore = new Proxy({} as Firestore, {
  get: (_, prop) => Reflect.get(getFirebaseDb(), prop),
  set: (_, prop, val) => Reflect.set(getFirebaseDb(), prop, val),
  has: (_, prop) => prop in getFirebaseDb(),
});

export const app: FirebaseApp = new Proxy({} as FirebaseApp, {
  get: (_, prop) => Reflect.get(getApp(), prop),
  set: (_, prop, val) => Reflect.set(getApp(), prop, val),
  has: (_, prop) => prop in getApp(),
});
