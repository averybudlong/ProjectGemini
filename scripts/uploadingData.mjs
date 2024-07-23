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
  },
  {
    name: "Oregon State Univ",
    undergradEnrollment: 24444,
    location: "Corvallis, OR",
  }
);

async function addColleges() {
  for (const collegeData of collegeDataArray) {
    try {
      // Check if a document with this name already exists
      const q = query(
        collection(db, "colleges"),
        where("name", "==", collegeData.name)
      );
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        // No matching document found, so add the new one
        const docRef = doc(collection(db, "colleges"));
        await setDoc(docRef, collegeData);
        console.log(`Document written for ${collegeData.name}`);
      } else {
        console.log(
          `Document for ${collegeData.name} already exists, skipping`
        );
      }
    } catch (e) {
      console.error("Error processing document: ", e);
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
