import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc, doc, setDoc, getDoc } from "firebase/firestore";
import dotenv from "dotenv";

dotenv.config();

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const UMDData = {
  name: "University of Maryland College-Park",
  undergradEnrollment: 29982,
  location: "College Park, MD",
};

const docRef = doc(db, "colleges", UMDData.name + " " + UMDData.location);

try {
  await setDoc(docRef, UMDData, { merge: true });
  console.log("Document written");
} catch (e) {
  console.error("Error adding document: ", e);
}

const snapShot = await getDoc(docRef);
const umd = snapShot.data();
console.log(`${JSON.stringify(umd)}`);
