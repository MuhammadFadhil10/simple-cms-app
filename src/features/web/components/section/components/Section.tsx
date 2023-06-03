import * as React from "react";
import Stack from "@mui/material/Stack";
import { useSection } from "../hooks";
import { ItemList, MoveableRender, useMoveable } from "@/features/web";
import { useDrop, DropTargetMonitor } from "react-dnd";
import { useRouter } from "next/router";

export const Section = React.memo(function Memo() {
  const { pageId } = useRouter().query;
  const { acceptedItems, handleDrop } = useSection();
  const { memoizedMovables } = useMoveable();

  const droppableContainerRef = React.useRef<HTMLDivElement>(null);

  const [, drop] = useDrop(
    () => ({
      accept: acceptedItems,
      drop(_item: string, monitor) {
        const item = monitor.getItem() as unknown as ItemList;
        const position = monitor.getClientOffset();

        const existingItemType = memoizedMovables.filter(
          (moveable) => moveable.type === item.type
        );

        handleDrop(
          `${item.label} ${existingItemType.length + 1}`,
          item,
          position,
          pageId as string
        );
      },
      collect: (monitor: DropTargetMonitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
        draggingColor: monitor.getItemType() as string,
      }),
    }),
    [memoizedMovables]
  );

  return (
    <Stack
      component="section"
      ref={drop}
      className="container"
      sx={{
        width: "100vw",
        minHeight: "100vh",
        alignSelf: "center",
      }}
    >
      <div
        ref={droppableContainerRef}
        style={{ width: "100%", height: "100%" }}
      >
        <MoveableRender ref={droppableContainerRef} />
      </div>
    </Stack>
  );
});
