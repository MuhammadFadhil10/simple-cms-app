import * as React from "react";
import Box from "@mui/material/Box";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";

interface Props {
  anchorEl: HTMLElement;
  onClose: () => void;
  onRenameClick: () => void;
  onDelete: () => void;
}

export const ItemOptionPopover = React.memo(function ItemOptionPopover({
  onClose,
  anchorEl,
  onRenameClick,
  onDelete,
}: Props) {
  const open = Boolean(anchorEl);

  const optionStyle = React.useMemo(() => {
    return {
      width: "100%",
      height: "20px",
      cursor: "pointer",
      p: 1,
      "&:hover": { backgroundColor: "#efefef" },
    };
  }, []);
  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      <Box sx={{ width: "200px", height: "auto" }}>
        <Box
          display="flex"
          alignItems="center"
          sx={optionStyle}
          onClick={onRenameClick}
        >
          <Typography fontSize={14}>Rename</Typography>
        </Box>
        <Box
          display="flex"
          alignItems="center"
          sx={optionStyle}
          onClick={onDelete}
        >
          <Typography fontSize={14} color="error">
            Delete
          </Typography>
        </Box>
      </Box>
    </Popover>
  );
});
