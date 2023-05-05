import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Add from "@mui/icons-material/Add";
import { useAppStore } from "../hooks";

export const AddItemButton = React.memo(function AddItemButton() {
  const { setSidebarOpen } = useAppStore();

  return (
    <IconButton onClick={() => setSidebarOpen(true)}>
      <Add color="primary" />
    </IconButton>
  );
});
