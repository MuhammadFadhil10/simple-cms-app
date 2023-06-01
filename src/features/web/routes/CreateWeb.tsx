import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { useWeb, Form, Web } from "@/features";
import { CreateWebModal, useGetWebs, WebCard } from "@/features/web";

export const CreateWeb = React.memo(function CreateWeb() {
  const { data: webs } = useGetWebs();

  const {
    setOpenCreateModal,
    openCreateWebModal,
    handleCloseCreateModal,
    createWebFields,
    handleCreateWeb,
  } = useWeb();

  return (
    <>
      <Stack sx={{ p: 2 }}>
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

        {webs?.length > 0 && (
          <Stack gap={2}>
            <Box display="flex" gap={3}>
              <Typography variant="h1" fontSize={32}>
                Your webs
              </Typography>
              <Button
                size="small"
                variant="contained"
                onClick={() => setOpenCreateModal(true)}
              >
                Add web
              </Button>
            </Box>
            <Stack direction="row" gap={2}>
              {webs?.map((web: Web) => (
                <WebCard key={web._id} web={web} />
              ))}
            </Stack>
          </Stack>
        )}
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
