import { Languages } from "lucide-react";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface LanguageSwitcherProps {
  currentLocale: string;
}

export function LanguageSwitcher({ currentLocale }: LanguageSwitcherProps) {
  const isEnglish = currentLocale === "en";
  const targetLocale = isEnglish ? "es" : "en";
  const tooltipText = isEnglish
    ? "Traducir al Español"
    : "Translate to English";

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Link href={`/${targetLocale}`} className="block">
          <Languages
            size={28}
            className="hover:opacity-80 transition-opacity"
          />
          <span className="sr-only">
            {isEnglish ? "Switch to Spanish" : "Cambiar a Inglés"}
          </span>
        </Link>
      </TooltipTrigger>
      <TooltipContent>
        <p>{tooltipText}</p>
      </TooltipContent>
    </Tooltip>
  );
}
