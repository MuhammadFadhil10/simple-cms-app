import * as React from "react";
import {
  useAppDispatch,
  useAppSelector,
  toggleSidebarOpen,
  decrementZoom,
  incrementZoom,
  changeZoomByValue,
  handleActiveId,
  changeMousePosition,
  EditorZoom,
  toggleHandMode,
  toggleGrabWindow,
} from "@/features/web";

export const useAppStore = () => {
  const dispatch = useAppDispatch();

  // getter
  const sidebarOpen = useAppSelector((state) => state.sidebarOpen.open);
  const activeId = useAppSelector((state) => state.moveable.activeId);
  const zoomValue = useAppSelector((state) => state.editor.zoomValue);
  const mousePosition = useAppSelector((state) => state.editor.mousePosition);
  const isHandMode = useAppSelector((state) => state.editor.isHandMode);
  const isGrabWindow = useAppSelector((state) => state.editor.isGrabWindow);

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
    (action: "PLUS" | "MIN" | EditorZoom) => {
      if (action === "PLUS") {
        dispatch(incrementZoom());
      } else if (action === "MIN") {
        dispatch(decrementZoom());
      } else {
        dispatch(changeZoomByValue(action));
      }
    },
    [dispatch]
  );

  const setMousePosition = React.useCallback(
    (position: { x: number; y: number }) => {
      dispatch(changeMousePosition({ x: position.x, y: position.y }));
    },
    [dispatch]
  );

  const setToggleHandMode = React.useCallback(
    (state?: boolean) => {
      dispatch(toggleHandMode(state as boolean));
    },
    [dispatch]
  );

  const setToggleGrabWindow = React.useCallback(
    (state?: boolean) => {
      dispatch(toggleGrabWindow(state as boolean));
    },
    [dispatch]
  );

  return {
    sidebarOpen,
    activeId,
    zoomValue,
    mousePosition,
    isHandMode,
    isGrabWindow,
    setSidebarOpen,
    setActiveId,
    setZoomValue,
    setMousePosition,
    setToggleHandMode,
    setToggleGrabWindow,
  };
};
