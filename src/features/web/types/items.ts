import * as React from "react";

export type ItemTypes = "button" | "image";
export type SharedItemProperties = {
  style: React.CSSProperties;
  event: React.MouseEvent | null;
};

export interface Item {
  id: string;
  name: string;
  type: ItemTypes;
  properties: SharedItemProperties;
}

// button
export interface ButtonProperties extends SharedItemProperties {
  variant: "contained" | "outlined" | "text";
}
