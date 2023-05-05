import * as React from "react";
import Stack from "@mui/material/Stack";
import { SectionWrapper } from "./SectionWrapper";
import IconButton from "@mui/material/IconButton";
import Add from "@mui/icons-material/Add";
import { useSection } from "../hooks";
import { useAppStore } from "@/features/web/hooks";

export const Section = React.memo(function Memo() {
  const { memoizedSectionWidth } = useSection();
  const { setSidebarOpen } = useAppStore();

  const sectionWrapperRef = React.useRef<HTMLDivElement>(null);

  return (
    <Stack
      // direction="row"
      justifyContent="center"
      alignItems="center"
      sx={{ width: "100%", minHeight: "auto" }}
    >
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
      <Stack alignItems="flex-end" sx={{ width: memoizedSectionWidth }}>
        <IconButton onClick={() => setSidebarOpen(true)}>
          <Add color="primary" />
        </IconButton>
      </Stack>
    </Stack>
  );
});
