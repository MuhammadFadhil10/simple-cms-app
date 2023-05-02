export type WebColor = {
  pageColor: string;
  textColor: string;
  accentColor: string;
};

export interface WebTheme {
  id: string;
  name: string;
  colors: WebColor;
}
