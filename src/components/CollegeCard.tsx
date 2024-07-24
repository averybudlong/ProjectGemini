"use client";

import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { College } from "../types/College";
import React from "react";

interface CollegeCardProps {
  college: College;
}

const CollegeCard: React.FC<CollegeCardProps> = ({ college }) => {
  return (
    <Link href={`/college/${college.urlName}`}>
      <Card>
        <CardHeader>
          <CardTitle>{college.name}</CardTitle>
          <CardDescription>{college.location}</CardDescription>
        </CardHeader>
        <CardContent>
          <p>
            Undergraduate Enrollment: {college.undergradEnrollment.toString()}
          </p>
        </CardContent>
        <CardFooter>
          <p>ID: {college.urlName}</p>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default CollegeCard;
