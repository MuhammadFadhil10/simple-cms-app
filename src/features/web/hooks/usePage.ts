import * as React from "react";
import { Page } from "../types";
import { useRouter } from "next/router";
import { useGetPages } from "./api/useGetPages";
import { Pages } from "@/api";

export const usePage = () => {
  const { pageId } = useRouter().query;

  const { data: rawPages, isLoading: pagesLoading } = useGetPages();

  const pages: Page[] = React.useMemo(() => {
    if (!rawPages) return [];

    return rawPages;
  }, [rawPages]);

  console.log("pages: ", pages);

  const currentPage = React.useMemo(() => {
    const page = pages?.find((page: any) => page._id === (pageId as string));

    return page;
  }, [pageId, pages]);

  const handleGetWebPages = React.useCallback(async (webId: string) => {
    const pages = await Pages.getPages(webId);

    return pages as Page[];
  }, []);

  return { pages, currentPage, handleGetWebPages, pagesLoading };
};
