import * as React from "react";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import AlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import AlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import AlignRightIcon from "@mui/icons-material/FormatAlignRight";
import BoldIcon from "@mui/icons-material/FormatBold";
import { debounceCallback } from "@/features/utils";
import { ColorInput, Item, ItemText, useMoveable } from "@/features/web";
import { VerticalDivider } from "./VerticalDivider";

interface Props {
  item: Item;
}

export const TextFormatInput = React.memo(function TextFormatInput({
  item,
}: Props) {
  const { updateMoveableProps, updateMoveable } = useMoveable();

  const [value, setValue] = React.useState(item.properties.text?.output ?? "");

  const textStyle = React.useMemo(() => {
    const itemTextStyle = item.properties.text?.style ?? {};
    return {
      fontSize: itemTextStyle.fontSize ?? "16px",
      textAlign: itemTextStyle.textAlign ?? "center",
      textTransform: itemTextStyle.textTransform ?? "inherit",
      fontWeight: itemTextStyle.fontWeight ?? "normal",
      color: itemTextStyle.color ?? "black",
    };
  }, [item.properties.text?.style]);

  const handleUpdateOutput = React.useMemo(() => {
    return debounceCallback((valueInput: string) =>
      updateMoveableProps(item, "text", {
        ...item.properties.text,
        output: valueInput,
      })
    );
  }, [item, updateMoveableProps]);

  const handleUpdateStyle = React.useCallback(
    (field: string, data: unknown) => {
      updateMoveable(item._id, {
        properties: {
          ...item.properties,
          text: {
            ...(item.properties.text as ItemText),
            style: { ...textStyle, [field]: data },
          },
        },
      });
    },
    [item._id, item.properties, textStyle, updateMoveable]
  );

  return (
    <Box display="flex" flexDirection="column" sx={{ width: "100%" }}>
      <TextField
        type="text"
        size="small"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          handleUpdateOutput(e.target.value);
        }}
        sx={{ width: "100%" }}
      />
      <Box
        display="flex"
        alignItems="center"
        gap={1}
        sx={{
          width: "100%",
          border: "1px solid #ccc",
          borderTop: "none",
          p: 1,
          boxSizing: "border-box",
        }}
      >
        <ColorInput
          value={item.properties.text?.style?.color ?? "black"}
          onColorChange={(color) => handleUpdateStyle("color", color)}
          hideColorText
          width="12px"
          height="12px"
        />
        <VerticalDivider />
        <Box display="flex" alignItems="center" gap={1}>
          <AlignLeftIcon
            fontSize="small"
            sx={{
              cursor: "pointer",
              backgroundColor:
                textStyle.textAlign === "left" ? "#ccc" : "transparent",
            }}
            onClick={() => handleUpdateStyle("textAlign", "left")}
          />
          <AlignCenterIcon
            fontSize="small"
            sx={{
              cursor: "pointer",
              backgroundColor:
                textStyle.textAlign === "center" ? "#ccc" : "transparent",
            }}
            onClick={() => handleUpdateStyle("textAlign", "center")}
          />
          <AlignRightIcon
            fontSize="small"
            sx={{
              cursor: "pointer",
              backgroundColor:
                textStyle.textAlign === "right" ? "#ccc" : "transparent",
            }}
            onClick={() => handleUpdateStyle("textAlign", "right")}
          />
        </Box>
        <VerticalDivider />
        <Box display="flex" alignItems="center" gap={1}>
          {/* <FontSizeIcon fontSize="small" /> */}
          <FormControl variant="standard">
            <Select
              size="small"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={textStyle.fontSize.split("px")[0]}
              sx={{ height: "100%" }}
              onChange={(e) =>
                handleUpdateStyle("fontSize", `${e.target.value}px`)
              }
            >
              {[13, 16, 20, 24, 32, 36, 40, 48, 64, 96, 128].map((size) => (
                <MenuItem key={size} value={size}>
                  {size}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <VerticalDivider />
        <BoldIcon
          fontSize="small"
          sx={{
            cursor: "pointer",
            backgroundColor:
              textStyle.fontWeight === "bold" ? "#ccc" : "transparent",
          }}
          onClick={() => {
            const isBold = textStyle.fontWeight === "bold";

            handleUpdateStyle("fontWeight", !isBold ? "bold" : "normal");
          }}
        />
        <VerticalDivider />
        <Box
          display="flex"
          sx={{
            cursor: "pointer",
            backgroundColor:
              textStyle.textTransform === "uppercase" ? "#ccc" : "transparent",
              px:1
          }}
          onClick={() => {
            const isUppercase = textStyle.textTransform === "uppercase";

            handleUpdateStyle(
              "textTransform",
              !isUppercase ? "uppercase" : "inherit"
            );
          }}
        >
          <Typography>A</Typography>
          <Typography>A</Typography>
        </Box>
      </Box>
    </Box>
  );
});
