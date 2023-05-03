import * as React from "react";
import { useRouter } from "next/router";
import { webThemes } from "../utils";
import { WebTheme } from "@/features/types";

export const useMain = () => {
  const { webId } = useRouter().query;

  const [webList, setWebList] = React.useState([]);

  const memoizedCurrentWeb = React.useMemo(() => {
    if (!webList) return [];

    return webList.find((web: any) => web.id === webId);
  }, [webId, webList]);

  const memoizedCurrentTheme = React.useMemo(() => {
    const themeId = (memoizedCurrentWeb as any)?.themeId;

    console.log("themeId: ", themeId);
    console.log("webThemes: ", webThemes);

    const theme: WebTheme = webThemes.find(
      (theme) => theme.id === themeId
    ) as WebTheme;

    return theme;
  }, [memoizedCurrentWeb]);

  React.useEffect(() => {
    if (localStorage.webs) {
      setWebList(JSON.parse(localStorage.webs));
    }
  }, []);

  return {
    memoizedCurrentWeb,
    webList,
    setWebList,
    memoizedCurrentTheme,
  };
};
