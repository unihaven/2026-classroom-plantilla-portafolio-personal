import Image from "next/image";

type ThemedIconProps = {
  lightVariant: string;
  darkVariant: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
};

const ThemedIcon = ({
  lightVariant,
  darkVariant,
  alt,
  className,
  width = 16,
  height = 16,
}: ThemedIconProps) => {
  return (
    <>
      <Image
        src={lightVariant}
        alt={alt}
        className={`dark:hidden ${className}`}
        width={width}
        height={height}
        unoptimized
      />
      <Image
        src={darkVariant}
        alt={alt}
        className={`hidden dark:block ${className}`}
        width={width}
        height={height}
        unoptimized
      />
    </>
  );
};
export default ThemedIcon;
