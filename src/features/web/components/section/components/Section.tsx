import * as React from "react";
import Stack from "@mui/material/Stack";
import { useSection } from "../hooks";
import { useMoveable, ItemTypes, MoveableRender } from "@/features/web";
import { useDrop, DropTargetMonitor } from "react-dnd";

export const Section = React.memo(function Memo() {
  const { memoizedSectionWidth } = useSection();

  const { acceptedItems } = useSection();
  const { handleCreateMoveable } = useMoveable();

  const droppableContainerRef = React.useRef<HTMLDivElement>(null);

  const [, drop] = useDrop(
    () => ({
      accept: acceptedItems,
      drop(_item: string, monitor) {
        const type = monitor.getItemType();
        handleCreateMoveable(type as ItemTypes, localStorage?.webId as string);
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
      component="section"
      ref={drop}
      className="container"
      sx={{
        width: memoizedSectionWidth,
        minHeight: "100vh",
        borderLeft: "2px solid rgba(0,0,0,0.1)",
        borderRight: "2px solid rgba(0,0,0,0.1)",
        alignSelf: "center",
        // backgroundColor: "red",
        // transform: "scale(0.5)",
        // boxShadow: 5,
      }}
    >
      <div
        ref={droppableContainerRef}
        style={{ width: "100%", height: "100%" }}
      >
        <MoveableRender ref={droppableContainerRef} />
      </div>
      {/* <SectionWrapper /> */}
    </Stack>
  );
});
