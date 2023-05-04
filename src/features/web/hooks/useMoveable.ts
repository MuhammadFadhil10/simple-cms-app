import * as React from "react";

import { Item, ItemPropertiesTypes, ItemTypes } from "../types";
import { useDefaultMoveable } from "./useDefaultMoveable";

export const useMoveable = () => {
  const { handleGetDefaultProperties } = useDefaultMoveable();

  const [currentMoveables, setCurrentMoveables] = React.useState<Item[]>([]);

  const handleCreateMoveable = React.useCallback(
    (type: ItemTypes, webId: string) => {
      try {
        const moveable: Item = {
          id: (Date.now() * Math.random()).toString(),
          webId: webId as string,
          name: type,
          type,
          properties: handleGetDefaultProperties(type) as ItemPropertiesTypes,
        };

        let oldMoveables = [];

        if (localStorage.moveables) {
          oldMoveables = JSON.parse(localStorage.moveables);
        }

        const newMoveables = [...oldMoveables, moveable];

        console.log(currentMoveables);

        localStorage.setItem("moveables", JSON.stringify(newMoveables));

        setCurrentMoveables(newMoveables);
      } catch (error) {
        console.log("error create moveable: ", error);
      }
    },
    [currentMoveables, handleGetDefaultProperties]
  );

  const updateMoveableProps = React.useCallback(
    (itemId: string, payload: ItemPropertiesTypes) => {
      const moveable = currentMoveables.find((item) => item.id === itemId);

      if (!moveable) return;

      let newMoveable: Item = {
        ...moveable,
        properties: payload,
      };

      const moveableIndex = currentMoveables.findIndex(
        (item) => item.id === newMoveable.id
      );

      if (moveableIndex === -1) return;

      currentMoveables.splice(moveableIndex, 1);

      setCurrentMoveables([...currentMoveables, newMoveable]);

      localStorage.setItem(
        "moveables",
        JSON.stringify([...currentMoveables, newMoveable])
      );
    },
    [currentMoveables]
  );

  React.useEffect(() => {
    if (localStorage.moveables) {
      setCurrentMoveables(JSON.parse(localStorage.moveables));
    }
  }, []);

  return {
    currentMoveables,
    handleCreateMoveable,
    updateMoveableProps,
  };
};
