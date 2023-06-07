import * as React from "react";
import { useAppDispatch, useAppSelector } from "@/features/web";

// slice
import {
  toggleSidebarOpen,
  decrementZoom,
  incrementZoom,
  handleActiveId,
  changeMousePosition,
} from "@/features/web";

export const useAppStore = () => {
  const dispatch = useAppDispatch();

  // getter
  const sidebarOpen = useAppSelector((state) => state.sidebarOpen.open);
  const activeId = useAppSelector((state) => state.moveable.activeId);
  const zoomValue = useAppSelector((state) => state.editor.zoomValue);
  const mousePosition = useAppSelector((state) => state.editor.mousePosition);

  // setter
  const setSidebarOpen = React.useCallback(
    (state: boolean) => {
      dispatch(toggleSidebarOpen(state));
    },
    [dispatch]
  );

  const setActiveId = React.useCallback(
    (itemId: string) => {
      dispatch(handleActiveId(itemId));
    },
    [dispatch]
  );

  const setZoomValue = React.useCallback(
    (action: "PLUS" | "MIN") => {
      if (action === "PLUS") {
        return dispatch(incrementZoom());
      }

      dispatch(decrementZoom());
    },
    [dispatch]
  );

  const setMousePosition = React.useCallback(
    (position: { x: number; y: number }) => {
      dispatch(changeMousePosition({ x: position.x, y: position.y }));
    },
    [dispatch]
  );

  return {
    sidebarOpen,
    activeId,
    zoomValue,
    mousePosition,
    setSidebarOpen,
    setActiveId,
    setZoomValue,
    setMousePosition,
  };
};
