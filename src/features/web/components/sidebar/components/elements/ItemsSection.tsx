import * as React from "react";
// import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { itemList } from "@/features/web";
// import { useDrag, DragSourceMonitor } from "react-dnd";
import { ItemRender } from "./ItemRender";

export const ItemsSection = React.memo(function ItemsSection() {
  return (
    <Stack sx={{ width: "100%", height: "auto", px: 1 }}>
      <Stack marginBottom={1} sx={{ width: "100%" }}>
        <Typography>Items</Typography>
      </Stack>
      <Stack direction="row" gap={1} sx={{ width: "100%" }}>
        {itemList.map((item, index) => (
          <ItemRender key={index} item={item} />
        ))}
      </Stack>
    </Stack>
  );
});
