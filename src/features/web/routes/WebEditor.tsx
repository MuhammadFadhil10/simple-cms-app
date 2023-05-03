import * as React from "react";

import { MainHeader, MainPage, Sidebar } from "@/features/web";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export const WebEditor = React.memo(function WebEditor() {
  return (
    <>
      <MainHeader />

      <DndProvider backend={HTML5Backend}>
        <Sidebar />
        <MainPage />
      </DndProvider>
    </>
  );
});
