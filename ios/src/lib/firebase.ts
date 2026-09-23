import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAju5wjH0D6a4KlOvsSc2WwmuUNL0cEctk",
  authDomain: "shabtbhisha.firebaseapp.com",
  projectId: "shabtbhisha",
  storageBucket: "shabtbhisha.firebasestorage.app",
  messagingSenderId: "942982260541",
  appId: "1:942982260541:web:29f2c1f419094f9e380754",
  measurementId: "G-ZZE7BDWJ9N",
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

export function getFirebaseAuth() {
  if (!auth) {
    auth = getAuth(getApp());
  }
  return auth;
}

export function getFirebaseDb() {
  if (!db) {
    db = getFirestore(getApp());
  }
  return db;
}
