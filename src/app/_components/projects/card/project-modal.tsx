import { Button, Modal } from "@heroui/react";
import { ChipList } from "@/components/ui/chip-list";
import { MarkdownContent } from "@/components/ui/markdown-content";
import type { Project } from "../shared/type";
import { getProjectIcon } from "../shared/icons";

type Props = {
  project: Project;
  isOpen: boolean;
  close: () => void;
};

export const ProjectModal = ({ project, isOpen, close }: Props) => {
  const icon = getProjectIcon(project.icon);

  return (
    <Modal.Backdrop variant="blur" isOpen={isOpen} onOpenChange={close}>
      <Modal.Container size="lg">
        <Modal.Dialog aria-label={project.title}>
          <Modal.CloseTrigger />
          <Modal.Header>
            <Modal.Icon className="rounded-2xl bg-accent-soft text-accent-soft-foreground">
              {icon}
            </Modal.Icon>
            <Modal.Heading className="text-xl text-foreground font-bold">
              {project.title}
            </Modal.Heading>
          </Modal.Header>
          <Modal.Body className="flex flex-col gap-4 text-base text-foreground">
            <MarkdownContent source={project.contentSource} />
            <ChipList chips={project.chips} />
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
