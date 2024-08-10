import { getCollege } from "@/app/utils/firebaseUtils";
import EnrollmentSankey from "@/components/collegePageComponents/EnrollmentSankey";
import AdmissionCard from "@/components/collegePageComponents/AdmissionCard";

// the id is the urlName
export default async function CollegePage({
  params,
}: {
  params: { id: string };
}) {
  const college = await getCollege(params.id);

  if (!college) {
    return <div>College not found</div>;
  }

  const data = Object.entries(college).map(([propertyName, val]) => (
    <li key={propertyName}>{`${propertyName}: ${val}`}</li>
  ));

  const acceptanceRate = (college.admitted / college.applicants) * 100;
  const yieldRate = (college.enrolledCycle / college.admitted) * 100;

  return (
    <>
      <h1 className="font-black mt-6 mb-2 mx-10 text-left text-3xl">
        {college.name}
      </h1>

      <div className="container mx-auto px-4 py-8">
        <h2 className="font-bold">Admission Data</h2>
        <EnrollmentSankey
          applicants={college.applicants}
          admitted={college.admitted}
          enrolled={college.enrolledCycle}
        />
      </div>

      <div className="mb-4 grid gap-4 grid-cols-4">
        <AdmissionCard
          applicants={college.applicants}
          admitted={college.admitted}
          enrolled={college.enrolledCycle}
        />
      </div>

      <div>
        {`Acceptance Rate: ${acceptanceRate.toFixed(2)}%`}
        <br />
        {`Yield Rate: ${yieldRate.toFixed(2)}%`}
      </div>
      <div className="container mx-auto px-4 py-8">{data}</div>
    </>
  );
}
