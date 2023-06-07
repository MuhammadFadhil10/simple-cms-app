import * as React from "react";
import Stack from "@mui/material/Stack";
import { ZoomToolbar } from "./elements/ZoomToolbar";

export const MainToolbar = React.memo(function memo() {
  return (
    <Stack
      direction="row"
      justifyContent="start"
      alignItems="center"
      sx={{
        position: "fixed",
        top: 20,
        right: 20,
        zIndex: 999,
        height: "30px",
        backgroundColor: "white",
        boxShadow: 5,
      }}
    >
      <ZoomToolbar />
    </Stack>
  );
});
