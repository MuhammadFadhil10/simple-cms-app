import * as React from "react";

export type ItemTypes = "button" | "media";
export interface ItemList {
  type: ItemTypes;
  label: string;
}

export type SharedItemProperties = {
  style: React.CSSProperties;
  event: React.MouseEvent | null;
};

// properties
export interface ButtonProperties extends SharedItemProperties {
  variant: "contained" | "outlined" | "text";
}

// global item properties types
export type ItemPropertiesTypes = SharedItemProperties | ButtonProperties;

export interface Item {
  _id: string;
  name: string;
  type: ItemTypes;
  position: { x: number; y: number };
  pageId: string;
  isLocked: boolean;
  isVisible: boolean;
  properties: ItemPropertiesTypes;
}
