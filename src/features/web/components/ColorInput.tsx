import * as React from "react";
import Box from "@mui/material/Box";
import Popover from "@mui/material/Popover";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { SketchPicker } from "@hello-pangea/color-picker";
import { debounceCallback } from "@/features/utils";

interface Props {
  value: string;
  // eslint-disable-next-line no-unused-vars
  onColorChange: (color: string) => void;
  type?: "fill" | "stroke";
  width?: string;
  height?: string;
  hideColorText?: boolean;
}

export const ColorInput = React.memo(function ColorInput({
  value,
  onColorChange,
  type = "fill",
  width = "20px",
  height = "20px",
  hideColorText,
}: Props) {
  const [anchorEl, setAnchorEl] = React.useState<HTMLDivElement | null>(null);
  const colorOpen = Boolean(anchorEl);

  const handleChangeColor = React.useMemo(
    () =>
      debounceCallback((color: string) => {
        onColorChange(color);
      }),
    [onColorChange]
  );

  return (
    <Stack direction="row" alignItems="center" gap={1}>
      <Box
        sx={{
          width: width,
          height: height,
          backgroundColor: type === "fill" ? value : "transparent",
          borderRadius: "10%",
          cursor: "pointer",
          border:
            type === "fill" ? "2px solid #333" : value ?? "3px solid #333",
        }}
        onClick={(e) => setAnchorEl(e.currentTarget)}
      ></Box>
      <Typography fontSize={14}>
        {(!hideColorText && value) ?? "#333"}
      </Typography>
      <Popover
        anchorEl={anchorEl}
        open={colorOpen}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: "center",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "center",
          horizontal: "right",
        }}
      >
        <SketchPicker
          defaultColor={value ?? "#333"}
          onChangeComplete={({ rgb: color }) => {
            // alert(hex);
            handleChangeColor(
              `rgba(${color.r},${color.g},${color.b},${color.a})`
            );
          }}
          //   presetColors={["red", "blue"]}
        />
      </Popover>
    </Stack>
  );
});
