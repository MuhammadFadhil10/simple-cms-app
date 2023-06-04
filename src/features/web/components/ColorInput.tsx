import * as React from "react";
import Box from "@mui/material/Box";
import Popover from "@mui/material/Popover";
import { SketchPicker } from "@hello-pangea/color-picker";
import { debounceCallback } from "@/features/utils";

interface Props {
  value: string;
  // eslint-disable-next-line no-unused-vars
  onColorChange: (color: string) => void;
}

export const ColorInput = React.memo(function ColorInput({
  value,
  onColorChange,
}: Props) {
  const [anchorEl, setAnchorEl] = React.useState<HTMLDivElement | null>(null);
  const colorOpen = Boolean(anchorEl);

  const handleChangeColor = React.useMemo(() => {
    return debounceCallback((color: string) => {
      onColorChange(color);
    });
  }, [onColorChange]);

  return (
    <>
      <Box
        sx={{
          width: "20px",
          height: "20px",
          backgroundColor: value,
          borderRadius: "10%",
          cursor: "pointer",
          border: "2px solid #333",
        }}
        onClick={(e) => setAnchorEl(e.currentTarget)}
      ></Box>
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
          defaultColor={value}
          onChange={({ rgb: color }) =>
            handleChangeColor(
              `rgba(${color.r},${color.g},${color.b},${color.a})`
            )
          }
          //   presetColors={["red", "blue"]}
        />
      </Popover>
    </>
  );
});
