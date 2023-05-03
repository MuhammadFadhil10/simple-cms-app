import * as React from "react";
import Stack from "@mui/material/Stack";
// import Typography from "@mui/material/Typography";
import { ItemsSection } from "./elements/ItemsSection";
import { useAppStore } from "@/features/web/hooks";

export const Sidebar = React.memo(function Sidebar() {
  const { sidebarOpen } = useAppStore();

  return (
    <>
      {sidebarOpen && (
        <Stack
          sx={{
            width: "20vw",
            backgroundColor: "white",
            height: "100vh",
            position: "absolute",
            left: 0,
            boxShadow: 5,
            zIndex: 999,
          }}
        >
          <ItemsSection />
        </Stack>
      )}
    </>
  );
});
