import * as React from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useMain } from "@/features/web";

export const MainHeader = React.memo(function MainHeader() {
  const { memoizedCurrentWeb } = useMain();

  return (
    <Stack sx={{ backgroundColor: "blue", position: "fixed", width: "100vw" }}>
      <Typography fontSize={30}>
        {(memoizedCurrentWeb as any)?.webName} Web Editor
      </Typography>
    </Stack>
  );
});
