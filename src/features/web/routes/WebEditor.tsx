import * as React from "react";
import { MainHeader, MainPage } from "../components";

export const WebEditor = React.memo(function WebEditor() {
  return (
    <>
      <MainHeader />
      <MainPage />
    </>
  );
});
