import * as React from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { useWeb, Form } from "@/features";
import { CreateWebModal, useGetWebs } from "@/features/web";

export const CreateWeb = React.memo(function CreateWeb() {
  const { data: webs } = useGetWebs();

  const {
    setOpenCreateModal,
    openCreateWebModal,
    handleCloseCreateModal,
    createWebFields,
    handleCreateWeb,
  } = useWeb();

  // const { pages } = usePage();

  console.log("webs: ", webs);

  return (
    <>
      <Stack
        justifyContent="center"
        alignItems="center"
        gap={3}
        sx={{ height: "100vh" }}
      >
        {webs?.length === 0 && (
          <>
            <Typography fontSize={30} color="primary">
              Create your first web
            </Typography>
            <Button
              variant="contained"
              onClick={() => setOpenCreateModal(true)}
            >
              Create
            </Button>
          </>
        )}
        <Typography variant="h1" fontSize={32}>
          Your webs
        </Typography>
        {webs?.map((web: any) => (
          <Typography
            key={web.id}
            // onClick={() => {
            //   const webPages = pages.filter(
            //     (page) => page.webId === page.webId
            //   );

            //   router.push(
            //     `/web/dashboard/edit/${web.id}/page/${webPages[0].id}`
            //   );
            // }}
            sx={{ cursor: "pointer" }}
          >
            {web.name}
          </Typography>
        ))}
      </Stack>
      <CreateWebModal
        open={openCreateWebModal}
        onClose={handleCloseCreateModal}
        title="Create Web"
        contentChildren={
          <Form fields={createWebFields} onSubmit={handleCreateWeb} />
        }
      />
    </>
  );
});
