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

  // status state
  const [isBold, setIsBold] = React.useState(textStyle.fontWeight === "bold");
  const [isUppercase, setIsUppercase] = React.useState(
    textStyle.textTransform === "uppercase"
  );
  const [alignment, setAlignment] = React.useState<"left" | "center" | "right">(
    textStyle.textAlign
  );
  const [fontSize, setFontSize] = React.useState(
    textStyle.fontSize.split("px")[0]
  );

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
      {/* text */}
      <TextField
        type="text"
        multiline
        minRows={2}
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
        {/* color */}
        <ColorInput
          value={item.properties.text?.style?.color ?? "black"}
          onColorChange={(color) => handleUpdateStyle("color", color)}
          hideColorText
          width="12px"
          height="12px"
        />
        <VerticalDivider />

        {/* alignment */}
        <Box display="flex" alignItems="center" gap={1}>
          <AlignLeftIcon
            fontSize="small"
            sx={{
              cursor: "pointer",
              backgroundColor: alignment === "left" ? "#ccc" : "transparent",
            }}
            onClick={() => {
              setAlignment("left");
              handleUpdateStyle("textAlign", "left");
            }}
          />
          <AlignCenterIcon
            fontSize="small"
            sx={{
              cursor: "pointer",
              backgroundColor: alignment === "center" ? "#ccc" : "transparent",
            }}
            onClick={() => {
              setAlignment("center");
              handleUpdateStyle("textAlign", "center");
            }}
          />
          <AlignRightIcon
            fontSize="small"
            sx={{
              cursor: "pointer",
              backgroundColor: alignment === "right" ? "#ccc" : "transparent",
            }}
            onClick={() => {
              setAlignment("right");
              handleUpdateStyle("textAlign", "right");
            }}
          />
        </Box>
        <VerticalDivider />

        {/* font size */}
        <Box display="flex" alignItems="center" gap={1}>
          <FormControl variant="standard">
            <Select
              size="small"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={fontSize}
              sx={{ height: "100%" }}
              onChange={(e) => {
                setFontSize(e.target.value);

                handleUpdateStyle("fontSize", `${e.target.value}px`);
              }}
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

        {/* bold */}
        <BoldIcon
          fontSize="small"
          sx={{
            cursor: "pointer",
            backgroundColor: isBold ? "#ccc" : "transparent",
          }}
          onClick={() => {
            const actualIsBold = textStyle.fontWeight === "bold";

            setIsBold(!isBold);

            handleUpdateStyle("fontWeight", !actualIsBold ? "bold" : "normal");
          }}
        />
        <VerticalDivider />

        {/* uppercase */}
        <Box
          display="flex"
          sx={{
            cursor: "pointer",
            backgroundColor: isUppercase ? "#ccc" : "transparent",
            px: 1,
          }}
          onClick={() => {
            const actualIsUppercase = textStyle.textTransform === "uppercase";

            setIsUppercase(!isUppercase);

            handleUpdateStyle(
              "textTransform",
              !actualIsUppercase ? "uppercase" : "inherit"
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
