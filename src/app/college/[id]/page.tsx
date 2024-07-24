import { getCollege } from "@/app/utils/firebaseUtils";
import CollegeCard from "@/components/CollegeCard";

export default async function CollegePage({
  params,
}: {
  params: { id: string }; // the id is the urlName
}) {
  const college = await getCollege(params.id);

  if (!college) {
    return <div>College not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">{JSON.stringify(college)}</div>
  );
}
