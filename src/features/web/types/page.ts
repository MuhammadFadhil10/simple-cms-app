import * as React from "react";

export interface Page {
  _id: string;
  name: string;
  isMain: boolean;
  webId: string;
  style: React.CSSProperties | unknown;
}
