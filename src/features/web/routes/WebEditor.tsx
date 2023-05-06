import * as React from "react";

import {
  FloatingAddItemButton,
  // MainHeader,
  MainPage,
  Sidebar,
  usePage,
} from "@/features/web";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useRouter } from "next/router";

export const WebEditor = React.memo(function WebEditor() {
  const router = useRouter();
  const { pages } = usePage();

  React.useEffect(() => {
    if (router.query.webId && router.query.pageId) {
      localStorage.setItem("webId", router.query.webId as string);
      localStorage.setItem("pageId", router.query.pageId as string);

      const { pageId } = router.query;

      if (!pageId) return;

      const currentPage = pages.find((page) => page.id === pageId);

      if (pages.length > 0 && !currentPage) throw Error("Page not found");
    }
  }, [pages, router.query, router.query.isReady, router.query.webId]);

  return (
    <>
      {/* <MainHeader /> */}

      <DndProvider backend={HTML5Backend}>
        <Sidebar
          pages={pages.filter((page) => page.webId === router.query.webId)}
          activePageId={
            pages.find((page) => page.id === router.query.pageId)?.id as string
          }
        />
        <MainPage />
        <FloatingAddItemButton />
      </DndProvider>
    </>
  );
});
