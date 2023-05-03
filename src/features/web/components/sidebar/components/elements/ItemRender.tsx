import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Item } from "@/features/web";
import { useDrag, DragSourceMonitor } from "react-dnd";

interface Props {
  item: Item;
}

export const ItemRender = React.memo(function ItemRender({ item }: Props) {
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: item.type,
      item,
      //   canDrag: !forbidDrag,
      collect: (monitor: DragSourceMonitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    []
  );

  return (
    <Box key={item.id}>
      <Box
        ref={drag}
        sx={{
          width: "50px",
          height: "50px",
          backgroundColor: "blue",
          opacity: isDragging ? 0.4 : 1,
          cursor: isDragging ? "grabbing" : "grab",
          "&:hover": {
            boxShadow: 5,
            transition: "100ms",
          },
        }}
      ></Box>
      <Typography>{item.name}</Typography>
    </Box>
  );
});
