import * as React from "react";
import Box from "@mui/material/Box";

export const VerticalDivider = React.memo(function VerticalDivider() {
  return (
    <Box sx={{ width: "2px", height: "15px", backgroundColor: "#ccc" }}></Box>
  );
});
