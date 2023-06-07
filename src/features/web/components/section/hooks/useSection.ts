import * as React from "react";
import {
  Item,
  ItemList,
  ItemPropertiesTypes,
  ItemTypes,
  useAppStore,
  useDefaultMoveable,
  useMoveable,
} from "@/features/web";

export const useSection = () => {
  const { handleGetDefaultProperties } = useDefaultMoveable();
  const { handleCreateMoveable } = useMoveable();
  const { zoomValue } = useAppStore();

  const acceptedItems: ItemTypes[] = ["button", "media"];

  const memoizedZoomValue = React.useMemo(() => {
    const tempCalc = zoomValue / 10;

    if (tempCalc < 10) {
      return `.${tempCalc}`;
    } else if (tempCalc === 10) {
      return `1`;
    } else if (tempCalc > 10 && tempCalc < 20) {
      return `1.${tempCalc.toString().split("")[1]}`;
    } else if (tempCalc === 20) {
      return `2`;
    }
  }, [zoomValue]);

  // func
  const handleDrop = React.useCallback(
    async (name: string, item: ItemList, position: any, pageId: string) => {
      let itemPayload: Partial<Item>;
      const properties: ItemPropertiesTypes = handleGetDefaultProperties(
        item.type
      ) as ItemPropertiesTypes;

      switch (item.type) {
        case "button": {
          itemPayload = {
            name,
            type: item.type,
            pageId,
            isLocked: false,
            isVisible: true,
            properties: {
              ...properties,
              style: {
                ...properties?.style,
                transform: `translate(${position.x}px, ${position.y}px)`,
              },
            },
          };
          return handleCreateMoveable(itemPayload);
        }
      }
    },
    [handleCreateMoveable, handleGetDefaultProperties]
  );

  return { handleDrop, acceptedItems, memoizedZoomValue };
};
