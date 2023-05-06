import * as React from "react";

import Stack from "@mui/material/Stack";
import { Section } from "../section";
import { useAppStore, useMain } from "@/features/web";

export const MainPage = React.memo(function MainPage() {
  const { memoizedCurrentTheme } = useMain();
  const { sidebarOpen, setSidebarOpen } = useAppStore();

  // const memoizedPosition: React.CSSProperties = React.useMemo(() => {
  //   if (sidebarOpen) {
  //     return {
  //       top: "50%",
  //       right: "0%",
  //       transform: "translate(-0%, -50%)",
  //     };
  //   }

  //   return {
  //     top: "50%",
  //     left: "50%",
  //     transform: "translate(-50%, -50%)",
  //   };
  // }, [sidebarOpen]);

  return (
    <Stack
      sx={{
        width: "100vw",
        height: "100vh",
        // position: "absolute",
        // ...memoizedPosition,
        // overflowY: "auto",
        boxShadow: 7,
        backgroundColor: memoizedCurrentTheme?.colors.pageColor ?? "white",
      }}
      onClick={() => sidebarOpen && setSidebarOpen(false)}
    >
      <Section />
    </Stack>
  );
});
