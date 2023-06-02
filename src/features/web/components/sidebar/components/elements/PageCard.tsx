import * as React from "react";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import MoreIcon from "@mui/icons-material/MoreVert";
import DeleteIcon from "@mui/icons-material/Delete";
import { useRouter } from "next/router";
import { Page, usePage } from "@/features/web";

interface Props {
  page: Page;
}

export const PageCard = React.memo(function PageCard({ page }: Props) {
  const router = useRouter();
  const { handleDeletePage } = usePage();

  const { mutateAsync, isLoading: deletePageLoading } = handleDeletePage;

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        cursor: "pointer",
        width: "100%",
        padding: 1,
        boxSizing: "border-box",
        backgroundColor: page._id === router.query.pageId ? "#dfdfdf" : "white",
        transition: "300ms",
        "&:hover": {
          backgroundColor:
            page._id === router.query.pageId ? "#cfcfcf" : "#efefef",
        },
      }}
      onClick={() => {
        router.push(
          `/web/dashboard/edit/${router.query.webId}/page/${page._id}`
        );
      }}
    >
      <Box sx={{ display: "flex", gap: 1 }}>
        {page.isMain && <FirstPageIcon />}
        <Typography>{page.name}</Typography>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center" }}>
        {deletePageLoading && <CircularProgress size={16} color="error" />}
        {!deletePageLoading && !page.isMain && (
          <DeleteIcon
            fontSize="small"
            color="error"
            onClick={(e) => {
              e.stopPropagation();

              mutateAsync(page._id);
            }}
          />
        )}
        <MoreIcon
          fontSize="small"
          sx={{
            color: "#444",
            borderRadius: "50%",
            "&:hover": { backgroundColor: "#ccc" },
          }}
        />
      </Box>
    </Box>
  );
});
