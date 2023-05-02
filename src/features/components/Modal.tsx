import * as React from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

interface Props {
  open: boolean;
  onClose: () => void;
  title: string;
  contentChildren: React.ReactNode;
  onSubmit?: () => void;
}

export const Modal = React.memo(function Modal({
  open,
  onClose,
  title,
  contentChildren,
  onSubmit,
}: Props) {
  return (
    <Dialog open={open} onClose={onClose}>
      {title && <DialogTitle>{title}</DialogTitle>}
      <DialogContent dividers sx={{ minWidth: "500px", maxWidth: "100vw" }}>
        {contentChildren}
      </DialogContent>
      {onSubmit && (
        <DialogActions>
          <Button variant="outlined" onClick={onClose}>
            Close
          </Button>
          <Button variant="contained" onClick={onSubmit}>
            Submit
          </Button>
        </DialogActions>
      )}
    </Dialog>
  );
});
