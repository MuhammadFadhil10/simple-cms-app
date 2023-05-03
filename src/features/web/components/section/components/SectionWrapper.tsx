import * as React from "react";
import { useSection } from "../hooks/useSection";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useDrop, DropTargetMonitor } from "react-dnd";
import { ButtonProperties, Item, ItemTypes } from "@/features/web";

export const SectionWrapper = React.memo(function SectionWrapper() {
  const { memoizedSectionWidth, acceptedItems } = useSection();

  const [itemType, setItemType] = React.useState<ItemTypes | null>(null);
  const [itemDropped, setItemDropped] = React.useState<Item | null>(null);

  const [, drop] = useDrop(
    () => ({
      accept: acceptedItems.map((item) => item.type),
      drop(_item: string, monitor) {
        setItemType(monitor.getItemType() as ItemTypes);
        setItemDropped(monitor.getItem());
        // alert(itemType);
        return undefined;
      },
      collect: (monitor: DropTargetMonitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
        draggingColor: monitor.getItemType() as string,
      }),
    }),
    []
  );

  return (
    <Stack
      ref={drop}
      alignItems="center"
      justifyContent="center"
      sx={(theme) => ({
        width: memoizedSectionWidth,
        minHeight: "50px",
        backgroundColor: "transparent",
        border: "none",
        outline: `3px solid ${theme.palette.primary.main}`,
        alignSelf: "center",
        marginTop: 1,
      })}
    >
      {itemType === "button" && (
        <Button
          sx={{ ...itemDropped?.properties.style }}
          variant={(itemDropped?.properties as ButtonProperties).variant}
        >
          Button
        </Button>
      )}
    </Stack>
  );
});
