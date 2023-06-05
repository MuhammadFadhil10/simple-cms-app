import * as React from "react";
import Stack from "@mui/material/Stack";
import { useAppStore, useMoveable } from "../../hooks";
import { InspectorHeader } from "./InspectorHeader";
import { Item } from "@/features/web";
import { InspectorBodyRender } from "./InspectorBodyRender";
import { InspectorTab } from "./InspectorTab";

export const Inspector = React.memo(function Inspector() {
  const { activeId } = useAppStore();
  const { memoizedMovables } = useMoveable();

  const [tab, setTab] = React.useState("settings");

  const activeMoveable = React.useMemo(() => {
    return memoizedMovables.find((item) => item._id === activeId);
  }, [activeId, memoizedMovables]);

  const onChangeTab = React.useCallback((tab: string) => {
    setTab(tab);
  }, []);

  React.useEffect(() => {
    if (!activeMoveable) setTab("settings");
  }, [activeMoveable]);

  return (
    <>
      {activeId.trim().length > 0 && (
        <Stack
          // gap={2}
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

          <InspectorTab tab={tab} onChange={onChangeTab} />

          {activeMoveable && (
            <InspectorBodyRender item={activeMoveable} tab={tab} />
          )}
        </Stack>
      )}
    </>
  );
});
