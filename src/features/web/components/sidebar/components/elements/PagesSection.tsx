import * as React from "react";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Add from "@mui/icons-material/Add";
import { usePage } from "@/features/web";
import { usePageSection } from "../../hooks/usePageSection";
import { useRouter } from "next/router";

export const PagesSection = React.memo(function PagesSection() {
  const router = useRouter();
  const { pages, pagesLoading } = usePage();

  const { setOpen } = usePageSection();

  // const handleClose = React.useCallback(() => {
  //   setOpen(false);
  // }, [setOpen]);

  return (
    <>
      <Stack
        sx={{ width: "100%", height: "auto", p: 1, boxSizing: "border-box" }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          marginBottom={1}
          sx={{ width: "100%" }}
        >
          <Typography>Pages</Typography>
          <Add sx={{ cursor: "pointer" }} onClick={() => setOpen(true)} />
        </Stack>

        <Stack sx={{ width: "100%" }}>
          {pagesLoading && (
            <Skeleton variant="rectangular" height={40} animation="wave" />
          )}

          {pages.map((page) => (
            <Box
              key={page._id}
              sx={{
                cursor: "pointer",
                width: "100%",
                padding: 1,
                boxSizing: "border-box",
                backgroundColor:
                  page._id === router.query.pageId ? "#dfdfdf" : "white",
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
              <Typography>{page.name}</Typography>
            </Box>
          ))}
        </Stack>
      </Stack>

      {/* <CreatePageModal
        open={open}
        handleClose={handleClose}
        fields={createPageFields}
        onCreate={handleCreatePage}
      /> */}
    </>
  );
});
