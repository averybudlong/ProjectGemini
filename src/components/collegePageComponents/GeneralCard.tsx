import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";

interface GeneralCardProps {
  state: string;
  city: string;
  name: string;
  revenuePublic: string;
}

const GeneralCard: React.FC<GeneralCardProps> = ({
  state,
  city,
  name,
  revenuePublic,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{`${city}, ${state}`}</p>
      </CardContent>
      <CardFooter>
        <p>{revenuePublic ? "Public University" : "Private University"}</p>
      </CardFooter>
    </Card>
  );
};

export default GeneralCard;
