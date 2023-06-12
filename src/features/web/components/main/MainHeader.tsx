import * as React from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export const MainHeader = React.memo(function MainHeader() {
  return (
    <Stack sx={{ backgroundColor: "blue", position: "fixed", width: "100vw" }}>
      <Typography fontSize={30}>Web Editor</Typography>
    </Stack>
  );
});
