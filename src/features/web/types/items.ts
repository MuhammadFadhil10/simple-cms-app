import * as React from "react";

export type ItemTypes = "button" | "image";
export type SharedItemProperties = {
  style: React.CSSProperties;
  event: React.MouseEvent;
};

export interface Item {
  id: string;
  type: ItemTypes;
  properties: SharedItemProperties;
}
