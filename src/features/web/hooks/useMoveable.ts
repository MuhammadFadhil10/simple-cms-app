import * as React from "react";

import { Item, ItemPropertiesTypes, ItemTypes } from "../types";
import { useDefaultMoveable } from "./useDefaultMoveable";

export const useMoveable = () => {
  const { handleGetDefaultProperties } = useDefaultMoveable();

  const [currentMoveables, setCurrentMoveables] = React.useState<Item[]>([]);

  // memos
  const acceptedItems: ItemTypes[] = React.useMemo(() => {
    return ["button", "image"];
  }, []);

  // functions
  const handleCreateMoveable = React.useCallback(
    (type: ItemTypes, webId: string) => {
      try {
        if (!localStorage?.pageId) return;

        const moveable: Item = {
          id: (Date.now() * Math.random()).toString(),
          webId: webId as string,
          pageId: localStorage.pageId as string,
          name: type,
          type,
          properties: handleGetDefaultProperties(type) as ItemPropertiesTypes,
        };

        let oldMoveables = [];

        if (localStorage.moveables) {
          oldMoveables = JSON.parse(localStorage.moveables);
        }

        const newMoveables = [...oldMoveables, moveable];

        localStorage.setItem("moveables", JSON.stringify(newMoveables));

        setCurrentMoveables(newMoveables);
      } catch (error) {
        console.log("error create moveable: ", error);
      }
    },
    [handleGetDefaultProperties]
  );

  const updateMoveableProps = React.useCallback(
    (itemId: string, field: string, payload: unknown) => {
      const moveable = currentMoveables.find((item) => item.id === itemId);

      if (!moveable) return;

      let newMoveable: Item = {
        ...moveable,
        properties: { ...moveable.properties, [field]: payload },
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

  const updateMoveable = React.useCallback(
    (itemId: string, payload: Item) => {
      const moveable = currentMoveables.find((item) => item.id === itemId);

      if (!moveable) return;

      let newMoveable: Item = {
        ...moveable,
        ...payload,
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

  const handleGetSharedMoveableStyles = React.useCallback(
    (item: Item): React.CSSProperties => {
      const itemProps = item.properties;

      return {
        ...itemProps.style,
        width: "100%",
        height: "100%",
        transform: "",
      };
    },
    []
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
    handleGetSharedMoveableStyles,
    updateMoveable,
    acceptedItems,
  };
};
