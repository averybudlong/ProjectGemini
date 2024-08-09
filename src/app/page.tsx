import { getAllColleges } from "@/app/utils/firebaseUtils";
import HomeClient from "./HomeClient";

export const dynamic = "force-static";

export default async function Home() {
  const colleges = await getAllColleges();

  return <HomeClient initialColleges={colleges} />;
}
