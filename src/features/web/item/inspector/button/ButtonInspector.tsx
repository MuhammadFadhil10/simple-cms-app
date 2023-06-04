import * as React from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Item, SharedInspectorSection } from "@/features/web";

interface Props {
  item: Item;
}

export const ButtonInspector = React.memo(function ButtonInspector({
  item,
}: Props) {
  console.log("item: ", item);
  return (
    <>
      <SharedInspectorSection title="Test">
        <Stack>
          <Typography>Test</Typography>
        </Stack>
      </SharedInspectorSection>
    </>
  );
});
