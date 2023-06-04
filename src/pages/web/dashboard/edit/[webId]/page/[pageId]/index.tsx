import * as React from "react";
import { Web } from "@/features";
import { Page, WebEditor } from "@/features/web";
import { useRouter } from "next/router";
import { Pages, Webs } from "@/api";

const WebEditorPage = () => {
  const router = useRouter();

  const webCheck = React.useCallback(async (webId: string, pageId: string) => {
    const webs = await Webs.getWebs();
    const pages = await Pages.getPages(webId);

    const websIds = (webs as Web[])?.map((web) => web._id);
    const pagesIds = (pages as Page[])?.map((page) => page._id);

    if (!websIds.includes(webId)) throw Error("Web not found");
    if (!pagesIds.includes(pageId)) throw Error("Page not found");
  }, []);

  React.useEffect(() => {
    if (router.query?.webId && router.query?.pageId) {
      const { webId, pageId } = router.query;

      webCheck(webId as string, pageId as string);
    }
  }, [router, router.isReady, router.query, webCheck]);

  return <WebEditor />;
};

export async function getServerSideProps() {
  return {
    props: {},
  };
}

export default WebEditorPage;
