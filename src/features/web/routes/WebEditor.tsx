import * as React from "react";
import Stack from "@mui/material/Stack";

import {
  FloatingAddItemButton,
  Inspector,
  // MainHeader,
  MainPage,
  Sidebar,
  useEventListener,
} from "@/features/web";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export const WebEditor = React.memo(function WebEditor() {
  const { onMouseMove, onMouseDown, onMouseUp, onWheel, onKeyUp, onKeyDown } =
    useEventListener();

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener(
        "wheel",
        (e) => {
          if (e.ctrlKey) {
            e.preventDefault();
          }
        },
        { passive: false }
      );
    }
  }, []);

  return (
    <Stack
      id="parent-editor"
      component="div"
      tabIndex={0}
      sx={{
        width: "100vw",
        height: "100vh",
        overflow: "scroll",
        display: "block",
      }}
      onMouseMove={onMouseMove}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onWheel={onWheel}
      onKeyUp={onKeyUp}
      onKeyDown={onKeyDown}
    >
      {/* <MainHeader /> */}

      <DndProvider backend={HTML5Backend}>
        <Sidebar />
        <MainPage />
        <Inspector />
        <FloatingAddItemButton />
      </DndProvider>
    </Stack>
  );
});
