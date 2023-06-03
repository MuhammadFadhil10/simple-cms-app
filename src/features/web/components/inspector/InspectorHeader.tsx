import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import MoreIcon from "@mui/icons-material/MoreVert";
import { ItemOptionPopover } from "../ItemOptionPopover";
import { debounceCallback } from "@/features";
import { Item } from "@/features/web";
import { useAppStore, useMoveable } from "../../hooks";

interface Props {
  item: Item;
}

export const InspectorHeader = React.memo(function InspectorHeader({
  item,
}: Props) {
  const { updateMoveable, deleteMoveable } = useMoveable();
  const { setActiveId, activeId } = useAppStore();

  const [value, setValue] = React.useState(item.name);
  const [isRename, setIsRename] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | undefined>(
    undefined
  );
  const renameRef = React.useRef<HTMLDivElement>(null);

  const handleClose = React.useCallback(() => {
    setAnchorEl(undefined);
  }, []);

  const handleRenameMoveable = React.useMemo(() => {
    return debounceCallback(
      (name: string) => updateMoveable(item._id, { name }),
      1000
    );
  }, [item._id, updateMoveable]);

  React.useEffect(() => {
    if (value.toLowerCase() !== item.name.toLowerCase() && renameRef.current) {
      handleRenameMoveable(value);
    }
  }, [activeId, handleRenameMoveable, item._id, item.name, value]);

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      sx={{
        padding: 1,
        boxSizing: "border-box",
        width: "100%",
        minHeight: "50px",
        borderBottom: "1px solid #ccc",
      }}
    >
      {!isRename && (
        <>
          <Typography fontSize={16}>{item.name}</Typography>
          <MoreIcon
            sx={{ cursor: "pointer" }}
            onClick={(e) =>
              setAnchorEl(e.currentTarget as unknown as HTMLElement)
            }
          />
        </>
      )}

      {isRename && (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="flex-start"
          gap={1}
          sx={{ width: "100%" }}
        >
          <TextField
            ref={renameRef}
            size="small"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            sx={{ width: "100%" }}
          />
          <Button
            variant="contained"
            sx={{ height: "30px" }}
            onClick={() => setIsRename(false)}
          >
            Done
          </Button>
        </Box>
      )}

      <ItemOptionPopover
        anchorEl={anchorEl as HTMLElement}
        onClose={handleClose}
        onRenameClick={() => {
          setIsRename(true);
          handleClose();
        }}
        onDelete={async () => {
          await deleteMoveable(item._id);
          setActiveId("");
        }}
      />
    </Box>
  );
});
