import * as React from "react";
import { Page } from "../types";
import { useRouter } from "next/router";

export const usePage = () => {
  const router = useRouter();

  const [pages, setPages] = React.useState<Page[]>([]);

  const createPage = React.useCallback(
    (pageName?: string, webId?: string): Page => {
      const newPage: Page = {
        id: (Date.now() * Math.random()).toString(),
        name: pageName ?? `Page ${pages.length + 1}`,
        webId: webId ?? localStorage?.webId ?? "",
      };

      const newPages = [...pages, newPage];

      localStorage.setItem("pages", JSON.stringify(newPages));

      router.push(`/web/dashboard/edit/${newPage.webId}/page/${newPage.id}`);

      return newPage;
    },
    [pages, router]
  );

  React.useEffect(() => {
    if (localStorage?.pages) setPages(JSON.parse(localStorage.pages));
  }, []);

  return {
    pages,
    createPage,
  };
};
