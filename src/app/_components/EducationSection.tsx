import { Timeline, type TimelineEntry } from "./Timeline";

const education: TimelineEntry[] = [
  {
    title: "University of Dundee",
    start: new Date(2018, 8, 1),
    end: new Date(2022, 8, 1),
    content: (
      <>
        I attended the University of Dundee from 2018 to 2022 and graduated with
        a First Class Honours degree in Computing Science.
        <br />
        <br />
        Unlike other computing degrees which place a great deal of emphasis on
        the theoretical mathematics underpinning computing, my course was
        centered around learning practical skills for the workplace.
        <br />
        <br />
        Most of our course was spend doing projects which were completed in
        teams, and we were encouraged to collabrate and learn a variety of
        different programming languages and skills.
        <br />
        <br />I was also active in the Dundee University Computing Society
        (DUCS) and served as Treasurer for 2021-22. I helped hold the first
        in-person society events, shortly after the UK had just emerged from the
        final Coronavirus lockdown. During my time on the committee, we held
        many successful events such as a Hackathon (sponsored by BlackRock and
        Unity) and a Ceildh.
      </>
    ),
  },
];

export const EducationSection = () => {
  return (
    <section id="education">
      <h2 className="text-xl font-bold">Education</h2>
      <Timeline entries={education} />
    </section>
  );
};
