import * as React from "react";

import { MainHeader, MainPage, Sidebar } from "@/features/web";

export const WebEditor = React.memo(function WebEditor() {
  return (
    <>
      <MainHeader />

      <Sidebar />
      <MainPage />
    </>
  );
});
