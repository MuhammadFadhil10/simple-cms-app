import * as React from "react";
import { useRouter } from "next/router";
import { useAppStore } from "./useAppStore";
import { useEventListener } from "./useEventListener";
// import { webThemes } from "../utils";
// import { WebTheme } from "@/features/types";

export const useMain = () => {
  const { pageId } = useRouter().query;

  const { sidebarOpen, setSidebarOpen, setToggleHandMode } = useAppStore();

  const { onWheel, onKeyup, onKeyDown, onMouseDown, onMouseUp, onMouseMove } =
    useEventListener();

  // window event
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo(window.innerWidth / 2, window.innerHeight / 2);

      // prevent browser scroll
      window.addEventListener(
        "wheel",
        (e) => {
          if (e.ctrlKey) {
            e.preventDefault();
          }
        },
        { passive: false }
      );

      // event listener
      // KEYUP
      window.addEventListener("keyup", onKeyup, { passive: false });
      window.addEventListener("keydown", onKeyDown);
      window.addEventListener("mousedown", onMouseDown);
      window.addEventListener("mouseup", onMouseUp);
      window.addEventListener("mousemove", onMouseMove);
    }

    return () => {
      window.removeEventListener("keyup", onKeyup);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, [
    onKeyDown,
    onKeyup,
    onMouseDown,
    onMouseMove,
    onMouseUp,
    pageId,
    setToggleHandMode,
  ]);

  return {
    onWheel,
    sidebarOpen,
    setSidebarOpen,
  };
};
