import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import Markdown from "react-markdown";

interface Props {
  title: string | { [locale: string]: string };
  href?: string;
  description: string | { [locale: string]: string };
  tags: readonly (string | { [locale: string]: string })[];
  link?: string | { [locale: string]: string };
  image?: string;
  imageAlign?: "center" | "left" | "right"; // New prop for image alignment
  video?: string;
  links?: readonly {
    icon: React.ReactNode;
    type: string | { [locale: string]: string };
    href: string;
  }[];
  className?: string;
}

export function ProjectCard({
  title,
  href,
  description,
  tags,
  link,
  image,
  imageAlign = "center", // Default to center alignment
  video,
  links,
  className,
}: Props) {
  // Helper function to convert alignment to object-position value
  const getObjectPosition = (align: string) => {
    switch (align) {
      case "left":
        return "object-left-top";
      case "right":
        return "object-right-top";
      default:
        return "object-top"; // Center is default (object-top)
    }
  };

  return (
    <Card
      className={
        "flex flex-col overflow-hidden border hover:shadow-lg transition-all duration-300 ease-out h-full"
      }
    >
      <Link
        href={href || "#"}
        target="_blank"
        className={cn("block cursor-pointer", className)}
      >
        {video && (
          <video
            src={video}
            autoPlay
            loop
            muted
            playsInline
            className="pointer-events-none mx-auto h-40 w-full object-cover object-top" // needed because random black line at bottom of video
          />
        )}
        {image && (
          <Image
            src={image}
            alt={typeof title === "string" ? title : ""}
            width={500}
            height={300}
            className={`h-40 w-full overflow-hidden object-cover ${getObjectPosition(
              imageAlign,
            )}`}
          />
        )}
      </Link>
      <CardHeader className="px-2">
        <div className="space-y-1 text-base">
          <CardTitle className="mt-1 text-lg">
            {typeof title === "string" ? title : ""}
          </CardTitle>
          {/* <time className="font-sans text-xs">{dates}</time> */}
          <div className="hidden font-sans text-sm underline print:visible">
            {typeof link === "string"
              ? link
                  ?.replace("https://", "")
                  .replace("www.", "")
                  .replace("/", "")
              : ""}
          </div>
          <Markdown>
            {typeof description === "string" ? description : ""}
          </Markdown>
        </div>
      </CardHeader>
      <CardContent className="mt-auto flex flex-col px-2">
        {tags && tags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {tags?.map((tag) => (
              <Badge
                className="px-1 py-0 text-sm"
                variant="secondary"
                key={typeof tag === "string" ? tag : ""}
              >
                {typeof tag === "string" ? tag : ""}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="px-2 pb-2">
        {links && links.length > 0 && (
          <div className="flex flex-row flex-wrap items-start gap-1">
            {links?.map((link, idx) => (
              <Link href={link?.href} key={idx} target="_blank">
                <Badge key={idx} className="flex gap-2 px-2 py-1 text-xs ">
                  {link.icon}
                  {typeof link.type === "string" ? link.type : ""}
                </Badge>
              </Link>
            ))}
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
