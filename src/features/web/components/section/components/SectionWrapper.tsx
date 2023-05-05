import * as React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Add from "@mui/icons-material/Add";
import { useSection } from "../hooks/useSection";
import { useDrop, DropTargetMonitor } from "react-dnd";
import {
  ButtonItem,
  ItemTypes,
  useAppStore,
  useMoveable,
} from "@/features/web";
import { MoveableItemWrapper } from "../../MoveableItemWrapper";
import { useRouter } from "next/router";

export const SectionWrapper = React.memo(function SectionWrapper() {
  const router = useRouter();
  const { webId } = router.query;

  const { acceptedItems } = useSection();
  const { setSidebarOpen } = useAppStore();
  const { currentMoveables, handleCreateMoveable } = useMoveable();

  const boxRef = React.useRef<HTMLDivElement>(null);

  const [, drop] = useDrop(
    () => ({
      accept: acceptedItems.map((item) => item.type),
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
          // display: "flex",
          // alignItems: "centee",
          // justifyContent: "center",
        }}
      >
        {/* no item */}
        {currentMoveables.filter((item) => item.webId === (webId as string))
          .length === 0 && (
          <IconButton onClick={() => setSidebarOpen(true)}>
            <Add color="primary" />
          </IconButton>
        )}

        {/* item */}
        {currentMoveables
          .filter((item) => item.webId === (localStorage.webId as string))
          .map((item) => (
            <>
              {item.type === "button" && (
                <>
                  <MoveableItemWrapper
                    sectionRef={boxRef?.current as HTMLDivElement}
                    item={item}
                  >
                    <ButtonItem item={item} />
                  </MoveableItemWrapper>
                </>
              )}
            </>
          ))}
      </Box>
    </Stack>
  );
});
