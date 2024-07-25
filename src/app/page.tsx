import { getAllColleges } from "@/app/utils/firebaseUtils";
import HomeClient from "./HomeClient";

export default async function Home() {
  const colleges = await getAllColleges();

  return <HomeClient initialColleges={colleges} />;
}
