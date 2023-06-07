import * as React from "react";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import Divider from "@mui/material/Divider";
import MinimizeIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { EditorZoom, useAppStore } from "@/features/web";

export const ZoomToolbar = React.memo(function ZoomToolbar() {
  const { zoomValue, setZoomValue } = useAppStore();

  const zoomValueArray: EditorZoom[] = React.useMemo(() => {
    return [
      10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160,
      170, 180, 190, 200,
    ] as EditorZoom[];
  }, []);

  const handleZoomChange = React.useCallback(
    (zoom: EditorZoom) => {
      if ((zoom as any) === "FIT-100") {
        setZoomValue(100);

        // centering section to screen
        return window.scrollTo(window.innerWidth / 2, window.innerHeight / 2);
      }

      setZoomValue(zoom);
    },
    [setZoomValue]
  );

  return (
    <>
      <Box
        sx={{
          height: "100%",
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        <MinimizeIcon
          fontSize="medium"
          color="primary"
          sx={{
            height: "100%",
            cursor: "pointer",
            "&:hover": { backgroundColor: "#ccc", transition: "300ms" },
          }}
        />
        <FormControl variant="standard" size="small">
          <Select
            size="small"
            labelId="demo-simple-select-label"
            id="grouped-select"
            label="Grouping"
            value={zoomValue}
            sx={{ height: "100%" }}
            onChange={(e) => {
              handleZoomChange(e.target.value as EditorZoom);
            }}
          >
            <MenuItem value={"FIT-100"}>Fit to screen</MenuItem>
            <Divider />
            {zoomValueArray.map((zoom) => (
              <MenuItem key={zoom} value={zoom}>
                {`${zoom}%`}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <AddIcon
          fontSize="medium"
          color="primary"
          sx={{
            height: "100%",
            cursor: "pointer",
            "&:hover": { backgroundColor: "#ccc", transition: "300ms" },
          }}
        />
      </Box>
    </>
  );
});
