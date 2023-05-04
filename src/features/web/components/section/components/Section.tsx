import * as React from "react";
import Stack from "@mui/material/Stack";
import { SectionWrapper } from "./SectionWrapper";
import { useSection } from "../hooks";

export const Section = React.memo(function Memo() {
  const { memoizedSectionWidth } = useSection();

  const sectionWrapperRef = React.useRef<HTMLDivElement>(null);

  return (
    <>
      <Stack
        component="section"
        ref={sectionWrapperRef}
        alignItems="center"
        justifyContent="center"
        sx={(theme) => ({
          width: memoizedSectionWidth,
          minHeight: "50px",
          backgroundColor: "transparent",
          border: "none",
          outline: `3px solid ${theme.palette.primary.main}`,
          alignSelf: "center",
          marginTop: 1,
        })}
      >
        <SectionWrapper />
      </Stack>
    </>
  );
});
