import * as React from "react";
// import Stack from "@mui/material/Stack";
// import Typography from "@mui/material/Typography";
import { Item, SharedInspectorSection } from "@/features/web";

interface Props {
  item: Item;
}

export const SharedInspectorBody = React.memo(function SharedInspectorBody({
  item,
}: Props) {
  console.log("item: ", item);
  return (
    <>
      <SharedInspectorSection title="Style"></SharedInspectorSection>
    </>
  );
});
