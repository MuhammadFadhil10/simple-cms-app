import * as React from "react";

import Stack from "@mui/material/Stack";
import { Section } from "../section";
import { useAppStore } from "@/features/web";

export const MainPage = React.memo(function MainPage() {
  const { sidebarOpen, setSidebarOpen, setZoomValue, setMousePosition } =
    useAppStore();

  if (typeof window !== "undefined") {
    // prevent browser zoom in out on wheel event
    document.addEventListener(
      "wheel",
      (e) => {
        if (e.ctrlKey) {
          e.preventDefault();
        }
      },
      { passive: false }
    );
  }

  const onWheel: React.WheelEventHandler<HTMLElement> = React.useCallback(
    (e: React.WheelEvent<HTMLElement>) => {
      if (e.ctrlKey) {
        if (e.deltaY <= 0) {
          setZoomValue("PLUS");
          setMousePosition({ x: e.clientX, y: e.clientY });
        } else {
          setZoomValue("MIN");
          setMousePosition({ x: e.clientX, y: e.clientY });
        }
      }
    },
    [setMousePosition, setZoomValue]
  );

  // not final, different screen problem
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo(776, 370);
    }
  }, []);

  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      sx={{
        width: "200vw",
        height: "200vh",
        boxShadow: 7,
        backgroundColor: "#444",
      }}
      onClick={() => sidebarOpen && setSidebarOpen(false)}
      onWheel={onWheel}
    >
      <Section />
    </Stack>
  );
});
