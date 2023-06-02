import * as React from "react";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Add from "@mui/icons-material/Add";
import { usePage } from "@/features/web";
import { usePageSection } from "../../hooks/usePageSection";
import { useRouter } from "next/router";
import { CreatePageModal } from "./CreatePageModal";
import { PageCard } from "./PageCard";

export const PagesSection = React.memo(function PagesSection() {
  const router = useRouter();
  const { pages, pagesLoading, handleCreatePage } = usePage();

  const { mutateAsync, isLoading, error } = handleCreatePage;

  const { open, setOpen, createPageFields } = usePageSection();

  const handleClose = React.useCallback(() => {
    setOpen(false);
  }, [setOpen]);

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
            <PageCard key={page._id} page={page} />
          ))}
        </Stack>
      </Stack>

      <CreatePageModal
        open={open}
        handleClose={handleClose}
        defaultValues={{ webId: router.query.webId, isMain: false }}
        fields={createPageFields}
        loading={isLoading}
        onCreate={async (data) => {
          await mutateAsync(data);
          setOpen(false);
        }}
        submitErrorMessage={(error as any)?.message ?? (error as string)}
      />
    </>
  );
});
