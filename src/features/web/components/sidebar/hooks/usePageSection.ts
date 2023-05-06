import { Field } from "@/features/types";
import { usePage } from "@/features/web/hooks";
import * as React from "react";

export const usePageSection = () => {
  const [open, setOpen] = React.useState(false);

  const { createPage } = usePage();

  const createPageFields: Field[] = React.useMemo(() => {
    return [
      {
        name: "pageName",
        type: "text",
        label: "Page Name",
      },
    ] as Field[];
  }, []);

  const handleCreatePage = React.useCallback(
    (data: unknown) => {
      createPage((data as any).pageName, localStorage?.webId);
    },
    [createPage]
  );

  return {
    open,
    setOpen,
    createPageFields,
    handleCreatePage,
  };
};
