import CollegeSearch from '../app/components/CollegeSearch';
import CollegeCard from '../app/components/CollegeCard';

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">College Common Data Set Information</h1>
      <CollegeSearch />

      <h2>
        <CollegeCard/>
      </h2>
    </main>
  );
}
