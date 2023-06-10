import * as React from "react";

import Stack from "@mui/material/Stack";
import { Section } from "../section";
import { useAppStore, useMain } from "@/features/web";
import { MainToolbar } from "./MainToolbar";

export const MainPage = React.memo(function MainPage() {
  const { sidebarOpen, setSidebarOpen, onWheel } = useMain();
  const { isHandMode, isGrabWindow } = useAppStore();

  return (
    <Stack
      component="div"
      id="editor-main-page"
      justifyContent="center"
      alignItems="center"
      sx={{
        width: "200vw",
        height: "200vh",
        boxShadow: 7,
        backgroundColor: "#444",
        cursor: isGrabWindow ? "grabbing" : isHandMode ? "grab" : "default",
      }}
      onClick={() => sidebarOpen && setSidebarOpen(false)}
      onWheel={onWheel}
    >
      <MainToolbar />
      <Section />
    </Stack>
  );
});
