import SearchBar from '../components/SearchBar';
import CollegeCard from '../components/CollegeCard';
import ModeToggle from '../components/ModeToggle';

export default function Home() {

  return (
    <main className="container mx-auto px-2 py-2">
      <h1 className="text-3xl font-bold mb-2">College Common Data Set Information</h1>
      <SearchBar/>

      <h2>
        <CollegeCard/>
      </h2>

      <ModeToggle/>
    </main>
  );
}
