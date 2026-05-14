import { Button, Modal } from "@heroui/react";
import { Project } from "../shared/type";
import { LinkableChip } from "@/components/ui/linkable-chip";

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
            <p>{project.content}</p>
            <div className="flex flex-wrap gap-2">
              {project.chips.map((chip) => (
                <LinkableChip key={chip.label} {...chip} />
              ))}
            </div>
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
