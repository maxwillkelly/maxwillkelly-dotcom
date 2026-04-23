export const ExperienceSection = () => {
  return (
    <section id="experience">
      <h2 className="text-xl">Experience</h2>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col py-2 gap-2">
          <h3 className="text-lg text-foreground">The Key Support Services</h3>
          <p>
            I work as a Software Engineer on GovernorHub, the leading online
            service for school governors and trustees.
            <br />
            <br />I am responsible for reimplementing a number of features from
            a monolithic AngularJS codebase into React and gRPC microservices.
            <br />
            <br />
            I've also had the opportunity to onboard new developers into an
            expanding team and write developer specifications for new features.
          </p>
        </div>
        <div className="flex flex-col py-2 gap-2">
          <h3 className="text-lg text-foreground">Udrafter</h3>
          <p>
            Initially, I worked as a React developer in tandem with a .NET
            developer on Udrafter's platform.
            <br />
            <br />
            I later transitioned into the role of a Fullstack engineer
            independently rewriting the messaging features in their platform.
            <br />
            <br />
            This involved creating a Vue.js front-end and a .NET Core messaging
            microservice. I then led the team that integrated this service into
            the main platform.
          </p>
        </div>
      </div>
    </section>
  );
};
