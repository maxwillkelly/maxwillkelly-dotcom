import Image from "next/image";

export const LinkedInIcon = () => (
  <>
    <Image
      alt="LinkedIn Icon"
      aria-hidden
      className="size-5 shrink-0 object-contain sm:size-4 dark:hidden"
      height={779}
      src="/social/linkedin/inbug-black.png"
      width={840}
    />
    <Image
      alt="LinkedIn Icon"
      aria-hidden
      className="hidden size-5 shrink-0 object-contain sm:size-4 dark:block"
      height={779}
      src="/social/linkedin/inbug-white.png"
      width={840}
    />
  </>
);
