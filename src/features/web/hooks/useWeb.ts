import * as React from "react";
import { Field } from "../../types";
import { useGlobalMutation } from "..";

export const useWeb = () => {
  const [openCreateWebModal, setOpenCreateModal] = React.useState(false);

  // memo
  const createWebFields: Field[] = React.useMemo(() => {
    return [
      {
        name: "name",
        type: "text",
        label: "Web Name",
      },
      // {
      //   name: "contentSizing",
      //   type: "select",
      //   label: "Content Sizing",
      //   options: (["full", "semi-full", "center"] as GlobalContentSizing[]).map(
      //     (size) => {
      //       return {
      //         id: size,
      //         value: size,
      //         optionLabel: size,
      //       };
      //     }
      //   ),
      //   defaultValue: "semi-full" as GlobalContentSizing,
      // },
      // {
      //   name: "themeId",
      //   type: "select",
      //   label: "theme",
      //   options: webThemes.map((theme) => {
      //     return {
      //       id: theme.id,
      //       value: theme.id,
      //       optionLabel: theme.name,
      //     };
      //   }),
      //   defaultValue: webThemes[0].id,
      // },
    ] as Field[];
  }, []);

  // function
  const handleCloseCreateModal = React.useCallback(() => {
    setOpenCreateModal(false);
  }, [setOpenCreateModal]);

  const handleCreateWeb = useGlobalMutation("CREATE_WEB", ["webs"]);

  return {
    openCreateWebModal,
    setOpenCreateModal,
    handleCloseCreateModal,
    handleCreateWeb,
    createWebFields,
  };
};
