import * as React from "react";
import { Web } from "../types";

export const useWeb = () => {
  const [openCreateWebModal, setOpenCreateModal] = React.useState(false);

  const handleCloseCreateModal = React.useCallback(() => {
    setOpenCreateModal(false);
  }, [setOpenCreateModal]);

  const handleCreateWeb = React.useCallback(() => {
    return {
      name: "test",
      contentSizing: "semi-full",
      theme: {
        id: "adasddsasdadsa",
        name: "my theme",
        colors: {
          pageColor: "white",
          accentColor: "blue",
          textColor: "black",
        },
      },
    } as Web;
  }, []);

  return {
    openCreateWebModal,
    setOpenCreateModal,
    handleCloseCreateModal,
    handleCreateWeb,
  };
};
