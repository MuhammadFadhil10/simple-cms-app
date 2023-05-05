import * as React from "react";
import Stack from "@mui/material/Stack";
import { SectionWrapper } from "./SectionWrapper";
import { useSection } from "../hooks";
// import { AddItemButton } from "../../AddItemButton";

export const Section = React.memo(function Memo() {
  const { memoizedSectionWidth } = useSection();

  const sectionWrapperRef = React.useRef<HTMLDivElement>(null);

  return (
    <Stack
      component="section"
      ref={sectionWrapperRef}
      alignItems="center"
      justifyContent="center"
      sx={{
        width: memoizedSectionWidth,
        minHeight: "100vh",
        borderLeft: "2px solid rgba(0,0,0,0.1)",
        borderRight: "2px solid rgba(0,0,0,0.1)",
        alignSelf: "center",
        // transform: "scale(0.5)",
        // boxShadow: 5,
      }}
    >
      <SectionWrapper />
    </Stack>
  );
});
