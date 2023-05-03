import * as React from "react";
import { useAppDispatch, useAppSelector } from "@/features/web";

// slice
import { incrementByAmount } from "@/features/web/app/counterSlice";
import { toggleSidebarOpen } from "@/features/web/app/sidebarSlice";

export const useAppStore = () => {
  const dispatch = useAppDispatch();

  // getter
  const count = useAppSelector((state) => state.counter.value);
  const sidebarOpen = useAppSelector((state) => state.sidebarOpen.open);

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

  return { count, setCount, sidebarOpen, setSidebarOpen };
};
