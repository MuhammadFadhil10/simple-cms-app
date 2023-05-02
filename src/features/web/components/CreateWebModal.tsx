import * as React from "react";

import { Modal } from "@/features";

interface Props {
  open: boolean;
  onClose: () => void;
  title: string;
  contentChildren: React.ReactNode;
  onSubmit?: () => void;
}

export const CreateWebModal = React.memo(function CreateWebModal({
  open,
  onClose,
  title,
  contentChildren,
  onSubmit,
}: Props) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title={title}
      contentChildren={contentChildren}
      onSubmit={onSubmit}
    />
  );
});
