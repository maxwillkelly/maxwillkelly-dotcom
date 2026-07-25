import { Button, Modal } from "@heroui/react";
import type { Project } from "@/components/content/project";
import { TechnologyList } from "@/components/content/technology-list";

type Props = {
  project: Project;
  isOpen: boolean;
  close: () => void;
};

export const ProjectModal = ({ project, isOpen, close }: Props) => {
  return (
    <Modal.Backdrop variant="blur" isOpen={isOpen} onOpenChange={close}>
      <Modal.Container size="lg">
        <Modal.Dialog aria-label={project.title}>
          <Modal.CloseTrigger />
          <Modal.Header>
            <Modal.Icon className="rounded-2xl bg-accent-soft text-accent-soft-foreground">
              {project.icon}
            </Modal.Icon>
            <Modal.Heading className="text-xl text-foreground font-bold">
              {project.title}
            </Modal.Heading>
          </Modal.Header>
          <Modal.Body className="flex flex-col gap-4 text-base text-foreground">
            <div className="flex flex-col gap-4">{project.content}</div>
            <TechnologyList items={project.technologies} />
          </Modal.Body>
          <Modal.Footer>
            <Button slot="close" variant="secondary">
              Close
            </Button>
          </Modal.Footer>
        </Modal.Dialog>
      </Modal.Container>
    </Modal.Backdrop>
  );
};
