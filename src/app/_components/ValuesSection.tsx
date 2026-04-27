// import { Surface } from "@heroui/react";

export const ValuesSection = () => {
  return (
    <section id="values">
      <h2 className="text-xl font-bold">Values</h2>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col py-2 gap-2">
          <h3 className="text-lg text-foreground">
            Write clean maintainable code
          </h3>
          <p className="text-base">
            I write code that is clean and maintainable so that any developer
            can pick up, read and understand it. I am obsessed with naming
            things, how files and directories are organised and abstractions
            that are self-evident. The best code doesn't need any comments to be
            understood, it should document itself.
          </p>
        </div>
        <div className="flex flex-col py-2 gap-2">
          <h3 className="text-lg text-foreground">Iterate with an open mind</h3>
          <p className="text-base">
            I hold my opinions loosely and I am not afraid to change my mind if
            the evidence points to another conclusion. I am not afraid to admit
            when I have been proven wrong and I am always open to feedback and
            suggestions.
          </p>
        </div>
        <div className="flex flex-col py-2 gap-2">
          <h3 className="text-lg text-foreground">It's good to experiment</h3>
          <p className="text-base">
            Today's new exciting thing is tomorrow's tech debt. I don't believe
            in the adage "if it ain't broke, don't fix it", I believe that
            everything can always be improved and that we should always strive
            towards a more perfect solution.
          </p>
        </div>
      </div>
      {/* <div className="flex flex-row pt-12">
        <div className="flex flex-col gap-2">
          <Surface
            className="flex flex-col gap-3 rounded-3xl px-4 py-2"
            variant="default"
          >
            <h3 className="text-base font-semibold text-foreground">
              Clean maintainable code
            </h3>
            <ul className="text-sm text-muted-foreground">
              <li>The simpliest solution is often the best</li>
              <li>Name wisely</li>
            </ul>
          </Surface>
          <Surface
            className="flex flex-col gap-3 rounded-3xl px-4 py-2"
            variant="default"
          >
            <h3 className="text-base font-semibold text-foreground">Openess</h3>
          </Surface>
          <Surface
            className="flex flex-col gap-3 rounded-3xl px-4 py-2"
            variant="default"
          >
            <h3 className="text-base font-semibold text-foreground">
              Use AI responsibly
            </h3>
          </Surface>
          <Surface
            className="flex flex-col gap-3 rounded-3xl px-4 py-2"
            variant="default"
          >
            <h3 className="text-base font-semibold text-foreground">
              Use AI responsibly
            </h3>
          </Surface>
        </div>
        <div className="flex flex-col"></div>
      </div> */}
    </section>
  );
};
