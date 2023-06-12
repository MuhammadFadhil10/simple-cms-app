import * as React from "react";
import { useAppStore } from "./useAppStore";

export const useEventListener = () => {
  const {
    isHandMode,
    isGrabWindow,
    setZoomValue,
    setMousePosition,
    setToggleHandMode,
    setToggleGrabWindow,
  } = useAppStore();

  const [position, setPosition] = React.useState({
    x: 0,
    y: 0,
  });

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
  const onKeyUp = React.useCallback(
    (ev: React.KeyboardEvent<HTMLDivElement>) => {
      switch (ev.code.toLowerCase()) {
        case "keyh": {
          return setToggleHandMode();
        }
        case "space": {
          if (isGrabWindow) setToggleGrabWindow(false);
          return setToggleHandMode(false);
        }
      }
    },
    [isGrabWindow, setToggleGrabWindow, setToggleHandMode]
  );

  const onKeyDown = React.useCallback(
    (ev: React.KeyboardEvent<HTMLDivElement>) => {
      switch (ev.code.toLowerCase()) {
        case "space": {
          ev.preventDefault();
          setToggleHandMode(true);
        }
      }
    },
    [setToggleHandMode]
  );

  const onMouseDown = React.useCallback(
    (ev: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (isHandMode) {
        setPosition({
          ...position,
          x: ev.clientX,
          y: ev.clientY,
        });
        setToggleGrabWindow(true);
      }
    },
    [isHandMode, position, setToggleGrabWindow]
  );

  const onMouseUp = React.useCallback(() => {
    if (isHandMode) {
      setToggleGrabWindow(false);
    }
  }, [isHandMode, setToggleGrabWindow]);

  const onMouseMove = React.useCallback(
    (ev: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (isGrabWindow) {
        // ev.preventDefault();
        setPosition({
          ...position,
          x: ev.clientX,
          y: ev.clientY,
        });

        const dx = ev.clientX - position.x;
        const dy = ev.clientY - position.y;

        // Scroll the element
        ev.currentTarget.scrollTop = ev.currentTarget.scrollTop - dy;
        ev.currentTarget.scrollLeft = ev.currentTarget.scrollLeft - dx;
      }
    },
    [isGrabWindow, position]
  );

  return {
    onWheel,
    onKeyUp,
    onKeyDown,
    onMouseDown,
    onMouseUp,
    onMouseMove,
  };
};
