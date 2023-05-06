import * as React from "react";

export type ItemTypes = "button" | "image";

export type SharedItemProperties = {
  style: React.CSSProperties;
  event: React.MouseEvent | null;
};

// button
export interface ButtonProperties extends SharedItemProperties {
  variant: "contained" | "outlined" | "text";
}

// item
export type ItemPropertiesTypes = SharedItemProperties | ButtonProperties;

export interface Item {
  id: string;
  webId: string;
  pageId: string;
  name: string;
  type: ItemTypes;
  properties: ItemPropertiesTypes;
}
