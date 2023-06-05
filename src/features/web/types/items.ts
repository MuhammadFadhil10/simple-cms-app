import * as React from "react";

export type ItemTypes = "button" | "media";
export type ItemText = {
  output: string;
  style?: {
    fontSize?: string;
    fontWeight?: "normal" | "bold";
    textAlign?: "left" | "center" | "right";
    textTransform?: "inherit" | "uppercase";
    color?: string;
  };
};

export interface ItemList {
  type: ItemTypes;
  label: string;
}

export type SharedItemProperties = {
  text?: ItemText;
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
  pageId: string;
  isLocked: boolean;
  isVisible: boolean;
  properties: ItemPropertiesTypes;
}
