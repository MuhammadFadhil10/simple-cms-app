import * as React from "react";

import Stack from "@mui/material/Stack";
import { Section } from "../section";
import { useAppStore } from "@/features/web";

export const MainPage = React.memo(function MainPage() {
  const { sidebarOpen, setSidebarOpen } = useAppStore();

  if (typeof window !== "undefined") {
    document.addEventListener("keydown", (e) => {
      e.preventDefault();

      if (e.ctrlKey) {
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
    });
  }

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
    >
      <Section />
    </Stack>
  );
});
