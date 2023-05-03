import * as React from "react";
// import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { items } from "@/features/web";
// import { useDrag, DragSourceMonitor } from "react-dnd";
import { ItemRender } from "./ItemRender";

export const ItemsSection = React.memo(function ItemsSection() {
  //   const [{ isDragging }, drag] = useDrag(
  //     () => ({
  //       type: "test",
  //       //   canDrag: !forbidDrag,
  //       collect: (monitor: DragSourceMonitor) => ({
  //         isDragging: monitor.isDragging(),
  //       }),
  //     }),
  //     []
  //   );

  return (
    <Stack sx={{ width: "100%", height: "100%", px: 1 }}>
      <Stack sx={{ width: "100%" }}>
        <Typography>Items</Typography>
      </Stack>
      <Stack sx={{ width: "100%" }}>
        {items.map((item, index) => (
          <ItemRender key={item.id ?? index} item={item} />
        ))}
      </Stack>
    </Stack>
  );
});
