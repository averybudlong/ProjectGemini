// app/page.tsx
import { getAllColleges } from "@/app/utils/firebaseUtils";
import SearchBar from "../components/SearchBar";
import CollegeCard from "../components/CollegeCard";

export default async function Home() {
  const colleges = await getAllColleges();

  return (
    <div className="container mx-auto px-2 py-2">
      <div className="mx-4">
        <h1 className="text-3xl font-bold mb-2 mt-8">
          College Common Data Set Information
        </h1>

        <SearchBar />

        <div className="mt-4 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {colleges.map((college) => (
            <CollegeCard key={college.urlName} college={college} />
          ))}
        </div>
      </div>
    </div>
  );
}
