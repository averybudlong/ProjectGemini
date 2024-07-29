"use client";

import { getAllColleges } from "@/app/utils/firebaseUtils";
import SearchBar from "../components/SearchBar";
import CollegeCard from "../components/CollegeCard";
import { Courier_Prime, Rubik_Mono_One, Merriweather } from "next/font/google";
import { useEffect, useMemo, useState } from "react";
import { College } from "@/types/College";

interface HomeClientProps {
  initialColleges: College[];
}

const courierPrime = Courier_Prime({ subsets: ["latin"], weight: "700" });
const rubikMonoOne = Rubik_Mono_One({ subsets: ["latin"], weight: "400" });
const dmSerifDisplay = Merriweather({
  subsets: ["latin"],
  weight: "400",
});

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
          ${courierPrime.className} 
          text-5xl
          font-bold 
          mb-4 mt-8 
          pb-2
          text-center sm:text-left
          whitespace-nowrap
          overflow-hidden
          tracking-wider
        `}
        >
          common<span className="text-[hsl(var(--accent))]">/</span>college
          <span className="text-[hsl(var(--accent))]">/</span>data
        </h1>

        <SearchBar onSearch={handleSearch} />

        <div className="mt-4 grid gap-4 grid-cols-3 xl:grid-cols-4">
          {filteredColleges.map((college) => (
            <CollegeCard key={college.urlName} college={college} />
          ))}
        </div>
      </div>
    </div>
  );
}
