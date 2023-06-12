import * as React from "react";
import Stack from "@mui/material/Stack";
import { Section } from "../section";
import { MainToolbar } from "./MainToolbar";

export const MainPage = React.memo(function MainPage() {
  return (
    <Stack
      component="div"
      justifyContent="center"
      alignItems="center"
      sx={{
        width: "200vw",
        height: "200vh",
        boxShadow: 7,
        backgroundColor: "#444",
      }}
    >
      <MainToolbar />
      <Section />
    </Stack>
  );
});
