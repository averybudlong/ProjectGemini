"use client";

import React, { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { IconSearch } from "@tabler/icons-react";
import debounce from "lodash/debounce";

interface SearchBarProps {
  onSearch: (term: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const debouncedSearch = useMemo(
    () =>
      debounce((term: string) => {
        onSearch(term);
      }, 100),
    [onSearch]
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    debouncedSearch(term);
  };

  return (
    <div className="relative">
      <Input
        type="search"
        placeholder="Search Colleges"
        className="pl-4 pr-10"
        onChange={handleInputChange}
      />
      <IconSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
    </div>
  );
};

export default SearchBar;
