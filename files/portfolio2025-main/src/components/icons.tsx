import {
  BookOpenIcon,
  BriefcaseIcon,
  IdCard,
  ContactIcon,
  File,
  GlobeIcon,
  HomeIcon,
  MailIcon,
  MessageSquareIcon,
  UserIcon,
  ShieldCheck,
  FolderOpen,
  QrCode,
} from "lucide-react";
import ThemedIcon from "./themed-icon";
import Image from "next/image";
import GitHub from "./icons/github";
import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

export const Icons = {
  qr: (props: IconProps) => <QrCode {...props} />,
  globe: (props: IconProps) => <GlobeIcon {...props} />,
  shield: (props: IconProps) => <ShieldCheck {...props} />,
  folder: (props: IconProps) => <FolderOpen {...props} />,
  email: (props: IconProps) => <MailIcon {...props} />,
  home: (props: IconProps) => <HomeIcon {...props} />,
  user: (props: IconProps) => <UserIcon {...props} />,
  work: (props: IconProps) => <BriefcaseIcon {...props} />,
  education: (props: IconProps) => <BookOpenIcon {...props} />,
  projects: (props: IconProps) => <MessageSquareIcon {...props} />,
  certifications: (props: IconProps) => <IdCard {...props} />,
  contact: (props: IconProps) => <ContactIcon {...props} />,
  x: () => (
    <ThemedIcon
      lightVariant="/icons/X_light.svg"
      darkVariant="/icons/X_dark.svg"
      alt="X"
    />
  ),
  github: (props: IconProps) => (
    <GitHub props={props} className="h-5 w-5 fill-black dark:fill-white" />
  ),
  githubInverted: (props: IconProps) => (
    <GitHub props={props} className="h-3 w-3 fill-white dark:fill-black" />
  ),
  linkedin: (props: IconProps) => (
    <Image
      src="/icons/linkedin.svg"
      alt="LinkedIn"
      width={16}
      height={16}
      className={props.className}
      unoptimized
    />
  ),
  filePdf: (props: IconProps) => <File {...props} />,
};
