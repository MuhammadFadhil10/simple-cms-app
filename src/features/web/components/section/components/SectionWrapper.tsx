import * as React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Add from "@mui/icons-material/Add";
import { useSection } from "../hooks/useSection";
import { useDrop, DropTargetMonitor } from "react-dnd";
import { ButtonItem, Item, ItemTypes, useAppStore } from "@/features/web";
import { MoveableItemWrapper } from "../../MoveableItemWrapper";

export const SectionWrapper = React.memo(function SectionWrapper() {
  const { acceptedItems } = useSection();
  const { setSidebarOpen } = useAppStore();

  const [itemType, setItemType] = React.useState<ItemTypes | null>(null);
  const [itemDropped, setItemDropped] = React.useState<Item | null>(null);
  const boxRef = React.useRef<HTMLDivElement>(null);

  const [, drop] = useDrop(
    () => ({
      accept: acceptedItems.map((item) => item.type),
      drop(_item: string, monitor) {
        setItemType(monitor.getItemType() as ItemTypes);
        setItemDropped(monitor.getItem());
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
      className="container"
      alignItems="center"
      justifyContent="center"
      sx={{
        width: "100%",
        height: "100%",
        backgroundColor: "transparent",
      }}
    >
      <Box
        component="div"
        ref={boxRef}
        className="snapContainer"
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "centee",
          justifyContent: "center",
        }}
      >
        {/* no item */}
        {!itemDropped && (
          <IconButton onClick={() => setSidebarOpen(true)}>
            <Add color="primary" />
          </IconButton>
        )}

        {/* item */}
        {itemType === "button" && (
          <>
            <MoveableItemWrapper
              sectionRef={boxRef?.current as HTMLDivElement}
              item={itemDropped as Item}
            >
              {itemDropped?.type === "button" && (
                <ButtonItem item={itemDropped as Item} />
              )}
            </MoveableItemWrapper>
          </>
        )}
      </Box>
    </Stack>
  );
});
