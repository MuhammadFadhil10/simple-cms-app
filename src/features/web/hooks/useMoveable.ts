import * as React from "react";

import { Item, ItemPropertiesTypes, ItemTypes } from "../types";
import { useDefaultMoveable } from "./useDefaultMoveable";
import { useRouter } from "next/router";

export const useMoveable = () => {
  const router = useRouter();
  const { webId } = router.query;

  const { handleGetDefaultProperties } = useDefaultMoveable();

  const [currentMoveables, setCurrentMoveables] = React.useState<Item[]>([]);

  const handleCreateMoveable = React.useCallback(
    (type: ItemTypes) => {
      try {
        const moveable: Item = {
          id: (Date.now() * Math.random()).toString(),
          webId: webId as string,
          name: type,
          type,
          properties: handleGetDefaultProperties(type) as ItemPropertiesTypes,
        };

        const newMoveable = [...currentMoveables, moveable];

        localStorage.setItem("moveables", JSON.stringify(newMoveable));

        setCurrentMoveables(newMoveable);
      } catch (error) {
        console.log("error create moveable: ", error);
      }
    },
    [currentMoveables, handleGetDefaultProperties, webId]
  );

  React.useEffect(() => {
    if (localStorage.moveables) {
      setCurrentMoveables(JSON.parse(localStorage.moveables));
    }
  }, []);

  return {
    currentMoveables,
    handleCreateMoveable,
  };
};
