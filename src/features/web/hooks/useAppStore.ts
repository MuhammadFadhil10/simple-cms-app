import * as React from "react";
import { useAppDispatch, useAppSelector } from "@/features/web";

// slice
import { incrementByAmount } from "@/features/web/app/counterSlice";

export const useAppStore = () => {
  const dispatch = useAppDispatch();

  // getter
  const count = useAppSelector((state) => state.counter.value);

  // setter
  const setCount = React.useCallback(
    (state: number) => {
      dispatch(incrementByAmount(state));
    },
    [dispatch]
  );

  return { count, setCount };
};
