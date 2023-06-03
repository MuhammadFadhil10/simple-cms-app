import * as React from "react";

import { Item, ItemTypes } from "../types";
import { useGlobalMutation } from "./api";
import { useQuery } from "@tanstack/react-query";
import { Items } from "@/api/items";
import { useRouter } from "next/router";

export const useMoveable = () => {
  const { pageId } = useRouter().query;

  const { mutateAsync: createItemMutation } = useGlobalMutation("CREATE_ITEM", [
    "items",
  ]);
  const { mutateAsync: updateItemMutation } = useGlobalMutation("UPDATE_ITEM", [
    "items",
  ]);

  const { data: rawMovables } = useQuery({
    queryKey: ["items"],
    queryFn: () => Items.getItems(pageId as string),
  });

  const memoizedMovables: Item[] = React.useMemo(() => {
    if (!rawMovables) return [];

    return rawMovables as unknown as Item[];
  }, [rawMovables]);

  // memos
  const acceptedItems: ItemTypes[] = React.useMemo(() => {
    return ["button", "media"];
  }, []);

  // functions
  const handleCreateMoveable = React.useCallback(
    (item: Partial<Item>) => {
      return createItemMutation(item);
    },
    [createItemMutation]
  );

  const handleUpdateMoveable = React.useCallback(
    (itemId: string, body: Partial<Item>) => {
      return updateItemMutation({
        itemId,
        payload: body,
      });
    },
    [updateItemMutation]
  );

  const handleResizeMoveable = React.useCallback(
    (item: Item, width: string, height: string) => {
      handleUpdateMoveable(item._id, {
        properties: {
          ...item.properties,
          style: {
            ...item.properties.style,
            width,
            height,
          },
        },
      });
    },
    [handleUpdateMoveable]
  );

  const updateMoveableTransform = React.useCallback(
    (item: Item, transform: string) => {
      handleUpdateMoveable(item._id, {
        properties: {
          ...item.properties,
          style: {
            ...item.properties.style,
            transform,
          },
        },
      });
    },
    [handleUpdateMoveable]
  );

  const updateMoveableProps = React.useCallback(
    (item: Item, field: string, payload: unknown) => {
      handleUpdateMoveable(item._id, {
        properties: {
          ...item.properties,
          [field]: payload,
        },
      });
    },
    [handleUpdateMoveable]
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

  return {
    memoizedMovables,
    handleCreateMoveable,
    handleResizeMoveable,
    updateMoveableProps,
    handleGetSharedMoveableStyles,
    handleUpdateMoveable,
    updateMoveableTransform,
    acceptedItems,
  };
};
