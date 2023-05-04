import * as React from "react";
import { ButtonProperties, Item } from "@/features/web";

export const useButtonItem = (item: Item) => {
  const itemProps = React.useMemo(() => {
    return item.properties as ButtonProperties;
  }, [item.properties]);

  const memoizedStyle = React.useMemo(() => {
    if (!itemProps) return {};

    return {
      ...itemProps.style,
      width: "100%",
      height: "100%",
    };
  }, [itemProps]);

  return { itemProps, memoizedStyle };
};
