import * as React from "react";
import { ButtonInspector, Item, SharedInspectorBody } from "@/features/web";

interface Props {
  item: Item;
  tab: string;
}

export const InspectorBodyRender = React.memo(function InspectorBodyRender({
  item,
  tab,
}: Props) {
  return (
    <>
      {item.type === "button" && <ButtonInspector item={item} tab={tab} />}
      <SharedInspectorBody item={item} tab={tab} />
    </>
  );
});
