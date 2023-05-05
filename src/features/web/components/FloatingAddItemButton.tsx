import * as React from "react";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import { AddItemButton } from "./AddItemButton";

export const FloatingAddItemButton = React.memo(
  function FloatingAddItemButton() {
    return (
      <Tooltip title="Add item" placement="right">
        <Box
          sx={(theme) => ({
            position: "fixed",
            left: 25,
            bottom: 25,
            boxShadow: 5,
            backgroundColor: "transparent",
            borderRadius: "50%",
            border: `2px solid ${theme.palette.primary.main}`,
          })}
        >
          <AddItemButton />
        </Box>
      </Tooltip>
    );
  }
);
