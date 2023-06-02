import * as React from "react";
import { Page } from "../types";
import { useRouter } from "next/router";
import { useGetPages } from "./api/useGetPages";
import { Pages } from "@/api";
import { useGlobalMutation } from "./api";

export const usePage = () => {
  const { pageId } = useRouter().query;

  const { data: rawPages, isLoading: pagesLoading } = useGetPages();

  const pages: Page[] = React.useMemo(() => {
    if (!rawPages) return [];

    return rawPages;
  }, [rawPages]);

  const currentPage = React.useMemo(() => {
    const page = pages?.find((page: any) => page._id === (pageId as string));

    return page;
  }, [pageId, pages]);

  const handleGetWebPages = React.useCallback(async (webId: string) => {
    const pages = await Pages.getPages(webId);

    return pages as Page[];
  }, []);

  const handleCreatePage = useGlobalMutation("CREATE_PAGE", ["pages"]);
  const handleDeletePage = useGlobalMutation("DELETE_PAGE", ["pages"]);

  return {
    pages,
    currentPage,
    handleGetWebPages,
    pagesLoading,
    handleCreatePage,
    handleDeletePage,
  };
};
