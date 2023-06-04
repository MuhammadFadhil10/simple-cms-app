import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

interface Props {
  title: string;
  children?: React.ReactNode;
}

export const SharedInspectorSection = React.memo(
  function SharedInspectorSection({ title, children }: Props) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="flex-start"
        alignItems="flex-start"
        gap={2}
        sx={{
          padding: 1,
          boxSizing: "border-box",
          width: "100%",
          minHeight: "50px",
          borderBottom: "1px solid #ccc",
          color: "#444",
        }}
      >
        <Typography>{title}</Typography>
        {children}
      </Box>
    );
  }
);
