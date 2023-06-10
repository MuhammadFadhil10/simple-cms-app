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

  const oldX = React.useRef(0);
  const oldY = React.useRef(0);

  const startX = React.useRef<number>(0);
  const scrollLeft = React.useRef<number>(0);

  const [mainPage, setMainPage] = React.useState<HTMLElement | undefined>(
    undefined
  );

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
          if (isGrabWindow) setToggleGrabWindow(false);
          return setToggleHandMode(false);
        }
      }
    },
    [isGrabWindow, setToggleGrabWindow, setToggleHandMode]
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

  const onMouseDown = React.useCallback(
    (ev: MouseEvent) => {
      if (isHandMode) {
        startX.current = ev.pageX;
        scrollLeft.current = (mainPage as HTMLElement).scrollLeft;
        setToggleGrabWindow(true);
      }
    },
    [isHandMode, mainPage, setToggleGrabWindow]
  );

  const onMouseUp = React.useCallback(() => {
    if (isHandMode) {
      setToggleGrabWindow(false);
      // window.scrollTo(ev.screenX, ev.screenY);
    }
  }, [isHandMode, setToggleGrabWindow]);

  const onMouseMove = React.useCallback(
    (ev: MouseEvent) => {
      if (isGrabWindow) {
        // const x = ev.pageX - (mainPage as HTMLElement).offsetLeft;
        // const walk = x - startX.current;

        window.scrollTo(ev.screenX, ev.screenY);
        // (mainPage as HTMLElement).scrollLeft = scrollLeft.current - walk;
      }

      oldX.current = ev.pageX;
      oldY.current = ev.pageY;
    },
    [isGrabWindow]
  );

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      setMainPage(document.getElementById("editor-main-page") as HTMLElement);
    }
  }, []);

  return {
    onWheel,
    onKeyup,
    onKeyDown,
    onMouseDown,
    onMouseUp,
    onMouseMove,
  };
};
