import { ButtonProperties, Item } from "../types";

export const items: Item[] = [
  {
    id: "initialId",
    webId: "initialId",
    name: "Button",
    type: "button",
    properties: {
      event: null,
      style: {
        height: "30px",
        width: "100px",
      },
      variant: "contained",
    } as ButtonProperties,
  },
];
