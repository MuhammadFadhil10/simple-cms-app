import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Web } from "@/features/types";

interface Props {
  web: Web;
}

export const WebCard = React.memo(function WebCard({ web }: Props) {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{ width: "200px", height: "100px", boxShadow: 3, cursor: "pointer" }}
    >
      <Typography>{web.name}</Typography>
    </Box>
  );
});
