import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";

interface LinksCardProps {
  website: string;
  applicationWebsite: string;
}

const LinksCard: React.FC<LinksCardProps> = ({
  website,
  applicationWebsite,
}) => {
  const normalizedWebsite =
    website.startsWith("https://") || website.startsWith("http://")
      ? website
      : `https://${website}`;

  const normalizedApplicationWebsite =
    applicationWebsite.startsWith("https://") || website.startsWith("http://")
      ? applicationWebsite
      : `https://${applicationWebsite}`;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Links</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-blue-600">
          <a href={normalizedWebsite}>
            {website.length == 1 ? "No Website Provided" : "Main Website"}
          </a>
        </p>
      </CardContent>
      <CardFooter>
        <p className="text-blue-600">
          <a href={`${normalizedApplicationWebsite}`}>
            {applicationWebsite.length == 1
              ? "No Website Provided"
              : "Application Website"}
          </a>
        </p>
      </CardFooter>
    </Card>
  );
};

export default LinksCard;
