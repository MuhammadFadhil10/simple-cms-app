import * as React from "react";
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

  const handleBackgroundColorChange = React.useCallback(
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

  const handleStrokeColorChange = React.useCallback(
    (color: string) => {
      let currentProperties = item.properties;

      currentProperties = {
        ...currentProperties,
        style: {
          ...currentProperties.style,
          border: `2px solid ${color}`,
        },
      };

      updateMoveable(item._id, { properties: currentProperties });
    },
    [item._id, item.properties, updateMoveable]
  );

  return (
    <>
      {tab === "style" && (
        <>
          <SharedInspectorSection title="Fill">
            <ColorInput
              value={item.properties.style.backgroundColor as string}
              onColorChange={handleBackgroundColorChange}
            />
          </SharedInspectorSection>
          <SharedInspectorSection title="Stroke">
            <ColorInput
              type="stroke"
              value={item.properties.style.border as string}
              onColorChange={handleStrokeColorChange}
            />
          </SharedInspectorSection>
        </>
      )}
    </>
  );
});
