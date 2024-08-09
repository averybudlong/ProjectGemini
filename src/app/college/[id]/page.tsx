import { getCollege } from "@/app/utils/firebaseUtils";
import EnrollmentSankey from "@/components/EnrollmentSankey";

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

  // THIS JUST SHOWS ALL THE DATA IN A LIST
  // const data = Object.entries(college).map(([propertyName, val]) => (
  //   <li key={propertyName}>{`${propertyName}: ${val}`}</li>
  // ));

  // return <div className="container mx-auto px-4 py-8">{data}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <EnrollmentSankey
        applicants={college.applicants}
        admitted={college.admitted}
        enrolled={college.enrolledCycle}
      />
    </div>
  );
}
