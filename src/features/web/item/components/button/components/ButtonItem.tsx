import * as React from "react";
import Button from "@mui/material/Button";
import { Item } from "@/features/web";
import { useButtonItem } from "../hooks/useButtonItem";

interface Props {
  item: Item;
}

export const ButtonItem = React.memo(function ButtonItem({ item }: Props) {
  const { itemProps, memoizedStyle } = useButtonItem(item);

  return (
    <Button variant={itemProps.variant} sx={{ ...memoizedStyle }} disableRipple>
      Button
    </Button>
  );
});
