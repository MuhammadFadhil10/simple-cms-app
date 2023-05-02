import * as React from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { useWeb, Form } from "@/features";
import { CreateWebModal } from "@/features/web";
import { useRouter } from "next/router";

export const CreateWeb = React.memo(function CreateWeb() {
  const router = useRouter();

  const {
    setOpenCreateModal,
    openCreateWebModal,
    handleCloseCreateModal,
    createWebFields,
    handleCreateWeb,
  } = useWeb();

  const [webList, setWebList] = React.useState([]);

  React.useEffect(() => {
    if (localStorage.webs) {
      setWebList(JSON.parse(localStorage.webs));
    }
  }, []);

  return (
    <>
      <Stack
        justifyContent="center"
        alignItems="center"
        gap={3}
        sx={{ height: "100vh" }}
      >
        <Typography fontSize={30} color="primary">
          Create your web
        </Typography>
        <Button variant="contained" onClick={() => setOpenCreateModal(true)}>
          Create
        </Button>
        <Typography>Web List</Typography>
        {webList?.map((web: any) => (
          <Typography
            key={web.id}
            onClick={() => router.push(`/web/dashboard/edit/${web.id}`)}
            sx={{ cursor: "pointer" }}
          >
            {web.webName}
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
