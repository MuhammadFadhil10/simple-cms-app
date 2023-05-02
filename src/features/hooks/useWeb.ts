import * as React from "react";
import { Field, GlobalContentSizing } from "../types";
import { webThemes } from "../web";
import { useRouter } from "next/router";

export const useWeb = () => {
  const router = useRouter();

  const [openCreateWebModal, setOpenCreateModal] = React.useState(false);

  // memo
  const createWebFields: Field[] = React.useMemo(() => {
    return [
      {
        name: "webName",
        type: "text",
        label: "Web Name",
      },
      {
        name: "contentSizing",
        type: "select",
        label: "Content Sizing",
        options: (["full", "semi-full", "center"] as GlobalContentSizing[]).map(
          (size) => {
            return {
              id: size,
              value: size,
              optionLabel: size,
            };
          }
        ),
        defaultValue: "semi-full" as GlobalContentSizing,
      },
      {
        name: "themeId",
        type: "select",
        label: "theme",
        options: webThemes.map((theme) => {
          return {
            id: theme.id,
            value: theme.id,
            optionLabel: theme.name,
          };
        }),
        defaultValue: webThemes[0].id,
      },
    ] as Field[];
  }, []);

  // function
  const handleCloseCreateModal = React.useCallback(() => {
    setOpenCreateModal(false);
  }, [setOpenCreateModal]);

  const handleCreateWeb = React.useCallback(
    (data: any) => {
      let payload = data;
      payload.id = (Date.now() * Math.random()).toString();

      const userWeb = localStorage.webs;

      if (!userWeb) {
        localStorage.setItem("webs", JSON.stringify([payload]));
        return router.push(`/web/dashboard/edit/${payload.id}`);
      }

      let parsedUserWeb = JSON.parse(userWeb);

      parsedUserWeb.push(payload);

      localStorage.setItem("webs", JSON.stringify(parsedUserWeb));

      router.push(`/web/dashboard/edit/${payload.id}`);
    },
    [router]
  );

  return {
    openCreateWebModal,
    setOpenCreateModal,
    handleCloseCreateModal,
    handleCreateWeb,
    createWebFields,
  };
};
