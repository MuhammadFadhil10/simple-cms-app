import * as React from "react";
import Stack from "@mui/material/Stack";

import {
  FloatingAddItemButton,
  Inspector,
  // MainHeader,
  MainPage,
  Sidebar,
  useAppStore,
  useEventListener,
} from "@/features/web";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export const WebEditor = React.memo(function WebEditor() {
  const pageRef = React.useRef<HTMLDivElement>(null);
  const { onMouseMove, onMouseDown, onMouseUp, onWheel, onKeyUp, onKeyDown } =
    useEventListener();

  const { sidebarOpen, setSidebarOpen, isGrabWindow, isHandMode } =
    useAppStore();

  React.useEffect(() => {
    pageRef.current?.scrollTo(window.innerWidth / 2, window.innerHeight / 2);
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
      ref={pageRef}
      id="editor-page"
      component="div"
      tabIndex={0}
      sx={{
        width: "100vw",
        height: "100vh",
        overflow: "scroll",
        display: "block",
        cursor: isGrabWindow ? "grabbing" : isHandMode ? "grab" : "default",
      }}
      onClick={() => sidebarOpen && setSidebarOpen(false)}
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
