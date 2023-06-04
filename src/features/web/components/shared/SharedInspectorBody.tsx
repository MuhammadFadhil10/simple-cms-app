import * as React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import {
  ColorInput,
  Item,
  SharedInspectorSection,
  useMoveable,
} from "@/features/web";

interface Props {
  item: Item;
  tab: string;
}

export const SharedInspectorBody = React.memo(function SharedInspectorBody({
  item,
  tab,
}: Props) {
  const { updateMoveable } = useMoveable();

  const handleChange = React.useCallback(
    (color: string) => {
      let currentProperties = item.properties;

      currentProperties = {
        ...currentProperties,
        style: {
          ...currentProperties.style,
          backgroundColor: color,
        },
      };

      updateMoveable(item._id, { properties: currentProperties });
    },
    [item._id, item.properties, updateMoveable]
  );

  return (
    <>
      {tab === "style" && (
        <SharedInspectorSection title="Fill">
          <Stack>
            <Box display="flex" gap={1} alignItems="center">
              <ColorInput
                value={item.properties.style.backgroundColor as string}
                onColorChange={handleChange}
              />
              <Typography fontSize={14}>Background Color</Typography>
            </Box>
          </Stack>
        </SharedInspectorSection>
      )}
    </>
  );
});
