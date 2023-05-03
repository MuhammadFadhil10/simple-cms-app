import * as React from "react";
import { useSection } from "../hooks/useSection";
import Stack from "@mui/material/Stack";

interface Props {
  children?: React.ReactNode;
}

export const SectionWrapper = React.memo(function SectionWrapper({
  children,
}: Props) {
  const { memoizedSectionWidth } = useSection();
  return (
    <Stack
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
      {children}
    </Stack>
  );
});
