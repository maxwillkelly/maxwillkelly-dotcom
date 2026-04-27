import Image from "next/image";

export const GithubIcon = () => (
  <>
    <Image
      alt="Github Icon"
      aria-hidden
      className="size-5 shrink-0 sm:size-4 dark:hidden"
      height={20}
      src="/social/github/GitHub_Invertocat_Black.svg"
      width={20}
    />
    <Image
      alt="Github Icon"
      aria-hidden
      className="hidden size-5 shrink-0 sm:size-4 dark:block"
      height={20}
      src="/social/github/GitHub_Invertocat_White.svg"
      width={20}
    />
  </>
);
