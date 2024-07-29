"use client";

import Link from "next/link";
import Image from "next/image";

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
  const PLACEHOLDER_IMAGE = "/images/placeholder.jpg";

  return (
    <Link href={`/college/${college.urlName}`}>
      <Card className="max-w-s hover:scale-105 transform transition duration-200">
        <div className="relative w-full h-48">
          <Image
            src={college.imageUrl || PLACEHOLDER_IMAGE}
            alt={`${college.name} campus`}
            layout="fill"
            objectFit="cover"
            className="rounded-t-lg"
          />
        </div>
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
          <p className="overflow-hidden">ID: {college.urlName}</p>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default CollegeCard;
