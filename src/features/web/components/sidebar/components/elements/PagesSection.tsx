import * as React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Add from "@mui/icons-material/Add";
import { Page } from "@/features/web";
import { usePageSection } from "../../hooks/usePageSection";
import { CreatePageModal } from "./CreatePageModal";
import { useRouter } from "next/router";

interface Props {
  pages: Page[];
  activePageId: string;
}

export const PagesSection = React.memo(function PagesSection({
  pages,
  activePageId,
}: Props) {
  const router = useRouter();

  const { open, setOpen, createPageFields, handleCreatePage } =
    usePageSection();

  const handleClose = React.useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  return (
    <>
      <Stack sx={{ width: "100%", height: "auto", px: 1 }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          sx={{ width: "100%" }}
        >
          <Typography>Pages</Typography>
          <Add sx={{ cursor: "pointer" }} onClick={() => setOpen(true)} />
        </Stack>
        <Stack sx={{ width: "100%" }}>
          {pages.map((page) => (
            <Box
              key={page.id}
              sx={{
                cursor: "pointer",
                width: "100%",
                padding: 1,
                boxSizing: "border-box",
                backgroundColor: page.id === activePageId ? "#dfdfdf" : "white",
                transition: "300ms",
                "&:hover": {
                  backgroundColor:
                    page.id === activePageId ? "#cfcfcf" : "#efefef",
                },
              }}
              onClick={() => {
                router.push(
                  `/web/dashboard/edit/${localStorage.webId}/page/${page.id}`
                );
              }}
            >
              <Typography>{page.name}</Typography>
            </Box>
          ))}
        </Stack>
      </Stack>

      <CreatePageModal
        open={open}
        handleClose={handleClose}
        fields={createPageFields}
        onCreate={handleCreatePage}
      />
    </>
  );
});
