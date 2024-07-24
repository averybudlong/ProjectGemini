// app/page.tsx
import { getAllColleges } from "@/app/utils/firebaseUtils";
import SearchBar from "../components/SearchBar";
import CollegeCard from "../components/CollegeCard";
import { Space_Mono, Rubik_Mono_One } from "next/font/google";

const sm = Space_Mono({ subsets: ["latin"], weight: "700" });
const rubikMonoOne = Rubik_Mono_One({ subsets: ["latin"], weight: "400" });

export default async function Home() {
  const colleges = await getAllColleges();

  return (
    <div className="container mx-auto px-2 py-2">
      <div className="mx-4">
        <h1
          className={`
          ${rubikMonoOne.className} 
          text-4xl sm:text-4xl md:text-5xl lg:text-5xl 
          font-extrabold 
          mb-4 mt-8 
          text-center sm:text-left
          leading-tight
          whitespace-nowrap
          overflow-hidden
        `}
        >
          Common College Data
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
