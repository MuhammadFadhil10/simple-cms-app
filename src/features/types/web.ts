import { WebTheme } from "./theme";

/* 
 Global type for content size
 relative to its parent
*/
export type GlobalContentSizing = "full" | "semi-full" | "center";

export interface Web {
  id: string;
  name: string;
  contentSizing: GlobalContentSizing;
  theme: WebTheme;
}
