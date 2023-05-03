import * as React from "react";
import Stack from "@mui/material/Stack";
// import Typography from "@mui/material/Typography";
import { ItemsSection } from "./elements/ItemsSection";

export const Sidebar = React.memo(function Sidebar() {
  const show = true;
  return (
    <>
      {show && (
        <Stack
          sx={{
            width: "300px",
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
