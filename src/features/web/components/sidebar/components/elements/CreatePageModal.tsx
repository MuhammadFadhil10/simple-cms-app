import { Form, Modal } from "@/features/components";
import { Field } from "@/features/types";
import * as React from "react";

interface Props {
  open: boolean;
  handleClose: () => void;
  defaultValues: unknown;
  loading: boolean;
  submitErrorMessage: string | undefined;
  // eslint-disable-next-line no-unused-vars
  onCreate: (data: unknown) => void;
  fields: Field[];
}

export const CreatePageModal = React.memo(function CreatePageModal({
  open,
  handleClose,
  defaultValues,
  loading,
  submitErrorMessage,
  onCreate,
  fields,
}: Props) {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      title="Create Page"
      contentChildren={
        <Form
          fields={fields}
          onSubmit={onCreate}
          defaultValues={defaultValues}
          loading={loading}
          submitErrorMessage={submitErrorMessage}
        />
      }
    />
  );
});
