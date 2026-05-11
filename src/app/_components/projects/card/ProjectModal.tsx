import { Button, Modal } from "@heroui/react";
import { Project } from "../shared/type";
import { ProjectChipList } from "./ProjectChipList";

type Props = {
  isOpen: boolean;
  close: () => void;
  project: Project;
};

export const ProjectModal = ({ isOpen, close, project }: Props) => {
  return (
    <Modal.Backdrop variant="blur" isOpen={isOpen} onOpenChange={close}>
      <Modal.Container size="lg">
        <Modal.Dialog>
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
            <p>{project.content}</p>
            <ProjectChipList chips={project.chips} linked />
          </Modal.Body>
          <Modal.Footer className="items-right">
            <Button slot="close" variant="secondary">
              Close
            </Button>
          </Modal.Footer>
        </Modal.Dialog>
      </Modal.Container>
    </Modal.Backdrop>
  );
};
