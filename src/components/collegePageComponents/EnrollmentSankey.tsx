"use client";

import React from "react";
import CustomNode from "./CustomSankeyNode";
import {
  LabelList,
  Layer,
  ResponsiveContainer,
  Sankey,
  Tooltip,
} from "recharts";
import { propagateServerField } from "next/dist/server/lib/render-server";

interface EnrollmentSankeyProps {
  applicants: number;
  admitted: number;
  enrolled: number;
}

const EnrollmentSankey: React.FC<EnrollmentSankeyProps> = ({
  applicants,
  admitted,
  enrolled,
}) => {
  const rejected = applicants - admitted;
  const declined = admitted - enrolled;
  const data = {
    nodes: [
      { name: "Applied" },
      { name: "Rejected" },
      { name: "Admitted" },
      { name: "Enrolled" },
      { name: "Declined" },
    ],
    links: [
      { source: 0, target: 1, value: rejected },
      { source: 0, target: 2, value: admitted },
      { source: 2, target: 3, value: enrolled },
      { source: 2, target: 4, value: declined },
    ],
  };

  return (
    <ResponsiveContainer width="90%" height={400} minWidth={250}>
      <Sankey
        width={960}
        height={500}
        data={data}
        node={(props) => (
          <CustomNode {...props} textColor={"hsl(var(--foreground))"} />
        )}
        nodePadding={80}
        margin={{
          left: 50,
          right: 100,
          top: 10,
          bottom: 25,
        }}
        link={{ stroke: "hsl(var(--foreground))" }}
        sort={false}
      >
        <Tooltip />
      </Sankey>
    </ResponsiveContainer>
  );
};

export default EnrollmentSankey;
