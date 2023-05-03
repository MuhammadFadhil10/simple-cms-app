import * as React from "react";
import { useMain } from "@/features/web";
import { GlobalContentSizing } from "@/features/types";

export const useSection = () => {
  const { memoizedCurrentWeb } = useMain();

  const memoizedContentSizing: GlobalContentSizing | string =
    React.useMemo(() => {
      if (!(memoizedCurrentWeb as any)?.contentSizing) return "";

      return (memoizedCurrentWeb as any)?.contentSizing as GlobalContentSizing;
    }, [memoizedCurrentWeb]);

  const memoizedSectionWidth = React.useMemo(() => {
    switch (memoizedContentSizing) {
      case "full":
        return "100%";
      case "semi-full":
        return "80%";
      case "center":
        return "50%";
      default:
        return "100%";
    }
  }, [memoizedContentSizing]);

  return { memoizedSectionWidth };
};
