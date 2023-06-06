import * as React from "react";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import { useSection } from "../hooks";
import { ItemList, MoveableRender, useMoveable } from "@/features/web";
import { useDrop, DropTargetMonitor } from "react-dnd";
import { useRouter } from "next/router";

export const Section = React.memo(function Memo() {
  const { pageId } = useRouter().query;
  const { acceptedItems, handleDrop } = useSection();
  const { memoizedMovables, moveablesLoading } = useMoveable();

  // const wrapperRef =
  const droppableContainerRef = React.useRef<HTMLDivElement>(null);

  const [, drop] = useDrop(
    () => ({
      accept: acceptedItems,
      drop(_item: string, monitor) {
        const item = monitor.getItem() as unknown as ItemList;
        const existingItemType = memoizedMovables.filter(
          (moveable) => moveable.type === item.type
        );

        /*  calculate drop position 
            (getClientOffset position no accurate
            if drop container size is not full page
        */
        const siOffset = monitor.getInitialSourceClientOffset();
        const piOffset = monitor.getInitialClientOffset();
        const idx = (piOffset?.x ?? 0) - (siOffset?.x ?? 0);
        const idy = (piOffset?.y ?? 0) - (siOffset?.y ?? 0);

        const offset = monitor.getClientOffset();
        let targetRect = droppableContainerRef.current?.getBoundingClientRect();
        //Below is the position relative to parent container
        let x = (offset?.x ?? 0) - (targetRect?.left ?? 0) - idx * 0.5;
        let y = (offset?.y ?? 0) - (targetRect?.top ?? 0) - idy * 0.5;

        handleDrop(
          `${item.label} ${existingItemType.length + 1}`,
          item,
          { x, y },
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

  if (moveablesLoading)
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100vw",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </div>
    );

  return (
    // <div style={{ position: "relative" }}>
    <Stack
      component="section"
      ref={drop}
      className="container"
      sx={{
        width: "1000px",
        minHeight: "500px",
        // alignSelf: "center",
        position: "relative",
        overflowX: "hidden",
        boxShadow: 5,
        backgroundColor: "white",
      }}
    >
      <div
        ref={droppableContainerRef}
        style={{ width: "100%", height: "100%" }}
      >
        <MoveableRender ref={droppableContainerRef} />
      </div>
    </Stack>
    // </div>
  );
});
