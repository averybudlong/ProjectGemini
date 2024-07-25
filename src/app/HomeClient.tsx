"use client";

import { getAllColleges } from "@/app/utils/firebaseUtils";
import SearchBar from "../components/SearchBar";
import CollegeCard from "../components/CollegeCard";
import { Space_Mono, Rubik_Mono_One } from "next/font/google";
import { useEffect, useMemo, useState } from "react";
import { College } from "@/types/College";

interface HomeClientProps {
  initialColleges: College[];
}

const sm = Space_Mono({ subsets: ["latin"], weight: "700" });
const rubikMonoOne = Rubik_Mono_One({ subsets: ["latin"], weight: "400" });

export default function HomeClient({ initialColleges }: HomeClientProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredColleges = useMemo(() => {
    return initialColleges.filter((college) =>
      college.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [initialColleges, searchTerm]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

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

        <SearchBar onSearch={handleSearch} />

        <div className="mt-4 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {filteredColleges.map((college) => (
            <CollegeCard key={college.urlName} college={college} />
          ))}
        </div>
      </div>
    </div>
  );
}
