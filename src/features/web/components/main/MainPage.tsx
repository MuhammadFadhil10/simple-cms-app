import * as React from "react";

import Stack from "@mui/material/Stack";
import { SectionWrapper } from "../section";

import { useMain } from "@/features/web";

export const MainPage = React.memo(function MainPage() {
  const { memoizedCurrentTheme } = useMain();

  return (
    <Stack
      sx={{
        width: `${100 / 1.5}vw`,
        minHeight: `${100 / 1.5}vh`,
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        overflowY: "auto",
        boxShadow: 7,
        backgroundColor: memoizedCurrentTheme?.colors.pageColor ?? "white",
      }}
    >
      <SectionWrapper></SectionWrapper>
    </Stack>
  );
});
