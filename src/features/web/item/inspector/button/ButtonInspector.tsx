import * as React from "react";
// import Stack from "@mui/material/Stack";
// import Typography from "@mui/material/Typography";
import { Item, SharedInspectorSection, TextFormatInput } from "@/features/web";

interface Props {
  item: Item;
  tab: string;
}

export const ButtonInspector = React.memo(function ButtonInspector({
  item,
  tab,
}: Props) {
  console.log("item: ", item);
  return (
    <>
      {tab === "settings" && (
        <SharedInspectorSection title="Text">
          {/* <Stack> */}
          <TextFormatInput item={item} />
          {/* </Stack> */}
        </SharedInspectorSection>
      )}
    </>
  );
});
