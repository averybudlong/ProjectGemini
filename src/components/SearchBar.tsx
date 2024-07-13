'use client'

import { useState } from 'react';
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { IconSearch } from '@tabler/icons-react';


// TODO: Lift up state to a higher component to actually do the searching. Make an
// onSearch prop and pass in handleSearch defined in the higher level component
const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement search functionality
    console.log('Searching for:', searchTerm);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  return (
    <form onSubmit={handleSearch} className="relative">
      <Input
        type="search"
        placeholder="Search Colleges"
        className="pl-4 pr-10"
        value={searchTerm}
        onChange={handleInputChange}
      />

      <Button 
        type="submit" 
        size="icon" 
        variant="ghost" 
        className="absolute right-0 top-0 h-full"
      >
        <IconSearch/>
      </Button>
    </form>
  );
};

export default SearchBar;