import * as React from "react";
import { useAppStore } from "./useAppStore";

export const useEventListener = () => {
  const {
    isHandMode,
    isGrabWindow,
    mousePosition,
    setZoomValue,
    setMousePosition,
    setToggleHandMode,
    setToggleGrabWindow,
  } = useAppStore();

  const oldX = React.useRef(0);
  const oldY = React.useRef(0);

  // zoom in zoom out
  const onWheel: React.WheelEventHandler<HTMLElement> = React.useCallback(
    (e: React.WheelEvent<HTMLElement>) => {
      if (e.ctrlKey) {
        if (e.deltaY <= 0) {
          setZoomValue("PLUS");
          setMousePosition({ x: e.clientX, y: e.clientY });
        } else {
          setZoomValue("MIN");
          setMousePosition({ x: e.clientX, y: e.clientY });
        }
      }
    },
    [setMousePosition, setZoomValue]
  );

  // keyup
  const onKeyup = React.useCallback(
    (ev: KeyboardEvent) => {
      ev.stopPropagation();
      ev.preventDefault();

      switch (ev.code.toLowerCase()) {
        case "keyh": {
          return setToggleHandMode();
        }
        case "space": {
          return setToggleHandMode(false);
        }
      }
    },
    [setToggleHandMode]
  );

  const onKeyDown = React.useCallback(
    (ev: KeyboardEvent) => {
      ev.stopPropagation();
      ev.preventDefault();

      switch (ev.code.toLowerCase()) {
        case "space": {
          return setToggleHandMode(true);
        }
      }
    },
    [setToggleHandMode]
  );

  const onMouseDown = React.useCallback(() => {
    if (isHandMode) {
      setToggleGrabWindow(true);
    }
  }, [isHandMode, setToggleGrabWindow]);

  const onMouseUp = React.useCallback(() => {
    if (isHandMode) setToggleGrabWindow(false);
  }, [isHandMode, setToggleGrabWindow]);

  const onMouseMove = React.useCallback(
    (ev: MouseEvent) => {
      if (isGrabWindow) {
        if (ev.pageX < oldX.current) {
          setMousePosition({
            ...mousePosition,
            x: mousePosition.x - ev.pageX / 10,
          });
        } else if (ev.pageX > oldX.current) {
          setMousePosition({
            ...mousePosition,
            x: mousePosition.x + ev.pageX / 10,
          });
        } else if (ev.pageY < oldY.current) {
          setMousePosition({
            // ...mousePosition,
            x: oldX.current,
            y: mousePosition.y - ev.pageY / 10,
          });
        } else if (ev.pageY > oldY.current) {
          setMousePosition({
            // ...mousePosition,
            x: oldX.current,
            y: mousePosition.y + ev.pageY / 10,
          });
        }
      }

      oldX.current = ev.pageX;
      oldY.current = ev.pageY;
    },
    [isGrabWindow, mousePosition, setMousePosition]
  );

  return {
    onWheel,
    onKeyup,
    onKeyDown,
    onMouseDown,
    onMouseUp,
    onMouseMove,
  };
};
