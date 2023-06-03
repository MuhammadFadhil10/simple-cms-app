import * as React from "react";
import Stack from "@mui/material/Stack";
import { useAppStore, useMoveable } from "../../hooks";
import { InspectorHeader } from "./InspectorHeader";
import { Item } from "@/features/web";

export const Inspector = React.memo(function Inspector() {
  const { activeId } = useAppStore();
  const { memoizedMovables } = useMoveable();

  const activeMoveable = React.useMemo(() => {
    return memoizedMovables.find((item) => item._id === activeId);
  }, [activeId, memoizedMovables]);

  return (
    <>
      {activeId.trim().length > 0 && (
        <Stack
          gap={2}
          sx={{
            width: "20vw",
            backgroundColor: "white",
            height: "100vh",
            position: "fixed",
            top: 0,
            right: 0,
            boxShadow: 5,
            zIndex: 999,
          }}
        >
          <InspectorHeader item={activeMoveable as Item} />
        </Stack>
      )}
    </>
  );
});
