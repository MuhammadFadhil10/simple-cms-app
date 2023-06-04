import * as React from "react";
import { ButtonInspector, Item, SharedInspectorBody } from "@/features/web";

interface Props {
  item: Item;
}

export const InspectorBodyRender = React.memo(function InspectorBodyRender({
  item,
}: Props) {
  return (
    <>
      {item.type === "button" && <ButtonInspector item={item} />}
      <SharedInspectorBody item={item} />
    </>
  );
});
