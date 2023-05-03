import "./style.css";

import { ThemeProvider } from "@mui/material";
import { theme } from "@/utils/theme";
import type { AppProps } from "next/app";
import { store } from "@/features/web";
import { Provider } from "react-redux";

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  );
}
