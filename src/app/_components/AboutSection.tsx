import { Link } from "@heroui/react";

export const AboutSection = () => {
  return (
    <section id="about">
      <h2 className="text-xl">About</h2>
      <p className="mt-4">
        Currently I work at{" "}
        <Link
          className="text-inherit no-underline hover:underline"
          href="https://thekeysupport.com/"
          rel="noopener noreferrer"
          target="_blank"
        >
          The Key Support Services
          <Link.Icon />
        </Link>
        , where I work on{" "}
        <Link
          className="text-inherit no-underline hover:underline"
          href="https://governorhub.com/"
          rel="noopener noreferrer"
          target="_blank"
        >
          GovernorHub
          <Link.Icon />
        </Link>
        , the leading online service for school governors and trustees. I lead
        GovernorHub's engineering team and work with our product lead, and other
        stakeholders to deliver new features and improvements for the largest
        volunteer workforce in the UK.
        <br />
        <br />
        I have some involement in every part of the process, from gathering
        requirements and designing solutions to writing code and testing.
        <br />
        <br />I have a passion for building high-quality software that automates
        mundane work and solves real problems that impact people's lives.
      </p>
    </section>
  );
};
