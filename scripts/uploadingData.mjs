import { initializeApp } from "firebase/app";
import { getDocs, getFirestore } from "firebase/firestore";
import {
  collection,
  addDoc,
  doc,
  setDoc,
  getDoc,
  query,
  where,
  deleteDoc,
} from "firebase/firestore";
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

const collegeDataArray = [];
collegeDataArray.push(
  {
    name: "University of Maryland College-Park",
    undergradEnrollment: 29982,
    location: "College Park, MD",
  },
  {
    name: "Squidward Univ",
    undergradEnrollment: 99999,
    location: "Bikini Bottom, Pacific Ocean",
  },
  {
    name: "Ligma State University",
    undergradEnrollment: 69,
    location: "Balls, MA",
  }
);

async function addColleges() {
  for (const collegeData of collegeDataArray) {
    const docRef = doc(collection(db, "colleges"));
    try {
      await setDoc(docRef, collegeData);
      console.log(`Document written for ${collegeData.name}`);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
}

async function queryColleges() {
  const collegeQuery = query(
    collection(db, "colleges"),
    where("undergradEnrollment", ">", 200)
  );

  const querySnapshot = await getDocs(collegeQuery);
  const allDocs = querySnapshot.forEach((snap) => {
    console.log(`${JSON.stringify(snap.data())}`);
  });
}

await addColleges();
await queryColleges();

// Get singular doc
// const snapShot = await getDoc(docRef);
// const umd = snapShot.data();
// console.log(`${JSON.stringify(umd)}`);
