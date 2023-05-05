import * as React from "react";
import { useAppDispatch, useAppSelector } from "@/features/web";

// slice
import { incrementByAmount } from "@/features/web/app/counterSlice";
import { toggleSidebarOpen } from "@/features/web/app/sidebarSlice";
import { handleActiveId } from "@/features/web/app/moveableSlice";

export const useAppStore = () => {
  const dispatch = useAppDispatch();

  // getter
  const count = useAppSelector((state) => state.counter.value);
  const sidebarOpen = useAppSelector((state) => state.sidebarOpen.open);
  const activeId = useAppSelector((state) => state.moveable.activeId);

  // setter
  const setCount = React.useCallback(
    (state: number) => {
      dispatch(incrementByAmount(state));
    },
    [dispatch]
  );

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

  return {
    count,
    setCount,
    sidebarOpen,
    setSidebarOpen,
    activeId,
    setActiveId,
  };
};
