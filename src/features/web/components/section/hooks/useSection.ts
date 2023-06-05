import * as React from "react";
import {
  Item,
  ItemList,
  ItemPropertiesTypes,
  ItemTypes,
  useDefaultMoveable,
  useMain,
  useMoveable,
} from "@/features/web";
import { GlobalContentSizing } from "@/features/types";
// import { useRouter } from "next/router";

export const useSection = () => {
  // const router = useRouter();
  const { memoizedCurrentWeb } = useMain();
  const { handleGetDefaultProperties } = useDefaultMoveable();
  const { handleCreateMoveable } = useMoveable();

  const memoizedContentSizing: GlobalContentSizing | string =
    React.useMemo(() => {
      if (!(memoizedCurrentWeb as any)?.contentSizing) return "";

      return (memoizedCurrentWeb as any)?.contentSizing as GlobalContentSizing;
    }, [memoizedCurrentWeb]);

  const memoizedSectionWidth = React.useMemo(() => {
    switch (memoizedContentSizing) {
      case "full":
        return "100%";
      case "semi-full":
        return "80%";
      case "center":
        return "50%";
      default:
        return "100%";
    }
  }, [memoizedContentSizing]);

  const acceptedItems: ItemTypes[] = ["button", "media"];

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

  return { handleDrop, memoizedSectionWidth, acceptedItems };
};
