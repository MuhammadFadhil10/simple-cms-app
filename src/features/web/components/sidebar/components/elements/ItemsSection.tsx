import * as React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { items } from "@/features/web";

export const ItemsSection = React.memo(function ItemsSection() {
  return (
    <Stack
      sx={{ width: "100%", height: "100%", backgroundColor: "red", px: 1 }}
    >
      <Stack sx={{ width: "100%" }}>
        <Typography>Items</Typography>
      </Stack>
      <Stack sx={{ width: "100%" }}>
        {items.map((item) => (
          <Box sx={{ cursor: "pointer" }} key={item.id}>
            <Box
              sx={{ width: "50px", height: "50px", backgroundColor: "blue" }}
            ></Box>
            <Typography>{item.name}</Typography>
          </Box>
        ))}
      </Stack>
    </Stack>
  );
});
