import { db } from "../firebase";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  query,
  where,
} from "firebase/firestore";
import { College } from "../../types/College";

const COLLECTION_NAME = "colleges";

export async function getAllColleges(): Promise<College[]> {
  const snapshot = await getDocs(collection(db, COLLECTION_NAME));
  return snapshot.docs.map((doc) => ({ ...doc.data() }) as College);
}

export async function getCollege(urlName: string): Promise<College | null> {
  const docRef = doc(db, "colleges", urlName);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return { ...docSnap.data() } as College;
  } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
  }
  return null;
}
