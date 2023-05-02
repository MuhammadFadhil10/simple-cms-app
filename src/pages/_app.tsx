import "./style.css";

import { ThemeProvider } from "@mui/material";
import { theme } from "@/utils/theme";
import type { AppProps } from "next/app";

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
