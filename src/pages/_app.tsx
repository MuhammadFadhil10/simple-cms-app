import "./style.css";
import * as React from "react";
import { ThemeProvider } from "@mui/material";
import { theme } from "@/utils/theme";
import { NextPage } from "next";
import type { AppProps } from "next/app";
import { store } from "@/features/web";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

type Page<P = {}> = NextPage<P> & {
  // eslint-disable-next-line no-unused-vars
  getLayout?: (page: React.ReactNode) => React.ReactNode;
};

type Props = AppProps & {
  Component: Page;
};

export default function MyApp({ Component, pageProps }: Props) {
  const getLayout = Component.getLayout || ((page: React.ReactNode) => page);
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          {getLayout(<Component {...pageProps} />)}
        </ThemeProvider>
      </Provider>
    </QueryClientProvider>
  );
}
