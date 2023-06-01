// import { WebTheme } from "./theme";

/* 
 Global type for content size
 relative to its parent
*/
export type GlobalContentSizing = "full" | "semi-full" | "center";

export interface Web {
  _id: string;
  name: string;
  userId: string;
  sharedUserId: string[];
}
