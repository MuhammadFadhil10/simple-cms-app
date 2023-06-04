import * as React from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Item } from "@/features/web";
import { useButtonItem } from "../hooks/useButtonItem";

interface Props {
  item: Item;
}

export const ButtonItem = React.memo(function ButtonItem({ item }: Props) {
  const { itemProps, memoizedStyle } = useButtonItem(item);

  return (
    <Button
      variant={itemProps.variant}
      sx={{
        ...memoizedStyle,
        "&:hover": { backgroundColor: memoizedStyle.backgroundColor },
      }}
      disableRipple
    >
      <Typography
        fontSize={memoizedStyle.fontSize}
        fontWeight={itemProps.text?.style?.fontWeight}
        sx={{ width: "100%" }}
      >
        {itemProps.text?.output}
      </Typography>
    </Button>
  );
});
