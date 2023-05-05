import * as React from "react";
import { ButtonProperties, Item, useMoveable } from "@/features/web";

export const useButtonItem = (item: Item) => {
  const { handleGetSharedMoveableStyles } = useMoveable();

  const itemProps = React.useMemo(() => {
    return item.properties as ButtonProperties;
  }, [item.properties]);

  const memoizedStyle = React.useMemo(() => {
    if (!itemProps) return {};

    const style = handleGetSharedMoveableStyles(item);

    return {
      ...style,
    };
  }, [handleGetSharedMoveableStyles, item, itemProps]);

  return { itemProps, memoizedStyle };
};
