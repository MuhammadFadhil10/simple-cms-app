import * as React from "react";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";

interface Props {
  tab: string;
  // eslint-disable-next-line no-unused-vars
  onChange: (tab: string) => void;
}

export const InspectorTab = React.memo(function InspectorTab({
  tab,
  onChange,
}: Props) {
  return (
    <Tabs
      variant="fullWidth"
      value={tab}
      onChange={(e, value) => onChange(value)}
      sx={{ borderBottom: "1px solid #ccc" }}
    >
      <Tab label="Settings" value="settings" />
      <Tab label="Style" value="style" />
    </Tabs>
  );
});
