import * as React from "react";

import { MainHeader, MainPage, Sidebar } from "@/features/web";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useRouter } from "next/router";

export const WebEditor = React.memo(function WebEditor() {
  const router = useRouter();

  React.useEffect(() => {
    if (router.query.webId) {
      localStorage.setItem("webId", router.query.webId as string);
    }
  }, [router.query.isReady, router.query.webId]);

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
