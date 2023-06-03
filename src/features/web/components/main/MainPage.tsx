import * as React from "react";

import Stack from "@mui/material/Stack";
import { Section } from "../section";
import { useAppStore, useMain } from "@/features/web";

export const MainPage = React.memo(function MainPage() {
  const { memoizedCurrentTheme } = useMain();
  const { sidebarOpen, setSidebarOpen } = useAppStore();

  return (
    <Stack
      sx={{
        width: "100vw",
        height: "100vh",
        boxShadow: 7,
        backgroundColor: memoizedCurrentTheme?.colors.pageColor ?? "white",
      }}
      onClick={() => sidebarOpen && setSidebarOpen(false)}
    >
      <Section />
    </Stack>
  );
});
