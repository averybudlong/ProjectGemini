import { db } from "../firebase";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { College } from "../types/College";

const COLLECTION_NAME = "colleges";

export async function getAllColleges(): Promise<College[]> {
  const snapshot = await getDocs(collection(db, COLLECTION_NAME));
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as College);
}

export async function getCollege(id: string): Promise<College | null> {
  const docRef = doc(db, COLLECTION_NAME, id);
  const docSnap = await getDoc(docRef);
  return docSnap.exists()
    ? ({ id: docSnap.id, ...docSnap.data() } as College)
    : null;
}
