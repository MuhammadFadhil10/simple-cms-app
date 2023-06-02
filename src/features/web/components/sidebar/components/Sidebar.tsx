import * as React from "react";
import Stack from "@mui/material/Stack";
// import { ItemsSection } from "./elements/ItemsSection";
import { useAppStore } from "@/features/web/hooks";
import { PagesSection } from "./elements/PagesSection";

export const Sidebar = React.memo(function Sidebar() {
  const { sidebarOpen } = useAppStore();

  return (
    <>
      {sidebarOpen && (
        <Stack
          gap={2}
          sx={{
            width: "20vw",
            backgroundColor: "white",
            height: "100vh",
            position: "fixed",
            left: 0,
            boxShadow: 5,
            zIndex: 999,
          }}
        >
          <PagesSection />
          {/* <ItemsSection /> */}
        </Stack>
      )}
    </>
  );
});
